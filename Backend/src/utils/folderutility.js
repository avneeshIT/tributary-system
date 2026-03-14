const fs = require('fs/promises'); // Use fs/promises for promise-based methods
const path = require('path');


async function createFolderIfNotExists(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true }); // The 'recursive: true' option prevents an error if the directory already exists
    console.log(`Directory ensured: ${folderPath}`);
  } catch (err) {
    // Handle other potential errors, but not EEXIST if recursive is true
    console.error(`Error ensuring directory: ${err}`);
  }
}


module.exports={createFolderIfNotExists}
