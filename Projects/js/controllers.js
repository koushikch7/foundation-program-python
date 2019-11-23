/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fpControllers=angular.module('fpControllers',[]);

/*fpControllers.run(function($rootScope){
    SrootScope.indexToShow;
    $rootScope.cont;
    $rootScope.contents;
});*/

fpControllers.factory('Data', ['$http','$rootScope', function($http,$rootScope){
	return {
                 indexToShow:0,
                 getContentData: function() {
                    return $http.get('data/content.json').then(function(result) {
                     $rootScope.cont=result.data;
                     //console.log("isnide custom service");
                     //console.log("r="+rootScope.books);
		}
		);
	},
               getIndexData:function(){
                  return $http.get('data/CheckListItems.json').then(function(result){
                        $rootScope.categories=result.data;
                  });
              }
             /* getIndexToShow: function(){
               return $rootScope.indexno;   
              },
              setIndexToShow: function(value){
                  if ($rootScope.indexno==undefined)
                  {
                      $rootScope.indexno=indexToShow;
                  }
                  else
                  {
                      $rootScope.indexno=value;
                  }
              }*/
          };  
              
        }]);

fpControllers.controller('paging',function($scope,$rootScope,$http,$location,$routeParams){
        $rootScope.px760 = [13,17,19,20,21,22,48];
        
   if(sessionStorage.pgtemp==undefined && sessionStorage.temp==undefined)
   {
    $rootScope.pager=1;
     $rootScope.pageNumber = 1;
    $http.get('data/headertext.json').success(function(data) {
                $rootScope.htextc=data;
                $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
            });
    
    $rootScope.pg=$rootScope.pager+'.html';
   }
   else
   {
       $rootScope.pager=Number(sessionStorage.temp);
       $rootScope.pageNumber=1;
        $http.get('data/headertext.json').success(function(data) {
                $rootScope.htextc=data;
                $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
            });
    
    $rootScope.pg=$rootScope.pager+'.html';
    $(document).load().scrollTop(0);
   }
   $scope.getNext=function(){
       if ($rootScope.pager!==$rootScope.htextc.length)
       {
    	   if (!($rootScope.htextc[$rootScope.pager - 1].quizIndex === undefined)) {
               sessionStorage.quizTemp = $rootScope.htextc[$rootScope.pager - 1].quizIndex;
               sessionStorage.quizDirecttion = "Forward";
               sessionStorage.quizNum = null;
               sessionStorage.temp = $rootScope.pager;
               location.href = "quiz1.html";
               
           } 
           else
           {
           $rootScope.pager=$rootScope.pager+1;
           sessionStorage.temp=$rootScope.pager;
     $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
     $rootScope.pg=$rootScope.pager+'.html';
     $(document).load().scrollTop(0);
     }
      $rootScope.pageNumber=$rootScope.pageNumber+1;
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
             sessionStorage.quizNum = null;
             sessionStorage.temp = $rootScope.pager;
             location.href = "quiz1.html";          
         }
         else
         {
     $rootScope.pager=$rootScope.pager-1;
      $rootScope.pageNumber=$rootScope.pageNumber-1;
     sessionStorage.temp=$rootScope.pager;
     $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
     $rootScope.pg=$rootScope.pager+'.html';
     $(document).load().scrollTop(0);
         }
   };
   
   $scope.reSizing = function(){
      $("#jpedal").width("1200px");
      $("#jpedal a").html("");
      if($rootScope.px760.indexOf($rootScope.pager)=== -1){
          $("#jpedal").height("760px");    
      }
   };
});

