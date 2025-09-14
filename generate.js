const fs = require('fs');
const path = require('path');

// Function to copy a folder recursively
function copyFolderSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Define source and target directories
const uniconsPath = path.join(__dirname, 'node_modules', '@iconscout', 'unicons');
const targetPath = path.join(__dirname, 'unicons');

// Copy `css` folder
const cssSrc = path.join(uniconsPath, 'css');
const cssDest = path.join(targetPath, 'css');
copyFolderSync(cssSrc, cssDest);

// Copy `fonts` folder
const fontsSrc = path.join(uniconsPath, 'fonts');
const fontsDest = path.join(targetPath, 'fonts');
copyFolderSync(fontsSrc, fontsDest);

console.log('Folders copied successfully!');