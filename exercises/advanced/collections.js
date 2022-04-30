/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

const fs = require('fs');
const Promise = require('bluebird');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var promises = filePaths.map(filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, text) => {
        err ? reject(err) : resolve(text.split('\n')[0]);
      });
    });
  });
  return Promise.all(promises)
    .then(texts => {
      fs.writeFile(writePath, texts.join('\n'), (err) => {});
    });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};