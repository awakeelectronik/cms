/*global angular:true*/

var homeHeaderController = function(commonUserSrv,$state){
    var vm = this;
    var userData = commonUserSrv.getAuthUserData().userData;
    if(userData)
        vm.email = commonUserSrv.getAuthUserData().userData.email;
    
    vm.logOut = function(){
        commonUserSrv.destroyAdminFirebase();
        commonUserSrv.logout().then(() => {
            $state.go("login");
            //$state.reload();
        });
    };
};
homeHeaderController.$inject = ["commonUserSrv","$state"];
angular.module("home").controller("homeHeaderController", homeHeaderController);


    