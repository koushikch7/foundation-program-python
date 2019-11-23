/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fpControllers=angular.module('fpControllers',[]);

fpControllers.value('myVars', {
    pageList: [0.01,0.2,0.3,0, 1, 0.1, 2, 3, 4, 5, 6, 6.1, 7, 8, 9,  10, 11, 12, 13, 0, 14, 15, 15.1, 16, 17, 18, 19, 20, 0, 0, 21, 22, 0, 23,  24, 25, 0, 0, 0, 26, 27, 28, 29, 29.1, 30, 31, 32, 33, 34, 35, 36, 0, 0, 37, 38, 39, 40, 40.1, 41, 42, 43, 44, 45, 0, 46, 47, 48, 48.1, 49, 50, 51, 52, 0, 0, 53, 54, 55, 56, 56.1, 57, 58, 59, 0, 0, 0, 60, 61, 62, 63, 63.1, 64, 64.1,65,66,66.1]
}); //array containing sequence of html pages to be rendered along with quizzes. where all quizzes are marked with 0. 
//contentList contains all the static pages sequence starting from 1st index
fpControllers.value('myList', {
    contentList: ["", 0.01,0.2,0.3,0, 1, 0.1, 2, 3, 4, 5, 6, 6.1, 7, 8, 9,  10, 11, 12, 13, 14, 15, 15.1, 16, 17, 18, 19, 20, 21, 22, 23,  24, 25, 26, 27, 28, 29, 29.1, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 40.1, 41, 42, 43, 44, 45, 46, 47, 48, 48.1, 49, 50, 51, 52, 53, 54, 55, 56, 56.1, 57, 58, 59, 60, 61, 62, 63, 63.1, 64, 64.1,65,66,66.1]
}); //array containing sequence of html pages to be rendered. First index val of this array is not considered


fpControllers.factory('Data', ['$http','$rootScope', function($http,$rootScope){
	return {
                 indexToShow:0,
                 getContentData: function() {
                    return $http.get('data/content.json').then(function(result) {
                     $rootScope.cont=result.data;
                    
		}
		);
	},
               getIndexData:function(){
                  return $http.get('data/CheckListItems.json').then(function(result){
                        $rootScope.categories=result.data;
                  });
              }
             
          };  
              
        }]);

fpControllers.controller('paging',function(myVars,myList,$scope,$rootScope,$http,$location,$routeParams){
   //alert("hi");
	//$rootScope.px760 = [13,17,19,20,21,22,48,23]; // the pager numbers of pages whose height should not be resized
   if(sessionStorage.pgtemp==undefined && sessionStorage.temp==undefined)
   {
	   //alert("if");
	   $rootScope.pageNumber = 1;
    $rootScope.pager=1;
    $http.get('data/headertext.json').success(function(data) {
                $rootScope.htextc=data;
                $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
            });
    
    $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
   }
   else
   {
	   //alert("else");
	   //alert(sessionStorage.temp);
       $rootScope.pager=Number(sessionStorage.temp);
       //alert($rootScope.pager)
       $rootScope.pageNumber = Number(myVars.pageList.indexOf(myList.contentList[$rootScope.pager])) + 1; 
       $http.get('data/headertext.json').success(function(data) {
                $rootScope.htextc=data;
                $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
            });
    
       $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
    $(document).load().scrollTop(0);
   }
   $scope.getNext=function(){
       if ($rootScope.pager!==$rootScope.htextc.length)
       {
    	   if (!($rootScope.htextc[$rootScope.pager - 1].quizIndex === undefined)) {
    		   //alert("quizif");
               sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 1].quizIndex;
               sessionStorage.quizDirecttion = "Forward";
               sessionStorage.startIndex = Number($rootScope.htextc[$rootScope.pager - 1].startIndex);
               sessionStorage.endIndex = Number($rootScope.htextc[$rootScope.pager - 1].endIndex);
               sessionStorage.quizNum = null;
               sessionStorage.temp = $rootScope.pager;
               $rootScope.pageNumber = $rootScope.pageNumber + 1;
               sessionStorage.pageNumber = $rootScope.pageNumber;
               location.href = "quiz1.html";
               $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
           } 
           else
           {
        	   //alert("quizelse");
           $rootScope.pager=$rootScope.pager+1;
           sessionStorage.temp=$rootScope.pager;
     $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
     $rootScope.pg = myList.contentList[$rootScope.pager] + '.html';
     $(document).load().scrollTop(0);
     $rootScope.pageNumber = $rootScope.pageNumber + 1;
     sessionStorage.pageNumber = $rootScope.pageNumber;
     
     }
       }
       else
       {
           location.href="dbtoc.html";
       }
   };
   
     $scope.getPrev=function(){
    	 if($rootScope.pager<=1)
         {
             location.href="dbtoc.html";
         }
    	 else if (!($rootScope.htextc[$rootScope.pager - 2].quizIndex === undefined)) {
             sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 2].quizIndex;
             sessionStorage.quizDirecttion = "Backward"; 
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
     $rootScope.pager=$rootScope.pager-1;
     sessionStorage.temp=$rootScope.pager;
     $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
     $rootScope.pg=$rootScope.pager+'.html';
     $(document).load().scrollTop(0);
     $rootScope.pageNumber = $rootScope.pageNumber - 1;
     sessionStorage.pageNumber = $rootScope.pageNumber;
     $rootScope.pg = myList.contentList[$rootScope.pager] + '.html'; 
         }
   };
   
   $scope.reSizing = function(){
	   var id = "#p";
	   id = id + myList.contentList[$rootScope.pager];
	    var ida = id+" a";
	    $(id).width("1200px");
	    $(ida).css('color','#0000ee');
   };
   
   //Edited from here
   
   $('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');
   
    $('a.back-to-top').css("visibility", 'hidden');
