const fs = require('fs');
const path = require('path');

const sourceImage = "C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\a9bd7565-0929-4d88-b3f8-754b5c0eba51\\media__1787076478814.jpg";
const destDir = path.join(__dirname, 'public');
const destImage = path.join(destDir, 'avatar.jpg');

console.log("Running assets copy & clean script...");

// Ensure public directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log("Created public directory.");
}

// Copy the avatar image (custom floral-shirt character)
try {
  const normalizedSource = sourceImage.replace(/\\/g, '/');
  if (fs.existsSync(normalizedSource)) {
    fs.copyFileSync(normalizedSource, destImage);
    console.log(`Successfully copied avatar image to ${destImage}`);
  } else {
    console.warn(`Source image not found at: ${normalizedSource}`);
  }
} catch (err) {
  console.error("Failed to copy avatar image:", err.message);
}

// Clean up unused multi-page routing directories
const dirsToClean = [
  path.join(__dirname, 'app', 'about'),
  path.join(__dirname, 'app', 'portfolio'),
  path.join(__dirname, 'app', 'contact')
];

dirsToClean.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Cleaned up unused directory: ${dir}`);
    } catch (err) {
      console.error(`Failed to delete directory ${dir}:`, err.message);
    }
  }
});
