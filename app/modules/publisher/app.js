"use strict";
/*global angular:true*/
/*global headerTemplate:true*/

var publisherConfig = function($stateProvider) {
  $stateProvider
    .state("publisher", {
      url: "/publisher",
      requireAuth: true,
      rolesAccepted: ["admin"],
      cache: false,
      views: {
        "header": {
          templateUrl: headerTemplate
        },
        "container@": {
          templateUrl: "app/modules/publisher/views/home.html"
        }
      }
    })
    .state("publisher.writer", {
      url: "/writer",
      requireAuth: true,
      rolesAccepted: ["admin"],
      views: {
        "container@": {
          templateUrl: "app/modules/publisher/views/writerContent.html"
        }
      }
    })
    .state("publisher.list", {
      url: "/list",
      requireAuth: true,
      rolesAccepted: [],
      cache: false,
      views: {
        "container@": {
          templateUrl: "app/modules/publisher/views/listContents.html"
        }
      }
    })
    .state("publisher.view", {
      url: "/view/:idContent",
      requireAuth: true,
      rolesAccepted: ["admin"],
      cache: false,
      views: {
        "container@": {
          templateUrl: "app/modules/publisher/views/previewContent.html"
        }
      }
    })
    .state("publisher.edit", {
      url: "/edit/:idContent",
      requireAuth: true,
      rolesAccepted: ["admin"],
      cache: false,
      views: {
        "container@": {
          templateUrl: "app/modules/publisher/views/editContents.html"
        }
      }
    })
    .state("publisher.categories", {
      url: "/categories",
      requireAuth: true,
      rolesAccepted: ["admin"],
      cache: false,
      views: {
        "container@": {
          templateUrl: "app/modules/publisher/views/categoriesCRUD.html"
        }
      }
    });
};
publisherConfig.$inject = ["$stateProvider"];
angular.module("publisher", [
    "ui.select",
    "ui.bootstrap",
    "textAngular",
    "ngFileUpload",
    "angular-img-cropper"
  ])
  .config(publisherConfig);