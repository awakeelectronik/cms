/*global angular:true*/

var trust = function($sce){
    return function(stringHTML) {
        return $sce.trustAsHtml(stringHTML);
    };
};
trust.$inject = ["$sce"];
angular.module("common").filter("trust",trust);