myApp.controller('createPostModalController', function($scope, PostService, $modalInstance, $http, $rootScope) {
  $scope.post = {
    title: '',
    content: ''
  };

  $scope.submit = function() {
    var token = localStorage.getItem('token');
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

    PostService.create($scope.post).then((response) => {
      if (response.data) {
        $modalInstance.close();
        $rootScope.$emit('postCreated'); 
      } else {
        console.error('Resposta da API inválida');
      }
    }).catch((error) => {
      console.error('Erro ao criar post:', error);
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
