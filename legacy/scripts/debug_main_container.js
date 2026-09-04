const https = require('https');

const url = "https://kabhishek18.com/assets/MainContainer-CBmkFsEY.js";

console.log("Fetching MainContainer bundle script to find 3D model files...");

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Fetched MainContainer chunk. Size: ${data.length} bytes.`);
    
    // Search for glb or gltf keywords case-insensitively
    const glbIndices = [];
    const gltfIndices = [];
    
    let pos = 0;
    while ((pos = data.toLowerCase().indexOf("glb", pos)) !== -1) {
      glbIndices.push(pos);
      pos += 3;
    }
    
    pos = 0;
    while ((pos = data.toLowerCase().indexOf("gltf", pos)) !== -1) {
      gltfIndices.push(pos);
      pos += 4;
    }
    
    console.log(`Keyword Index Results:`);
    console.log(`  - 'glb' count: ${glbIndices.length}`);
    console.log(`  - 'gltf' count: ${gltfIndices.length}`);
    
    // Print snippets around glb keyword occurrences
    glbIndices.forEach((idx, i) => {
      console.log(`\nGLB Occurrence #${i + 1} snippet:`);
      console.log(data.substring(Math.max(0, idx - 100), Math.min(data.length, idx + 100)));
    });

    // Print snippets around gltf keyword occurrences
    gltfIndices.forEach((idx, i) => {
      console.log(`\nGLTF Occurrence #${i + 1} snippet:`);
      console.log(data.substring(Math.max(0, idx - 100), Math.min(data.length, idx + 100)));
    });

    // Also look for loadGLTF or similar loaders
    const loaderIdx = data.toLowerCase().indexOf("loader");
    if (loaderIdx !== -1) {
      console.log(`\nLoader Index: ${loaderIdx}`);
      console.log(`Snippet around 'loader':`);
      console.log(data.substring(Math.max(0, loaderIdx - 100), Math.min(data.length, loaderIdx + 100)));
    }
  });
}).on('error', (err) => {
  console.error("Error fetching bundle:", err.message);
});
