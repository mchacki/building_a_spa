/*jslint vars: true*/
/*global angular*/
(function() {
  "use strict";
  angular.module("hero", ["ngResource"])
  .controller("mainController", ["$scope", "$http", function($scope, $http) {
    $scope.heroList = ["ironmantonystark"];
    $scope.loadRandom = function() {
      $http.get("random").success(function(id) {
        $scope.heroList.push(angular.fromJson(id));
      });
    };
  }]).controller("heroController", ["$scope", "$resource", function($scope, $resource) {
    var Superhero = $resource(
      "superheroes/:_key",
      {},
      {
        update: {
          method: "PUT",
          url : "superheroes/:_key",
          params: {
            _key: "@_key"
          }
        }
      }
    );
    $scope.getHero = function(id) {
      $scope.hero = Superhero.get({_key: id});
    };
  }]).directive("hero", function() {
    return {
      controller: "heroController",
      restrict: "E",
      replace: true,
      scope: {
        id: "@"
      },
      templateUrl: "templates/hero.html",
      link: function(scope) {
        scope.$watch("id", function(val) {
          scope.getHero(val);
        });
      }
    };
  });
}());
