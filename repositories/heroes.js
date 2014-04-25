/*jslint vars: true */
/*global require, exports */
(function() {
  var Foxx = require("org/arangodb/foxx");
  var Heroes = Foxx.Repository.extend({
    random: function() {
      return this.collection.any()._key;
    }
  });
  exports.Repository = Heroes;
}());
