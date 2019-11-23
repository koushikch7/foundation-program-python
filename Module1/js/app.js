/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fpApp=angular.module('fpApp',['fpControllers']);

fpApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/main', {
            templateUrl: 'index1.html'
        }).
        when('/topic', {
            templateUrl: 'dbtoc.html',
            controller: 'headerCategoryController'
        }). 
        when('/content/:xyz', { 
            templateUrl: 'page1.html',
            controller: 'paging'
        }).
        otherwise({
            redirectTo: '/main'
        });
    }]);
