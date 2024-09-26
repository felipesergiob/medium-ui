myApp.service('PostService', function ($q) {
    this.getPosts = () => {
      const deferred = $q.defer();
  
      const posts = [
        { id: 1, title: 'Primeiro Post', content: 'Conteúdo do primeiro post...' },
        { id: 2, title: 'Segundo Post', content: 'Conteúdo do segundo post...' },
        { id: 3, title: 'Terceiro Post', content: 'Conteúdo do terceiro post...' }];
  
      deferred.resolve({ data: { posts: posts } });
      return deferred.promise;
    };
  });
  