fpControllers.controller('headerCategoryController', function($scope,$rootScope,Data) {
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
 /*  if($rootScope.indexToShow===undefined)
   {     
       //  $rootScope.contents; 
       // $rootScope.indexToShow;
       //$rootScope.cont;
     $http.get('data/content.json').success(function(data) {
                //alert(data[0].Title);
                //alert(data[1].Title);
                $rootScope.cont=data;
                $rootScope.contents = $rootScope.cont[$rootScope.indexToShow]; 
                //alert($scope.contents.topic[0].Title);
                
            });

   }*/
$scope.getContent=function(category){
    //alert("getContent "+category.slideindex);
    $rootScope.pg=category.slideindex+".html";
    sessionStorage.pgtemp=$rootScope.pg;
    sessionStorage.temp=Number(category.slideindex);
    //alert(sessionStorage.pgtemp);
    //location.href=category.slideindex+".html";
    
    
    /*$rootScope.contents=$rootScope.cont[category.slideindex];
    $rootScope.indexToShow=category.slideindex;
    if(typeof(Storage)!=="undefined")
        {
            if (sessionStorage.indexToShow)
             {
                   sessionStorage.indexToShow=category.slideindex;
             }
            else
             {
                   sessionStorage.indexToShow=0;
             }
          }*/

    //alert(sessionStorage.indexToShow);
    //alert($rootScope.contents.Title);
   
};
$scope.getQuiz1=function(category){
   // alert("Hi");
    //$rootScope.quiz=$rootScope.quizs[category.quizindex];
    
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
             //alert(sessionStorage.quizindex);
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
    $http.get('data/' + $rootScope.quizSet + '.json').success(function (data) {
        $rootScope.quizs = data;
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
        $scope.questionImage();
        $scope.checkboxRadio();
        $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
        $("#q1m").hide();
        $scope.hideImageOptions();
        if (!($rootScope.quiz.optionimg === undefined)) {
            $scope.showImageOptions();
        }      
        $scope.populateOptions();
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
        $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
        if ($rootScope.quizindex === $rootScope.quizs.length) {

            if (sessionStorage.quizDirecttion === "Forward") {
                $rootScope.pager = Number(sessionStorage.temp);
                sessionStorage.temp = $rootScope.pager + 1;
            }
            location.href = "page1.html";
        }
        else {
            $rootScope.quiz = $rootScope.quizs[$rootScope.quizindex];
            sessionStorage.quizNum = Number($rootScope.quizindex);
            $scope.questionImage();
            $scope.checkboxRadio();
            $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
            $("#q1m").hide();
            $scope.hideImageOptions();
            $scope.uncheck();
            $scope.populateOptions();
            if (!($rootScope.quiz.optionimg === undefined)) {
                $scope.showImageOptions();
            }
            $scope.res = [];
            $(document).load().scrollTop(0);
        }
    };

    $scope.getPrev = function () {
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
            $scope.questionImage();
            $scope.checkboxRadio();
            $("#question").html($rootScope.quiz.id + ": " + $rootScope.quiz.question);
            $("#q1m").hide();
            $scope.hideImageOptions();
            $scope.uncheck();
            $scope.populateOptions();
            if (!($rootScope.quiz.optionimg === undefined)) {
                $scope.showImageOptions();
            }
            $(document).load().scrollTop(0);
            $scope.res = [];
        }
    };
    $scope.MyAlert = function (quiz, value) {
        if (quiz.correct.length <= 1) {
            if (value === quiz.correct) {
                $("#q1m").show();
                $("#q1m").css('background-color', 'lightgreen');
                $("#q1m").html("Congratulations! you got the correct answer : " + quiz.correct.toLowerCase() + "<br>" + "Justification : " + quiz.description[value]);
            }
            else {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is Incorrect! " + "<br>" + "Justification : " + quiz.description[value]);
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
        var description = "Justification : <br>";
        $scope.res = $scope.res.sort();
        $scope.ans = $scope.res.join('');
        for (i = 0; i < $scope.res.length; i++) {
                description = description + ($scope.ans[i].toLowerCase() + " : " + quiz.description[$scope.ans[i]] + "<br>");
            }
        if ($scope.ans === quiz.correct) {
            
            $("#q1m").show();
            $("#q1m").css('background-color', 'lightgreen');
            $("#q1m").html("Congratulations! You got the correct answer : " + quiz.correct.toLowerCase() + "<br>" + description);
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
                   $("#q1m").html("The option chosen by you is partially correct ; but there is/are more correct option(s)!" + "<br>" + description);
                }else{
                   $("#q1m").html("The options chosen by you are partially correct ; but there is/are more correct option(s)!" + "<br>" + description);
  
                    }
            }
            else {
                $("#q1m").show();
                $("#q1m").css('background-color', 'pink');
                $("#q1m").html("Your Answer is Incorrect!" + "<br>" + description);
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
        if($rootScope.quiz.query !== undefined ){
            $("#query").html($rootScope.quiz.query);
            $("#query").show();            
        }else{
            $("#query").hide();
        }
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
});

fpControllers.controller('quiztype2',function($scope,$rootScope,$http){
    
    $scope.quizs="";
   $rootScope.quizindex;
     $http.get('data/Quiz2.json').success(function(data) {
                $rootScope.quizs=data;
 

                $rootScope.quiz = $rootScope.quizs[Number(sessionStorage.quizindex)]; 

                $rootScope.quizindex=sessionStorage.quizindex;

            }); 
            
            
             $scope.getNext=function(){

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
 
    if($rootScope.quizindex===$rootScope.quizs.length)
    {
        alert("End of the session");
    }
    else
    {
     
 
         $rootScope.quiz=$rootScope.quizs[$rootScope.quizindex];
         document.getElementById('pnlft').style.visibility="hidden";
     
         for(i=0;i<document.forms[0].question0.length;i++)
         {
         
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
   
      if(value ==quiz.correct)
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

