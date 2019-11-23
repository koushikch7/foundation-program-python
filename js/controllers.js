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
   if(sessionStorage.pgtemp==undefined && sessionStorage.temp==undefined)
   {
     //  alert(sessionStorage.pgtemp);
    $rootScope.pager=1;
    $http.get('data/headertext.json').success(function(data) {
                //alert(data[0].Title);
                //alert(data[1].Title);
                $rootScope.htextc=data;
                $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
                //console.log($rootScope.htext[$scope.pager-1].title);
                //$rootScope.contents = $rootScope.cont[Number(sessionStorage.indexToShow)]; 
                //$rootScope.indexToShow=sessionStorage.indexToShow;
                //alert($scope.contents.topic[0].Title);
                
            });
    
    $rootScope.pg='Module2/'+$rootScope.pager+'.html';
   //console.log($scope.pg);
   //console.log($scope.templates[0].url);
   }
   else
   {
       //alert(sessionStorage.pgtemp);
       //alert(sessionStorage.temp);
       $rootScope.pager=Number(sessionStorage.temp);
       $rootScope.pager=$rootScope.pager+1;
       //alert($rootScope.pager);
        $http.get('data/headertext.json').success(function(data) {
                //alert(data[0].Title);
                //alert(data[1].Title);
                $rootScope.htextc=data;
                $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
                //console.log($rootScope.htext[$scope.pager-1].title);
                //$rootScope.contents = $rootScope.cont[Number(sessionStorage.indexToShow)]; 
                //$rootScope.indexToShow=sessionStorage.indexToShow;
                //alert($scope.contents.topic[0].Title);
                
            });
    
    $rootScope.pg=sessionStorage.pgtemp;
    //alert($rootScope.pg);
       
   }
   $scope.getNext=function(){
      // alert($rootScope.pager);
       if ($rootScope.pager!==$rootScope.htextc.length)
       {
           if($rootScope.pager==12)
           {
               location.href="quiz1.html";
                sessionStorage.temp=$rootScope.pager;
              // console.log($rootScope.temp);
               //$scope.pg='quiz1.html';
               //$rootScope.htext="Quiz";
           }
           else
           {
           $rootScope.pager=$rootScope.pager+1;
           sessionStorage.temp=$rootScope.pager;
     $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
     //console.log($rootScope.htext[$scope.pager-1].title);
     $rootScope.pg='Module2/'+$rootScope.pager+'.html';
     }
       }
       else
       {
           location.href="dbtoc.html";
       }
   };
   
     $scope.getPrev=function(){
         if($rootScope.pager<1)
         {
             location.href="dbtoc.html";
         }
         else
         {
     $rootScope.pager=$rootScope.pager-1;
     console.log($scope.pager);
     $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
     // console.log($rootScope.htext[$scope.pager+1].title);
     $rootScope.pg='Module2/'+$rootScope.pager+'.html';
         }
   };
});

