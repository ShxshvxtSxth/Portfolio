const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoUrl = 'https://github.com/Kabhishek18/react-portfolio-kabhishek18.git';
const targetDir = path.join(__dirname, 'reference_temp');

console.log(`Cloning reference repository: ${repoUrl}...`);

if (fs.existsSync(targetDir)) {
  console.log("reference_temp already exists. Cleaning up...");
  try {
    fs.rmSync(targetDir, { recursive: true, force: true });
  } catch (err) {
    console.error("Failed to clean reference_temp directory:", err.message);
  }
}

try {
  execSync(`git clone ${repoUrl} "${targetDir}"`, { stdio: 'inherit' });
  console.log("Successfully cloned reference repository to reference_temp!");
} catch (err) {
  console.error("Failed to clone repository:", err.message);
}
