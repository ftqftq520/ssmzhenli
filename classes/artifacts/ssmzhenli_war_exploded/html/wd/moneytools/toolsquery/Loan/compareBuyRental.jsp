<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>购房与租房净资产比较器</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">


<xml id=xmldso async="false"> <Root> <Items> <Times />
<Year /> <RateSum /> <Corpus /> <CorpusRate /> <LeavCorpus /> </Items> </Root> </xml>
<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/WinControl.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calculator.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/WBselect.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/GetRate.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Components.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CalcLoanOrRental.js"></SCRIPT>
<script language="javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>

<SCRIPT type=text/javascript>
	function CheckData() {
		if (isNaN(this.document.all.edMonth.value)) {
			alert("比较年限只能是数字！");
			return false;
		}
		/*  if (Number(this.document.all.edMonth.value) > 100) {
			alert("希望进行比较的时间太大，不能计算！");
			return false;
		}   */
		if (!CheckPN(this.document.all.edCompareTime, "请在希望进行比较的时间输入正整数", false))
			return false;
		if (!CheckFN(this.document.all.edHouseRate, "请在房屋折旧/增值年比率输入非负数"))
			return false;
		if (!CheckFN(this.document.all.edCashRate, "请在资金投资的年收益率输入非负数"))
			return false;
		if (!CheckFN(this.document.all.edBuyFirstPay, "请在购房首付金额输入正数", false))
			return false;
		if (!CheckPN(this.document.all.edFundAmount, "请在公积金贷款金额输入非负整数", true))
			return false;
		if (!CheckPN(this.document.all.edFundTime, "请在公积金贷款期限输入非负数", true))
			return false;
		if (!CheckFN(this.document.all.edRentOfMonth, "请在每月租房费用输入正数", false))
			return false;
		if (!CheckPN(this.document.all.edLoanAmount, "请在商业贷款金额输入非负整数", true))
			return false;
		if (!CheckPN(this.document.all.edLoanTime, "请在商业贷款期限输入非负数", true))
			return false;

		if (!CheckFN(this.document.all.edLoanRate, "请在商业贷款年利率输入非负数", null, 4))
			return false;
		if (!CheckFN(this.document.all.edFundRate, "请在公积金贷款年利率输入非负数", null, 4))
			return false;
		if (this.document.all.edFundAmount.value == 0
				&& this.document.all.edLoanAmount.value == 0) {
			DispMessage(this.document.all.edFundAmount, "公积金贷款金额和商业贷款金额不能都为0");
			return false;
		}
		if (this.document.all.edFundAmount.value != 0) {
			if (!CheckPN(this.document.all.edFundTime, "请在公积金贷款期限输入正整数", false))
				return false;
		}
		/*if(this.document.all.edFundTime.value!=0){
			if (!CheckPN(this.document.all.edFundAmount,"请在公积金贷款金额输入正整数",false))
				return false;
		}*/
		if (this.document.all.edLoanAmount.value != 0) {
			if (!CheckPN(this.document.all.edLoanTime, "请在商业贷款期限输入正整数", false))
				return false;
		}
		/*if(this.document.all.edLoanTime.value!=0){
			if (!CheckPN(this.document.all.edLoanAmount,"请在商业贷款金额输入正整数",false))
				return false;
		}*/
		return true;
	}
	function getElement(t) {
		return document.getElementById(t);
	}
	function setFundRate() {
		if (this.document.all.edFundTime.value == "0") {
			getElement("edFuntRate").value = "0";
			return;
		}
		var stime;
		getElement("edFuntRate").value = 0;

		if (getElement("edFundTime").value != null && getElement("edFundTime").value != '') {
			stime = parseInt(getElement("edFundTime").value);

			srate = ratejson.findRate(stime, ratejson.findRateItem(
					"cpf_credit", ratejson));
			getElement("edFuntRate").value = (parseFloat(srate) * 100).toFixed(4);
		}
	}
	function setLoanRate() {
		if (this.document.all.edLoanTime.value == "0") {
			getElement("edLoanRate").value = "0";
			return;
		}

		var stime;
		getElement("edLoanRate").value = 0;
		var srate;
		if (getElement("edLoanTime").value != null && getElement("edLoanTime").value != '') {
			stime = parseInt(getElement("edLoanTime").value);
			srate = ratejson.findRate(stime, ratejson.findRateItem("bu_credit",
					ratejson));
			getElement("edLoanRate").value = (parseFloat(srate) * 100).toFixed(4);
		}

	}
</SCRIPT>

</head>
<body> 
	<FORM id=LoanOrRental onsubmit="return false;" name=LoanOrRental
		action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">购房与租房净资产比较器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">为了便于比较，本计算器的计算前提是支出相等、且租房费用不变。在此前提下，计算和比较采取购房和租房两种方式各自在一段时间后的净资产值。</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">希望进行比较的时间：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edMonth name=edCompareTime>月
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">房屋折旧/增值年比率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edHouseRate name=edHouseRate>%
						</DIV>
					</LI>
					<LI>
						<DIV  class="L txt">资金投资的年收益率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edCashRate name=edCashRate>%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">购房首付金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edBuyFirstPay name=edBuyFirstPay>元
						</DIV>
					</LI>
					<LI>
						<DIV  class="L txt">每月租房费用：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id="edRentOfMonth" name="edRentOfMonth">元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">公积金贷款金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id="edFundAmount" name="edFundAmount" value="0">元
						</DIV>
					</LI>
					<LI>
						<DIV  class="L txt">商业贷款金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id="edLoanAmount" name="edLoanAmount" value="0">元
						</DIV>
					</LI>
					<LI>
						<DIV  class="L txt">公积金贷款期限：</DIV>
						<DIV class=L>
							<INPUT  type="text" class="input-sm" id="edFundTime" onchange="setFundRate()" name="edFundTime" value="0">月
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">商业贷款期限：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" onchange="setLoanRate()" name="edLoanTime" id="edLoanTime" value="0">月
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">公积金贷款年利率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id="edFuntRate" name="edFundRate" value="0">%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">商业贷款年利率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id="edLoanRate" name="edLoanRate" value="0">%
						</DIV>
					</LI>
					
				</UL>
				<DIV class=btnArea style="margin-top: 10px;">
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="javascript:if(CheckData()) Excute(document);">
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
						<DIV class="L txt">计算得出：</DIV>
						<DIV id=lbResult class=L></DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>