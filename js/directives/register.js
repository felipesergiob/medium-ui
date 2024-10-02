myApp.directive('registerForm', function($http, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'view/register-form.html',
        link: function(scope) {
            scope.user = {
                name: "",
                email: "",
                password: ""
            };
        
            scope.register = function () {
                $http.post(`${baseUrl}users/create`, scope.user).then(
                    (response) => {                        
                        if (response.data.data.token) {
                            localStorage.setItem("token", response.data.data.token.token);
                            $rootScope.isLogged = true;
                            scope.closeModal()
                        } else {
                            console.error("Resposta da API inválida");
                        }
                    },
                    (error) => {
                        console.error("Erro de registro:", error);
                    }
                );
            };
        }
    };
});