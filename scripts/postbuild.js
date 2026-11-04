const fs = require('fs');
const path = require('path');

const openNextDir = path.resolve('.open-next');
const distDir = path.resolve('dist');

if (fs.existsSync(distDir)) {
  // 1. Ensure .assetsignore in dist/ to prevent _worker.js from being uploaded as static assets
  fs.writeFileSync(path.join(distDir, '.assetsignore'), '_worker.js\n');

  // 2. Prepare .open-next directory structure
  fs.mkdirSync(openNextDir, { recursive: true });

  // Copy all files and folders from dist/_worker.js into .open-next/
  // renaming index.js to worker.js so all relative imports (./pages, ./chunks, etc.) resolve properly
  const workerDir = path.join(distDir, '_worker.js');
  if (fs.existsSync(workerDir)) {
    for (const item of fs.readdirSync(workerDir)) {
      const src = path.join(workerDir, item);
      const dst = path.join(openNextDir, item === 'index.js' ? 'worker.js' : item);
      fs.cpSync(src, dst, { recursive: true, force: true });
    }
  }

  // 3. Prepare .open-next/assets
  const assetsDst = path.join(openNextDir, 'assets');
  fs.rmSync(assetsDst, { recursive: true, force: true });
  fs.mkdirSync(assetsDst, { recursive: true });
  fs.cpSync(distDir, assetsDst, { recursive: true });
  // Ensure _worker.js is not inside assets
  fs.rmSync(path.join(assetsDst, '_worker.js'), { recursive: true, force: true });
}
