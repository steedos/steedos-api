let path = require('path');
let objectFilesPath = path.resolve(path.join(process.cwd(), './objects'));
let standardObjectsDir = path.dirname(require.resolve("@steedos/standard-objects"))

console.log('objectFilesPath: ', objectFilesPath);
console.log('standardObjectsDir: ', standardObjectsDir);

module.exports = {
  datasources: {
    default: {
      driver: 'mongo',
      url: 'mongodb://127.0.0.1:27017/steedos',
      // url: 'mongodb://172.17.5.127:27017/steedos',
      objectFiles: [objectFilesPath, standardObjectsDir]
    }
  }
}