/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function MyAlert()
    {
        if ( (document.forms[0].question0[0].checked == true ) && (document.forms[0].question0[1].checked == false ) && (document.forms[0].question0[2].checked == false ) && (document.forms[0].question0[3].checked == false ))
	{
		
		document.getElementById('q1m').style.visibility="visible";
		//$('#question0').css('background-color','green');
		$('#q1m').css('background-color','lightgreen');
		$('#q1m').html("Correct Answer");
	}
	else
	{
		document.getElementById('q1m').style.visibility="visible";
		//$('#question0').css('background-color','red');
		$('#q1m').css('background-color','pink');
		$('#q1m').html("Incorrect! Correct Answer: "+ $('#question0').val());
	}
            
        }

function quest2()
	{
	if (document.getElementById('txt').value.toUpperCase()=="NETWORK MODEL")
	{
		document.getElementById('pnlft2').style.visibility="visible";
		//$('#question0').css('background-color','green');
		$('#pnlft2').css('background-color','lightgreen');
		$('#pnlft2').html("Correct Answer");
	
	}
	else
	{
			document.getElementById('pnlft2').style.visibility="visible";
		//$('#question0').css('background-color','red');
		$('#pnlft2').css('background-color','pink');
		$('#pnlft2').html("Incorrect! Correct Answer: Network Model");
	
	}
  }
function MyAlertq3()
    {
      if ( (document.forms[0].question1[0].checked == true ) && (document.forms[0].question1[1].checked == false ) && (document.forms[0].question1[2].checked == false ) && (document.forms[0].question1[3].checked == false ))
	{
		
		document.getElementById('pnlft3').style.visibility="visible";
		//$('#question0').css('background-color','green');
		$('#pnlft3').css('background-color','lightgreen');
		$('#pnlft3').html("Correct Answer");
	}
	else
	{
		document.getElementById('pnlft3').style.visibility="visible";
		//$('#question0').css('background-color','red');
		$('#pnlft3').css('background-color','pink');
		$('#pnlft3').html("Incorrect! Correct Answer: "+ $('#question1').val());
	}
	}

