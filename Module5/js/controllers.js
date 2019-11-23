/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fpControllers = angular.module('fpControllers', []);

/*pageList: represents an array containing the html page names in order of display
 *  and 0's in places where quiz's are to be displayed*/
fpControllers.value('myVars', {pageList:[-1,-2,-3,0.1,0,0.2,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0,0,0,0,0,0,0,15,16,17,18,19,19.1,20,21,22,23,24,25,26,0,0,0,0,0,0,27,28,29,30,30.1,31,32,33,0,0,0,34,35,36,36.1,37,38,39,0,0,0,40,41,42,42.1,43,44,45,46,47,0,0,0,0,48,49,50,50.1,51,52,53,54,55,56,0,0,0,0,57,58,59,60,61,62,0,0,63,64,65,66,67,68,0,0,69,70,70.1,71,72,0,0,0,0,73,74,74.1,75,76,76.1]    
});
fpControllers.value('myList',{contentList:["",-1,-2,-3,0.1,0,0.2,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,19.1,20,21,22,23,24,25,26,27,28,29,30,30.1,31,32,33,34,35,36,36.1,37,38,39,40,41,42,42.1,43,44,45,46,47,48,49,50,50.1,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,70.1,71,72,73,74,74.1,75,76,76.1]    
});
fpControllers.factory('Data', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        indexToShow: 0,
        getContentData: function () {
            return $http.get('data/content.json').then(function (result) {
                $rootScope.cont = result.data;
            });
        },
        getIndexData: function () {
                return $http.get('data/CheckListItems.json').then(function (result) {
                    $rootScope.categories = result.data;
                });
            }
    };
}]);

fpControllers.controller('paging', function (myVars, myList, $scope, $rootScope, $http, $location, $routeParams) {
    if (sessionStorage.pgtemp === undefined && sessionStorage.temp === undefined) {
        $rootScope.pageNumber = 1; //for numbering of pages
        $rootScope.pager = 1;
        $http.get('data/headertext.json').success(function (data) {
            $rootScope.htextc = data;
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
        });
        $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
    }
    else {
        $rootScope.pager = Number(sessionStorage.temp);
        $rootScope.pageNumber = Number(myVars.pageList.indexOf(myList.contentList[$rootScope.pager])) + 1;
        $http.get('data/headertext.json').success(function (data) {
            $rootScope.htextc = data;
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
        });

        $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
        $(document).load().scrollTop(0);
    }
    
    $scope.getNext = function () {
        if ($rootScope.pager !== $rootScope.htextc.length) {
            if (!($rootScope.htextc[$rootScope.pager-1].quizIndex === undefined)) {
                sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager -1].quizIndex;
                sessionStorage.quizDirection = "Forward";
                sessionStorage.quizNum = null;
                sessionStorage.temp = $rootScope.pager;
                $rootScope.pageNumber = $rootScope.pageNumber + 1;
                sessionStorage.pageNumber = $rootScope.pageNumber;
                location.href = "quiz1.html";
            }
            else {
                $rootScope.pager = $rootScope.pager + 1;
                sessionStorage.temp = $rootScope.pager;
                $rootScope.pageNumber = $rootScope.pageNumber + 1;
                sessionStorage.pageNumber = $rootScope.pageNumber;
                $rootScope.htext = $rootScope.htextc[$rootScope.pager-1].title;
                $rootScope.pg = myList.contentList[$rootScope.pager]  + '.html';
                $(document).load().scrollTop(0);
            }
        }
        else {
            location.href = "dbtoc.html";
        }
    };
    
    $scope.getPrev = function () {
        if ($rootScope.pager <= 1) 
        {
            location.href = "dbtoc.html";
        }
        else if (!($rootScope.htextc[$rootScope.pager - 2].quizIndex === undefined)) 
        {
            sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 2].quizIndex;
            sessionStorage.quizDirection = "Backward";
            sessionStorage.quizNum = null;
            sessionStorage.temp = $rootScope.pager;
            $rootScope.pageNumber = $rootScope.pageNumber - 1;
            sessionStorage.pageNumber = $rootScope.pageNumber;
            location.href = "quiz1.html";
        }
        else {
            $rootScope.pager = $rootScope.pager - 1;
            sessionStorage.temp = $rootScope.pager;
            $rootScope.pageNumber = $rootScope.pageNumber - 1;
            sessionStorage.pageNumber = $rootScope.pageNumber;
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
            $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
            $(document).load().scrollTop(0);
        }
    };

    $scope.reSizing = function () {
        $("#jpedal").width("1200px");
        $("#manual").width("1200px");
         var id = "#p";
        id = id + myList.contentList[$rootScope.pager];
        var ida = id + " a";
        $(id).width("1200px");
        $(ida).css('color', '#0000ee');
    };
});

