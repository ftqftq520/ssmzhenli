<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>整存零取计算器</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">


<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>
<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>
<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CalcZCLQ.js"></SCRIPT>
<script language="javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT type=text/javascript>

function initTree(){
	$(".form_date").icrmDate();
	  setRate();
	  document.EduCalc.beginDate.value = datetostring(new Date());
}

	
	
	
	function ChkCZDate(edit) {
		edit.value = Trim(edit.value);
		if (edit.value == '')
			return true;
		if (!Cal_datevalid(edit, '1910-1-1', '3000-1-1')) {
			alert('日期格式不正确,日期有效范围为1910年到3000年');
			edit.focus();
		}
	}
	function btnCalc_onclick() {
		if (this.document.all.rblItem_0.checked)
			if (!CheckFN3(this.document.all.tbFirstSum, "请在[初始存入金额]中输入正数金额！",
					false))
				return false;
		/* if (this.document.all.rblItem_1.checked)
			if (!CheckFN3(this.document.all.tbFirstSum, "请在[每次存入金额]中输入正数金额！",
					false))
				return false;
		if (this.document.all.rblItem_2.checked) {
			if (!CheckFN3(this.document.all.tbFirstSum, "请在[初始存入金额]中输入正数金额！",
					false))
				return false;
			if (!CheckFN3(this.document.all.tbEverySum, "请在[每次支取金额]中输入正数金额！",
					false))
				return false;
		} */

		if (!CheckEmpty(this.document.all.beginDateID, "请输入初始存入日期！"))
			return false;
		if (Cal_strtodate("1999-11-1") > Cal_strtodate(this.document.all.beginDateID.value)) {
			DispMessage(this.document.all.beginDateID, "初始存入日期不得小于1999年11月1日！");
			return false;
		}
		if (!CheckFN3(this.document.all.tbRate, "请在[年利率]中输入正数！", false))
			return false;

		Calc(document);
		return false;
	}
function getElement(t) {
		return document.getElementById(t);
	}
	function getRate(month) {
		return 0;
	}
	function getTerm(month) {

		return -1;
	}
	function setRate() {
		//this.document.all.tbRate.value = Round(100*getRate(parseInt(this.document.all.cbMonth.value)),4);
		var stime;
		getElement("tbRate").value = 0;
		stime = parseInt(getElement("cbMonth").options[getElement("cbMonth").selectedIndex].value);
		var srate;
		srate = ratejson.findRate(stime, ratejson.findRateItem("depositLump",
				ratejson));

		getElement("tbRate").value = (parseFloat(srate) * 100).toFixed(2);
	}
	
</SCRIPT>

<SCRIPT language=javascript for=rblItem event=onclick>
	if (this.document.all.rblItem_0.checked) {
		/*tbEverySum.className="txtd";
		tbFirstSum.className="txtnum";
		tbEverySum.value="计算得出";
		if(tbFirstSum.value=="计算得出")
			tbFirstSum.value="";
		if(cbMonth.value=="计算得出")
			cbMonth.value=cbMonth.options[0].value;
		tbFirstSum.disabled=false;
		tbEverySum.disabled=true;
		cbMonth.disabled=false;*/
		tbEverySum.disabled = true;

		tbEverySum.value = "计算得出:";
		lblFirstSum.innerText = "初始存入金额:";
		lblEverySum.innerText = "每次支取金额:";
		//hr1.style.top=179;
	} else {
		if (this.document.all.rblItem_1.checked) {
			/*tbEverySum.className="txtnum";
			tbFirstSum.className="txtd";
			tbFirstSum.value="计算得出";
			if(tbEverySum.value=="计算得出")
				tbEverySum.value="";
			if(cbMonth.value=="计算得出")
				cbMonth.value=cbMonth.options[0].text;
			tbFirstSum.disabled=true;
			tbEverySum.disabled=false;
			cbMonth.disabled=false;*/
			tbEverySum.disabled = true;
			tbEverySum.value = "计算得出";
			tbEverySum.className = "txtd";
			lblFirstSum.innerText = "每次支取金额:";
			lblEverySum.innerText = "初始存入金额:";
			//hr1.style.top=179;
		} else {
			/*tbEverySum.className="txtnum";
			tbFirstSum.className="txtnum";
			cbMonth.text="计算得出";
			if(tbEverySum.value=="计算得出")
				tbEverySum.value="";
			if(tbFirstSum.value=="计算得出")
				tbFirstSum.value="";
			tbFirstSum.disabled=false;
			tbEverySum.disabled=false;
			cbMonth.disabled=true;*/
			tbEverySum.disabled = false;
			tbEverySum.value = "";
			tbEverySum.className = "txtnum";
			lblFirstSum.innerText = "初始存入金额:";
			lblEverySum.innerText = "每次支取金额:";
			//hr1.style.top=218;
		}
	}
