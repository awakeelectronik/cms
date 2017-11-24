/*global angular:true*/

var homeMenuController = function(commonUserSrv, commonUserFact) {
  var vm = this;
  vm.menus = {};
  vm.roleUser = commonUserSrv.getAuthUserData().roleUser;
  vm.userUid = commonUserSrv.getAuthUserData().userData.uid;
  vm.dataUser = commonUserSrv.getAuthUserData().userData;

  commonUserFact.dataUserMenuAdmin().then((dataMenu) => {
    if (dataMenu.length > 0)
      vm.menus = dataMenu;
  }).catch(function(error) {
      throw(error);
  });
};
homeMenuController.$inject = ["commonUserSrv", "commonUserFact"];
angular.module("home").controller("homeMenuController", homeMenuController);