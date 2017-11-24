/*global angular:true*/

angular.module("common").directive("noListDisplay",function(){
    return {
        restrict: "EA",
        scope: {
          tittle: "@",
          message: "@"
        },
        template: ["<div align='center'>"+
            "<div class='notif_head clearfix'>"+
            "<h3 class='bold'>{{tittle}}</h3>"+
            "<p>{{message}}</p>"+
            "</div></div>"]
    };
});