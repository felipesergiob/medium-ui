myApp.service('PostService', function ($http) {
  this.list = (page) => {
    return $http.get(`${baseUrl}posts/list?page=${page}`);
  };

  this.create = (post) => {
    return $http.post(`${baseUrl}posts/create`, post);
  };

  this.likePost = (postId) => {
    return $http.post(`${baseUrl}posts/like`, { post_id: postId });
  };

  this.dislikePost = (postId) => {
      return $http.post(`${baseUrl}posts/dislike`, { post_id: postId });
  };
});