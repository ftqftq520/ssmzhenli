<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>贷款计算器</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calculator.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/dealdata.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>
<script language="javascript" src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT type=text/javascript>
	function sendrate2() {
		//设定一个数组，把要检验的字段对应的输入框的字符串表示赋给数组
		var objArray = new Array();
		objArray[0] = document.estateborrow.original;
		objArray[1] = document.estateborrow.active;
		objArray[2] = document.estateborrow.yearSpan;
		var rst = checkData(objArray);//调用函数检验是否有空字符
		if (rst == "false") {
			return;
		}
		rst = isInteger(objArray);//调用函数检验是否为整数
		if (rst == "false") {
			return;
		}
		//从表单中取值
		var original = document.estateborrow.original.value; //贷款总额
		var active = document.estateborrow.active.value; //贷款利息
		var yearSpan = document.estateborrow.yearSpan.value; //年份

		//alert(yearSpan);
		var timeSpan = parseFloat(yearSpan) * 12;
		active = active * 10 / 12;
		//计算贷款利息、本息合计
		var result = new Array();

		if (document.estateborrow.inputSelect.value == "等额本息还款") {
			result = estateBorrow(original, active, timeSpan);//贷款利息、利息税额、实得利息、本息合计封在返回的数组中
			//将贷款利息本息合计显示
			document.estateborrow.monthBack.value = result[0]; //显示贷款利息
			document.estateborrow.totalBack.value = result[1]; //显示本息合计
			//document.estateborrow.monthInterest.value=result[2];        //显示贷款利息
			document.estateborrow.totalInterest.value = result[3]; //显示本息合计
			document.getElementById("tr_debj").style.display = 'none';
			document.getElementById("tr_debx").style.display = '';
		} else {
			var result = estateBorrow1(original, active, timeSpan);
			document.estateborrow.totalInterest.value = result[0]; //显示贷款利息
			document.estateborrow.totalBack.value = result[1]; //显示本息合计
			document.estateborrow.monthBackDEBJ.value = result[2];//显示每月还款额
			document.getElementById("tr_debx").style.display = 'none';
			document.getElementById("tr_debj").style.display = '';
			//document.estateborrow.monthInterest.value="";
		}
	}
	function getElement(t) {
		return document.getElementById(t);
	}
	function setRate() {
		if (!CheckFN3(getElement("yearSpan"), "请在按揭年数输入正数", false))
			return false;
		var stime;
		getElement("active").value = 0;
		var srate;
		if (getElement("yearSpan").value != null && getElement("yearSpan").value != '') {
			stime = parseInt(getElement("yearSpan").value * 12);
			srate = ratejson.findRate(stime, ratejson.findRateItem("bu_credit",ratejson));
			getElement("active").value = (parseFloat(srate) * 100).toFixed(4);
		}
	}
</SCRIPT>
</head>
<body>
	<FORM id=CalcBondProfit onsubmit="return false;" name=estateborrow
		action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">贷款计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">等额本息还款或等额本金还款计算器可以帮助您计算在等额本息还款或等额本金还款方式下的各项数据。</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">贷款种类：</DIV>
						<DIV class=L>
							<SELECT style="width:140px" name=borrowtype>
								<OPTION selected value=个人住房贷款>个人住房贷款</OPTION>
								<OPTION value=个人旅游贷款>个人旅游贷款</OPTION>
								<OPTION value=个人综合消费贷款>个人综合消费贷款</OPTION>
								<OPTION value=个人短期信用贷款>个人短期信用贷款</OPTION>
								<OPTION value=个人小额抵押贷款>个人小额抵押贷款</OPTION>
								<OPTION value=个人汽车贷款>个人汽车贷款</OPTION>
								<OPTION value=助学贷款>助学贷款</OPTION>
								<OPTION value=个人留学贷款>个人留学贷款</OPTION>
								<OPTION value=大额耐用消费品贷款>大额耐用消费品贷款</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">贷款总额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=original name=original> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">按揭年数：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" onchange="setRate();" id=yearSpan name=yearSpan> 年
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">还款方式：</DIV>
						<DIV class=L>
							<SELECT style="width:140px" name=inputSelect>
								<OPTION selected value=等额本息还款>等额本息还款</OPTION>
								<OPTION value=等额本金还款>等额本金还款</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">贷款年利率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=active name=active> %
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="sendrate2()">
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
				<UL class="ul li">
					<LI>
						<DIV id=tr_debx>
							<DIV class="L txt">月均还款：</DIV>
							<DIV class=L>
								<INPUT type="text" class="input-sm" name=monthBack> 元
							</DIV>
						</DIV>
						<DIV style="DISPLAY: none" id=tr_debj>
							<DIV class="L txt">月还金额</DIV>
							<DIV class=L>
								<TEXTAREA rows=5 cols=30 name=monthBackDEBJ> </TEXTAREA>
							</DIV>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">支付利息：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=totalInterest> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">还款总额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=totalBack> 元
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>