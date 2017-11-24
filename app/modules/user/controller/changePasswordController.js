/*global angular:true*/
var changePasswordController = function(commonUserFact) {
    var vm = this;
    vm.dataPassword = {};
    vm.changePassword = function (data) {
        if(data.newPassword != data.repeatNewPassword){
           vm.alertChangePass = {type: "danger", msg: "Las contraseñas no coinciden"};
        }
        if(data.newPassword == data.repeatNewPassword){
            commonUserFact.changePassword(data.newPassword, data.lastPassword)
            .then(function() {
                vm.alertChangePass = {type: "success", msg: "La contraseña ha sido cambiada correctamente"};
                vm.dataPassword ={};
            }).catch(function(error) {
                if(error.code == "auth/wrong-password"){ 
                    vm.alertChangePass = {type: "danger", msg: "Contraseña incorrecta"};
                } else if (error.code =="auth/weak-password"){
                    vm.alertChangePass = {type: "danger", msg: "La contraseña debe tener al menos 6 caracteres"};
                } else vm.alertChangePass = {type: "danger", msg: "Ocurrió un problema al cambiar la contraseña. Inténtelo de nuevo"};
            });
        }
    };
};
changePasswordController.$inject = ["commonUserFact"];
angular.module("user").controller("changePasswordController", changePasswordController);
