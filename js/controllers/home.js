myApp.controller("homeController", function ($scope, PostService) {
  $scope.posts = [];  
  $scope.loading = false;
  $scope.currentPage = 1;  

  const listPosts = (page) => {
      $scope.loading = true;
      PostService.getPosts(page).then((response) => {       
          if (response.data) {
              $scope.posts = response.data.map(post => ({
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


  $scope.createPost = () => {
      alert('Função para criar um novo post!');
  };


  listPosts($scope.currentPage);
});