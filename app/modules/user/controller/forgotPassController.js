/*global angular:true*/

var forgotPassController = function(commonUserFact) {
    var vm = this;
    vm.user = {};
    vm.btnDisable = true;
    
    vm.forgot = function () {
        commonUserFact.forgotPassword(vm.user.email)
        .then(function() {
            vm.alert = {
                message: "Se ha enviado con éxito a su correo el reestablecimiento de contraseña. Si no es recibido por favor verifique en correo no deseado.",
                type: "info"
            };
        }).catch(function() {
            vm.alert = {
                message: "El correo electronico no existe.",
                type: "danger"
            };
        });
    };
};
forgotPassController.$inject = ["commonUserFact"];
angular.module("user").controller("forgotPassController", forgotPassController);