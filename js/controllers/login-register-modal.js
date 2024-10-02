myApp.controller('loginRegisterModalController', function ($scope, $modalInstance) {
    $scope.isLogin = false;

    $scope.toggleForm = () => {
        $scope.isLogin = !$scope.isLogin;
    };

    $scope.cancel = function () {
        $modalInstance.dismiss("cancel");
    };

    $scope.closeModal = () => {        
        $modalInstance.close();
    };
});
