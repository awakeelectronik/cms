/*global angular:true*/

var commonModalSrv = function($q, $uibModal) {
    var responseCommonModalSrv = {
        showModal : function(dataModal) {
            return $q((resolve, reject) => {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: dataModal.templateUrl,
                    controller: dataModal.controller,
                    controllerAs: "commonModal",
                    size: dataModal.size || "sm",
                    resolve: {
                        data: function () {
                            return dataModal;
                        }
                    }
                });
                modalInstance.result.then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        },
        confirmModal : function(tittle, message, size) {
            return $q((resolve, reject) => {
                responseCommonModalSrv.showModal({
                    type: "confirm",
                    tittle: tittle,
                    message: message,
                    acceptText: "Aceptar",
                    cancelText: "Cancelar",
                    size: size || "sm",
                    templateUrl: "app/common/views/modal.html",
                    controller: "commonModalController"
                })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            });
        },
        acceptModal : function(tittle, message, size) {
            if(!tittle && !message) return null;
            return $q((resolve, reject) => {
                responseCommonModalSrv.showModal({
                    type: "accept",
                    tittle: tittle,
                    message: message,
                    acceptText: "Cerrar",
                    cancelText: "Cancelar",
                    size: size || "sm",
                    templateUrl: "app/common/views/modal.html",
                    controller: "commonModalController"
                }).then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            });
        }
    };
    return responseCommonModalSrv;
};
commonModalSrv.$inject = ["$q", "$uibModal"];
angular.module("common").factory("commonModalSrv",commonModalSrv);