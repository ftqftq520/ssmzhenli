<%@ page contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>定活两便计算器</title>
	<%--<script type="text/javascript" src="../../../../../jquery-3.5.1.min.js"></script>--%>
	<%@ include file="../../../../../global.jsp"%>
	<%@ include file="../../../../../head.jsp"%>
	<%@ include file="../../../../../end.jsp"%>
	<script type="text/javascript" >
        var Global = {};
        Global.ctx = "<%=request.getContextPath()%>";
	</script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">

<SCRIPT type="text/javascript"  
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/WinControl.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calculator.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/WBselect.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/GetRate.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Components.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>

<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/datejs.js"></SCRIPT>
	
<SCRIPT type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CalcDingHuo.js"></SCRIPT>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT type="text/javascript">


$(function() {
	//初始日期
	$(".form_date").icrmDate().on('changeDate', function(ev){
		dateout();
	});
	$("#beginDateID").val(datetostring(new Date()));
	$("#endDateID").val(datetostring(new Date()));
});



	function GetRate() {
		//获得年利率
		var valstartdate = Cal_strtodate(this.document.all.beginDateID.value);
		var valenddate = Cal_strtodate(this.document.all.endDateID.value);
		var dayMi = 24 * 60 * 60 * 1000;
		var months = (valenddate - valstartdate) / dayMi / 30;
		var month = parseInt(months);
		//根据建行规则,按一年以内定期整存整取同档次利率打6折执行
		if(month < 3)
			month = '-1';
		else if (month >= 3 && month < 12)
			month = 3;
		else if (month >= 12)
			month = 12;
		var srate,rateItemTemp;
		 
		if(month == '-1'){
			rateItemTemp = 	 ratejson.findRateItem("currentRate", ratejson);
			srate = ratejson.findRate(month, rateItemTemp);
		return (parseFloat(srate) * 100).toFixed(4);//2
		}else{
		 
			rateItemTemp = ratejson.findRateItem("Lump", ratejson);
			srate = ratejson.findRate(month, rateItemTemp) * 0.6;
		return (parseFloat(srate) * 100).toFixed(4);//2
		}

	}

	function changeobject(objectid) {
		var ss1 = document.all.CSCRJE.innerHTML;
		var ss2 = document.all.DQBX.innerHTML;
		var ss3 = document.all.TQRQ.innerHTML;

		if (ss1.indexOf(objectid) > 0) {
			ls = document.all.lbCSCRJE.innerHTML;
			document.all.lbCSCRJE.innerHTML = document.all.lbDQBX.innerHTML;
			document.all.lbDQBX.innerHTML = ls;

			document.all.CSCRJE.innerHTML = document.all.DQBX.innerHTML;
			document.all.DQBX.innerHTML = ss1;
		}
		if (ss3.indexOf(objectid) > 0) {
			document.all.TQRQ.innerHTML = document.all.DQBX.innerHTML;
			document.all.DQBX.innerHTML = ss3;

			ls = document.all.lbTQRQ.innerHTML;
			document.all.lbTQRQ.innerHTML = document.all.lbDQBX.innerHTML;
			document.all.lbDQBX.innerHTML = ls;
		}
	}

	function funcontrol() {

		if (this.document.all.rdselect_0.checked) {
			changeobject("edend");
			this.document.all.edend.value = "计算得出";

			this.document.all.edtax.value = "计算得出";
			this.document.all.edtax.disabled = true;

			this.document.all.edstart.value = "";
			this.document.all.edstart.disabled = false;
			this.document.all.endDateID.disabled = false;
			var d = new Date();
			this.document.all.endDateID.value = datetostring(d);
			this.document.all.edRate.value = "0.72";
			dateout();
		} else if (this.document.all.rdselect_1.checked) {
			changeobject("edstart");

			this.document.all.edstart.value = "计算得出";
			this.document.all.edstart.disabled = true;
			this.document.all.edtax.value = "计算得出";
			this.document.all.edtax.disabled = true;
			this.document.all.edend.value = "";
			this.document.all.edend.disabled = false;
			this.document.all.endDateID.disabled = false;
			var d = new Date();
			this.document.all.endDateID.value = datetostring(d);
			this.document.all.edRate.value = "0.72";
			dateout();
		} else if (this.document.all.rdselect_2.checked) {
			changeobject("endDateID");

			this.document.all.edstart.value = "";
			this.document.all.edstart.disabled = false;
			this.document.all.edtax.value = "计算得出";
			this.document.all.edtax.disabled = true;
			this.document.all.edend.value = "";
			this.document.all.edend.disabled = false;
			this.document.all.endDateID.value = "计算得出";
			this.document.all.endDateID.disabled = true;

			dateout();
		}

	}

	function CheckData() {
		return true;
	}

	function CheckData1() {
		if (!CheckFN3(this.document.all.edstart, "请在[初始存入金额]中输入正数", false))
			return false;
		if (!CheckFN3(this.document.all.edRate, "请在[利率]中输入正数", false, null, 4))
			return false;
		if (!CheckEmpty(this.document.all.beginDateID, "请在[初始存入日期]中输入日期格式"))
			return false;
		if (!CheckEmpty(this.document.all.endDateID, "请在[提取日期]中输入日期格式"))
			return false;
		if (!CheckDiffDate(this.document.all.beginDateID,
				this.document.all.endDateID, "初始存入日期应该小于等于提取日期！"))
			return false;

		return true;
	}

	function CheckData2() {
		if (!CheckFN(this.document.all.edend, "请在[到期本息总额]中输入正数", null, 2))
			return false;
		if (!CheckFN3(this.document.all.edRate, "请在[利率]中输入正数", false, null, 4))
			return false;
		if (!CheckEmpty(this.document.all.beginDateID, "请在[初始存入日期]中输入日期格式"))
			return false;
		if (!CheckEmpty(this.document.all.endDateID, "请在[提取日期]中输入日期格式"))
			return false;
		if (!CheckDiffDate(this.document.all.beginDateID,
				this.document.all.endDateID, "初始存入日期应该小于等于提取日期！"))
			return false;

		return true;
	}

	function CheckData3() {
		if (!CheckFN3(this.document.all.edstart, "请在[初始存入金额]中输入正数", false))
			return false;

		if (!CheckFN3(this.document.all.edend, "请在[到期本息总额]中输入正数", false))
			return false;
		if (!CheckFN3(this.document.all.edRate, "请在[利率]中输入正数", false, null, 4))
			return false;
		if (!CheckEmpty(this.document.all.beginDateID, "请在[初始存入日期]中输入日期格式"))
			return false;
		if (parseFloat(document.all.edstart.value) > parseFloat(document.all.edend.value)) {
			DispMessage(document.all.edstart, "初始存入金额应小于等于到期本息总额");
			return false;
		}
		return true;
	}

	function calc() {
		if (!CheckData())
			return false;
		if (this.document.all.rdselect_0.checked) {
			if (!CheckData1())
				return false;
			calc1(document);
		} else if (this.document.all.rdselect_1.checked) {
			if (!CheckData2())
				return false;
			calc2(document);
		} else if (this.document.all.rdselect_2.checked) {
			if (!CheckData3())
				return false;
			calc3(document);
		}
		return true;
	}

	function dateout() {
		this.document.all.edRate.value = GetRate();
	}
