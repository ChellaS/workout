angular.module('myApp', [])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {template: '<div>This is the default div</div>'})
        .when('/todolist', {templateURL: '/partials/todolist.html'})
});