//   var amountScrolled = 50;
//
//   $(window).scroll(function() {
//   	if ( $(window).scrollTop() > amountScrolled ) {
//   		$('a.back-to-top').fadeIn('slow');
//   	} else {
//   		$('a.back-to-top').fadeOut('slow');
//   	}
//   });
//
//   $('a.back-to-top, a.simple-back-to-top').click(function() {
//   	$('html, body').animate({
//   		scrollTop: 0
//   	}, 700);
//   	return false;
//   });
   
   //Edited till here
});

fpControllers.controller('headerCategoryController', function(myVars, myList, $scope,$rootScope,Data) {
    Data.getContentData();
    $rootScope.indexer=1;
    $scope.checkIndex=function(){
        
    };
     if($rootScope.indexToShow==undefined)
     { 
       $rootScope.indexToShow=0;
     }
   else
   {
    $rootScope.contents = $rootScope.cont[$rootScope.indexToShow]; 
    }
   Data.getIndexData();

$scope.getContent=function(category){
    $rootScope.pg=category.slideindex+".html";
    sessionStorage.pgtemp=$rootScope.pg;
    
    
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
$scope.getQuiz1=function(category){
     if(typeof(Storage)!=="undefined")
        {
            //alert("Hi");
            if (sessionStorage.quizindex)
             {
                 //alert("Hi");
                   sessionStorage.quizindex=category.quizindex;
             }
            else
             {
                   sessionStorage.quizindex=0;
             }

          }
};
});

fpControllers.controller('ContentCtrl',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
   // alert("h1");
    $rootScope.indexToShow;
    $http.get('data/content.json').success(function(data) {
                //alert(data[0].Title);
                //alert(data[1].Title);
                $rootScope.cont=data;
                $rootScope.contents = $rootScope.cont[Number(sessionStorage.indexToShow)]; 
                $rootScope.indexToShow=sessionStorage.indexToShow;
                //alert($scope.contents.topic[0].Title);
                
            });
  $scope.getNextContent=function(){
      //alert("Hi");
       $rootScope.indexToShow = (Number($rootScope.indexToShow) + 1);
      //alert($rootScope.indexToShow);
    if($rootScope.indexToShow===$rootScope.cont.length)
    {
        alert("End of the session");
    }
    else
    {
     
        // alert($rootScope.indexToShow);
         $rootScope.contents=$rootScope.cont[$rootScope.indexToShow];
    }
};
 $scope.getPrevContent=function(){
     //alert("Hi");
       $rootScope.indexToShow = (Number($rootScope.indexToShow) - 1);
      
    if($rootScope.indexToShow<0)
    {
        alert("Begining of the session");
    }
    else
    {
     
        // alert($rootScope.indexToShow);
         $rootScope.contents=$rootScope.cont[$rootScope.indexToShow];
    }
};
}]);


