/*global angular:true*/
/*global mainRef:true*/

var contentFact = function($q, $firebaseArray,$firebaseObject,commonFirebaseConnectionsSrv) {
    var responseContentFact = {
        getContentsByMonth : function(startDate, endDate){
            return $q((resolve, reject) => {
                var url = "contentManager/all/";
                commonFirebaseConnectionsSrv.creeateConnectionURL("publisher", url);
                $firebaseArray(
                    mainRef.child(url)
                    .orderByChild("creationDate")
                    .startAt(startDate)
                    .endAt(endDate)
                    ).$loaded(function (data) {
                    if(data){
                        resolve(data);
                    }else{
                        reject("Error load Data");
                    }
                });
            });
        },
        getContentById : function(id){
            return $q((resolve, reject) => {
                var url = "contentManager/all/" +id;
                commonFirebaseConnectionsSrv.creeateConnectionURL("publisher", url);
                $firebaseObject(mainRef.child(url)).$loaded(function (data) {
                    if(data){
                        resolve(data);
                    }else{
                        reject("Error load Data");
                    }
                });
            });
        },
        saveContent : function(data){
            return $q((resolve) => {
                var key = mainRef.child("contentManager/all/").push(data.body).key;
                resolve(key);
            });
        },
        updateContent: function(idContent,fields){
            return $q((resolve) => {
                mainRef.child("contentManager/all/" +idContent).update(fields);
                resolve();
            });
        },
        saveContentMin : function(data){
            return $q((resolve) => {
                mainRef.child("contentManager/public/" +data.id).set(data.bodyMin);
                resolve();
            });
        },
        deleteContentMin: function(idContent){
            return $q((resolve) => {
                mainRef.child("contentManager/public/" +idContent).remove();
                resolve();
            });
        },
    };
    return responseContentFact;
};
contentFact.$inject = ["$q","$firebaseArray","$firebaseObject","commonFirebaseConnectionsSrv"];
angular.module("publisher").factory("contentFact",contentFact);