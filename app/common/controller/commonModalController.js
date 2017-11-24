/*global angular:true*/

var commonModalController = function($uibModalInstance, data) {
    var vm = this;
    vm.data = data;
    vm.ok = function() {
        $uibModalInstance.close({
            value: true
        });
    };
    vm.cancel = function() {
        $uibModalInstance.dismiss("cancel");
    };
};
commonModalController.$inject = ["$uibModalInstance","data"];
angular.module("common").controller("commonModalController", commonModalController);