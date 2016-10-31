var remodelJsonService = require('./remodel-json-service.js');

var src = process.argv[2];
var dest = process.argv[3];

remodelJsonService.remodelJson(src, dest);
