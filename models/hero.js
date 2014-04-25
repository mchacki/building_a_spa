/* jslint vars: true */
/* global require, exports */
(function() {
  var Foxx = require("org/arangodb/foxx");
  var Hero = Foxx.Model.extend({
  },{
    attributes: {
      "_id": "string",
      "_key": "string",
      "name": "string",
      "comment": "string"
    }
  });
  exports.Model = Hero;
}());
