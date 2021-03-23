<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>基金赎回计算器</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT language=javascript>
Number.prototype.toFixed = function(d)
{
    var s=this+"";if(!d)d=0;
    if(s.indexOf(".")==-1)s+=".";s+=new Array(d+1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+ (d+1) +"})?)\\d*$").test(s))
    {
        var s="0"+ RegExp.$2, pm=RegExp.$1, a=RegExp.$3.length, b=true;
        if (a==d+2){a=s.match(/\d/g); if (parseInt(a[a.length-1])>4)
        {
            for(var i=a.length-2; i>=0; i--) {a[i] = parseInt(a[i])+1;
            if(a[i]==10){a[i]=0; b=i!=1;} else break;}
        }
        s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");
    }if(b)s=s.substr(1);return (pm+s).replace(/\.$/, "");} return this+"";
};   

	//数据校验，判断输入的是否为数字
	function numberCheck(str) {
		if (isNaN(str))
			return false;
		var strTmp = "" + str + "";
		if (strTmp.length > 0) {
			strNum = "0123456789.-";
			//for(var i=0;i0) return false; 
			if (str.indexOf('.') >= 0) {
				if (str.indexOf('.') == 0
						|| str.indexOf('.') == (str.length - 1))
					return false;
				if (str.indexOf('.') != str.lastIndexOf('.'))
					return false;
			}
			return true;
		}
	}
	function onForm3() {
		if (document.form3.investment_amount.value == '') {
			$.icrmDialog.showMessge("提示","请输入 <投资金额>!");
			document.form3.investment_amount.focus();
			return;
		}
		if (document.form3.annualized_rate.value == '') {
			$.icrmDialog.showMessge("提示","请输入 <年化收益率>!");
			document.form3.annualized_rate.focus();
			return;
		}
		if (document.form3.investment_days.value == '') {
			$.icrmDialog.showMessge("提示","请输入 <投资天数>!");
			document.form3.investment_days.focus();
			return;
		}
		if (numberCheck(document.form3.annualized_rate.value) == false) {
			$.icrmDialog.showMessge("提示","<年化收益率> 输入有误，请重新输入!");
			document.form3.ctl32.select();
			return;
		}
		if (numberCheck(document.form3.investment_amount.value) == false) {
			$.icrmDialog.showMessge("提示","<投资金额> 输入有误，请重新输入!");
			document.form3.investment_amount.select();
			return;
		}
		if (numberCheck(document.form3.investment_days.value) == false) {
			$.icrmDialog.showMessge("提示","<投资天数> 输入有误，请重新输入!");
			document.form3.investment_days.select();
			return;
		}

		var text32 = document.form3.investment_amount.value;
		 	text32= parseFloat(text32);
		var text33 = (document.form3.annualized_rate.value)/100;
		var text35 = document.form3.investment_days.value;
		 
		var text36 ="360"; 
		var temp = document.getElementsByName("base_days");
		  for(var i=0;i<temp.length;i++)
		  {
		     if(temp[i].checked)
		     text36 = temp[i].value;
		  }
		var shouyi =parseFloat((text32 * text33 * text35)/text36);
		document.form3.revenue_amount.value= shouyi.toFixed(2);
	}
</SCRIPT>

</head>
<body>
	<FORM id=form3 onsubmit="return false;" name=form3 action="">
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">投资金额:</DIV>
						<DIV class=L>
							<INPUT id="investment_amount" type="text" class="input-sm" maxlength="10"  name=investment_amount> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">年化收益率:</DIV>
						<DIV class=L>
							<INPUT   name="annualized_rate" id="annualized_rate" type="text" class="input-sm" > %
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">投资天数:</DIV>
						<DIV class=L>
							<INPUT name="investment_days" id="investment_days" type="text" class="input-sm"> 天
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">基本天数</DIV>
						<DIV class=L>
							<input type="radio" name="base_days" value="365" checked  class="day_p"> 365天
							<input type="radio" name="base_days" value="360" class="day_p"> 360天
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
				<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="onForm3()">
								<!-- <i class="icon-save"></i> -->
								开始计算
							</button>
						<button type="button" class="btn btn-xs btn-default" id="backBtn" onclick="javascript:history.go(-1);return false;" >
								<!-- <i class="icon-reply"></i> -->
								返回
						 </button>
				</DIV>
			</DIV>
		</DIV>
		<DIV class=calculate>
			<DIV class=t>计算结果</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">收益金额</DIV>
						<DIV id=DQBX class=L>
							<INPUT type="text" class="input-sm" name="revenue_amount" id="revenue_amount" > 元
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>