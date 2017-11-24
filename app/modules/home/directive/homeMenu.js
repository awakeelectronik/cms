/*global angular:true*/

angular.module("home").directive("homeMenu", function() {
  return {
    restrict: "E",
    link: function ($scope, element) {
        angular.element(element).bind("click", function(data) {
            if(angular.element(data.target).hasClass("link-menu")){
                angular.element(".btn_menu").stop().removeClass("menu_open");
                angular.element("body").stop().removeClass("menu_open");
                angular.element(".nav_bar").removeClass("open_nav");
            }    
        });
    },
    templateUrl: "app/modules/home/views/menu.html"
  };
});