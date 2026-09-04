const https = require('https');

const baseUrl = "https://kabhishek18.com";
const chunks = [
  'assets/index-B_Lhn6YE.js',
  'assets/index-Bj4PNWyW.js',
  'assets/MainContainer-CBmkFsEY.js',
  'assets/initialFX-DvSdfTom.js',
  'assets/Navbar-BiytUrKH.js',
  'assets/ScrollTrigger-0lJgtTtq.js',
  'assets/RGBELoader-CRHepzIQ.js',
  'assets/TechStack-kY5g5MAB.js'
];

console.log("Searching all compiled chunks for loaded assets (glb, gltf, hdr, png, jpg, jpeg, json)...");

function getHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const assetRegex = /[\w\-\.\/]+\.(glb|gltf|hdr|png|jpg|jpeg|json)/gi;
  
  for (const chunk of chunks) {
    const chunkUrl = `${baseUrl}/${chunk}`;
    console.log(`\nScanning: ${chunk}`);
    try {
      const code = await getHtml(chunkUrl);
      const matches = code.match(assetRegex) || [];
      if (matches.length > 0) {
        const uniqueMatches = Array.from(new Set(matches));
        console.log(`  Found assets:`);
        uniqueMatches.forEach(m => {
          if (!m.includes("THREE.") && !m.includes("e.userData")) {
            console.log(`    - ${m}`);
          }
        });
      } else {
        console.log(`  No assets found.`);
      }
    } catch (e) {
      console.error(`  Error reading chunk: ${e.message}`);
    }
  }
}

run();
