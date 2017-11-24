/*global angular:true*/
/*global localStorage:true*/

var commonUserSrv = function($q, commonUserFact, commonFirebaseConnectionsSrv) {
    var localStorageInfo = null;
    var responseCommonUserSrv = {
        authUserWithMail : function(email, password) {
            return $q(function(resolve, reject) {
                var response = {};
                commonUserFact.authUserWithMail(email, password)
                .then((authData) => {
                    response.userAuthData = authData;
                    return commonUserFact.getUserAccessData(authData.uid);
                })
                .then((accessData) => {
                    response.role = accessData.typeAccess;
                    response.userAccessData = accessData;
                    localStorage.setItem("authState", 1);
                    localStorage.setItem("roleUser", response.role);
                    localStorage.setItem("userData", angular.toJson(response.userAuthData));
                    resolve(response);
                })
                .catch((error) => {reject(error);});
            });
        },
        logout : function(){
            localStorageInfo = null;
            return $q(function(resolve) {
                commonUserFact.logout();
                commonFirebaseConnectionsSrv.clearAllConnections();
                localStorage.clear();
                resolve();
            });
        },
        getAuthUserData : function (){
                if(!localStorageInfo){
                    localStorageInfo = {
                        authState : localStorage.getItem("authState"),
                        roleUser : localStorage.getItem("roleUser"),
                        userData : angular.fromJson(localStorage.getItem("userData"))
                    };
                }
                return localStorageInfo;
        },
        destroyAdminFirebase : function(){
            commonUserFact.destroyFirebaseSocket("/userAccessAdminMenu");
            const uid = responseCommonUserSrv.getAuthUserData().userData.uid;
            commonUserFact.destroyFirebaseSocket("/userAccessAdmin/"+uid);
        }
    };
    return responseCommonUserSrv;
};
commonUserSrv.$inject = ["$q", "commonUserFact", "commonFirebaseConnectionsSrv"];
angular.module("common").factory("commonUserSrv", commonUserSrv);