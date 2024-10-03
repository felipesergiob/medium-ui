myApp.service('UserService', function ($http) {  
    this.login = (credentials) => {
        return $http.post(`${baseUrl}users/login`, credentials);
    };
    this.read = () => {
        return $http.get(`${baseUrl}users/profile`);
    };
});