myApp.service('PostService', function ($http, $q) {
  this.getPosts = (page) => {
      const deferred = $q.defer();

      $http.get(`${baseUrl}posts/list?page=${page}`)
          .then((response) => {
              if (response.data && response.data.data && response.data.data.posts) {
                deferred.resolve({ data: response.data.data.posts });                 
              } else {
                deferred.reject('Resposta da API inválida');
              }
          })
          .catch((error) => {
              deferred.reject(error);
          });

      return deferred.promise;
  };
});