fpControllers.controller('quiztype1', function ($scope, $http, $rootScope, $location) {
    $scope.res = [];
    $scope.ans = "";
    $scope.index = 0;
    $scope.quizs = "";
    $rootScope.quizindex;
    $rootScope.quizSet = sessionStorage.quizTemp;
    $rootScope.quizpageNumber = Number(sessionStorage.pageNumber);
    $http.get('data/' + $rootScope.quizSet + '.json').success(function (data) {
        $rootScope.quizs = data;
        $rootScope.quizLength = $rootScope.quizs.length
        if((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null){         
            $rootScope.quiz = $rootScope.quizs[Number(sessionStorage.quizNum)];
        }
        else{
        if (sessionStorage.quizDirecttion === "Forward") {
            $rootScope.quiz = $rootScope.quizs[0];
        }
        else {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizs.length - 1];
        }
    }
        
        //
        if($rootScope.quiz.qtype=="fillup")
        {
           // alert("Hi");
           //alert($rootScope.quiz.Correct.length);
           
           
            document.getElementById('qt2').style.visibility="visible";
            document.getElementById('qt2').style.display="block";
            document.getElementById('qt1').style.visibility="hidden";
             document.getElementById('qt1').style.display="none";
            document.getElementById('qt3').style.visibility="hidden";
             document.getElementById('qt3').style.display="none";
            
        }
        else if($rootScope.quiz.qtype=="matchquiz")
        {
            document.getElementById('qt3').style.visibility="visible";
            document.getElementById('qt3').style.display="block";
            document.getElementById('qt1').style.visibility="hidden";
             document.getElementById('qt1').style.display="none";
            document.getElementById('qt2').style.visibility="hidden";
             document.getElementById('qt2').style.display="none";
             
             $scope.noOfOptionsMTF();
        }
        else if($rootScope.quiz.qtype="multichoice"){
            //alert("Hi");
            document.getElementById('qt1').style.visibility="visible";
                   document.getElementById('qt1').style.display="block";
            document.getElementById('qt2').style.visibility="hidden";
                   document.getElementById('qt2').style.display="none";
            document.getElementById('qt3').style.visibility="hidden";
                   document.getElementById('qt3').style.display="none";
            
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
        if ($rootScope.quiz.fileURL !== undefined && $rootScope.quiz.fileURL !== "" ) {
            $("#DownloadScripts").show();
        }
        $scope.populateOptions();
        }
       
        if((!isNaN(sessionStorage.quizNum)) && sessionStorage.quizNum !== null){
            $rootScope.quizindex = Number(sessionStorage.quizNum);
        }
        else{
        if (sessionStorage.quizDirecttion === "Forward") {
            $rootScope.quizindex = 0;
        }
        else {
            $rootScope.quizindex = $rootScope.quizs.length - 1;
        }
    }
        $(document).load().scrollTop(0);
    });

    $scope.getNext = function () {
    	
    	//alert("Hi");
    	$("#q1mtf").hide();
        $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
        if ($rootScope.quizindex === $rootScope.quizs.length) {
        	//alert(location);
            if (sessionStorage.quizDirecttion === "Forward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager + 1;
            }
            location.href = "page1.html";
        }
        else {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            
            if($rootScope.quiz.qtype=="fillup")
            {
                
                 alert($('#t0').val());
                 //if($rootScope.quiz.Correct.length==1){
                  // document.getElementById('t0').style.visibility="visible";
                   //document.getElementById('t1').style.visibility="hidden";
                   //document.getElementById('t2').style.visibility="hidden";
                   
               //}
               //else if($rootScope.quiz.Correct.length==2)
               //{
                 //  document.getElementById('t0').style.visibility="visible";
                   //document.getElementById('t1').style.visibility="visible";
                   //document.getElementById('t2').style.visibility="hidden";
              // }
               //else if($rootScope.quiz.Correct.length==3)
               //{
                 //  document.getElementById('t0').style.visibility="visible";
                  // document.getElementById('t1').style.visibility="visisble";
                   //document.getElementById('t2').style.visibility="visisble";
              // }
                document.getElementById('qt2').style.visibility="visible";
                document.getElementById('qt2').style.display="block";
                document.getElementById('qt1').style.visibility="hidden";
                 document.getElementById('qt1').style.display="none";
                document.getElementById('qt3').style.visibility="hidden";
                 document.getElementById('qt3').style.display="none";
                
            }
            else if($rootScope.quiz.qtype=="matchquiz")
            {
                document.getElementById('qt3').style.visibility="visible";
                document.getElementById('qt3').style.display="block";
                document.getElementById('qt1').style.visibility="hidden";
                 document.getElementById('qt1').style.display="none";
                document.getElementById('qt2').style.visibility="hidden";
                 document.getElementById('qt2').style.display="none";
                 //
                 $scope.noOfOptionsMTF();
                 //$scope.uncheck1();
                 //$scope.checkmatch();
                 /*$scope.hideImageMTF();
                 if($rootScope.quiz.colAimg !== undefined)
                 {
                   $scope.showImageMTF();
                 }  */ 
            }
            else if($rootScope.quiz.qtype="multichoice"){
                //alert("Hii");
                document.getElementById('qt1').style.visibility="visible";
                       document.getElementById('qt1').style.display="block";
                document.getElementById('qt2').style.visibility="hidden";
                       document.getElementById('qt2').style.display="none";
                document.getElementById('qt3').style.visibility="hidden";
                       document.getElementById('qt3').style.display="none";
                       
                             
                $scope.questionImage();
                $scope.checkboxRadio();
                $scope.verifyTypeQuiz();
                $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
                $("#q1m").hide();
                $scope.uncheck();
                $scope.populateOptions();
                $scope.hideImageOptions();
                if (!($rootScope.quiz.optionimg === undefined)) {
                    $scope.showImageOptions();
                }
                $("#DownloadScripts").hide();
               if ($rootScope.quiz.fileURL !== undefined && $rootScope.quiz.fileURL !== "" ) {
            $("#DownloadScripts").show();
        }
            }
                $scope.res = [];
                $(document).load().scrollTop(0);
                $rootScope.quizpageNumber = $rootScope.quizpageNumber + 1;
                sessionStorage.pageNumber = $rootScope.quizpageNumber;
            }
    };

    $scope.getPrev = function () {
    	$("#q1mtf").hide();
        $rootScope.quizindex = (Number($rootScope.quizindex) - 1);
        if ($rootScope.quizindex < 0) {

            if (sessionStorage.quizDirecttion === "Backward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager - 1;
            }
            location.href = "page1.html";
        }
        else {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            
            //alert($('#t0').val());
            if($rootScope.quiz.qtype=="fillup")
             {
            //alert("Hi");
            
//             if($rootScope.quiz.Correct.length==1){
//               document.getElementById('t0').style.visibility="visible";
//               document.getElementById('t1').style.visibility="hidden";
//               document.getElementById('t2').style.visibility="hidden";
//               
//           }
//           else if($rootScope.quiz.Correct.length==2)
//           {
//               document.getElementById('t0').style.visibility="visible";
//               document.getElementById('t1').style.visibility="visible";
//               document.getElementById('t2').style.visibility="hidden";
//           }
//           else if($rootScope.quiz.Correct.length==3)
//           {
//               document.getElementById('t0').style.visibility="visible";
//               document.getElementById('t1').style.visibility="visisble";
//               document.getElementById('t2').style.visibility="visisble";
//           }
            document.getElementById('qt2').style.visibility="visible";
            document.getElementById('qt2').style.display="block";
            document.getElementById('qt1').style.visibility="hidden";
             document.getElementById('qt1').style.display="none";
            document.getElementById('qt3').style.visibility="hidden";
             document.getElementById('qt3').style.display="none";
            
        }
        else if($rootScope.quiz.qtype=="matchquiz")
        {
            document.getElementById('qt3').style.visibility="visible";
            document.getElementById('qt3').style.display="block";
            document.getElementById('qt1').style.visibility="hidden";
             document.getElementById('qt1').style.display="none";
            document.getElementById('qt2').style.visibility="hidden";
             document.getElementById('qt2').style.display="none";
             
             $scope.noOfOptionsMTF();
        }
        else if($rootScope.quiz.qtype="multichoice"){
            //alert("Hii");
            document.getElementById('qt1').style.visibility="visible";
                   document.getElementById('qt1').style.display="block";
            document.getElementById('qt2').style.visibility="hidden";
                   document.getElementById('qt2').style.display="none";
            document.getElementById('qt3').style.visibility="hidden";
                   document.getElementById('qt3').style.display="none";
                   
            $scope.questionImage();
            $scope.checkboxRadio();
            $scope.verifyTypeQuiz();
            $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
            $("#q1m").hide();
            $scope.uncheck();
            $scope.populateOptions();
            $scope.hideImageOptions();
            if (!($rootScope.quiz.optionimg === undefined)) {
                $scope.showImageOptions();
            }
            $("#DownloadScripts").hide();
            if ($rootScope.quiz.fileURL !== undefined && $rootScope.quiz.fileURL !== "" ) {
            $("#DownloadScripts").show();
        }
        }
            $(document).load().scrollTop(0);
            $rootScope.quizpageNumber = $rootScope.quizpageNumber - 1;
            sessionStorage.pageNumber = $rootScope.quizpageNumber;
            $scope.res = [];
        }
    };
    
  
    
    $('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');


    var amountScrolled = 50;

    $(window).scroll(function() {
    	if ( $(window).scrollTop() > amountScrolled ) {
    		$('a.back-to-top').fadeIn('very slow');
    	} else {
    		$('a.back-to-top').fadeOut('very slow');
    	}
    });

    $('a.back-to-top, a.simple-back-to-top').click(function() {
    	$('html, body').animate({
    		scrollTop: 0
    	}, 700);
    	return false;
    });
    
    //Edited till here
    
    $scope.MyAlert = function (quiz, value) {
        if (quiz.correct.length <= 1) {
            if (value === quiz.correct) {
                $("#q1m").show();
                $("#q1m").css('background-color', 'lightgreen');
                $("#q1m").html("Congratulations! you got the"+"<b>"+" correct answer : " + quiz.correct.toLowerCase() + "<br><br>" + "Justification :</b> " + quiz.description[value]);
            }
            else {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is <b>Incorrect! " + "<br><br>" + "Justification : </b>" + quiz.description[value]);
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
    
    $scope.verifyTypeQuiz = function () {

        if($rootScope.quiz.type=== "Verify")
        {
            $('#sA').html('Display Output');
        }
        else
            {
            $('#sA').html('Submit');
        }
        $('#answerImageText').hide();
        $('#answerImageText').hide();
    };

    $scope.checkboxquiz = function (quiz) {
    	
    	if(quiz.imgAnsURL === undefined && quiz.imgAnsURLLeft === undefined )
        {
    		
        var description = "<b>Justification : <br></b>";
        $scope.res = $scope.res.sort();
        $scope.ans = $scope.res.join('');
        for (i = 0; i < $scope.res.length; i++) {
                description = description + ($scope.ans[i].toLowerCase() + " : " + quiz.description[$scope.ans[i]] + "<br>");
            }
        if ($scope.ans === quiz.correct) {
            
            $("#q1m").show();
            $("#q1m").css('background-color', 'lightgreen');
            $("#q1m").html("Congratulations! You got the <b> correct answer : " + quiz.correct.toLowerCase() + "<br><br></b>" + description);
        }
        else if ($scope.ans.length === 0) {
            $("#q1m").show();
            $("#q1m").css('background-color', 'pink');
            $("#q1m").html("Please choose an option");
        }
        else {
            
            var partialCorrect = false;
            for (i = 0; i < $scope.res.length; i++) {
                if (quiz.correct.includes($scope.res[i])) {
                    partialCorrect = true;
                    continue;
                }
                else {
                    partialCorrect = false;
                    break;
                }
            }
            if (partialCorrect === true) {
                $("#q1m").show();
                $("#q1m").css('background-color', '#ccff66');
                if($scope.ans.length === 1){
                   $("#q1m").html("Your answer is <b>partially correct</b> and has more correct option(s)!" + "<br><br>" + description);
                }else{
                   $("#q1m").html("Your answer is <b>partially correct</b> and has more correct option(s)!" + "<br><br>" + description);
  
                    }
            }
            else {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is <b>Incorrect!</b>" + "<br><br>" + description);
            }
        }}
    	else {
    		//alert("fade");
    		 $('#sA').fadeOut();
             $('#answerImageText').html($rootScope.quiz.imgAnsText);
             $('#answerImageText').fadeIn(function()
             {
                 //if($rootScope.quiz.imgAnsURL !== undefined)
                 //{
            	 $("#sepLine").fadeIn(); 
                    $("#quizAnswerImage").fadeIn(); 
                 //}
                 //else
                 //{
                   //  $("#quizVerifyAnswerImage").fadeIn();
                 //}
                 
             });
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
        if($rootScope.quiz.query !== undefined ){
            $("#query").html($rootScope.quiz.query);
            $("#query").show();            
        }else{
            $("#query").hide();
        }
        $("#quizAnswerImage").hide();
        $("#sepLine").hide();
        $("#quizVerifyAnswerImage").hide();
    };

    $scope.checkboxRadio = function () {
        if ($rootScope.quiz.correct.length <= 1) {
            $rootScope.itype = "radio";
            $rootScope.istatus = "false";
            $('#sA').hide();
        }
        else {
            $rootScope.itype = "checkbox";
            $rootScope.istatus = "false";
            $('#sA').show();
        }
    };

    $scope.showImageOptions = function () {
        var id = "";
        for (i = 0; i < 7; i++) {
            id = "#img" + (i + 1);
            if ($rootScope.quiz.optionimg[i].option !== null) {
                $(id).attr('src', $rootScope.quiz.optionimg[i].option);
                $(id).show();
            }
        }
    };

    $scope.hideImageOptions = function () {
        var id = "";
        for (i = 0; i < 9; i++) {
            id = "#img" + (i + 1);
            $(id).attr('src', '');
            $(id).hide();
        }
    };
    
    $scope.noOfOptionsMTF = function () 
    {
    	/*$("span").hide();
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
        }*/
    	
    	//
        if($rootScope.quiz.imgURL !== "" && $rootScope.quiz.imgURL !== undefined )
            {
                $("#imgmtf").show();
            }
        else
            {
                $("#imgmtf").hide();
            }
            
        if($rootScope.quiz.query !== "" && $rootScope.quiz.query !== undefined )
            {
                $("#querymtf").html($rootScope.quiz.query);
                $("#querymtf").show();
            }
        else
            {
                $("#querymtf").hide();
            }
        var id = "";
        for (i = 0; i < 9; i++) 
        {
            id = "#option" + (i + 1) + "mtf";
            $(id).hide();            
        }
        for (i = 0; i < $rootScope.quiz.colA.length; i++) 
        {
            id = "#option" + (i + 1) + "mtf";
            $(id).show();
        }
        for (i= $rootScope.quiz.colB.length +1 ; i<=9 ; i++ )
        {
           
            var name = "option[name='choice" + i + "']";
            //alert(name)
            $(name).hide();
        }
    };

    $scope.populateOptions = function () {
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
    
    $scope.checkmatch=function(quiz){
  		//alert("Hi");
    	
    	 var correctCount = 0;
         var correct = "";
         var incorrect = "";
         var description = "<strong>Justification :</strong><br>"
             var optionNames = ['1', '2', '3', '4', '5', '6', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
             var options=['A','B','C','D','E'];
             var noOfOptions = $rootScope.quiz.colA.length;
    	sec=[];i=0;
        $('select[id="a1"]').each(function(){
        	//sec.push(document.getElementById("a1"));
        	 sec[i]= $(this).val();
             i++;

});
        i=0;
        	//alert(sec[2]);
                 $('select[id="a1"]').each(function(){
                	 //alert(sec[i].value);
                                if( sec[i]===quiz.Correct[i].option)
                                                {
                                	//alert(sec[i].value);
                                                                $(this).css({'color':'Green'});
                                                                //alert("correct");
                                                                correctCount++;
                                                                correct = correct + optionNames[i]+"," ; 
                                                                //alert(quiz.descriptions[i].option);
                                                                description = description + "<strong>" + optionNames[i] + " : </strong>" + quiz.descriptions[i].option + "<br>";

                                                }
                                                else
                                                {
                                                                $(this).css({'color':'Red'});
                                                                incorrect =  incorrect + optionNames[i]+ "," ;
                                                                //alert("Wrong");
                                                }
                                i++;  
});       

	
	//Edited from here
	
	/*if(quiz.imgAnsURL === undefined && quiz.imgAnsURLLeft === undefined )
    {
		
    var description = "<b>Justification : <br></b>";
    $scope.res = $scope.res.sort();
    $scope.ans = $scope.res.join('');
    for (i = 0; i < $scope.res.length; i++) {
            description = description + ($scope.ans[i].toLowerCase() + " : " + quiz.description[$scope.ans[i]] + "<br>");
        }
    if ($scope.ans === quiz.correct) {
        
        $("#q1m").show();
        $("#q1m").css('background-color', 'lightgreen');
        $("#q1m").html("Congratulations! You got the <b> correct answer : " + quiz.correct.toLowerCase() + "<br></b>" + description);
    }
    else if ($scope.ans.length === 0) {
        $("#q1m").show();
        $("#q1m").css('background-color', 'pink');
        $("#q1m").html("Please choose an option");
    }
    else {
        
        var partialCorrect = false;
        for (i = 0; i < $scope.res.length; i++) {
            if (quiz.correct.includes($scope.res[i])) {
                partialCorrect = true;
                continue;
            }
            else {
                partialCorrect = false;
                break;
            }
        }
        if (partialCorrect === true) {
            $("#q1m").show();
            $("#q1m").css('background-color', '#ccff66');
            if($scope.ans.length === 1){
               $("#q1m").html("The option chosen by you is <b>partially correct</b> ; but there is/are more correct option(s)!" + "<br><br>" + description);
            }else{
               $("#q1m").html("The options chosen by you are <b>partially correct</b> ; but there is/are more correct option(s)!" + "<br><br>" + description);

                }
        }
        else {
            $("#q1m").show();
            $("#q1m").css('background-color', 'pink');
            $("#q1m").html("Your Answer is <b>Incorrect!</b>" + "<br><br>" + description);
        }
    }}
	else {
		//alert("fade");
		 $('#sA').fadeOut();
         $('#answerImageText').html($rootScope.quiz.imgAnsText);
         $('#answerImageText').fadeIn(function()
         {
             //if($rootScope.quiz.imgAnsURL !== undefined)
             //{
        	 $("#sepLine").fadeIn(); 
                $("#quizAnswerImage").fadeIn(); 
             //}
             //else
             //{
               //  $("#quizVerifyAnswerImage").fadeIn();
             //}
             
         });
	}*/
    	
    	//Edited from here
    	/*var noOfOptions = $rootScope.quiz.colA.length;
        var sec = [];
        //var opt=[];
        //alert(noOfOptions);
        for (i = 1; i <= noOfOptions; i++) {
            var temp = 'a' + i;
            //var option = 'option'+i
            sec.push(document.getElementById(temp));
            //opt.push(option);
        }
        //			 sec1=document.getElementById('a1');
        //			 sec2=document.getElementById('a2');
        //			 sec3=document.getElementById('a3');
        //                         sec4=document.getElementById('a4');
        //			 sec=[sec1,sec2,sec3,sec4];
        //                         opt=['option1','option2','option3','option4'];
        //                         
        //alert(sec.length);
        var correctCount = 0;
        var correct = "";
        var incorrect = "";*/
        /*var description = "<strong>Justification :</strong><br>"
        var optionNames = ['1', '2', '3', '4', '5', '6', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
        var options=['A','B','C','D','E'];*/
        //                        alert("Hi")
        /*for (i = 0; i < sec.length; i++) { //alert(sec[i].value);
            //alert(quiz.Correct[i].option);
            //|| sec[i].value === quiz.Correct2[i].option || sec[i].value === quiz.Correct3[i].option
            if (sec[i].value === quiz.Correct[i].option ) {
                //sec[i].style.color = "green";
                correctCount++;
                correct = correct + optionNames[i]+"," ; 
                //alert(quiz.descriptions[i].option);
                description = description + "<strong>" + optionNames[i] + " : </strong>" + quiz.descriptions[i].option + "<br>";
                

            } else {
                //sec[i].style.color = "red";
                incorrect =  incorrect + optionNames[i]+ "," ;
                //description = description + optionNames[i] + " : Your answer is Incorrect" + "<br>";
                //alert("Wrong");
            }
        }*/
        correct = correct.slice(0,correct.length-1);
        incorrect = incorrect.slice(0,incorrect.length-1);
        
        if (correctCount === noOfOptions) 
        {
            description = "<strong>Congratulations, you got the right answer!</strong><br><br>"+ description;
            $("#q1mtf").css('background-color', 'lightgreen');
        } 
        else if( correctCount === 0 ) 
        {
            description = "<strong>" + incorrect + " are Incorrect</strong>. Please try again.";
            $("#q1mtf").css('background-color', 'pink');
        }
        else
        {
        	//alert("corr "+correctCount);
        	//alert("options"+noOfOptions);
            if(correctCount === 1 && noOfOptions === 2)
            {
                description = "<strong>" +correct + "</strong> is correct and <strong>" + incorrect + "</strong> is incorrect.<br><br>" + description;
            }
            else if(correctCount === 1)
            {
                description = "<strong>" +correct + "</strong> is correct and <strong>" + incorrect + "</strong> are incorrect.<br><br>" + description;
            }
            else if(correctCount === noOfOptions - 1)
            {
                description = "<strong>" +correct + " </strong>are correct and <strong>" + incorrect + "</strong> is incorrect.<br><br>" + description;
            }
            else
            {
                description = "<strong>" +correct + " </strong>are correct and <strong>" + incorrect + " </strong>are incorrect.<br><br>" + description;
           
            }
            $("#q1mtf").css('background-color', 'pink');
        }
        $("#q1mtf").html(description);
        $("#q1mtf").show();
    	//
};
});

fpControllers.controller('quiztype2',function($scope,$rootScope,$http){
    
    $scope.quizs="";
   $rootScope.quizindex;
     $http.get('data/Quiz2.json').success(function(data) {
                $rootScope.quizs=data;
                //alert($rootScope.quizs);
                //alert(sessionStorage.quizindex);
                $rootScope.quiz = $rootScope.quizs[Number(sessionStorage.quizindex)]; 
                //alert($rootScope.quiz.id);
                $rootScope.quizindex=sessionStorage.quizindex;
                //alert($scope.quizs);
            }); 
            
            
             $scope.getNext=function(){
                 //alert("Hi");
                 var b;
                 var chx = document.getElementsByTagName('input');
  for (var i=0; i<chx.length; i++) {
    if (chx[i].type == 'radio' && chx[i].checked) {
      b= true;
    } 
  }
  if(b==true)
  {
       $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
      //alert($rootScope.quizindex);
    if($rootScope.quizindex===$rootScope.quizs.length)
    {
        alert("End of the session");
    }
    else
    {
     
        // alert($rootScope.indexToShow);
         $rootScope.quiz=$rootScope.quizs[$rootScope.quizindex];
         document.getElementById('pnlft').style.visibility="hidden";
         //alert(document.forms[0].question0.length);
         for(i=0;i<document.forms[0].question0.length;i++)
         {
           // alert("Hi");
            document.forms[0].question0[i].checked = false;
        }
    }
  }
  else
  {
      alert("Please select your answer");
  }
    };

 $scope.getPrev=function(){
     //alert("Hi");
	 $("#q1mtf").hide();
     var b;
                 var chx = document.getElementsByTagName('input');
  for (var i=0; i<chx.length; i++) {
    if (chx[i].type == 'radio' && chx[i].checked) {
      b= true;
    } 
  }
  if(b==true)
  {
       $rootScope.quizindex = (Number($rootScope.quizindex) - 1);
      
    if($rootScope.quizindex<0)
    {
        alert("Begining of the session");
    }
    else
    {
     
        // alert($rootScope.indexToShow);
         $rootScope.quiz=$rootScope.quizs[$rootScope.quizindex];
         document.getElementById('pnlft').style.visibility="hidden";
         //alert(document.forms[0].question0.length);
         for(i=0;i<document.forms[0].question0.length;i++)
         {
            //alert("Hi");
            document.forms[0].question0[i].checked = false;
        }
         
    }
    }
  else
  {
      alert("Please select your answer");
  }
};
$scope.MyAlert=function(quiz,value){
    //alert("Hi");
    //alert(value);
    //alert(quiz.correct);
   
      if(value==quiz.correct)
    {
        //alert("Hi");
        document.getElementById('pnlft').style.visibility="visible";
		//$('#question0').css('background-color','green');
		$('#pnlft').css('background-color','lightgreen');
		$('#pnlft').html("Correct Answer:" + quiz.correct );
    }
    else
    {
        document.getElementById('pnlft').style.visibility="visible";
		//$('#question0').css('background-color','red');
		$('#pnlft').css('background-color','pink');
		$('#pnlft').html("Incorrect! Correct Answer: " + quiz.correct +"<br>"+quiz.description);

    }
   
};
});

fpControllers.controller('quiztype3',function($scope){
    
});

fpControllers.controller('quiztype4',function($scope){
    
});

fpControllers.controller('indexCtrl',function($scope){
    
});
fpControllers.controller('AssignmentCtrl',function($scope,$rootScope,$http){
    $rootScope.indexToShow;
    $http.get('data/Assignment.json').success(function(data) {
                //alert(data[0].Title);
                //alert(data[1].Title);
                $rootScope.assign=data;
                $rootScope.assignment = $rootScope.assign[0]; 
                //$rootScope.indexToShow=sessionStorage.indexToShow;
                //alert($scope.contents.topic[0].Title);
                
            });
});

