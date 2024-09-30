myApp.controller("homeController", function ($scope, PostService, $modal) {
  $scope.posts = [];  
  $scope.loading = false;
  $scope.currentPage = 1;  

  const listPosts = (page) => {
      $scope.loading = true;
      PostService.list(page).then((response) => {               
          if (response.data) {
              $scope.posts = response.data.data.posts.map(post => ({
                  ...post,
                  formattedDate: new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                  })
              }));
          } else {
              console.error('Resposta da API inválida');
          }
      }).catch((error) => {
          console.error('Erro ao carregar posts:', error);
      }).finally(() => {
          $scope.loading = false;
          $scope.$applyAsync();
      });
  };

  $scope.truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + '...' : text;
  };


  $scope.createPost = function() {
    $modal.open({
      templateUrl: 'view/create-post-modal.html',
      controller: 'createPostModalController',
      backdrop: 'static',
      keyboard: false,
    });
  };

  listPosts($scope.currentPage);
});