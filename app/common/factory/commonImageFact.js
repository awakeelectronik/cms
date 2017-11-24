"use strict";
/*global angular:true*/
/*global firebase:true*/

var commonImageFact = function($q) {
    var responsecommonImageFact = {
        uploadImageBase64 : function(base64,name,folder) {
          return $q((resolve) => {
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var uploadTask = storageRef.child(folder + "/" + name).putString(base64, "data_url");    
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null,null, 
              function() {
                resolve(uploadTask.snapshot.downloadURL);
              });
          });
        },
        downloadImage: function(folder,name){
          return $q((resolve,reject) => {
            var storageRef = firebase.storage().ref();
            var downloadTask = storageRef.child(folder + "/" + name);
            downloadTask.getDownloadURL().then(function(url) {
              resolve(url);
            }).catch(function(error) {reject(error);});
          });
        }
    };
    return responsecommonImageFact;
};
commonImageFact.$inject = ["$q"];
angular.module("common").factory("commonImageFact", commonImageFact);