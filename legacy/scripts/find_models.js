const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const searchDir = "C:\\Users\\Dell\\Downloads";
const workspaceDir = __dirname;

console.log(`Scanning directories for 3D model files (.glb or .gltf)...`);
console.log(`Search Path 1: ${searchDir}`);
console.log(`Search Path 2: ${workspaceDir}`);

const glbFiles = [];

// Recursive search function
function scanDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        continue; // Skip files with permission errors
      }

      if (stat.isDirectory()) {
        // Skip system/hidden folders
        if (!file.startsWith('.') && file !== 'node_modules' && file !== '.git') {
          scanDir(fullPath);
        }
      } else if (file.endsWith('.glb') || file.endsWith('.gltf')) {
        glbFiles.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error scanning ${dir}:`, err.message);
  }
}

// 1. Scan Downloads & Workspace
scanDir(searchDir);
scanDir(workspaceDir);

if (glbFiles.length > 0) {
  console.log("\nFound 3D model files:");
  glbFiles.forEach(f => console.log(`  - ${f}`));
} else {
  console.log("\nNo loose .glb or .gltf files found in Downloads or Workspace.");
}

// 2. Scan inside ZIP files in Downloads
try {
  const files = fs.readdirSync(searchDir);
  const zips = files.filter(f => f.endsWith('.zip'));
  
  if (zips.length > 0) {
    console.log(`\nChecking inside ${zips.length} ZIP files in Downloads...`);
    zips.forEach(zip => {
      const zipPath = path.join(searchDir, zip);
      console.log(`Checking ${zip}...`);
      try {
        // Try executing tar or unzip to list contents
        const list = execSync(`tar -tf "${zipPath}"`, { encoding: 'utf8' });
        const models = list.split('\n').filter(name => name.endsWith('.glb') || name.endsWith('.gltf'));
        if (models.length > 0) {
          console.log(`  -> Found in ${zip}:`);
          models.forEach(m => console.log(`     * ${m.trim()}`));
        }
      } catch (e) {
        // tar might not be installed or supported, fallback
      }
    });
  }
} catch (err) {
  console.error("ZIP scan error:", err.message);
}
