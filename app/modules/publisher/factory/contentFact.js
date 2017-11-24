/*global angular:true*/
/*global mainRef:true*/

var contentFact = function($q, $firebaseArray,$firebaseObject,commonFirebaseConnectionsSrv) {
    var responseContentFact = {
        getCategories : function(){
            return $q((resolve, reject) => {
            var url = "contentManagerCategory/";
            commonFirebaseConnectionsSrv.creeateConnectionURL("publisher", url);
                $firebaseArray(mainRef.child(url)).$loaded(function (data) {
                    if(data){
                        resolve(data);
                    }else{
                        reject("Error load Data");
                    }
                });
            });
        },
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
        getCategory: function(idCategory){
            return $q((resolve, reject) => {
                var url = "contentManagerCategory/" +idCategory;
                commonFirebaseConnectionsSrv.creeateConnectionURL("publisher", url);
                $firebaseObject(mainRef.child(url)).$loaded((data) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject("Error load Data");
                    }
                });
            });
        },
        saveCategory: function(data){
            return $q((resolve) => {
                mainRef.child("contentManagerCategory/").push(data)
                .then(() => {
                    resolve();
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
        updateCategory: function(idCategory,fields){
            return $q((resolve) => {
                mainRef.child("contentManagerCategory/" +idCategory).update(fields);
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
        deleteCategory: function(idCategory){
            return $q((resolve) => {
                mainRef.child("contentManagerCategory/" +idCategory).remove();
                resolve();
            });
        }
    };
    return responseContentFact;
};
contentFact.$inject = ["$q","$firebaseArray","$firebaseObject","commonFirebaseConnectionsSrv"];
angular.module("publisher").factory("contentFact",contentFact);