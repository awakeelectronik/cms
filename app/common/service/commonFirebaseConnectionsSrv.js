"use strict";
/*global angular:true*/

var commonFirebaseConnectionsSrv = function(commonUserFact) {
    var firebaseConnections = {};
    var responseCommonFirebaseConnectionsSrv = {
        creeateConnectionURL : function(module, URL) {
            if(!firebaseConnections[module]) firebaseConnections[module] = [];
            firebaseConnections[module].push(URL);
        },
        clearAllConnectionsPerModule : function(module){
            if(firebaseConnections[module].length > 0){
                angular.forEach(firebaseConnections[module], function(URL){
                    commonUserFact.destroyFirebaseSocket(URL);
                });
            }
        },
        clearAllConnections : function(){
            angular.forEach(firebaseConnections, function(value, key){
                responseCommonFirebaseConnectionsSrv.clearAllConnectionsPerModule(key);
            });
        }
    };
    return responseCommonFirebaseConnectionsSrv;
};
commonFirebaseConnectionsSrv.$inject = ["commonUserFact"];
angular.module("common").factory("commonFirebaseConnectionsSrv", commonFirebaseConnectionsSrv);