/*global angular:true*/

angular.module("home").directive("homeAppDropdownSubmenu", function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.bind("click", function(){
                angular.element(attrs.homeAppDropdownSubmenu).slideToggle(function(){
                    if(angular.element(this).is(":visible")) angular.element("#iconMenu"+attrs.idelement).addClass("ion-arrow-up-b ion-chevron-up");
                    else angular.element("#iconMenu"+attrs.idelement).removeClass("ion-arrow-up-b ion-chevron-up");
                });
            });
        }
    };
});
