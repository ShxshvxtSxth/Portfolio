const https = require('https');

const url = "https://kabhishek18.com/assets/index-B_Lhn6YE.js";

console.log("Fetching bundle script to search for GLTF/GLB loaders...");

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Fetched bundle. Size: ${data.length} bytes.`);
    
    // Search for glb or gltf keywords case-insensitively
    const glbIdx = data.toLowerCase().indexOf("glb");
    const gltfIdx = data.toLowerCase().indexOf("gltf");
    const loaderIdx = data.toLowerCase().indexOf("loader");
    const modelIdx = data.toLowerCase().indexOf("model");
    
    console.log(`Keyword Index Results:`);
    console.log(`  - 'glb': ${glbIdx}`);
    console.log(`  - 'gltf': ${gltfIdx}`);
    console.log(`  - 'loader': ${loaderIdx}`);
    console.log(`  - 'model': ${modelIdx}`);
    
    // Print snippets around keywords
    if (glbIdx !== -1) {
      console.log(`\nSnippet around 'glb':`);
      console.log(data.substring(Math.max(0, glbIdx - 100), Math.min(data.length, glbIdx + 100)));
    }
    if (gltfIdx !== -1) {
      console.log(`\nSnippet around 'gltf':`);
      console.log(data.substring(Math.max(0, gltfIdx - 100), Math.min(data.length, gltfIdx + 100)));
    }
    if (loaderIdx !== -1) {
      console.log(`\nSnippet around 'loader':`);
      console.log(data.substring(Math.max(0, loaderIdx - 100), Math.min(data.length, loaderIdx + 100)));
    }
  });
}).on('error', (err) => {
  console.error("Error fetching bundle:", err.message);
});
