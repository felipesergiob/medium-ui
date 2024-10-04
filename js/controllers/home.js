myApp.controller("homeController", function ($scope, PostService, $modal, $rootScope , $http) {
  $scope.posts = [];  
  $scope.loading = false;
  $scope.currentPage = 1;  
  $scope.searchQuery = ''; 

  const listPosts = (page) => {
    $scope.loading = true;
    var token = localStorage.getItem('token');
    if (token){      
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    PostService.list(page).then((response) => {               
      if (response.data) {                
        $scope.posts = response.data.data.posts.map(post => ({
          ...post,
          formattedDate: new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          isLikedByUser: post.is_liked || false 
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

  $scope.likePost = function (post) { 
    if ($rootScope.isLogged) {            
      if (post.isLikedByUser) {
        var token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        PostService.dislikePost(post.id).then(() => {
          post.total_likes -= 1;
          post.isLikedByUser = false;
        }).catch((error) => {
          console.error('Erro ao remover like do post:', error);
        });
      } else {
        var token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        PostService.likePost(post.id).then(() => {
          post.total_likes += 1;
          post.isLikedByUser = true;
        }).catch((error) => {
          console.error('Erro ao dar like no post:', error);
        });
      }  
    } else {      
      $scope.openLoginRegisterModal();
    } 
  };

  $scope.openLoginRegisterModal = function () {
    $modal.open({
      templateUrl: 'view/login-register-modal.html',
      controller: 'loginRegisterModalController'
    });
  };

  $scope.openUserProfileModal = function () {        
    $modal.open({
      templateUrl: 'view/user-profile-modal.html',
      controller: 'userProfileModalController'
    });
  };

  $scope.createPost = function() {
    if ($rootScope.isLogged) {
      $modal.open({
        templateUrl: 'view/create-post-modal.html',
        controller: 'createPostModalController',
      });
    } else {      
      $scope.openLoginRegisterModal();
    }
  };

  $rootScope.$on('postCreated', function() {
    listPosts($scope.currentPage);
  });

  $rootScope.$on('authenticated', function() {
    listPosts($scope.currentPage);
  });

  $rootScope.$on('userProfileUpdated', function() {
    listPosts($scope.currentPage);
  });

  listPosts($scope.currentPage);
});
