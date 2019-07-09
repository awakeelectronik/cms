/*global angular:true*/
/*global localStorage:true*/

var templateVideoTextController = function (textAngularManager,contentSrv,$state,$stateParams){
    var vm = this;
    vm.htmlContent = "<h2>¡Escriba aquí el contenido!</h2>";

    if($stateParams.idContent){
        vm.id = $stateParams.idContent;
        contentSrv.getContentById(vm.id)
        .then((content) => {
            vm.content = content.content;
            vm.htmlContent = vm.content.template.texto;
        });
    }

    vm.saveContent = function (){
        vm.buttonDisabled = true;
        var a = vm.content.template.video;
        vm.content.template.video = a.slice(a.indexOf("?v=")>0?a.indexOf("?v=")+3:0,a.length);
        if(vm.id){
            vm.content.template.texto = vm.htmlContent;
            vm.content.approvalDate = "Pendiente";
            vm.content.state = 1;
            vm.content.$save().then(() => {
                vm.alertContent = {
                    type: "success",
                    message: "Contenido guardado exitosamente"
                };
                $state.go("publisher.list", {}, {location: "replace"});
            }, function() {
                vm.buttonDisabled = false;
                vm.alertContent = {
                    type: "danger",
                    message: "No se guardaron los datos, inténtelo en unos minutos"
                };
            });
        } else if(vm.content && vm.content.abstract && vm.content.title){
            contentSrv.saveContent(2,vm.content,vm.htmlContent)
            .then(() => {
                vm.alertContent = {
                    type: "success",
                    message: "Contenido enviado para publicación"
                };
                $state.go("publisher.list", {}, {location: "replace"});
            })
            .catch(() => {
                vm.buttonDisabled = false;
                vm.alertContent = {
                    type: "danger",
                    message: "No se guardaron los datos, inténtelo en unos minutos"
                };
            });
        } else vm.alertContent = {
            type: "danger",
            message: "Todos los campos son obligatorios"
        };
    };
};
templateVideoTextController.$inject = ["textAngularManager","contentSrv","$state","$stateParams"];

angular.module("publisher").controller("templateVideoTextController",templateVideoTextController);