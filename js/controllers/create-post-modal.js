myApp.controller('createPostModalController', function($scope ,PostService, $modalInstance) {

    $scope.post = {
        title: '',
        content: ''
    };

    $scope.submit = function() {
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
        $modalInstance.dismiss('cancel');};
});