myApp.controller('createPostModalController', function($scope, PostService, $modalInstance, $http) {

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
          $scope.posts.push({
            ...response.data.data.post,
            formattedDate: new Date(response.data.data.post.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          });
        } else {
          console.error('Resposta da API inválida');
        }
      })
    };
  
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });