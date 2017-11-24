/*global angular:true*/

angular.module("home").directive("homeIconMenu", function() {
  return {
    restrict: "E",
    link: function ($scope, element) {
      angular.element(element).on("click",function(){
          angular.element(".btn_menu").stop().toggleClass("menu_open");
          angular.element("body").stop().toggleClass("menu_open");
          angular.element(".nav_bar").toggleClass("open_nav");
      });
    },
    template: "<div class='btn_menu pull-left animated zoomIn' ng-click='toggleMenu();'>"
                    +"<div class='btn_menu_bars'>"
                          +"<div class='btn_bar bar1'></div>"
                          +"<div class='btn_bar bar2'></div>"
                          +"<div class='btn_bar bar3'></div>"
                    +"</div>"
                +"</div>"
  };
});