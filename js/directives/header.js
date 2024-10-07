angular.module('mediumApp').directive('customHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'view/header.html', 
        scope: {
            searchQuery: '=',
            createPost: '&',
            openLoginRegisterModal: '&',
            openUserProfileModal: '&',
            isLogged: '='
        }
    };
});
