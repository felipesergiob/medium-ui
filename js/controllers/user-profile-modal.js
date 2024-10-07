myApp.controller('userProfileModalController', function($scope, UserService, $http, $rootScope, $modalInstance) {
    $scope.userProfile = {};
    let originalProfile = {};

    const init = () => {
        readUserProfile();
    };

    const readUserProfile = () => {
        const token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        UserService.read().then((response) => {
            if (response && response.data) {
                $scope.userProfile = response.data.data;
                originalProfile = angular.copy($scope.userProfile);
            } else {
                $scope.userProfile.message = 'Resposta da API inválida';
            }
        }).catch(() => {
            $scope.userProfile.message = 'Erro ao carregar perfil do usuário';
        });
    };

    $scope.isProfileChanged = () => {
        return $scope.userProfile.name !== originalProfile.name ||
               $scope.userProfile.email !== originalProfile.email;
    };

    $scope.isPasswordChanged = () => {
        return $scope.userProfile.currentPassword && $scope.userProfile.newPassword;
    };

    $scope.updateUserProfile = () => {
        const token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        let profileUpdated = false;
        let passwordUpdated = false;

        let updatePromises = [];

        if ($scope.isProfileChanged()) {
            const profilePayload = {
                name: $scope.userProfile.name,
                email: $scope.userProfile.email
            };
            updatePromises.push(
                UserService.update(profilePayload).then(() => {
                    profileUpdated = true;
                })
            );
        }

        if ($scope.isPasswordChanged()) {
            const passwordPayload = {
                currentPassword: $scope.userProfile.currentPassword,
                newPassword: $scope.userProfile.newPassword
            };
            updatePromises.push(
                UserService.updatePassword(passwordPayload).then(() => {
                    passwordUpdated = true;
                })
            );
        }

        Promise.all(updatePromises)
            .then(() => {
                if (profileUpdated || passwordUpdated) {
                    $scope.userProfile.message = 'Perfil atualizado com sucesso';
                    $rootScope.$broadcast('userProfileUpdated');
                    resetPasswordFields(); 
                    $modalInstance.close();
                } else {
                    $scope.userProfile.message = 'Nenhuma alteração detectada';
                }
            })
            .catch(() => {
                $scope.userProfile.message = 'Erro ao atualizar perfil do usuário';
            });
    };

    const resetPasswordFields = () => {
        $scope.userProfile.currentPassword = '';
        $scope.userProfile.newPassword = '';
    };

    $scope.openDeleteConfirmationModal = () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $scope.deleteUserProfile();
            }
        });
    };

    $scope.deleteUserProfile = () => {
        const token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        UserService.delete().then((response) => {
            if (response && response.data) {
                $scope.userProfile.message = 'Conta deletada com sucesso';
                Swal.fire('Deletado!', 'Sua conta foi deletada.', 'success');
                $modalInstance.close();
            } else {
                $scope.userProfile.message = 'Falha ao deletar a conta';
            }
        }).catch(() => {
            $scope.userProfile.message = 'Erro ao deletar a conta do usuário';
        });
    };

    init();
});
