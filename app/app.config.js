/*global firebase:true*/
/*global angular:true*/
/*global localStorage:true*/

var config = {
    apiKey: "AIzaSyDq6PSY2L-ZvqlougBmVNBTxeRUeroH4D8",
    authDomain: "adminvoz-9f584.firebaseapp.com",
    databaseURL: "https://adminvoz-9f584.firebaseio.com",
    projectId: "adminvoz-9f584",
    storageBucket: "adminvoz-9f584.appspot.com",
    messagingSenderId: "189324485306"
  };
  firebase.initializeApp(config);

const mainRef = firebase.database().ref();//eslint-disable-line no-unused-vars
const headerTemplate = "app/modules/home/views/header.html";//eslint-disable-line no-unused-vars
(function() {
	"use strict";
	var metasVoiceRun = function($rootScope, $state, $firebaseAuth) {
		const listenRootScope = $rootScope.$on("$stateChangeStart", function(event, toState) {//eslint-disable-line no-unused-vars
			if (localStorage.authState == "1") {
				$firebaseAuth().$requireSignIn()
					.then(() => {
						if(toState.rolesAccepted.length > 0 && toState.rolesAccepted.indexOf(localStorage.roleUser) == -1){
							$state.go("login", {}, {location: "replace"});
							event.preventDefault();
						}
					})
					.catch(() => {
						$state.go("login", {}, {
							location: "replace"
						});
						event.preventDefault();
					});
			} else if (toState.requireAuth && !localStorage.authState) {
				$state.go("login", {}, {
					location: "replace"
				});
				event.preventDefault();
			}
		});
		/*eslint-enable no-unused-vars*/
	};
	metasVoiceRun.$inject = ["$rootScope", "$state", "$firebaseAuth"];
	angular
		.module("metasVoice", ["ui.router","ui.router.state.events",
			"firebase",
			"ui.bootstrap",
			"blockUI",
			"common",
			"home",
			"publisher",
			"user"
		])
		.run(metasVoiceRun);
})();
