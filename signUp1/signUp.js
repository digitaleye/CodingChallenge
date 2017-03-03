'use strict';

var signUpApp = angular.module('signUpApp', []);

signUpApp.controller('signUpFormController', ['$scope', function($scope) {

    $scope.users = {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthday: ''
    };

    //TODO: Validate firstName, and username on submit
    $scope.add = function(user) {
        //validating if input values are empty
        if(user.firstName === undefined || user.firstName === ''  ){
           alert('Please enter First Name');
        }

        if(user.username === undefined || user.username === ''){
           alert('Please enter User Name');
        }

        if(user.password === undefined || user.password === '' ||
            user.confirmPassword === undefined || user.confirmPassword === '') {
            alert('Please enter password');
        } else if(user.password !== user.confirmPassword) {
            alert('Please confirm password');
        }

        if(user.birthday === undefined || user.birthday === ''){
            alert('Please enter User birthday');
        }

        $scope.users = angular.copy(user);
    };
    //this function resets the fields so the user can input again
    $scope.reset = function() {
        $scope.user = angular.copy($scope.users);
    };
    //calling the reset function
    $scope.reset();

    // This is the function for min Date
    function minFunc(minAge){
        var today = new Date();
      return new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    }
    //This is the function for max Date
    function maxFunc(maxAge){
        var today = new Date();
      return new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    }
        //Assign the age value to the variable for making min max range
        var maxAge = 150;
        var minAge = 14;

        //Calling the function for the and sending in the values for making the range
        var maxDate = maxFunc(minAge);
        var minDate = minFunc(maxAge);

    //Returning the values through the function to the date attribute.
    $scope.maxDate = function () {
        return maxDate;
    }
    //Returning the values through the function to the date attribute.
    $scope.minDate = function (){
        return minDate
    }

}]);