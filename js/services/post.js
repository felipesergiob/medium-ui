myApp.service('PostService', function ($http) {
  this.list = (page) => {
     return $http.get(`${baseUrl}posts/list?page=${page}`);
  };

  this.create = (post) => {
    return $http.post(`${baseUrl}posts/create`, post);
  };
});