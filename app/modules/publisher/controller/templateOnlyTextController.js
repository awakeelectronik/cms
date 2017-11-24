/*global angular:true*/

var templateOnlyTextController = function (textAngularManager,contentSrv,$state,$stateParams){
    var vm = this;
    vm.htmlContent = "<h2>¡Escriba aquí el contenido!</h2>";

    vm.getCategories = function(){
        contentSrv.loadCategories()
        .then((data) => {
            vm.listCategory = data.categories;
        })
        .catch((error) => {
            throw(error);
        });
    };

    if($stateParams.idContent){
        vm.id = $stateParams.idContent;
        vm.getCategories();
        contentSrv.getContentById(vm.id)
        .then((content) => {
            vm.content = content.content;
            vm.htmlContent = vm.content.template.texto;
        });
    }

    vm.saveContent = function (){
        vm.buttonDisabled = true;
        if(vm.id){
            vm.content.template.texto = vm.htmlContent;
            vm.content.approvalDate = "Pendiente";
            vm.content.state = 1;
            vm.content.$save()
            .then(() => contentSrv.deleteContentMin(vm.content.$id))
            .then(() => {
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
        } else if(vm.content && vm.content.abstract && vm.content.title && vm.content.idCategory){
            contentSrv.saveContent(0,vm.content,vm.htmlContent)
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
    vm.getCategories();
};
templateOnlyTextController.$inject = ["textAngularManager","contentSrv","$state","$stateParams"];

angular.module("publisher").controller("templateOnlyTextController",templateOnlyTextController);