</SCRIPT>

</head>
<body>

	<FORM id=EduCalc onsubmit="return false;" name=EduCalc action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">整存零取计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">整存零取计算器可以帮您计算整存零取的数额</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">计算项目：</DIV>
						<DIV class=L>
							<INPUT  id=rblItem_0 value=1 CHECKED style="border: 0;" type=radio name=rblItem> 
							<LABEL for=rblItem_0>每次支取金额</LABEL>
						</DIV>
					</LI>
					<LI>
						<DIV id=lblFirstSum class="L txt">初始存入金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbFirstSum name=tbFirstSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">初始存入日期：</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
								<INPUT  class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd"  onblur="ChkCZDate(this)" id="beginDateID"
									name="beginDate"> 
								<span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span>
							</div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">储蓄存期：</DIV>
						<DIV id=tddrawsum class=L>
							<SELECT style="width:140px" id=cbMonth onchange=setRate() name=cbMonth>
								<OPTION selected value=12>一年</OPTION>
								<OPTION value=36>三年</OPTION>
								<OPTION value=60>五年</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV id=lbdrawdate class="L txt">年利率</DIV>
						<DIV class=L>
							<input type="text" class="input-sm" id="tbRate" name="tbRate" >%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">支取频度：</DIV>
						<DIV class=L>
							<INPUT id=rblFreq_0 value=1 CHECKED style="border: 0;" type=radio name=rblFreq> 
								<LABEL for=rblFreq_0>每月</LABEL> 
							<INPUT id=rblFreq_1 value=3 style="border: 0;" type=radio name=rblFreq>
								<LABEL for=rblFreq_1>每季</LABEL> 
							<INPUT id=rblFreq_2 value=6 style="border: 0;" type=radio name=rblFreq> 
								<LABEL for=rblFreq_2>每半年</LABEL>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">是否计算利息税：</DIV>
						<DIV class=L>
							<INPUT id=edtax_yes style="border: 0;" tabIndex=1 value=1
								type=radio name=edtaxselect> <LABEL for=rdselect_0>是</LABEL>
							<INPUT id=edtax_no style="border: 0;" value=2 CHECKED type=radio
								name=edtaxselect> <LABEL for=rdselect_1>否</LABEL>
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
				<!-- <INPUT id="backBtn" class="btnStyle" onclick="javascript:history.go(-1);return false;"  value="返回" type="button">
					<INPUT id=btnenter class=btnStyle
						onclick="return btnCalc_onclick()" value=开始计算 type=button> -->
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="btnCalc_onclick()">
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
						<DIV id=lblEverySum class="L txt">每次支取金额：</DIV>
						
						<DIV id=tdfullsum class=L>
							<INPUT type="text" class="input-sm" id=tbEverySum disabled placeholder="计算得出"  name=tbEverySum>
							元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">所得利息金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbInSum disabled placeholder="计算得出"  name=tbInSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">利息税金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbTaxSum disabled placeholder="计算得出"  name=tbTaxSum> 元
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>

</body>
</html>