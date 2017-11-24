/*global angular:true*/

var writerContentController = function (contentSrv){
    var vm = this;
    vm.typeTemplate =3;
    vm.templates = contentSrv.arrayTemplates;
};
writerContentController.$inject = ["contentSrv"];
angular.module("publisher").controller("writerContentController",writerContentController);