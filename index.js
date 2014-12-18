var path = require('path');
var fs   = require('fs');

var mimetypes = {
  '.gif':  'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.jpe':  'image/jpeg',
  '.png':  'image/png',
  '.bmp':  'image/bmp'
};

var encode = function( filePath ) {
  return new Buffer(fs.readFileSync(filePath)).toString('base64');
};

module.exports = function( inputText, inputName ) {
  var transformedText = inputText,
      regex = /url\(\\?['"]?(\.*\/?[\w_-]*\/)*([\w-_]+\.\w{3,4})\\?['"]?\)/g,
      found = inputText.match(regex);

  if (found) {
    transformedText = inputText.replace(regex, function( match, cg1, cg2) {
      // cg1 = capture group $1
      // cg2 = capture group $2
      var filePath = path.dirname(inputName) + '/' +(cg1 ? cg1 : '') + cg2,
          prefix = 'data:' + mimetypes[path.extname(cg2)] + ';base64,';

      return 'url(' + prefix + encode(filePath) + ')';
    });
  }
  return transformedText;
};