fpControllers.controller('headerCategoryController', function($scope,$rootScope,Data) {
    //alert("hi");
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
    //alert(category.slideindex);
    $rootScope.contents=$rootScope.cont[category.slideindex];
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
          }

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


    fpControllers.controller('quiztype1',function($scope,$http,$rootScope,$location){
     //alert("hi");
   $scope.res="";
   $scope.quizs="";
   $rootScope.quizindex;
     $http.get('data/Quiz1.json').success(function(data) {
                $rootScope.quizs=data;
                //alert($rootScope.quizs);
                //alert(sessionStorage.quizindex);
                $rootScope.quiz = $rootScope.quizs[0]; 
               // alert($rootScope.quiz.correct.length);
                if($rootScope.quiz.correct.length<=1)
                {
                    $rootScope.itype="radio";
                    $rootScope.istatus="false";
                    document.getElementById('sA').style.visibility="hidden";
                                  }
                else
                {
                    $rootScope.itype="checkbox";
                     $rootScope.istatus="false";
                     document.getElementById('sA').style.visibility="visible";
                    
                }
                console.log($rootScope.quiz.question);  
                //alert($rootScope.quiz.id);
                $rootScope.quizindex=0;
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
    if(chx[i].type=='checkbox' && chx[i].checked){
        b=true;
    }
  }
  if(b==true)
  {
      
       $rootScope.quizindex = (Number($rootScope.quizindex) + 1);
      //alert($rootScope.quizindex);
    if($rootScope.quizindex===$rootScope.quizs.length)
    {
         $rootScope.pager=Number(sessionStorage.temp);
        // alert($rootScope.pager);
        //alert("End of the session");
         //IDRViewer.goToPage(17);
        //location.href="Module2/index.html?page="+ 17;
        $rootScope.pager=$rootScope.pager+1;
        //alert($rootScope.pager);
        //location.href="page1.html";
         $rootScope.pg='Module2/'+$rootScope.pager+'.html';
         sessionStorage.pgtemp=$rootScope.pg;
     //alert($rootScope.pg);
     location.href="page1.html";
    
       //
   //  $rootScope.htext=$rootScope.htextc[$rootScope.pager-1].title;
    // alert($rootScope.htext[$scope.pager-1].title);
    
          
                  
                         /*$.getScript("Module2/assets/idrviewer.js", function(){
          
    IDRViewer.goToPage(17);
   console.log("Script loaded but not necessarily executed.");

});*/
    }
    else
    {
     
        // alert($rootScope.indexToShow);
         $rootScope.quiz=$rootScope.quizs[$rootScope.quizindex];
         //alert($rootScope.quiz.correct.length);
                if($rootScope.quiz.correct.length<=1)
                {
                    $rootScope.itype="radio";
                    $rootScope.istatus="false";
                    document.getElementById('sA').style.visibility="hidden";
                                  }
                else
                {
                    $rootScope.itype="checkbox";
                     $rootScope.istatus="false";
                     document.getElementById('sA').style.visibility="visible";
                    
                }
         document.getElementById('q1m').style.visibility="hidden";
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
     //alert($rootScope.quiz.correct.length);
                if($rootScope.quiz.correct.length<=1)
                {
                    $rootScope.itype="radio";
                    $rootScope.istatus="false";
                    document.getElementById('sA').style.visibility="hidden";
                                  }
                else
                {
                    $rootScope.itype="checkbox";
                     $rootScope.istatus="false";
                     document.getElementById('sA').style.visibility="visible";
                    
                }
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
         document.getElementById('q1m').style.visibility="hidden";
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
  // alert(value);
   //alert(quiz.correct);
   if(quiz.correct.length<=1)
   {
      if(value==quiz.correct)
    {
        //alert("Hi");
        document.getElementById('q1m').style.visibility="visible";
		//$('#question0').css('background-color','green');
		$('#q1m').css('background-color','lightgreen');
		$('#q1m').html("Correct Answer:" + quiz.correct );
    }
    else
    {
        document.getElementById('q1m').style.visibility="visible";
		//$('#question0').css('background-color','red');
		$('#q1m').css('background-color','pink');
		$('#q1m').html("Incorrect! Correct Answer: " + quiz.correct +"<br>"+quiz.description);

    }
}
else
{
    //alert("Hi");
    //alert(value);
   if(!$scope.res.indexOf(value)> -1)
   {
        $scope.res=$scope.res+value;
    }
    
   // alert($scope.res);
}
};
/*$scope.uniquechar=function(){
     return $scope.res
	.split('')
	.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
	})
	.join('');
};*/
$scope.checkboxquiz=function(quiz)
{
   // alert($scope.res);
    //alert(quiz.correct);
                // var result=$scope.res;
     
   if($scope.res==quiz.correct)
    {
         document.getElementById('q1m').style.visibility="visible";
		//$('#question0').css('background-color','green');
		$('#q1m').css('background-color','lightgreen');
		$('#q1m').html("Correct Answer:" + quiz.correct );
                //res=[];
    }
    else
    {
         document.getElementById('q1m').style.visibility="visible";
		//$('#question0').css('background-color','red');
		$('#q1m').css('background-color','pink');
		$('#q1m').html("Incorrect! Correct Answer: " + quiz.correct +"<br>"+quiz.description);
                //res=[];
    }
  // $scope.res=""; 
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

