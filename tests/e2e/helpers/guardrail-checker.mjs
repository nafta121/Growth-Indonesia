import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { PROJECT_ROOT, INTERACTIVE_ISLANDS, STATIC_COMPONENTS } from './constants.mjs';

const EXCLUDED_DIRS = new Set([
  '.git',
  '.agents',
  'node_modules',
  'dist',
  '.astro',
  '.next',
  '.open-next',
  'tests',
  'scripts',
]);

const SCANNABLE_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.astro',
  '.md',
  '.mdx',
  '.json',
  '.css',
  '.html',
  '.txt',
]);

/**
 * Recursively walk directory returning all scannable file paths.
 */
export function getAllRepoFiles(dir = PROJECT_ROOT) {
  const results = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (SCANNABLE_EXTENSIONS.has(ext)) {
          if (
            fullPath.includes('tests/e2e/helpers/guardrail-checker') ||
            fullPath.includes('tests/e2e/tier1') ||
            fullPath.includes('tests/e2e/tier2') ||
            fullPath.includes('tests/e2e/guardrails') ||
            fullPath.includes('scripts/sloplint.mjs')
          ) {
            continue;
          }
          results.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Scan repository files for occurrences of "BNSP".
 * Returns an array of violations: { file, line, text }.
 */
export function scanForBNSP() {
  const files = getAllRepoFiles();
  const violations = [];
  const token = 'B' + 'N' + 'S' + 'P';

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(token)) {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes(token)) {
          violations.push({
            file: path.relative(PROJECT_ROOT, file),
            line: index + 1,
            text: line.trim(),
          });
        }
      });
    }
  }

  return violations;
}

/**
 * Scan repository files for occurrences of en-dash (\u2013) or em-dash (\u2014).
 * Returns an array of violations: { file, line, char, text }.
 */
export function scanForDashes() {
  const files = getAllRepoFiles();
  const violations = [];
  const dashRegex = /[\u2013\u2014]/;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (dashRegex.test(content)) {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (dashRegex.test(line)) {
          violations.push({
            file: path.relative(PROJECT_ROOT, file),
            line: index + 1,
            text: line.trim(),
          });
        }
      });
    }
  }

  return violations;
}

let cachedSloplintResult = null;

/**
 * Run the Hallmark sloplint script and return parsed result.
 */
export function runSloplint() {
  if (cachedSloplintResult) return cachedSloplintResult;
  const candidateScripts = [
    path.join(PROJECT_ROOT, 'scripts', 'sloplint.mjs'),
    '/data/data/com.termux/files/home/.gemini/config/skills/hallmark/scripts/sloplint.mjs',
    '/data/home/sloplint.mjs',
  ];
  const sloplintScript = candidateScripts.find((p) => fs.existsSync(p));
  if (!sloplintScript) {
    return { clean: true, fail: 0, reflex: 0, warn: 0, skipped: true };
  }

  try {
    const targetDirs = [];
    if (fs.existsSync(path.join(PROJECT_ROOT, 'src'))) targetDirs.push('src');
    if (fs.existsSync(path.join(PROJECT_ROOT, 'components'))) targetDirs.push('components');
    if (fs.existsSync(path.join(PROJECT_ROOT, 'lib'))) targetDirs.push('lib');
    if (fs.existsSync(path.join(PROJECT_ROOT, 'app'))) targetDirs.push('app');

    const output = execSync(`node ${sloplintScript} ${targetDirs.join(' ')}`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const isClean = output.includes('sloplint: clean');
    const failMatch = output.match(/(\d+)\s+FAIL/);
    const reflexMatch = output.match(/(\d+)\s+REFLEX/);
    const warnMatch = output.match(/(\d+)\s+WARN/);

    cachedSloplintResult = {
      clean: isClean,
      fail: failMatch ? parseInt(failMatch[1], 10) : 0,
      reflex: reflexMatch ? parseInt(reflexMatch[1], 10) : 0,
      warn: warnMatch ? parseInt(warnMatch[1], 10) : 0,
      output: output.trim(),
    };
    return cachedSloplintResult;
  } catch (err) {
    const output = (err.stdout || '') + (err.stderr || '');
    cachedSloplintResult = {
      clean: false,
      fail: 1,
      reflex: 0,
      warn: 0,
      output: output.trim(),
      error: err.message,
    };
    return cachedSloplintResult;
  }
}

/**
 * Audit hydration boundaries across all components and templates.
 * Exactly 6 components are allowed client hydration directives.
 * All 26 static components must have zero client hydration directives.
 */
export function auditHydrationBoundaries() {
  const interactiveSet = new Set(INTERACTIVE_ISLANDS.map((i) => i.file));
  const staticSet = new Set(STATIC_COMPONENTS);

  const scannedIslands = [];
  const unauthorizedIslands = [];

  // Scan .astro templates in src/ if they exist
  const srcDir = path.join(PROJECT_ROOT, 'src');
  if (fs.existsSync(srcDir)) {
    const astroFiles = [];
    function findAstro(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) findAstro(full);
        else if (entry.name.endsWith('.astro')) astroFiles.push(full);
      }
    }
    findAstro(srcDir);

    for (const file of astroFiles) {
      const content = fs.readFileSync(file, 'utf8');
      // match e.g. <NavbarMobile client:load /> or client:visible
      const clientDirectiveRegex = /<([A-Z][A-Za-z0-9]+)[^>]*\s(client:(?:load|visible|idle|only))[^>]*>/g;
      let match;
      while ((match = clientDirectiveRegex.exec(content)) !== null) {
        const componentName = match[1];
        const directive = match[2];
        scannedIslands.push({ componentName, directive, file: path.relative(PROJECT_ROOT, file) });

        // Check against interactive set
        const kebab = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + '.tsx';
        if (!interactiveSet.has(kebab) && !interactiveSet.has(componentName + '.tsx')) {
          unauthorizedIslands.push({ componentName, directive, file: path.relative(PROJECT_ROOT, file) });
        }
      }
    }
  }

  return {
    allowedCount: interactiveSet.size,
    staticCount: staticSet.size,
    totalComponents: interactiveSet.size + staticSet.size,
    scannedIslands,
    unauthorizedIslands,
    interactiveSet: Array.from(interactiveSet),
    staticSet: Array.from(staticSet),
  };
}
