myApp.controller("homeController", function ($scope, PostService) {
    $scope.posts = [];  
    $scope.loading = false;
  
    const listPosts = () => {
      $scope.loading = true;
      PostService.getPosts().then((response) => {
        $scope.posts = response.data.posts; 
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
  
    listPosts();
  });
  