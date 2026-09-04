const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'avatar.glb');

console.log("Removing generic 3D model asset...");

if (fs.existsSync(filePath)) {
  try {
    fs.unlinkSync(filePath);
    console.log("Successfully removed avatar.glb!");
  } catch (err) {
    console.error("Failed to delete avatar.glb:", err.message);
  }
} else {
  console.log("avatar.glb does not exist. Nothing to remove.");
}
