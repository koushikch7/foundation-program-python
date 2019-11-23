/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fpControllers = angular.module('fpControllers', []);

fpControllers.value('myVars', {
    pageList: [-2, -1, 0.1, 0, 0.2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 10.1, 11, 12, 13, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15.1, 16, 17, 18, 18.1, 19, 20, 21, 22, 23, 24, 25, 25.1, 26, 27, 28, 29, 30, 31, 0, 0, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 41.1, 42, 43, 44, 0, 0, 0, 0, 45, 46, 47, 48, 49, 49.1, 50, 51, 52, 53, 54, 55, 56, 57, 0, 0, 0, 0, 0, 0, 58, 59, 60, 61, 62, 63, 64, 65, 66, 66.1, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 0, 0, 0, 0, 0, 95, 96, 97, 98, 99, 99.1, 100, 101, 102, 102.1, 103, 104, 105, 0, 0, 0, 0, 0, 0, 0, 106, 107, 108, 109, 110, 110.1, 111, 112, 112.1]
});
fpControllers.value('myList', {
    contentList: ["", -2, -1, 0.1, 0, 0.2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10.1, 11, 12, 13, 14, 15, 15.1, 16, 17, 18, 18.1, 19, 20, 21, 22, 23, 24, 25, 25.1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 41.1, 42, 43, 44, 45, 46, 47, 48, 49, 49.1, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 66.1, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 99.1, 100, 101, 102, 102.1, 103, 104, 105, 106, 107, 108, 109, 110, 110.1, 111, 112, 112.1]
});

fpControllers.factory('Data', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        indexToShow: 0,
        getContentData: function() {
            return $http.get('data/content.json').then(function(result) {
                $rootScope.cont = result.data;
            });
        },
        getIndexData: function() {
            return $http.get('data/CheckListItems.json').then(function(result) {
                $rootScope.categories = result.data;
            });
        }
    };
}]);

//fpControllers.controller('paging',function($scope,$rootScope,$http,$location,$routeParams){
//	$rootScope.px760 = [13,17,20,20,21,22,48];
//   if(sessionStorage.pgtemp==undefined && sessionStorage.temp==undefined)
//   {
//    $rootScope.pageNumber = 1; //for numbering of pages
//    $rootScope.pager = 1;
//    $http.get('data/headertext.json').success(function(data) {
//                $rootScope.htextc=data;
//                $rootScope.htext=$rootScope.htextc[$rootScope.pager].title;
//            });
//    $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
//   }
//   else
//   {
//       $rootScope.pager = Number(sessionStorage.temp);
//        $rootScope.pageNumber = Number(myVars.pageList.indexOf(myList.contentList[$rootScope.pager])) + 1;
//        $http.get('data/headertext.json').success(function(data) {
//            $rootScope.htextc = data;
//            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
//        });
//        $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
//        $(document).load().scrollTop(0); 
//   }
//   
//   $scope.getNext=function(){
//       if ($rootScope.pager!==$rootScope.htextc.length) 
//       {
//    	   if (!($rootScope.htextc[$rootScope.pager-1].quizIndex === undefined)) {
//               sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager].quizIndex;
//               sessionStorage.quizDirecttion = "Forward";
//               sessionStorage.quizNum = null;
//               sessionStorage.temp = $rootScope.pager;
//               location.href = "quiz1.html"; 
//          } 
//           else
//           {
//           $rootScope.pager=$rootScope.pager+1;
//           sessionStorage.temp=$rootScope.pager;
//     $rootScope.htext=$rootScope.htextc[$rootScope.pager].title;
//     $rootScope.pg=$rootScope.pager+'.html';
// $(document).load().scrollTop(0);
//     }
//       }
//         else{
//            location.href="dbtoc.html";
//       }
//   };
//   
//     $scope.getPrev=function(){
//if($rootScope.pager<=0)
//         {
//             location.href="dbtoc.html";
//         }
//
//    	else if (!($rootScope.htextc[$rootScope.pager - 1].quizIndex === undefined)) {
//             sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 1].quizIndex;
//             sessionStorage.quizDirecttion = "Backward";      
//sessionStorage.quizNum = null;    
//             sessionStorage.temp = $rootScope.pager;
//             location.href = "quiz1.html";          
//         }
//    	 else
//         {
//     $rootScope.pager=$rootScope.pager-1;
//     sessionStorage.temp=$rootScope.pager;
//$rootScope.htext=$rootScope.htextc[$rootScope.pager].title;
//     $rootScope.pg=$rootScope.pager+'.html';
//$(document).load().scrollTop(0);
//         }
//   };
// $scope.reSizing = function() {
//        var id = "#p";
//        id = id + $rootScope.pager;
//        var ida = id + " a";
//        $(id).width("1200px");
//        $(ida).css('color', '#0000ee');
//    };
//});