</SCRIPT>

<SCRIPT for=rdselect_0 type="text/javascript" event=onclick>
	funcontrol();
</SCRIPT>

<SCRIPT for=rdselect_1 type="text/javascript" event=onclick>
	funcontrol();
</SCRIPT>

<SCRIPT for=rdselect_2 type="text/javascript" event=onclick>
	funcontrol();
</SCRIPT>

<SCRIPT type="text/javascript">
	function ChkCZDate(edit) {
		edit.value = Trim(edit.value);
		if (edit.value == '')
			return true;
		if (!Cal_datevalid(edit, '1910-1-1', '3000-1-1')) {
			alert('日期格式不正确,日期有效范围为1910年到3000年');
			edit.focus();
		}
	}
</SCRIPT>


<SCRIPT type="text/javascript">
	var strcount = 4;
</SCRIPT>	
	
</head>
<body> 


<form class="form-horizontal" role="form" id="WebForm4" onsubmit="return false;" name="WebForm4">
	<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
		<TBODY>
			<TR>
				<TD class="cy_lb_top"><SPAN class="cy_lb_top_l cy_white14">定活两便计算器<A
						href="#"></A></SPAN><SPAN class="cy_lb_top_c"></SPAN><SPAN
					class="cy_lb_top_r cy_blue14"></SPAN></TD>
			</TR>
		</TBODY>
	</TABLE>
	<div class="add_h3">定活两便存款的优点在于兼顾了资金运用的收益性和灵活性。本计算器可方便的计算出定活两便存款的到期本息总额（已扣除利息税）、初始存入金额和储蓄存期。</div>
	<DIV class="calculate">
		<DIV class="t">计算公式</DIV>
		<DIV class="c">
			<UL>
				<LI>
					<DIV class="L txt">计算项目：</DIV>
					<DIV>
						<INPUT id=rdselect_0 style="border: 0;" tabIndex="1" value="1" CHECKED type="radio" name="rdselect"> 到期本息总额
					</DIV>
				</LI>
				<LI>
					<DIV id="lbCSCRJE" class="L txt">初始存入金额：</DIV>
					<DIV id="CSCRJE" class="L">
						<input type="text" class="input-sm" id="edstart" name="edstart1"> 元
					</DIV>
				</LI>
				<LI>
					<div class="L txt">初始存入日期：</div>
					<div class="L" style="width:300px">
						 <div class="input-group">
					         <input id="beginDateID" name="beginDate" type="text"   class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd" value="" readonly>
					         <span class="input-group-addon">
								<i class="icon-1x icon-calendar"></i>
							</span>
					      </div>
 					</div>
				</LI>
				<LI>
					<DIV id="lbTQRQ" class="L txt">提取日期：</DIV>
					<DIV id="TQRQ" class="L" style="width:300px">
						<div class="input-group">
					         <input id="endDateID" name="endDate" type="text"   class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd" value="" readonly>
					         <span class="input-group-addon">
								<i class="icon-1x icon-calendar"></i>
							</span>
					      </div>
					</DIV>
				</LI>
				<LI>
					<DIV class="L txt">利率：</DIV>
					<DIV class="L">
						<input type="text" class="input-sm" id="edRate" name="edRate"> %
					</DIV>
				</LI>
				<LI>
					<DIV class="L txt">是否计算利息税：</DIV>
						<INPUT id="edtax_yes" style="border: 0;" tabIndex="1" value="1"
							type="radio" name="edtaxselect"> <LABEL for="rdselect_0"> 是</LABEL>
						<INPUT id="edtax_no" style="border: 0;" value=2 type=radio CHECKED
							name="edtaxselect"> <LABEL for=rdselect_1> 否</LABEL>
				</LI>
			</UL>
			<DIV class="btnArea">
				<!-- <INPUT id="btnenter" class="btnStyle" onclick="calc()"  value="开始计算" type="button">
				<INPUT id="backBtn" class="btnStyle" onclick="javascript:history.go(-1);return false;"  value="返回" type="button"> -->
				
				<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="calc()">
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
	<DIV class="calculate">
		<DIV class="t">计算结果</DIV>
		<DIV class="c">
			<UL>
				<LI>
					<DIV id="lbDQBX" class="L txt">到期本息总额：</DIV>
					<DIV id="DQBX" class="L">
						<input type="text" class="input-sm" id="edend" placeholder="计算得出"> 元
					</DIV>
				</LI>
				<LI>
					<DIV class="L txt">利息税金额：</DIV>
					<DIV class="L">
						<input type="text" class="input-sm" id="edtax" disabled placeholder="计算得出"> 元
					</DIV>
				</LI>
			</UL>
		</DIV>
	</DIV>
</FORM>
</body>
</html>