var path = require('path');
var fs   = require('fs');

var mimetypes = {
  '.gif':  'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.jpe':  'image/jpeg',
  '.png':  'image/png'
};

var encode = function( filePath ) {
  return new Buffer(fs.readFileSync(filePath)).toString('base64');
};

module.exports = function( inputText, inputName, outputName ) {
  if (!inputText || !inputName) {
    return inputText;
  }

  var transformedText = inputText,
      regex = /url\((?:\\?['"])?([\w\/\\._-]*?)([\w-_]+\.\w{3,4})\\?['"]?\)/g,
      // capture group $1 (path)
      // capture group $2 (filename)
      found = inputText.match(regex);

  if (found) {
    transformedText = inputText.replace(regex, function( match, filePath, fileName ) {
      var fullPath = path.dirname(inputName) + '/' + (filePath ? filePath : '') + fileName,
          prefix = 'data:' + mimetypes[path.extname(fileName.toLowerCase())] + ';base64,',
          falseFind = match.charAt === '#';
      var encodedFile = encode(fullPath);
      return falseFind ? match : 'url(' + prefix + encodedFile + ')';
    });
  }
  return transformedText;
};
