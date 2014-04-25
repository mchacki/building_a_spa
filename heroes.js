/*jslint vars: true */
/*global require, applicationContext */
(function() {
  "use strict";
  var FoxxApplication = require("org/arangodb/foxx").Controller;
  var controller = new FoxxApplication(applicationContext);
  var db = require("internal").db;
  var Heroes = require("repositories/heroes").Repository;
  var Hero = require("models/hero").Model;
  var heroes = new Heroes(db.heroes, Hero);

  /** Load random
   *
   * Load a random hero
   */
  controller.get("random", function(req, res) {
    res.json(heroes.random());
  });

  /** Load hero
   *
   * Load a specific hero
   */
  controller.get("superheroes/:id", function(req, res) {
    var id = req.params("id");
    res.json(heroes.byId(id).forClient());
  }).pathParam("id", {
    type: "string",
    description: "The key value of a hero"
  });


  /** Replace a hero
   *
   * Replace a hero with new values
   */
  controller.put("superheroes/:id", function(req, res) {
    var hero = req.params("hero");
    if (hero.get("_key") !== req.params("id")) {
      throw new Error("Potential hack");
    }
    heroes.replace(hero);
  }).pathParam("id",{
    type: "string",
    description: "The key value of a hero"
  })
  .bodyParam("hero", "The new values for a hero", Hero)
  .errorResponse(Error, 400, "Id missmatch");

}());
