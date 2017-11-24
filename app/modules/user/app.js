"use strict";
/*global angular:true*/
/*global headerTemplate:true*/

var userConfig = function($stateProvider){
  $stateProvider
  .state("login",{
    url: "/login",
    requireAuth : false,
    cache: false,
    views: {
      "container@": {
        templateUrl: "app/modules/user/views/login.html"
      }
    }
  })
  .state("forgotpassword",{
    url: "/forgotpassword",
    requireAuth : false,
    cache: false,
    views: {
      "container@": {
        templateUrl: "app/modules/user/views/forgotPassword.html"
      }
    }
  })
  .state("changePassword",{
    url: "/changePassword",
    requireAuth : true,
    rolesAccepted : [],
    views: {
        "header": {
            templateUrl: headerTemplate
        },
        "container@": {
            templateUrl: "app/modules/user/views/changePassword.html"
        }
    }
  });
};    
userConfig.$inject = ["$stateProvider"];
angular.module("user",["ui.select"])
.config(userConfig);