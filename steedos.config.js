let path = require('path');
let objectFilesPath = path.resolve(path.join(process.cwd(), './objects'));

console.log('objectFilesPath: ', objectFilesPath);

module.exports = {
  datasources: {
    default: {
      driver: 'mongo',
      url: 'mongodb://172.17.5.127:27017/steedos',
      objectFiles: [objectFilesPath]
    }
  }
}