/*global angular:true*/

(function() {
	/**
	* @ngdoc index
	* @name app
	* @description
	* # app
	*
	* Main modules of the application.
	* /
	*/
	var metasVoiceConfig = function($stateProvider, $urlRouterProvider, blockUIConfig, $httpProvider){
		blockUIConfig.templateUrl = "app/common/views/loading.html";
		blockUIConfig.autoBlock = true;
		//blockUIConfig.resetOnException = false;
		$urlRouterProvider.otherwise("/home");
	};
	metasVoiceConfig.$inject = ["$stateProvider", "$urlRouterProvider", "blockUIConfig", "$httpProvider"];
	angular.module("metasVoice")
	.config(metasVoiceConfig);
})();