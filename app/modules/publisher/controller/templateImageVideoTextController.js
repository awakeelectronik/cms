/*global angular:true*/

var templateImageVideoTextController = function (textAngularManager,contentSrv,commonImageSrv,$state,$stateParams){
    var vm = this;

    vm.loadContents = function() {
        vm.htmlContent = "<h2>¡Escriba aquí el contenido!</h2>";
        if($stateParams.idContent){
            vm.id = $stateParams.idContent;
            contentSrv.getContentById(vm.id)
            .then((content) => {
                vm.content = content.content;
                vm.image = content.image;
                vm.htmlContent = vm.content.template.texto;
            });
        } 
    };

   vm.openImage = function(file) {
        if(file){
            if(file.type.indexOf("image") < 0){
                vm.alertContent = {
                    type: "danger",
                    message: "No es un formato de imagen válido"
                };
                return;
            }
            commonImageSrv.getFileReader(file)
            .then((dataImage) => {
                vm.file = file;
                vm.initialImage = dataImage;
            })
            .catch(() => {
                vm.alertContent = {
                    type: "danger",
                    message: "No se cargo la imagen"
                };
            });
        }
    };

   vm.crop = function() {
        vm.initialImage= null;
        vm.image = vm.imageCropped;
        vm.alertContent = {
            type: "success",
            message: "Imagen seleccionada correctamente"
        };
        vm.newImage = true;
    };

    vm.saveContent = function (){
        vm.buttonDisabled = true;
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
            if(vm.newImage){
               commonImageSrv.saveImageBase64(vm.id + ".png", vm.image, "publisher/voz");
            }
        } else  if(vm.content && vm.content.abstract && vm.content.title){
            contentSrv.saveContent(3,vm.content,vm.htmlContent,vm.imageCropped)
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
    vm.loadContents();
};
templateImageVideoTextController.$inject = ["textAngularManager","contentSrv","commonImageSrv","$state","$stateParams"];

angular.module("publisher").controller("templateImageVideoTextController",templateImageVideoTextController);