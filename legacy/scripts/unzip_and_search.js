const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const downloadsDir = "C:\\Users\\Dell\\Downloads";
const publicDir = path.join(__dirname, 'public');

console.log("Analyzing zip archives in Downloads for 3D model assets...");

// Create a python helper script to extract glb/gltf files from zip archives
const pythonScriptContent = `
import zipfile
import os
import glob

downloads_dir = r"${downloadsDir}"
public_dir = r"${publicDir.replace(/\\/g, '\\\\')}"

zips = glob.glob(os.path.join(downloads_dir, "*.zip"))
found_any = False

for zip_path in zips:
    try:
        with zipfile.ZipFile(zip_path, 'r') as z:
            for name in z.namelist():
                if name.endswith(('.glb', '.gltf')):
                    print(f"Found 3D model: {name} in {os.path.basename(zip_path)}")
                    # Extract the file directly to the public directory
                    base_name = os.path.basename(name)
                    dest_path = os.path.join(public_dir, base_name)
                    
                    # Extract binary data
                    data = z.read(name)
                    with open(dest_path, 'wb') as f:
                        f.write(data)
                    print(f"Extracted {base_name} to {dest_path}")
                    found_any = True
    except Exception as e:
        print(f"Error checking {zip_path}: {e}")

if not found_any:
    print("No .glb or .gltf files found inside any ZIP archives in Downloads.")
`;

const tempScriptPath = path.join(__dirname, 'temp_unzip.py');
fs.writeFileSync(tempScriptPath, pythonScriptContent);

try {
  // Execute the python script
  execSync(`python "${tempScriptPath}"`, { stdio: 'inherit' });
} catch (err) {
  console.error("Failed to execute unzip search script:", err.message);
} finally {
  // Clean up temp python file
  if (fs.existsSync(tempScriptPath)) {
    fs.unlinkSync(tempScriptPath);
  }
}
