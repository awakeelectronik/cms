"use strict";

/*global headerTemplate:true*/
/*global angular:true*/
/**
 * @ngdoc function
 * @name app.home:homeSetup
 * @description
 * # home
 * setup of the app
 */
var homeConfig = function($stateProvider){
  $stateProvider
  .state("home",{
    url: "/home",
    requireAuth : true,
    rolesAccepted : [],
    views: {
      "header": {
        templateUrl: headerTemplate
      },
      "container@": {
        templateUrl: "app/modules/home/views/home.html"
      }
    }
  });
};
homeConfig.$inject = ["$stateProvider"];
angular.module("home",[])
.config(homeConfig);