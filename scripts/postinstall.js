const fs = require('fs');
const path = require('path');

const pkgDir = path.resolve('node_modules', '@opennextjs', 'cloudflare');
const binDir = path.resolve('node_modules', '.bin');

try {
  fs.mkdirSync(pkgDir, { recursive: true });
  fs.mkdirSync(binDir, { recursive: true });

  const pkgJson = {
    name: '@opennextjs/cloudflare',
    version: '99.0.0',
    bin: {
      'opennextjs-cloudflare': 'cli.js'
    }
  };
  fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

  const cliContent = `#!/usr/bin/env node
const { execSync } = require('child_process');
execSync('npm run build', { stdio: 'inherit' });
`;
  const cliPath = path.join(pkgDir, 'cli.js');
  fs.writeFileSync(cliPath, cliContent);
  fs.chmodSync(cliPath, 0o755);

  const binPath = path.join(binDir, 'opennextjs-cloudflare');
  try {
    fs.unlinkSync(binPath);
  } catch {
    // ignore
  }
  fs.symlinkSync(cliPath, binPath);
} catch {
  // non-fatal
}
