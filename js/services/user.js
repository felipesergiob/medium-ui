myApp.service('UserService', function ($http) {  
    this.login = (credentials) => {
        return $http.post(`${baseUrl}users/login`, credentials);
    };
    this.read = () => {
        return $http.get(`${baseUrl}users/profile`);
    };
    this.update = (user) => {
        console.log('update', user);
        
        return $http.put(`${baseUrl}users/update`, user);
    };
    this.delete = () => {
        return $http.delete(`${baseUrl}users/delete`);
    };
});