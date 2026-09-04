const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = "https://kabhishek18.com";
const destFile = path.join(__dirname, 'public', 'avatar.glb');

console.log("Beginning recursive deep-scan of kabhishek18.com build chunks...");

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

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Successfully downloaded model from: ${url}`);
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
  const scannedChunks = new Set();
  const pendingChunks = [];
  const modelPaths = [];

  try {
    const mainHtml = await getHtml(baseUrl);
    console.log("Fetched homepage HTML. Locating initial scripts...");

    // Find script tags src
    const scriptRegex = /src="(\/assets\/index-[\w\-]+\.js)"/i;
    const match = mainHtml.match(scriptRegex);
    if (match) {
      pendingChunks.push(match[1]);
    } else {
      // Direct guess if regex fails
      pendingChunks.push("/assets/index-B_Lhn6YE.js");
    }

    // Hardcoded fallback chunks from logs to bootstrap search
    pendingChunks.push("assets/index-B_Lhn6YE.js");
    pendingChunks.push("assets/index-Bj4PNWyW.js");
    pendingChunks.push("assets/MainContainer-CBmkFsEY.js");

    const chunkRegex = /assets\/[\w\-]+\-[\w\-]+\.js/gi;
    const cleanChunkRegex = /assets\/[\w\-]+\.js/gi;
    const modelRegex = /[\w\-\.\/]+\.(glb|gltf)/gi;

    console.log("Starting recursive crawl loop...");

    while (pendingChunks.length > 0) {
      let chunk = pendingChunks.shift();
      
      // Clean path
      if (chunk.startsWith('./')) {
        chunk = chunk.substring(2);
      }
      if (chunk.startsWith('/')) {
        chunk = chunk.substring(1);
      }

      if (scannedChunks.has(chunk)) continue;
      scannedChunks.add(chunk);

      const chunkUrl = `${baseUrl}/${chunk}`;
      console.log(`Crawling: ${chunkUrl}...`);

      try {
        const code = await getHtml(chunkUrl);

        // 1. Scan for model files
        const matches = code.match(modelRegex) || [];
        matches.forEach(m => {
          if (!m.includes("THREE.") && !m.includes("userData.")) {
            modelPaths.push(m);
          }
        });

        // 2. Discover other chunks inside this code
        const discovered1 = code.match(chunkRegex) || [];
        const discovered2 = code.match(cleanChunkRegex) || [];
        const allDiscovered = [...discovered1, ...discovered2];

        allDiscovered.forEach(c => {
          // Normalize found chunk
          let cleaned = c;
          if (cleaned.startsWith('./')) cleaned = cleaned.substring(2);
          if (cleaned.startsWith('/')) cleaned = cleaned.substring(1);
          if (!scannedChunks.has(cleaned) && !pendingChunks.includes(cleaned)) {
            pendingChunks.push(cleaned);
          }
        });

      } catch (err) {
        console.error(`Failed to fetch chunk: ${chunkUrl}`);
      }
    }

    console.log(`\nScan finished. Crawled ${scannedChunks.size} script files.`);

    // Default fallbacks in case of missing matches
    const defaultPaths = [
      "/avatar.glb",
      "/models/avatar.glb",
      "/assets/avatar.glb",
      "/models/animations/developer.glb"
    ];

    const uniquePaths = Array.from(new Set([...modelPaths, ...defaultPaths]));
    console.log(`Discovered ${uniquePaths.length} unique model paths to probe.`);

    for (let modelPath of uniquePaths) {
      // Clean path syntax
      let cleanedPath = modelPath;
      if (cleanedPath.startsWith('./')) {
        cleanedPath = cleanedPath.substring(1);
      }
      if (!cleanedPath.startsWith('/')) {
        cleanedPath = '/' + cleanedPath;
      }
      if (cleanedPath.includes('"') || cleanedPath.includes("'")) {
        cleanedPath = cleanedPath.replace(/['"]/g, '');
      }

      const fullUrl = baseUrl + cleanedPath;
      console.log(`Probing: ${fullUrl}`);
      
      const success = await download(fullUrl, destFile);
      if (success) {
        console.log(`\nSuccess! Downloaded original 3D avatar model: ${cleanedPath}`);
        return;
      }
    }
    
    console.log("\nCould not find the 3D model URL.");
  } catch (err) {
    console.error("Recursive scraper error:", err.message);
  }
}

run();