fpControllers.controller('paging', function(myVars, myList, $scope, $rootScope, $http, $location, $routeParams) {
    if (sessionStorage.pgtemp === undefined && sessionStorage.temp === undefined) {
        $rootScope.pageNumber = 1; //for numbering of pages
        $rootScope.pager = 1;
        $http.get('data/headertext.json').success(function(data) {
            $rootScope.htextc = data;
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
        });
        $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
    } else {
        $rootScope.pager = Number(sessionStorage.temp);
        $rootScope.pageNumber = Number(myVars.pageList.indexOf(myList.contentList[$rootScope.pager])) + 1;
        $http.get('data/headertext.json').success(function(data) {
            $rootScope.htextc = data;
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
        });
        $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
        $(document).load().scrollTop(0);
    }

    $scope.getNext = function() {
        if ($rootScope.pager !== $rootScope.htextc.length) {
            if ($rootScope.htextc[$rootScope.pager - 1].quizIndex === undefined) {
                $rootScope.pager = $rootScope.pager + 1;
                sessionStorage.temp = $rootScope.pager;
                $rootScope.pageNumber = $rootScope.pageNumber + 1;
                sessionStorage.pageNumber = $rootScope.pageNumber;
                $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
                $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
                $(document).load().scrollTop(0);
            } else {
                sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 1].quizIndex;
                sessionStorage.quizDirection = "Forward";
                sessionStorage.startIndex = Number($rootScope.htextc[$rootScope.pager - 1].startIndex);
                sessionStorage.endIndex = Number($rootScope.htextc[$rootScope.pager - 1].endIndex);
                sessionStorage.quizNum = null;
                sessionStorage.temp = $rootScope.pager;
                $rootScope.pageNumber = $rootScope.pageNumber + 1;
                sessionStorage.pageNumber = $rootScope.pageNumber;
                location.href = "quiz1.html";
            }
        } else {
            location.href = "dbtoc.html";
        }
    };

    $scope.getPrev = function() {
        if ($rootScope.pager <= 1) {
            location.href = "dbtoc.html";
        } else if (!($rootScope.htextc[$rootScope.pager - 2].quizIndex === undefined)) {
            sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 2].quizIndex;
            sessionStorage.quizDirection = "Backward";
            sessionStorage.startIndex = Number($rootScope.htextc[$rootScope.pager - 2].startIndex);
            sessionStorage.endIndex = Number($rootScope.htextc[$rootScope.pager - 2].endIndex);
            sessionStorage.quizNum = null;
            sessionStorage.temp = $rootScope.pager;
            $rootScope.pageNumber = $rootScope.pageNumber - 1;
            sessionStorage.pageNumber = $rootScope.pageNumber;
            location.href = "quiz1.html";
        } else {
            $rootScope.pager = $rootScope.pager - 1;
            sessionStorage.temp = $rootScope.pager;
            $rootScope.pageNumber = $rootScope.pageNumber - 1;
            sessionStorage.pageNumber = $rootScope.pageNumber;
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
            $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
            $(document).load().scrollTop(0);
        }
    };

    $scope.reSizing = function() {
        var id = "#p";
        id = id + myList.contentList[$rootScope.pager];
        var ida = id + " a";
        $(id).width("1200px");
        $(ida).css('color', '#0000ee');
    };
});

fpControllers.controller('headerCategoryController', function(myVars, myList, $scope, $rootScope, Data) {
    Data.getContentData();
    $rootScope.indexer = 1;
    $scope.checkIndex = function() {};
    if ($rootScope.indexToShow === undefined) {
        $rootScope.indexToShow = 0;
    } else {
        $rootScope.contents = $rootScope.cont[$rootScope.indexToShow];
    }
    Data.getIndexData();
    $scope.getContent = function(category) {
        $rootScope.pg = category.slideindex + ".html";
        sessionStorage.pgtemp = $rootScope.pg;
        if (!isNaN(category.slideindex)) {
            sessionStorage.pageNumber = Number(myVars.pageList.indexOf(Number(category.slideindex))) + 1;
        } else {
            sessionStorage.pageNumber = Number(myVars.pageList.indexOf(category.slideindex)) + 1;
        }
        if (!isNaN(category.slideindex)) {
            sessionStorage.temp = Number(myList.contentList.indexOf(Number(category.slideindex)));
        } else {
            sessionStorage.temp = Number(myList.contentList.indexOf(category.slideindex));
        }
    };
});

