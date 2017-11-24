/*global angular:true*/

var previewContentController = function (contentSrv,$stateParams){
    var vm = this;
    vm.id = $stateParams.idContent;
    vm.idBA = $stateParams.idAgreement;

    contentSrv.getContentById(vm.id,vm.idBA)
    .then((content) => {
        vm.content = content.content;
        vm.image = content.image;
        if(content.isThereVideo){
            vm.isThereVideo = content.isThereVideo;
            vm.video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${vm.content.template.video}" frameborder="0" allowfullscreen></iframe>`;
        }
    });
};
previewContentController.$inject = ["contentSrv","$stateParams"];
angular.module("publisher").controller("previewContentController",previewContentController);