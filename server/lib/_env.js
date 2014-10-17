
var path = Npm.require('path');

process.env['HOME'] = path.resolve('../../../../../');

console.log(process.env.HOME);

