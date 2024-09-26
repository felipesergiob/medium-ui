const myApp = angular.module("mediumApp", ["ui.router", "ui.bootstrap"]);
const baseUrl = "http://localhost:3000/";

myApp.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
  // $httpProvider.interceptors.push("BearerAuthInterceptor");
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state({
      name: "home",
      url: "/",
      templateUrl: "view/home.html",
      controller: "homeController",
    });
});

// Função isAuthorized comentada para uso futuro
/*
const isAuthorized = ($state, $rootScope) => {
  const isLogged = localStorage.getItem("token");

  if (!isLogged) {
    $state.go("home");
    return;
  }

  $rootScope.isLogged = true;
};
*/
