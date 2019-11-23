/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fpControllers = angular.module('fpControllers', []);

/*pageList: represents an array containing the html page names in order of display
 *  and 0's in places where quiz's are to be displayed*/
fpControllers.value('myVars', {
    pageList: [0.01, 0.02, 0.1, 0, 0.2, 1, 2, 3, 4, 5, 6, 0, 7, 0, 8, 9, 9.1, 10, 11, 12, 0, 0, 0, 0, 0, 13, 14, 15, 16, 0, 0, 0, 17, 0, 18, 0, 0, 0, 19, 0, 20, 21, 0, 0, 22, 23, 23.1, 24, 25, 26, 27, 0, 0, 0, 28, 29, 30, 31, 32, 33, 34, 0, 0, 35, 0, 0, 0, 0, 0, 36, 37, 38, 39, 40, 0, 0, 41, 42, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 0, 0, 48, 49, 50, 51, 0, 52, 53, 54, 55, 56, 56.1, 57, 58, 59, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 65, 66, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 69, 70, 70.1, 71, 72, 73, 74, 75, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 78, 79, 80, 81, 82, 83, 84, 0, 0, 0, 85, 86, 87, 88, 89, 90, 91, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 93, 94, 95, 96, 0, 0, 97, 98, 99, 100, 100.1, 101, 102, 103, 0, 0, 104, 0, 0, 0, 0, 105, 106, 107, 108, 0, 0, 0, 109, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 111, 112, 113, 0, 0, 114, 115, 116, 117, 117.1, 118, 119, 120, 0, 0, 121, 122, 123, 0, 0, 0, 0, 0, 0, 0, 124, 125, 126, 127, 128, 129, 129.1, 130, 131, 132, 133, 134, 135, 136, 0, 0, 137, 138, 0, 0, 0, 0, 0, 0, 0, 139, 140, 141, 142, 143, 144, 144.1, 145, 146, 147, 0, 0, 0, 0, 148, 149, 150, 151, 152, 0, 0, 0, 153, 154, 155, 0, 0, 0, 156, 157, 158, 159, 0, 0, 160, 161, 162, 163, 0, 164, 165, 166, 167, 168, 169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 171, 172, 173, 174, 174.1, 175, 176, 177, 0, 0, 0, 0, 0, 0, 178, 179, 0, 0, 0, 0, 0, 180, 0, 181, 182, 0, 183, 184, 185, 186, 186.1, 187, 188, 188.1]
}); //array containing sequence of html pages to be rendered along with quizzes. where all quizzes are marked with 0. 
//contentList contains all the static pages sequence starting from 1st index
fpControllers.value('myList', {
    contentList: ["", 0.01, 0.02, 0.1, 0, 0.2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9.1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23.1, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 56.1, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 70.1, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 100.1, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 117.1, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 129.1, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 144.1, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 174.1, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 186.1, 187, 188, 188.1]
}); //array containing sequence of html pages to be rendered. First index val of this array is not considered


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
            //alert($rootScope.htextc);
            $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
        });
        $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
        $(document).load().scrollTop(0);
    }

    $scope.getNext = function() {
        if ($rootScope.pager !== $rootScope.htextc.length) 
        {
            if ($rootScope.htextc[$rootScope.pager - 1].quizIndex === undefined) 
            {
                $rootScope.pager = $rootScope.pager + 1;
                sessionStorage.temp = $rootScope.pager;
                $rootScope.pageNumber = $rootScope.pageNumber + 1;
                sessionStorage.pageNumber = $rootScope.pageNumber;
                $rootScope.htext = $rootScope.htextc[$rootScope.pager - 1].title;
                $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; //code changed
                $(document).load().scrollTop(0);
            } 
            else 
            {
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
        } 
        else 
        {
            location.href = "dbtoc.html";
        }
    };

    $scope.getPrev = function() {
        if ($rootScope.pager <= 1) 
        {
            location.href = "dbtoc.html";
        } 
        else if (!($rootScope.htextc[$rootScope.pager - 2].quizIndex === undefined)) 
        {
            sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 2].quizIndex;
            sessionStorage.quizDirection = "Backward";
            sessionStorage.startIndex = Number($rootScope.htextc[$rootScope.pager - 2].startIndex);
            sessionStorage.endIndex = Number($rootScope.htextc[$rootScope.pager - 2].endIndex);
            sessionStorage.quizNum = null;
            sessionStorage.temp = $rootScope.pager;
            $rootScope.pageNumber = $rootScope.pageNumber - 1;
            sessionStorage.pageNumber = $rootScope.pageNumber;
            location.href = "quiz1.html";
        } 
        else 
        {
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
        //coomplet code below is changed
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

fpControllers.controller('ContentCtrl', ['$scope', '$http', '$rootScope', function(myVars, $scope, $http, $rootScope) {

    $rootScope.indexToShow;
    $http.get('data/content.json').success(function(data) {
        $rootScope.cont = data;
        $rootScope.contents = $rootScope.cont[Number(sessionStorage.indexToShow)];
        $rootScope.indexToShow = sessionStorage.indexToShow;
    });
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


fpControllers.controller('quiztype1', function(myVars, $scope, $http, $rootScope, $location) {
    if (sessionStorage.temp === null || sessionStorage.temp === undefined) {
        window.location.href = "page1.html";
    }
    $scope.res = [];
    $scope.ans = "";
    $scope.index = 0;
    $scope.quizs = "";
    $rootScope.quizindex;
    $rootScope.quizpageNumber = Number(sessionStorage.pageNumber);
    $rootScope.quizSet = sessionStorage.quizTemp;
    $http.get('data/' + $rootScope.quizSet + '.json').success(function(data) {
        $rootScope.quizs = data;
        if ((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null) {
            $rootScope.quiz = $rootScope.quizs[Number(sessionStorage.quizNum)];
        } else {
            if (sessionStorage.quizDirection === "Forward") {
                $rootScope.quiz = $rootScope.quizs[sessionStorage.startIndex];
            } else {
                $rootScope.quiz = $rootScope.quizs[sessionStorage.endIndex];
            }
        }
        if ($rootScope.quiz.type === "Matchquiz") {
            var text = "Quiz " + $rootScope.quiz.id + " : " + $rootScope.quiz.question;
            $("#questionmtf").html(text);
            $("#qt1").hide();
            $("#qt2").show();
            $("#qt3").hide();
            $("#q1mtf").hide();
            $scope.matchQuiz();
            $scope.hideImageMTF();
            if ($rootScope.quiz.colAimg !== undefined) {
                $scope.showImageMTF();
            }
        } else if ($rootScope.quiz.type === "FillQuiz") {
            var text = "Quiz " + $rootScope.quiz.id + " : " + $rootScope.quiz.question;
            $("#questionfib").html(text);
            $scope.fiilQuiz();
            $("#qt1").hide();
            $("#qt2").hide();
            $("#qt3").show();
        } else {
            $("#qt3").hide();
            $("#qt1").show();
            $("#qt2").hide();
            $scope.questionImage();
            $scope.checkboxRadio();
            $scope.verifyTypeQuiz();
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
        }
        if ((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null) {
            $rootScope.quizindex = Number(sessionStorage.quizNum);
        } else {
            if (sessionStorage.quizDirection === "Forward") {
                $rootScope.quizindex = Number(sessionStorage.startIndex);
            } else {
                $rootScope.quizindex = Number(sessionStorage.endIndex);
            }
        }
        $(document).load().scrollTop(0);
    });

    $scope.getNext = function() {
        $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
        if ($rootScope.quizindex > sessionStorage.endIndex) {
            if (sessionStorage.quizDirection === "Forward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager + 1;
            }
            $rootScope.quizpageNumber = $rootScope.quizpageNumber + 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            window.location.href = "page1.html";
        } else {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            if ($rootScope.quiz.type === "Matchquiz") {
                var text = "Quiz " + $rootScope.quiz.id + " : " + $rootScope.quiz.question;
                $("#questionmtf").html(text);
                $("#qt1").hide();
                $("#qt2").show();
                $("#qt3").hide();
                $("#q1mtf").hide();
                $scope.matchQuiz();
                $scope.hideImageMTF();
                if ($rootScope.quiz.colAimg !== undefined) {
                    $scope.showImageMTF();
                }
            } else if ($rootScope.quiz.type === "FillQuiz") {
                var text = "Quiz " + $rootScope.quiz.id + " : " + $rootScope.quiz.question;
                $("#questionfib").html(text);
                $scope.fiilQuiz();
                $("#qt1").hide();
                $("#qt2").hide();
                $("#qt3").show();
            } else {
                $("#qt3").hide();
                $("#qt1").show();
                $("#qt2").hide();
                $scope.questionImage();
                $scope.checkboxRadio();
                $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
                $("#q1m").hide();
                $scope.uncheck();
                $scope.verifyTypeQuiz();
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
            }
            $scope.res = [];
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber + 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
        }
    };

    $scope.getPrev = function() {
        $rootScope.quizindex = (Number($rootScope.quizindex) - 1);
        if ($rootScope.quizindex < sessionStorage.startIndex) {
            if (sessionStorage.quizDirection === "Backward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager - 1;
            }
            $rootScope.quizpageNumber = $rootScope.quizpageNumber - 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            window.location.href = "page1.html";
        } else {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            if ($rootScope.quiz.type === "Matchquiz") {
                var text = "Quiz " + $rootScope.quiz.id + " : " + $rootScope.quiz.question;
                $("#questionmtf").html(text);
                $("#qt1").hide();
                $("#qt2").show();
                $("#qt3").hide();
                $("#q1mtf").hide();
                //$("option[name='choice1']" ).hide();
                $scope.matchQuiz();
                $scope.hideImageMTF();
                if ($rootScope.quiz.colAimg !== undefined) {
                    $scope.showImageMTF();
                }
            } else if ($rootScope.quiz.type === "FillQuiz") {
                var text = "Quiz " + $rootScope.quiz.id + " : " + $rootScope.quiz.question;
                $("#questionfib").html(text);
                $scope.fiilQuiz();
                $("#qt1").hide();
                $("#qt2").hide();
                $("#qt3").show();
            } else {
                $("#qt3").hide();
                $("#qt1").show();
                $("#qt2").hide();
                $scope.questionImage();
                $scope.checkboxRadio();
                $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
                $("#q1m").hide();
                $scope.uncheck();
                $scope.verifyTypeQuiz();
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
            }
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber - 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            $scope.res = [];
        }
    };
    $scope.MyAlert = function(quiz, value) {
        if (quiz.correct.length <= 1) {
            if (value === quiz.correct) {
                $("#q1m").show();
                $("#q1m").css('background-color', 'lightgreen');
                $("#q1m").html("Congratulations! you got the <strong> correct answer : " + quiz.correct.toLowerCase() + "</strong><br><br><strong>" + "Justification : </strong>" + quiz.description[value]);
            } else {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is <strong> Incorrect! </strong> " + "<br><strong><br>" + "Justification : </strong>" + quiz.description[value]);
            }
        } else {
            if ($scope.res.indexOf(value) === -1) {
                $scope.res.push(value);
            } else {
                $scope.index = $scope.res.indexOf(value);
                $scope.res.splice($scope.index, 1);
            }
        }
    };

    $scope.checkboxquiz = function(quiz) {
        if (quiz.type !== "Verify") {
            var resTemp = [];
            var description = "<br><strong>Justification : </strong><br>";
            $scope.res = $scope.res.sort();
            $scope.ans = $scope.res.join('');
            for (i = 0; i < $scope.res.length; i++) {
                description = description + ("<strong>" + $scope.ans[i].toLowerCase() + "</strong> : " + quiz.description[$scope.ans[i]] + "<br>");
            }
            if ($scope.ans === quiz.correct) {
                for (i = 0; i < $scope.res.length; i++) {
                    resTemp.push($scope.res[i].toLowerCase());
                }
                var correctAnswer = resTemp.join(',');

                $("#q1m").css('background-color', 'lightgreen');
                $("#q1m").html("Congratulations! You got the <strong> correct answer : " + correctAnswer + "</strong><br>" + description);
                $("#sA").fadeOut(function() {
                    $("#q1m").show();
                });
            } else if ($scope.ans.length === 0) {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Please <strong>choose an option</strong>");
            } else {
                var partialCorrect = false;
                for (i = 0; i < $scope.res.length; i++) {
                    if (quiz.correct.includes($scope.res[i])) {
                        partialCorrect = true;
                        continue;
                    } else {
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
        } else {
            if (quiz.imgURLFlag !== undefined && quiz.imgURLFlag === "Stay") {
                $('#sA').fadeOut();
                $('#answerImageText').html($rootScope.quiz.imgAnsText);
                $('#answerImageText').fadeIn(function() {
                    if ($rootScope.quiz.imgAnsURL !== undefined) {
                        $("#quizAnswerImage").fadeIn();
                    } else {
                        $("#quizVerifyAnswerImage").fadeIn();
                    }
                });
            } else {
                $('#sA').fadeOut();
                $('#answerImageText').html($rootScope.quiz.imgAnsText);
                $("#quizVerifyQuestionImage").fadeOut(function() {
                    $('#answerImageText').fadeIn(function() {
                        if ($rootScope.quiz.imgAnsURL !== undefined) {
                            $("#quizAnswerImage").fadeIn();
                        } else {
                            $("#quizVerifyAnswerImage").fadeIn();
                        }
                    });
                });
            }
        }
    };

    $scope.verifyTypeQuiz = function() {

        if ($rootScope.quiz.type === "Verify") {
            $('#sA').html('Display Output');
        } else {
            $('#sA').html('Submit');
        }
        $('#answerImageText').hide();
    };

    $scope.uncheck = function() {
        $('#answerImageText').hide();
        $('input[name=q1]').prop("checked", false);
    };

    $scope.questionImage = function() {
        if ($rootScope.quiz.imgURL === "") {
            $('#quizQuestionImage').hide();
        } else {
            $('#quizQuestionImage').show();
        }
        if ($rootScope.quiz.imgQuestionURL === "") {
            $('#quizVerifyQuestionImage').hide();
        } else {
            $('#quizVerifyQuestionImage').show();
        }
        if ($rootScope.quiz.query !== undefined) {
            $("#query").html($rootScope.quiz.query);
            $("#query").show();
        } else {
            $("#query").hide();
        }
        if ($rootScope.quiz.query2 !== undefined) {
            $("#query2").html($rootScope.quiz.query2);
            $("#query2").show();
        } else {
            $("#query2").hide();
        }
        if ($rootScope.quiz.imgURL2 !== undefined) {
            $("#quizQuestionImage2").show();
        } else {
            $("#quizQuestionImage2").hide();
        }
        $("#quizAnswerImage").hide();
        $("#quizVerifyAnswerImage").hide();
    };

    $scope.checkboxRadio = function() {
        if ($rootScope.quiz.correct.length <= 1) {
            $rootScope.itype = "radio";
            $rootScope.istatus = "false";
            $('#sA').hide();
        } else {
            $rootScope.itype = "checkbox";
            $rootScope.istatus = "false";
            $('#sA').show();
        }
    };

    $scope.showImageOptions = function() {
        var id = "";
        for (i = 0; i < 7; i++) {
            id = "#img" + (i + 1);
            if ($rootScope.quiz.optionimg[i].option !== null) {
                $(id).attr('src', $rootScope.quiz.optionimg[i].option);
                $(id).show();
            }
        }
    };

    $scope.matchQuiz = function() {
        $("#bttbmtf").show();
        if ($rootScope.quiz.imgURL !== "" && $rootScope.quiz.imgURL !== undefined) {
            $("#imgmtf").show();
        } else {
            $("#imgmtf").hide();
        }
        if ($rootScope.quiz.imgQuestionURL !== "" && $rootScope.quiz.imgQuestionURL !== undefined) {
            $("#imgcentermtf").show();
        } else {
            $("#imgcentermtf").hide();
        }
        if ($rootScope.quiz.query !== "" && $rootScope.quiz.query !== undefined) {
            $("#querymtf").html($rootScope.quiz.query);
            $("#querymtf").show();
        } else {
            $("#querymtf").hide();
        }
        var id = "";
        for (i = 0; i < 9; i++) {
            id = "#option" + (i + 1) + "mtf";
            $(id).hide();
        }
        for (i = 0; i < $rootScope.quiz.colA.length; i++) {
            id = "#option" + (i + 1) + "mtf";
            $(id).show();
        }
        for (i = 1; i <= 9; i++) {
            var name = "option[name='choice" + i + "']";
            $(name).show();
        }
        for (i = $rootScope.quiz.colB.length + 1; i <= 9; i++) {
            var name = "option[name='choice" + i + "']";
            $(name).hide();
        }
    };

    $scope.showImageMTF = function() {
        var id = "";
        for (i = 0; i < $rootScope.quiz.colAimg.length; i++) {
            id = "#img" + (i + 1) + "mtf";
            if ($rootScope.quiz.colAimg[i].option !== null) {
                $(id).attr('src', $rootScope.quiz.colAimg[i].option);
                $(id).show();
            }
        }
    };

    $scope.hideImageOptions = function() {
        var id = "";
        for (i = 0; i < 9; i++) {
            id = "#img" + (i + 1);
            $(id).attr('src', '');
            $(id).hide();
        }
    };

    $scope.hideImageMTF = function() {
        var id = "";
        for (i = 0; i < 8; i++) {
            var selectId = "#a" + (i + 1);
            var selectElem = $(selectId);
            selectElem.css('color', '#424242');
            selectElem.val("default");
            id = "#img" + (i + 1) + "mtf";
            var elem = $(id);
            elem.attr('src', '');
            elem.hide();
        }
    };

    $scope.fiilQuiz = function() {
        if ($rootScope.quiz.imgURL !== "" && $rootScope.quiz.imgURL !== undefined) {
            $("#imgfib").show();
        } else {
            $("#imgfib").hide();
        }
        for (i = 1; i < 8; i++) {
            var temp = "#text" + i;
            var id = "#blank" + i;
            $(id).hide();
            $(temp).hide();
        }
        for (i = 1; i <= $rootScope.quiz.blanks; i++) {
            var id = "#blank" + i;
            $(id).show();
        }
        if ($rootScope.quiz.options !== undefined) {
            for (i = 1; i <= $rootScope.quiz.options.length; i++) {
                var id = "#text" + i;
                $(id).html($rootScope.quiz.options[i - 1].option);
                $(id).show();
            }
        }
    };

    $scope.populateOptions = function() {
        $("span").hide();
        $("input[name=q1]").hide();
        var temp = "";
        var inputElem = "";
        var br = "";
        for (i = 1; i < 10; i++) {
            br = "#br" + i;
            $(br).hide();
        }
        for (i = 0; i < $rootScope.quiz.options.length; i++) {
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

    $scope.checkmatch = function(quiz) {
        var noOfOptions = $rootScope.quiz.colA.length;
        var sec = [];
        for (i = 1; i <= noOfOptions; i++) {
            var temp = 'a' + i;
            sec.push(document.getElementById(temp));
        }
        var correctCount = 0;
        var correct = "";
        var incorrect = "";
        var description = "<strong>Justification :</strong><br>";
        var optionNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
        for (i = 0; i < sec.length; i++) {
            if (sec[i].value === quiz.Correct[i].option) {
                sec[i].style.color = "green";
                correctCount++;
                correct = correct + optionNames[i] + ",";
                if (quiz.description !== undefined) {
                    description = description + "<strong>" + optionNames[i] + " : </strong>" + quiz.description[i].option + "<br>";
                } else {
                    description = "";
                }
            } else {
                sec[i].style.color = "red";
                incorrect = incorrect + optionNames[i] + ",";
            }
        }
        correct = correct.slice(0, correct.length - 1);
        incorrect = incorrect.slice(0, incorrect.length - 1);
        if (correctCount === noOfOptions) {
            description = "<strong>Congratulations, you got the right answer!</strong><br><br>" + description;
            $("#q1mtf").css('background-color', 'lightgreen');
        } else if (correctCount === 0) {
            if (noOfOptions === 1) {
                description = "<strong>" + incorrect + " is Incorrect</strong>. Please try again.";
                $("#q1mtf").css('background-color', 'pink');
            } else {
                description = "<strong>" + incorrect + " are Incorrect</strong>. Please try again.";
                $("#q1mtf").css('background-color', 'pink');
            }
        } else {
            if (correctCount === 1 && noOfOptions === 2) {
                description = "<strong>" + correct + "</strong> is correct and <strong>" + incorrect + "</strong> is incorrect.<br><br>" + description;
            } else if (correctCount === 1) {
                description = "<strong>" + correct + "</strong> is correct and <strong>" + incorrect + "</strong> are incorrect.<br><br>" + description;
            } else if (correctCount === noOfOptions - 1) {
                description = "<strong>" + correct + " </strong>are correct and <strong>" + incorrect + "</strong> is incorrect.<br><br>" + description;
            } else {
                description = "<strong>" + correct + " </strong>are correct and <strong>" + incorrect + " </strong>are incorrect.<br><br>" + description;
            }
            $("#q1mtf").css('background-color', 'pink');
        }
        $("#q1mtf").html(description);
        if (correctCount === noOfOptions) {
            if (quiz.CumulativeDescription !== undefined) {
                description = "<strong>Congratulations, you got the right answer!</strong><br>" + quiz.CumulativeDescription;
                $("#q1mtf").html(description);
            }
            $("#bttbmtf").fadeOut(function() {
                $("#q1mtf").fadeIn();
            });
        } else {
            $("#q1mtf").fadeIn();
        }
    };

    $scope.checkfillup = function(quiz) {
        var ans = [];
        for (i = 1; i <= quiz.blanks; i++) {
            var temp = "#t" + i;
            ans.push($(temp).val());
        }
        for (i = 0; i < quiz.blanks; i++) {
            var id = "t" + (i + 1);
            if (ans[i].toLowerCase() === quiz.Correct[i].toLowerCase()) {
                document.getElementById(id).style.color = "Green";
            } else {
                document.getElementById(id).style.color = "Red";
            }
        }
    };
});