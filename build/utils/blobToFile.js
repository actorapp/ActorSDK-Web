'use strict';

exports.__esModule = true;
exports.default = blobToFile;
function blobToFile(blob, fileName) {
  blob.lastModifiedDate = blob.lastModifiedDate ? blob.lastModifiedDate : new Date();
  blob.name = fileName ? fileName : blob.lastModifiedDate + '.' + blob.type.split('/')[1];
  return blob;
}
//# sourceMappingURL=blobToFile.js.map