/*global angular:true*/
/*global mainRef:true*/
/*global firebase:true*/

var commonUserFact = function($q, $firebaseAuth, $firebaseObject, $firebaseArray) {
    var responseCommonUserFact = {
        getCurrentUser: function() {
            return $firebaseAuth().$getAuth();
        },
        authUserWithMail: function(email, password) {
            return $q((resolve, reject) => {
                $firebaseAuth().$signInWithEmailAndPassword(email, password)
                    .then((authData) => {
                        resolve(authData);
                    }).catch((error) => {
                        reject(error);
                    });
            });
        },
        forgotPassword: function(email) {
            return $q((resolve, reject) => {
                $firebaseAuth().$sendPasswordResetEmail(email)
                    .then((authData) => {
                        resolve(authData);
                    }).catch((error) => {
                        reject(error);
                    });
            });
        },
        changePassword: function(newPassword, oldPassword) {
            return $q((resolve, reject) => {
                const user = responseCommonUserFact.getCurrentUser();
                const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
                user.reauthenticate(credential)
                    .then(() => {
                        const userUpdatePass = user.updatePassword(newPassword);
                        return userUpdatePass;
                    })
                    .then((success) => {
                        resolve(success);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getUserAccessData: function(uid) {
            return $q((resolve, reject) => {
                $firebaseObject(mainRef.child("userAccessAdmin/" + uid)).$loaded((data) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject("the user no have dataAccess configuration");
                    }
                });
            });
        },
        dataUserMenuAdmin: function() {
            return $q((resolve, reject) => {
                $firebaseArray(mainRef.child("userAccessAdminMenu")).$loaded(function(data) {
                    if (data) {
                        resolve(data);
                    } else {
                        reject("Error load menu");
                    }
                });
            });
        },
        setUserSession: function(uid, role) {
            return $q((resolve, reject) => {
                $firebaseArray(mainRef.child("users/" + role + "/" + uid + "/sessions")).$add({
                        state: true
                    })
                    .then((success) => {
                        resolve(success.getKey());
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        destroyFirebaseSocket: function(URL) {
            mainRef.child(URL).off();
        },
        logout: function() {
            return $firebaseAuth().$signOut();
        },

        getUserSession: function(userAccessData, user) {
            return $q((resolve, reject) => {
                $firebaseArray(mainRef.child("users/" + userAccessData.rolePlural + "/" + user.uid + "/sessions")).$loaded(function(dataSessions) {
                    resolve(dataSessions);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        userstateAccess: function(role, uid) {
            return $q((resolve, reject) => {
                $firebaseObject(mainRef.child("users/" + role + "/" + uid + "/state")).$loaded((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        },
        getSpecialistsInfoById: function(idSpecialist) {
            return $q((resolve) => {
                resolve($firebaseObject(mainRef.child("users/specialists/" + idSpecialist)).$loaded());
            });
        },
        getUsersInfoById: function(idUser) {
            return $q((resolve) => {
                resolve($firebaseObject(mainRef.child("users/users/" + idUser)).$loaded());
            });
        }
    };
    return responseCommonUserFact;
};
commonUserFact.$inject = ["$q", "$firebaseAuth", "$firebaseObject", "$firebaseArray"];
angular.module("common").factory("commonUserFact", commonUserFact);