fpControllers.controller('headerCategoryController', function (myVars, myList, $scope, $rootScope, Data) {
    Data.getContentData();
    $rootScope.indexer = 1;
    $scope.checkIndex = function () {};
    if ($rootScope.indexToShow === undefined) {
        $rootScope.indexToShow = 0;
    }
    else 
    {
        $rootScope.contents = $rootScope.cont[$rootScope.indexToShow];
    }
    Data.getIndexData();
    
    $scope.getContent = function (category) 
    {
        $rootScope.pg = category.slideindex + ".html";
        sessionStorage.pgtemp = $rootScope.pg;
        if (!isNaN(category.slideindex)) 
        {
            sessionStorage.pageNumber = Number(myVars.pageList.indexOf(Number(category.slideindex))) + 1;
        } 
        else 
        {
            sessionStorage.pageNumber = Number(myVars.pageList.indexOf(category.slideindex)) + 1;
        }
        if (!isNaN(category.slideindex)) 
        {
            sessionStorage.temp = Number(myList.contentList.indexOf(Number(category.slideindex)));
        } 
        else 
        {
            sessionStorage.temp = Number(myList.contentList.indexOf(category.slideindex));
        }
    };
});

fpControllers.controller('ContentCtrl', ['$scope', '$http', '$rootScope', function (myVars, $scope, $http, $rootScope) {
    // alert("h1");
    $rootScope.indexToShow;
    $http.get('data/content.json').success(function (data) {
        //alert(data[0].Title);
        //alert(data[1].Title);
        $rootScope.cont = data;
        $rootScope.contents = $rootScope.cont[Number(sessionStorage.indexToShow)];
        $rootScope.indexToShow = sessionStorage.indexToShow;
        //alert($scope.contents.topic[0].Title);

    });
    $scope.getNextContent = function () {
        //alert("Hi");
        $rootScope.indexToShow = (Number($rootScope.indexToShow) + 1);
        //alert($rootScope.indexToShow);
        if ($rootScope.indexToShow === $rootScope.cont.length) {
            alert("End of the session");
        }
        else {

            // alert($rootScope.indexToShow);
            $rootScope.contents = $rootScope.cont[$rootScope.indexToShow];
        }
    };
    $scope.getPrevContent = function () {
        //alert("Hi");
        $rootScope.indexToShow = (Number($rootScope.indexToShow) - 1);

        if ($rootScope.indexToShow < 0) {
            alert("Begining of the session");
        }
        else {

            // alert($rootScope.indexToShow);
            $rootScope.contents = $rootScope.cont[$rootScope.indexToShow];
        }
    };
}]);


