var optionIds = [];
$(function () {
    var toBeSent;
    $("#submitAnswer").click(function () {
        var notAllFlag = false;
        $('#telltext').empty();        
        var answers = [];
        var quizIds = [];
        var ansSelected = [];        
        var childEle = $("#quiz div");

        for (i = 0; i < childEle.length; i++) {
            if (/^q\d+$/.test(childEle[i].id)) {
                var temp = childEle[i].id;
                var qstnId = $("#" + childEle[i].id);
                var options = $("#" + childEle[i].id).find('input');
                if (options.length > 0) {
                    var optSelected = "";
                    for (var j = 1; j <= options.length; j++) {
                        if ($("#" + childEle[i].id).find('#' + options[j - 1].id).is(":checked")) {
                            optSelected += options[j - 1].id + ",";
                        }
                    }
                    if (optSelected.length == 0) {
                        notAllFlag = true;
                        break;
                    }                    
                }
                else if (qstnId.find('select').length > 0) {
                    var optSelected = "";
                    options = qstnId.find('select');
                    for (var k = 0; k < options.length; k++) {
                        if ($("#" + options[k].id + " option:selected").val() > 0) {
                            optSelected += (options[k].id + "-" + $("#" + options[k].id + " option:selected").val()) + ",";
                        }
                        else {
                            notAllFlag = true;
                            break;
                        }
                    }                    
                }
                quizIds[i] = childEle[i].id;
                answers[i] = $('#' + quizIds[i]).attr('data-qzAns');
                ansSelected[i] = optSelected.substring(0, optSelected.length - 1);
                console.log(quizIds[i] + "**selected: " + ansSelected[i] + "**actual: " + answers[i]);                
            }

        }        
       
        if (notAllFlag) {
			$('#telltext').empty();
            $('#telltext').addClass('text-danger').text("Answer all questions before clicking Submit.");
        }
        else {
			$('#telltext').empty();
			for (i = 0; i < quizIds.length; i++) {
				if(ansSelected[i] == answers[i]){
				    $('#' + quizIds[i] + 'm').removeClass('text-danger').addClass('text-success').text("Your Answer is Right.")
				}
				else{
				    $('#' + quizIds[i] + 'm').removeClass('text-success').addClass('text-danger').text("Your Answer is Wrong.")
				}
			}            
        }
        
    });   
});