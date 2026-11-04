const fs = require('fs');
const path = require('path');

const openNextDir = path.resolve('.open-next');
const distDir = path.resolve('dist');

if (fs.existsSync(distDir)) {
  // Ensure .assetsignore exists in dist so Wrangler never uploads _worker.js as static asset
  fs.writeFileSync(path.join(distDir, '.assetsignore'), '_worker.js\n');

  fs.mkdirSync(openNextDir, { recursive: true });

  const workerSrc = path.join(distDir, '_worker.js', 'index.js');
  const workerDst = path.join(openNextDir, 'worker.js');
  if (fs.existsSync(workerSrc)) {
    fs.copyFileSync(workerSrc, workerDst);
  }

  const assetsDst = path.join(openNextDir, 'assets');
  if (!fs.existsSync(assetsDst)) {
    try {
      fs.cpSync(distDir, assetsDst, { recursive: true });
    } catch {
      // ignore
    }
  }
}
