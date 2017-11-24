/*global angular:true*/

var editContentController = function (contentFact,contentSrv,$stateParams){
    var vm = this;
    vm.id = $stateParams.idContent;
    vm.idBA = $stateParams.idAgreement;
    
    contentFact.getContentById(vm.id, vm.idBA)
    .then((content) => {
        vm.typeTemplate = content.typeTemplate;
        vm.loadFinish = true;
    });
    vm.templates = contentSrv.arrayTemplates;
    
};
editContentController.$inject = ["contentFact","contentSrv","$stateParams"];
angular.module("publisher").controller("editContentController",editContentController);