fpControllers.controller('ContentCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $rootScope.indexToShow;
    $scope.getNextContent = function() {
        $rootScope.indexToShow = (Number($rootScope.indexToShow) + 1);
        if ($rootScope.indexToShow === $rootScope.cont.length) {
            alert("End of the session");
        } else {
            $rootScope.contents = $rootScope.cont[$rootScope.indexToShow];
        }
    };
    $scope.getPrevContent = function() {
        $rootScope.indexToShow = (Number($rootScope.indexToShow) - 1);

        if ($rootScope.indexToShow < 0) {
            alert("Begining of the session");
        } else {
            $rootScope.contents = $rootScope.cont[$rootScope.indexToShow];
        }
    };
}]);

fpControllers.controller('quiztype1', function($scope, $http, $rootScope, $location) {
    if (sessionStorage.temp === null || sessionStorage.temp === undefined) 
    {
        window.location.href = "page1.html";
    }
    $scope.res = [];
    $scope.ans = "";
    $scope.index = 0;
    $scope.quizs = "";
    $rootScope.quizindex;
    $rootScope.quizpageNumber = Number(sessionStorage.pageNumber);
    $rootScope.quizSet = sessionStorage.quizTemp;
    $http.get('data/' + $rootScope.quizSet + '.json').success(function(data) 
    {
        $rootScope.quizs = data;
        $rootScope.quizLength = $rootScope.quizs.length;
        if ((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null) 
        {
            $rootScope.quiz = $rootScope.quizs[Number(sessionStorage.quizNum)];
        } 
        else 
        {
            if (sessionStorage.quizDirection === "Forward") 
            {
                $rootScope.quiz = $rootScope.quizs[0];
            } 
            else 
            {
                $rootScope.quiz = $rootScope.quizs[$rootScope.quizs.length - 1];
            }
        }
        $scope.questionImage();
        $scope.checkboxRadio();
        $scope.Scriptdownload();
        $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
        $("#q1m").hide();
        $scope.hideImageOptions();
        if (!($rootScope.quiz.optionimg === undefined)) 
        {
            $scope.showImageOptions();
        }
        $scope.populateOptions();
        if ((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null) 
        {
            $rootScope.quizindex = Number(sessionStorage.quizNum);
        } 
        else 
        {
            if (sessionStorage.quizDirection === "Forward") 
            {
                $rootScope.quizindex = 0;
            }
            else 
            {
                $rootScope.quizindex = $rootScope.quizs.length - 1;
            }
        }
        $(document).load().scrollTop(0);
    });

    $scope.getNext = function() {
        $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
        if ($rootScope.quizindex === $rootScope.quizs.length) 
        {
            if (sessionStorage.quizDirection === "Forward") 
            {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager + 1;
            }
            window.location.href = "page1.html";
        } 
        else 
        {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            $scope.questionImage();
            $scope.checkboxRadio();
            $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
            $("#q1m").hide();
            $scope.hideImageOptions();
            $scope.uncheck();
            $scope.populateOptions();
            $scope.Scriptdownload();
            if (!($rootScope.quiz.optionimg === undefined)) 
            {
                $scope.showImageOptions();
            }
            $scope.res = [];
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber + 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
        }
    };

    $scope.getPrev = function() {
        $rootScope.quizindex = (Number($rootScope.quizindex) - 1);
        if ($rootScope.quizindex < 0) 
        {
            if (sessionStorage.quizDirection === "Backward") 
            {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager - 1;
            }
            location.href = "page1.html";
        } 
        else 
        {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            $scope.questionImage();
            $scope.checkboxRadio();
            $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
            $("#q1m").hide();
            $scope.hideImageOptions();
            $scope.uncheck();
            $scope.populateOptions();
            $scope.Scriptdownload();
            if (!($rootScope.quiz.optionimg === undefined)) 
            {
                $scope.showImageOptions();
            }
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber - 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            $scope.res = [];
        }
    };
    
    $scope.Scriptdownload = function() 
    {
        $("#DownloadScripts").hide();
        if($rootScope.quiz.fileURL !== undefined && $rootScope.quiz.fileURL !== "" )
        {
            $("#DownloadScripts").show();
        }
    };
    $scope.MyAlert = function(quiz, value) 
    {
        if (quiz.correct.length <= 1) 
        {
            if (value === quiz.correct) 
            {
                $("#q1m").show();
                $("#q1m").css('background-color', 'lightgreen');

                $("#q1m").html("Congratulations! you got the <strong> correct answer : " + quiz.correct.toLowerCase() + "</strong><br><br><strong>" + "Justification : </strong>" + quiz.description[value]);
            } 
            else 
            {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is <strong> Incorrect! </strong> " + "<br><strong><br>" + "Justification : </strong>" + quiz.description[value]);
            }
        } 
        else 
        {
            if ($scope.res.indexOf(value) === -1) 
            {
                $scope.res.push(value);
            } 
            else 
            {
                $scope.index = $scope.res.indexOf(value);
                $scope.res.splice($scope.index, 1);
            }
        }
    };

    $scope.checkboxquiz = function(quiz) 
    {
        var resTemp = [];
        var description = "<br><strong>Justification : </strong><br>";
        $scope.res = $scope.res.sort();
        $scope.ans = $scope.res.join('');
        for (i = 0; i < $scope.res.length; i++) 
        {
            description = description + ("<strong>" + $scope.ans[i].toLowerCase() + "</strong> : " + quiz.description[$scope.ans[i]] + "<br>");
        }
        if ($scope.ans === quiz.correct) 
        {
            for (i = 0; i < $scope.res.length; i++) 
            {
                resTemp.push($scope.res[i].toLowerCase());
            }
            var correctAnswer = resTemp.join(',');

            $("#q1m").css('background-color', 'lightgreen');
            $("#q1m").html("Congratulations! You got the <strong> correct answer : " + correctAnswer + "</strong><br>" + description);
            $("#q1m").show();
        } 
        else if ($scope.ans.length === 0) 
        {
            $("#q1m").show();
            $("#q1m").css('background-color', 'pink');
            $("#q1m").html("Please <strong>choose an option</strong>");
        } 
        else 
        {
            var partialCorrect = false;
            for (i = 0; i < $scope.res.length; i++) 
            {
                if (quiz.correct.includes($scope.res[i])) 
                {
                    partialCorrect = true;
                    continue;
                } 
                else 
                {
                    partialCorrect = false;
                    break;
                }
            }
            if (partialCorrect === true) 
            {
                $("#q1m").show();
                $("#q1m").css('background-color', '#ccff66');
                if ($scope.ans.length === 1) 
                {
                    $("#q1m").html("Your answer is <strong>partially correct</strong> and has more correct option(s) !" + "<br>" + description);
                } 
                else 
                {
                    $("#q1m").html("Your answer is <strong>partially correct</strong> and has more correct option(s) !" + "<br>" + description);
                }
            } 
            else 
            {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is <strong> Incorrect! </strong>" + "<br>" + description);
            }
        }
    };

    $scope.uncheck = function() 
    {
        $('input[name=q1]').prop("checked", false);
    };

    $scope.questionImage = function() 
    {
        if ($rootScope.quiz.imgURL === "") 
        {
            $('#quizQuestionImage').hide();
        } 
        else 
        {
            $('#quizQuestionImage').show();
        }
        if ($rootScope.quiz.query !== undefined) 
        {
            $("#query").html($rootScope.quiz.query);
            $("#query").show();
        } 
        else 
        {
            $("#query").hide();
        }
    };

    $scope.checkboxRadio = function() {
        if ($rootScope.quiz.correct.length <= 1) 
        {
            $rootScope.itype = "radio";
            $rootScope.istatus = "false";
            $('#sA').hide();
        } 
        else 
        {
            $rootScope.itype = "checkbox";
            $rootScope.istatus = "false";
            $('#sA').show();
        }
    };

    $scope.showImageOptions = function() 
    {
        var id = "";
        for (i = 0; i < 9; i++) 
        {
            id = "#img" + (i + 1);
            if ($rootScope.quiz.optionimg[i].option !== null) 
            {
                $(id).attr('src', $rootScope.quiz.optionimg[i].option);
                $(id).show();
            }
        }
    };

    $scope.hideImageOptions = function() 
    {
        var id = "";
        for (i = 0; i < 9; i++) 
        {
            id = "#img" + (i + 1);
            $(id).attr('src', '');
            $(id).hide();
        }
    };

    $scope.populateOptions = function() 
    {
        $("span").hide();
        $("input[name=q1]").hide();
        var temp = "";
        var inputElem = "";
        var br = "";
        for (i = 1; i < 10; i++) 
        {
            br = "#br" + i;
            $(br).hide();
        }
        for (i = 0; i < $rootScope.quiz.options.length; i++) 
        {
            temp = "#option" + (i + 1);
            inputElem = "#input" + (i + 1);
            br = "#br" + i;
            var elem = $(temp);
            elem.html($rootScope.quiz.options[i].option);
            elem.show();
            $(inputElem).show();
            $(br).show();
        }
    };
});