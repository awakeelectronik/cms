"use strict";
/*global angular:true*/

var commonImageSrv = function($q,commonImageFact) {
    
    var responsecommonImageSrv = {
        getFileReader : function(file) {
            return $q((resolve, reject) => {
                var reader = new FileReader();
                reader.onload = ((event) => {
                    resolve(event.target.result);
                });
                reader.onerror = ((event) => {
                    reject(event);
                });
                reader.readAsDataURL(file);
            });
        },
        saveImageBase64 : function(name, base64, folder){
            return $q((resolve, reject) => {
                commonImageFact.uploadImageBase64(base64,name,folder)
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                }); 
            });
        }
        
    };
    return responsecommonImageSrv;
};
commonImageSrv.$inject = ["$q","commonImageFact"];
angular.module("common").factory("commonImageSrv",commonImageSrv);