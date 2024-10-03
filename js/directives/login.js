myApp.directive('loginForm', function($http, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'view/login-form.html',
        link: function(scope) {
            scope.credentials = {
                email: "",
                password: ""
            };
          
            scope.login = function () {    
                $http.post(`${baseUrl}users/login`, scope.credentials).then(
                    (response) => {
                        if (response.data.data.token) {
                            localStorage.setItem("token", response.data.data.token.token);
                            $rootScope.isLogged = true;
                            scope.closeModal()
                            $rootScope.$broadcast('authenticated'); 
                        } else {
                            console.error("Resposta da API inválida");
                        }
                    },
                    (error) => {
                        console.error("Erro de login:", error);
                    }
                );
            };
        }
    };
});