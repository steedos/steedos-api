let path = require('path');
let objectFilesPath = path.resolve(path.join(process.cwd(), './objects'));

console.log('objectFilesPath: ', objectFilesPath);

module.exports = {
  datasources: {
    default: {
      driver: 'mongo',
      url: 'mongodb://127.0.0.1/steedos',
      objectFiles: [objectFilesPath]
    }
  }
}