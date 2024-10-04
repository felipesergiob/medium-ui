myApp.controller('userProfileModalController', function($scope, UserService, $http, $rootScope , $modalInstance) {
    $scope.userProfile = {};
    $scope.showDeleteConfirmationModal = false;

    const init = () => {
        readUserProfile();
    };

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

    $scope.updateUserProfile = () => {        
        const token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        UserService.update($scope.userProfile).then((response) => {
            if (response && response.data) {
                $scope.userProfile.message = 'Perfil atualizado com sucesso';
                $rootScope.$broadcast('userProfileUpdated'); 
                $modalInstance.close();
            } else {
                $scope.userProfile.message = 'Falha ao atualizar perfil';
            }
        }).catch((error) => {
            $scope.userProfile.message = 'Erro ao atualizar perfil do usuário';
        });
    };

    $scope.openDeleteConfirmationModal = () => {
        $scope.showDeleteConfirmationModal = true;
    };

    $scope.closeDeleteConfirmationModal = () => {
        $scope.showDeleteConfirmationModal = false;
    };

    $scope.deleteUserProfile = () => {
        const token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        UserService.delete().then((response) => {
            if (response && response.data) {
                $scope.userProfile.message = 'Conta deletada com sucesso';
                $scope.closeDeleteConfirmationModal();
            } else {
                $scope.userProfile.message = 'Falha ao deletar a conta';
            }
        }).catch((error) => {
            $scope.userProfile.message = 'Erro ao deletar a conta do usuário';
        });
    };

    init();
});
