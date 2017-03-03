'use strict';

var app = angular.module("buddyApp", ['ui.bootstrap']);
app.controller("buddyCtrl", function($scope,$modal,buddyFactory) {

    //buddies array
    $scope.buddies = [];

    //sorting array
    $scope.sortOptions = ['userName', 'firstName', 'lastName', 'status', 'priority', 'email', 'dob', 'bio', 'lastSignIn'];


    //calling the factory and getting list from the file
    buddyFactory.getBuddies().then(function(res){
        $scope.buddies = res.data;
    });

    //this one is for accordian open and close
    $scope.isOpen = false;

    //delete buddy button
    $scope.deleteBuddy = function(index) {
        var con = confirm("Please confirm if you really want to delete this buddy?");

        //deleting buddy through index position
        if (con) {
            $scope.buddies.splice(index, 1);
        }
    }

    //This method returns the color class for coloring the status accordingly
    $scope.addColor = function(status){
        var colorStyle;
        switch (status) {
            case 'A':
                colorStyle = 'available'
                break;
            case 'B':
                colorStyle = 'busy'
                break;
            case 'I':
                colorStyle = 'Idle'
                break;
            case 'O':
                colorStyle = 'offline'
                break;

            default: colorStyle = ''
        }
        return colorStyle;
    }

    //this method returns full name of the corresponding alphabet
    $scope.statusFunc = function(status){
        var currentStatus;
        switch (status) {
            case 'A':
                currentStatus = 'Available'
                break;
            case 'B':
                currentStatus = 'Busy'
                break;
            case 'I':
                currentStatus = 'Idle'
                break;
            case 'O':
                currentStatus = 'Offline'
                break;

            default: currentStatus = 'black';
        }
        return currentStatus;
    }

    //lastSignInFunc returns the last sign in date for only Offline status
    //otherwise an empty string is returned which helps to provide value for ng-if true or false
    $scope.lastSignInFunc = function(status, lastSignIn){
        var currentStatus;
        if(status === 'O'){
          return lastSignIn;
        }

        return '';
    }
    //This is the modal dialog box, it oppens on Add buddy button, and then the values come in
    // through ok CLick button and pushed into the buddies array.
    $scope.openDialog = function () {
        $modal.open({
            templateUrl: 'dialog.html',

            controller: function ($scope, $modalInstance) {

                $scope.ok = function () {
                    $modalInstance.close({
                        userName: this.userName,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        dob: this.dob,
                        priority: this.priority,
                        bio: this.bio,
                        lastSignIn: this.lastSignIn
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }).result.then(function (p) {
            console.dir(p);
            var dob;
            if(p.dob){
                dob = p.dob.toISOString()
            }
            $scope.buddies.push(
                {userName:p.userName, firstName:p.firstName, lastName:p.lastName, status:'A', priority:p.priority,
                    email:p.email, dob:dob, bio:p.bio, lastSignIn:p.lastSignIn}
            );
        });
    };

    //This is the second modal for changing the priority of the buddy.
    $scope.openPriorityDialog = function (index) {
        $modal.open({
            templateUrl: 'priorityDialog.html',
            controller: function ($scope, $modalInstance) {

                $scope.ok = function () {
                    $modalInstance.close({
                        priority: this.priority
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }).result.then(function (p) {
            console.dir(p);
            $scope.buddies[index].priority = p.priority
        });
    };
    //Delete buddy Dialog Box opens to ask for the confirmation of deleting the buddy
    $scope.deleteBuddy = function (index) {
        $modal.open({
            templateUrl: 'openConfirmationDialog.html',
            controller: function ($scope, $modalInstance) {

                $scope.ok = function () {

                    $modalInstance.close({});
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }).result.then(function () {
                $scope.buddies.splice(index, 1);
        });
    };

})
//this is the factory used to load data from the buddyData.json local file
// that contains an array which has objects
app.factory('buddyFactory', function($http) {
    return {
        getBuddies: function() {
            return $http.get('buddyData.json');
        }
    }
})