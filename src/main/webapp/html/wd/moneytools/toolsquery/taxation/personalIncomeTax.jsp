<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>个人所得税</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT language=javascript src="<%=request.getContextPath()%>/html/wd/moneytools/script/taxation20130509.js"></SCRIPT>
<SCRIPT language=javascript>
	function warnInvalid(theField, s) {
		alert(s);
		theField.focus();
		theField.select();
		return false;
	}
	function isNumber(s) //字符串是否由数字构成
	{
		var digits = "0123456789";
		var i = 0;
		var sLength = s.length;
		while ((i < sLength)) {
			var c = s.charAt(i);
			if (digits.indexOf(c) == -1)
				return false;
			i++;
		}
		return true;
	}

	function CheckNumeric(theField, s) //整数或小数
	{
		var ret = true;
		var i;
		var str = theField.value;
		var Temp = new Number(str);

		if (str.length == 0) {
			return warnInvalid(theField, s);
			ret = false;
		}

		if (ret) {
			if (Temp.valueOf() != Temp.valueOf()) {
				return warnInvalid(theField, s);
			}
		}
		return ret;
	}
	function validateFormInfo(form) {
		var str
		var SumTo
		var srSum
		var qzSum, InsuSum, TSum, yzSum, fySum

		s = document.form1.select.selectedIndex + 1;
		srSum = document.form1.textfield.value;
		if (s.length < 1) {
			s = 1;
		}
		qzSum = document.form1.textfield3.value;
		InsuSum = document.form1.textfield2.value;
		yzSum = document.form1.textfield22.value;
		fySum = document.form1.textfield32.value;
		TSum = srSum - qzSum - InsuSum;

		if (form == null)
			return true;

		str = "请正确输入收入金额！";
		if (!CheckNumeric(form.elements["textfield"], str))
			return false; //收入金额

		if (document.all.select.selectedIndex == 0) {
			str = "请正确输入社会保险费！";
			if (!CheckNumeric(form.elements["textfield2"], str))
				return false; //各项社会保险费
			str = "请正确输入起征额！";
			if (!CheckNumeric(form.elements["textfield3"], str))
				return false; //起征额
		}

		if (document.all.select.selectedIndex == 8) {
			str = "请正确输入财产原值！";
			if (!CheckNumeric(form.elements["textfield22"], str))
				return false; //各项社会保险费

			str = "请正确输入合理交易费用！";
			if (!CheckNumeric(form.elements["textfield32"], str))
				return false; //起征额
		}
		var result = 0;
		switch (s) {
		case 1:
			result = Rate1(TSum);
			break;
		case 2:
		case 3:
			result = Rate2(srSum);
			break;
		case 4:
			result = Rate3(srSum);
			break;
		case 5:
			result = bookfee(srSum);
			break;
		case 6:
			result = spe(srSum);
			break;
		case 7:
			result = srSum * 20 / 100;
			break;
		case 8:
			result = R4568(srSum);
			break;
		case 9:
			if (srSum - yzSum - fySum < 0) {
				alert("都亏了！不用交税了！");
				result = 0;
			}
			if (srSum - yzSum - fySum > 0) {
				result = (srSum - yzSum - fySum) * 20 / 100;
			}
			break;
		case 10:
			result = srSum * 20 / 100;
			break;
		case 11:
			result = spe(srSum);
			break;
		}
		document.form1.textfield4.value = Round(result);
	}
	function Round(i, digit) {
		if (digit == 0)
			p = 1;
		else {
			if (digit)
				p = Math.pow(10, digit);
			else
				p = 100;
		}
		return Math.round(i * p) / p;
	}

	function CHan() {
		if (document.form1.select.selectedIndex == 0) {
			document.all.fei.style.display = "";
		}
		if (document.form1.select.selectedIndex != 0) {
			document.all.fei.style.display = "none";
		}
		if (document.form1.select.selectedIndex + 1 != 9) {
			document.all.fei1.style.display = "none";
		}
		if (document.form1.select.selectedIndex + 1 == 9) {
			document.all.fei1.style.display = "";
		}
	}
</SCRIPT>
</head>
<body>
	<FORM id=form1 onsubmit="return false;" name=form1 action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top>
						<SPAN class="cy_lb_top_l cy_white14">个人所得税计算器</SPAN>
						<SPAN class=cy_lb_top_c></SPAN>
						<SPAN class="cy_lb_top_r cy_blue14"></SPAN>
					</TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">个人所得税计算器可以帮您计算您所得应缴的税额</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					 <LI>
						<DIV class="L txt">收入类型：</DIV>
						<DIV>
							<SELECT style="width:140px" id=select onchange=CHan() name=select>
									<OPTION selected value=1>工资、薪金所得
									<OPTION value=2>个体工商户生产、经营所得
									<OPTION value=3>对企事业单位的承包经营、承 租经营所得
									<OPTION value=4>劳务报酬所得
									<OPTION value=5>稿酬所得
									<OPTION value=6>特许权使用所得
									<OPTION value=7>利息、股息、红利所得
									<OPTION value=8>财产租赁所得
									<OPTION value=9>财产转让所得
									<OPTION value=10>偶然所得（如：中奖、中彩）
									<OPTION value=11>个人拍卖所得</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">收入金额：</DIV>
						<DIV><INPUT type="text" class="input-sm" id=textfield name=textfield> 元</DIV>
					</LI>
					<LI id=fei>
						<DIV class="L txt">各项社会保险费：</DIV>
						<DIV><INPUT type="text" class="input-sm" id=textfield2 value=0 name=textfield2></DIV>
						<DIV style="margin-top:10px" class="L txt">起 征 额：</DIV>
						<DIV style="margin-top:10px"><INPUT type="text" class="input-sm" id=textfield3 value=3500 name=textfield3></DIV>
					</LI>
					<LI id=fei1>
						<DIV class="L txt">财产原值：</DIV>
						<DIV><INPUT type="text" class="input-sm" id=textfield22 value=0 name=textfield22></DIV>
						<DIV style="margin-top:10px" class="L txt">合理交易费用：</DIV>
						<DIV style="margin-top:10px"><INPUT type="text" class="input-sm" id=textfield33 value=0 name=textfield32></DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
					<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn"
						onclick="validateFormInfo(this.form,1);">
						<!-- <i class="icon-save"></i> -->
						开始计算
					</button>
					<button type="button" class="btn btn-xs btn-default" id="backBtn"
						onclick="javascript:history.go(-1);return false;">
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
						<DIV class="L txt">交纳的个人所得税为：</DIV>
						<DIV><INPUT type="text" class="input-sm" id=textfield4 name=textfield4> 元 </DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>