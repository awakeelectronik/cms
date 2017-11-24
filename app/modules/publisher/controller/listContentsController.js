/*global angular:true*/

var listContentsController = function (commonUtilitiesSrv,contentSrv,commonModalSrv,contentFact,commonUserSrv,$state){
    var vm = this;
    vm.contentsData = null;
    vm.publish = function(content){
        if(content.state == 2){
            commonModalSrv.confirmModal("Despublicar", "¿Despublicar este contenido?","md")
            .then(() => contentSrv.updateContent(content,{"state":0,"approvalDate":false}))
            .then(() => {
                content.state = 0;
                vm.alertContent = {
                    type: "success",
                    message: "Contenido despublicado satisfactoriamente"
                };
            })
            .catch(() => {
                vm.alertContent = {
                    type: "warning",
                    message: "Operación cancelada"
                };
            });
        } else {
            commonModalSrv.confirmModal("Publicar", "¿Publicar este contenido?","md")
            .then(() => contentSrv.updateContent(content,{"state":2,"approvalDate":true}))
            .then(() => {
                content.state = 2;
                vm.alertContent = {
                    type: "success",
                    message: "Contenido publicado satisfactoriamente"
                };
            })
            .catch(() => {
                vm.alertContent = {
                    type: "warning",
                    message: "Operación cancelada"
                };
            });
        }
    };
    vm.findContents = function(year,month) {
      contentSrv.getContents(year.NAME, month.CODE)
      .then((contentsData) => {
          vm.contentsData = contentsData;
      });
    };
    vm.loadContents = function() {
        vm.months = commonUtilitiesSrv.getMonthsArray();
        vm.years = commonUtilitiesSrv.getYearsArray(commonUtilitiesSrv.rangeYears().minYear,commonUtilitiesSrv.rangeYears().maxYear);
        vm.yearNow = commonUtilitiesSrv.yearNow();
        vm.monthNow = commonUtilitiesSrv.monthNow();
        vm.findContents(vm.yearNow, vm.monthNow);
        vm.roleUser = commonUserSrv.getAuthUserData().roleUser;
        if(vm.roleUser != "user")vm.canPublish = true;
    };
    vm.viewContent = function(content){
        $state.go("publisher.view", {
            idContent: content.$id,
        }, {location: "replace"});
    };
    vm.edit = function(content){
        $state.go("publisher.edit", {
            idContent: content.$id,
        }, {location: "replace"});
    };
    vm.loadContents();
};
listContentsController.$inject = ["commonUtilitiesSrv","contentSrv","commonModalSrv","contentFact","commonUserSrv","$state"];
angular.module("publisher").controller("listContentsController",listContentsController);