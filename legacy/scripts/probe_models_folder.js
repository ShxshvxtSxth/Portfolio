const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = "https://kabhishek18.com";
const destFile = path.join(__dirname, 'public', 'avatar.glb');

const modelNames = [
  "character.glb",
  "char.glb",
  "me.glb",
  "dev.glb",
  "developer.glb",
  "model.glb",
  "abhishek.glb",
  "kabhishek.glb",
  "kabhishek18.glb",
  "scene.glb",
  "avatar.glb",
  "avatar.gltf",
  "scene.gltf",
  "react.glb",
  "computer.glb",
  "desk.glb",
  "hacker-room.glb"
];

const paths = [
  "/models/",
  "/assets/",
  "/assets/models/",
  "/static/media/",
  "/"
];

console.log("Probing for 3D model filenames in folders on kabhishek18.com...");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Successfully downloaded: ${url}`);
          resolve(true);
        });
      } else {
        resolve(false);
      }
    }).on('error', (err) => {
      resolve(false);
    });
  });
}

async function run() {
  for (const p of paths) {
    for (const name of modelNames) {
      const fullUrl = baseUrl + p + name;
      console.log(`Probing: ${fullUrl}`);
      const success = await download(fullUrl, destFile);
      if (success) {
        console.log(`\nSuccess! Downloaded original 3D avatar model: ${p}${name}`);
        return;
      }
    }
  }
  console.log("\nCould not find the model under any guessed names.");
}

run();
