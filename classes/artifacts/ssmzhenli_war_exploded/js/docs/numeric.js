$(function(){
	
	$("input[class$=money]").blur(function(e){
		if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val())) {
			$(this).val("");
		}
	}).focus(function() {
       this.style.imeMode='disabled';   // 禁用输入法,禁止输入中文字符
    });
	
}); 