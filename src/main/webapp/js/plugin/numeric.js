$(function(){
	
	$("input[class$=money]").blur(function(e){
		if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val())) {
			$(this).val("");
		}
	}).focus(function() {
       this.style.imeMode='disabled';   // 禁用输入法,禁止输入中文字符
    });
	
}); 

/**
 * 解决 toFixed “4舍6入5凑偶”问题
 */
Number.prototype.toFixed=function (d) {
    var s=this+""; 
    if(!d)d=0; 
    if(s.indexOf(".")==-1)s+="."; 
    s+=new Array(d+1).join("0"); 
    if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
        var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
        if(a==d+2){
            a=s.match(/\d/g); 
            if(parseInt(a[a.length-1])>4){
                for(var i=a.length-2;i>=0;i--){
                    a[i]=parseInt(a[i])+1;
                    if(a[i]==10){
                        a[i]=0;
                        b=i!=1;
                    }else break;
                }
            }
            s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");

        }
		if(b){
			s=s.substr(1); 
		}
		
        return (pm+s).replace(/\.$/,"");
    }
	return this+"";

};
/**
 * String or float num 需要格式化的值
 * int decimal 保留小数位数，默认为2位
 * int unit 单位值，默认为1，为10的幂值
 * boolean notFormat：是否格式化千分位，默认是 false
 */
Number.fmoney = function(num, decimal, unit, notFormat) {
	if (num == undefined || num == null || num == "") {
		num = 0;
	}
	unit = unit > 0 ? unit : 1;
	decimal = decimal >= 0 && decimal <= 20 ? decimal : 2;
	// 去掉非数字
	num = this((num + "").replace(/[^\d\.-]/g, ""));
	num = num / unit;
	num = num.toFixed(decimal) + "";
	if (notFormat == true) {
		return num;
	}
	var l = num.split(".")[0].split("").reverse(), r = num.split(".")[1];
	t = "";
	for (var i = 0; i < l.length; i++) {
		if(num.indexOf('-') >= 0){
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length-1 && l[i] != '-'? "," : "");
		}else{
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
	}
	if(decimal != 0){//不拼接小数位数
		return t.split("").reverse().join("") + "." + r;
	}
	return t.split("").reverse().join("");
	
}
Number.rmoney = function(num){
	return this(s.replace(/[^\d\.-]/g, ""));
}
