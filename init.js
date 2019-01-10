/* eslint-disable no-console */

/**
 * Initialization script used to set up a local environmnet with credentials
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src', 'config');

// Create a .env file for environment variables
fs.createReadStream(path.join(configPath, 'sampleEnvConfig.js'))
  .pipe(fs.createWriteStream(path.join(configPath, 'envConfig.js')));

console.log("IMPORTANT: The file 'src/config/envConfig.js' has been created for you.");
console.log('Please update this file before continuing.');
