const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'app', '.well-known', 'farcaster.json');
const destDir = path.join(__dirname, '..', 'dist', '.well-known');
const dest = path.join(destDir, 'farcaster.json');

// Create directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy file
fs.copyFileSync(source, dest);

console.log('✅ Manifest copied to dist/.well-known/farcaster.json');