fpControllers.controller('quiztype1', function ($scope, $http, $rootScope, $location) {
    if(sessionStorage.temp===null || sessionStorage.temp===undefined)
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
    $http.get('data/' + $rootScope.quizSet + '.json').success(function (data) {
        $rootScope.quizs = data;
        $rootScope.quizLength = $rootScope.quizs.length;
        if ((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null) {
            $rootScope.quiz = $rootScope.quizs[Number(sessionStorage.quizNum)];
        }
        else {
            if (sessionStorage.quizDirection === "Forward") {
                $rootScope.quiz = $rootScope.quizs[0];
            }
            else {
                $rootScope.quiz = $rootScope.quizs[$rootScope.quizs.length - 1];
            }
        }
        $scope.questionImage();
        $scope.checkboxRadio();
        $scope.hideImageOptions();
        $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
        $("#q1m").hide();
        if (!($rootScope.quiz.optionimg === undefined)) {
            $scope.showImageOptions();
        }
        $("#DownloadScripts").hide();
        if (!($rootScope.quiz.scripts === undefined)) {
            var location = $rootScope.quiz.scripts;
            var func = location;
            $("#DownloadScripts").attr("href", func);
            $("#DownloadScripts").show();
        }
        $scope.populateOptions();
        if ((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null) {
            $rootScope.quizindex = Number(sessionStorage.quizNum);
        }
        else {
            if (sessionStorage.quizDirection === "Forward") {
                $rootScope.quizindex = 0;
            }
            else {
                $rootScope.quizindex = $rootScope.quizs.length - 1;
            }
        }
        $(document).load().scrollTop(0);
    });

    $scope.getNext = function () {
        $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
        if ($rootScope.quizindex === $rootScope.quizs.length) {
            if (sessionStorage.quizDirection === "Forward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager + 1;
            }
            $rootScope.quizpageNumber = $rootScope.quizpageNumber + 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            window.location.href = "page1.html";
        }
        else {
            
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            $scope.questionImage();
            $scope.checkboxRadio();
            $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
            $("#q1m").hide();
            $scope.uncheck();
            $scope.populateOptions();
            $scope.hideImageOptions();
            if (!($rootScope.quiz.optionimg === undefined)) {
                $scope.showImageOptions();
            }
            $("#DownloadScripts").hide();
            if (!($rootScope.quiz.scripts === undefined)) {
                var location = $rootScope.quiz.scripts;
                var func = location;
                $("#DownloadScripts").attr("href", func);
                $("#DownloadScripts").show();
            }
            $scope.res = [];
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber + 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
        }
    };

    $scope.getPrev = function () {
        $rootScope.quizindex = (Number($rootScope.quizindex) - 1);
        if ($rootScope.quizindex < 0) {
            if (sessionStorage.quizDirection === "Backward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager - 1;
            }
            $rootScope.quizpageNumber = $rootScope.quizpageNumber - 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
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
            $scope.uncheck();
            $scope.populateOptions();
            $scope.hideImageOptions();
            if (!($rootScope.quiz.optionimg === undefined)) {
                $scope.showImageOptions();
            }
            $("#DownloadScripts").hide();
            if (!($rootScope.quiz.scripts === undefined)) {
                var location = $rootScope.quiz.scripts;
                var func = location;
                $("#DownloadScripts").attr("href", func);
                $("#DownloadScripts").show();
            }
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber - 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            $scope.res = [];
        }
    };
    $scope.MyAlert = function (quiz, value) {
        if (quiz.correct.length <= 1) {
            if (value === quiz.correct) {
                $("#q1m").show();
                $("#q1m").css('background-color', 'lightgreen');
                $("#q1m").html("Congratulations! you got the <strong> correct answer : " + quiz.correct.toLowerCase() + "</strong><br><br><strong>" + "Justification : </strong>" + quiz.description[value]);
            }
            else {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is <strong> Incorrect! </strong> " + "<br><br><strong>" + "Justification : </strong>" + quiz.description[value]);
            }
        }
        else {
            if ($scope.res.indexOf(value) === -1) {
                $scope.res.push(value);
            }
            else {
                $scope.index = $scope.res.indexOf(value);
                $scope.res.splice($scope.index, 1);
            }
        }
    };

    $scope.checkboxquiz = function (quiz) {
        var description = "<br><strong>Justification : </strong><br>";
            $scope.res = $scope.res.sort();
            $scope.ans = $scope.res.join('');
             for (i = 0; i < $scope.res.length; i++) {
                description = description + ("<strong>" + $scope.ans[i].toLowerCase() + "</strong> : " + quiz.description[$scope.ans[i]] + "<br>");
            }
            if ($scope.ans === quiz.correct) 
            {
                $("#q1m").show();
                $("#q1m").css('background-color', 'lightgreen');
                $("#q1m").html("Congratulations! You got the <strong> correct answer : " + quiz.correct.toLowerCase() + "</strong><br>" + description);
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
                if (partialCorrect === true) {
                    $("#q1m").show();
                    $("#q1m").css('background-color', '#ccff66');
                    if ($scope.ans.length === 1) {
                        $("#q1m").html("Your answer is <strong>partially correct</strong> and has more correct option(s) !" + "<br>" + description);
                    } else {
                        $("#q1m").html("Your answer is <strong>partially correct</strong> and has more correct option(s) !" + "<br>" + description);
                    }
                } else {
                    $("#q1m").show();
                    $("#q1m").css('background-color', 'pink');
                    $("#q1m").html("Your Answer is <strong> Incorrect! </strong>" + "<br>" + description);
                }
            }
    };

    $scope.uncheck = function () {
        $('input[name=q1]').prop("checked", false);
    };

    $scope.questionImage = function () {
        if ($rootScope.quiz.imgURL === "") {
            $('#quizQuestionImage').hide();
        }
        else {
            $('#quizQuestionImage').show();
        }
        if ($rootScope.quiz.query !== undefined) {
            $("#query").html($rootScope.quiz.query);
            $("#query").show();
        }
        else {
            $("#query").hide();
        }
    };

    $scope.checkboxRadio = function () 
    {
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

    $scope.showImageOptions = function () 
    {
        var id = "";
        for (i = 0; i < 7; i++) 
        {
            id = "#img" + (i + 1);
            if ($rootScope.quiz.optionimg[i].option !== null) 
            {
                $(id).attr('src', $rootScope.quiz.optionimg[i].option);
                $(id).show();
            }
        }
    };

    $scope.hideImageOptions = function () 
    {
        var id = "";
        for (i = 0; i < 9; i++) 
        {
            id = "#img" + (i + 1);
            $(id).attr('src', '');
            $(id).hide();
        }
    };

    $scope.populateOptions = function () {
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
