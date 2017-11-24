/*global angular:true*/

var logInController = function(commonUserSrv, $state) {
    var vm = this;
    vm.user = {};
    vm.btnDisable = false;
    vm.authUser = function(){
        vm.btnDisable = true;
        commonUserSrv.authUserWithMail(vm.login.email, vm.login.password)
        .then(() => {
            vm.user.authState = 1;
            $state.go("home", {}, {reload: true});
        })
        .catch(() => {
            vm.btnDisable = false;
            vm.alert = {
                message: "Su correo o contraseña no son correctos.",
                type: "danger"
            };
        });
    };
};
logInController.$inject = ["commonUserSrv", "$state"];
angular.module("user").controller("logInController", logInController);


    