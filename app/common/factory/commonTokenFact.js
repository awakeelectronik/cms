/*global angular: true*/
/*global firebase: true*/

var commonTokenFact = ($q) => {
  var response = {
    getToken: () => $q((resolve, reject) => {
        if (firebase.auth().currentUser) {
          firebase.auth().currentUser.getToken(false)
            .then((token) => {
              resolve(token);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject();
        }
      })
  };
  return response;
};
commonTokenFact.$inject = ["$q"];
angular.module("common").factory("commonTokenFact", commonTokenFact);
