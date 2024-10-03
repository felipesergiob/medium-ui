myApp.controller('userProfileModalController', function($scope, UserService, $http, $rootScope) {
    $scope.userProfile = {};

    const init = () => {
        readUserProfile();
    }

    const readUserProfile = () => {
        const token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        UserService.read().then((response) => {
            
            if (response && response.data) {
                $scope.userProfile = response.data.data;
            } else {
                $scope.userProfile.message = 'Resposta da API inválida';
            }
        }).catch((error) => {
            $scope.userProfile.message = 'Erro ao carregar perfil do usuário';
        });
    };

    init()
});