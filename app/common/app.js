"use strict";
/*global angular:true*/
/**
 * @ngdoc function
 * @name app.home:homeSetup
 * @description
 * # home
 * setup of the app
 */
 
 
var commonConfig = function($stateProvider) {
    $stateProvider
    .state("permissionsDenied",{
        url: "/permissionsDenied",
        requireAuth : true,
        rolesAccepted : [],
        views: {
          "header": {
            template: "<h1>COMMON APP.JS</h1>"
          },
      "container@": {
        templateUrl: "app/common/views/accountDisabled.html"
      }
    }
  });
};
commonConfig.$inject = ["$stateProvider"];

angular.module("common", [])
.config(commonConfig);