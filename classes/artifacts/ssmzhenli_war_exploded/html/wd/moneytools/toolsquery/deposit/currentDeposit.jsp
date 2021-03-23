<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>活期储蓄计算器</title>
	<%@ include file="../../../../../global.jsp"%>
	<%@ include file="../../../../../head.jsp"%>
	<%@ include file="../../../../../end.jsp"%>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>
<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>
<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/calcactivesave.js"></SCRIPT>
<script language="javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT type=text/javascript>

function initTree(){
	//初始日期
	  $(".form_date").icrmDate();
	  setRate();
	  
	  document.CompPartSumCalc.beginDateID.value = datetostring(new Date());
	  document.CompPartSumCalc.endDateID.value = datetostring(new Date());
}



	function setRate() {

		var srate;

		srate = ratejson.findRate(-1, ratejson.findRateItem("currentRate", ratejson));
		getElement("edFullRate").value = (parseFloat(srate) * 100).toFixed(4);//2

	}
	
	function getElement(t) {
		return document.getElementById(t);
	}
	function ChkCZDate(edit) {
		edit.value = Trim(edit.value);
		if (edit.value == '')
			return true;
		if (!Cal_datevalid(edit, '1910-1-1', '3000-1-1')) {
			alert('日期格式不正确,日期有效范围为1910年到3000年');
			return false;
			edit.focus();
		}
		return true;
	}
	//活期储蓄计算器
	function computefullsum(oDocument) //计算出实得本息总额和存入总额
	{
		var tmparray = new Array();
		tmparray.push(oDocument.all.edSaveSum.value);
		tmparray.push(oDocument.all.beginDateID.value);
		tmparray.push(oDocument.all.endDateID.value);
		tmparray.push(oDocument.all.edFullRate.value);
		var obj = computeoncefullsum(tmparray);
		oDocument.all.edFullSum.value = Round(obj.oncefullsum - obj.oncesavesum);
		oDocument.all.edTaxSum.value = Round(obj.oncesavesum);
		oDocument.all.enlixiSum.value = Round(obj.oncefullsum - oDocument.all.edSaveSum.value);
		oDocument.all.sdlixiSum.value = Round(obj.oncefullsum - oDocument.all.edSaveSum.value - obj.oncesavesum);

	}
	function computeoncefullsum(s) //计算出一次实得本息和存入金额
	{
		SaveInSum = parseInt(s[0]);
		var SaveDate = new Date();
		SaveDate.setTime(Cal_strtodate(s[1]));
		var AdvDrawDate = new Date();
		AdvDrawDate.setTime(Cal_strtodate(s[2]));
		YearRate = parseFloat(s[3]) / 100;
		var diffday = getNatrueDiffDay(AdvDrawDate, SaveDate);
		var obj = new Object();
		if (this.document.all.edtax_yes.checked) {
			obj.oncefullsum = SaveInSum * (Math.pow((1 + YearRate / 360), diffday) - 1) + SaveInSum;
			obj.oncesavesum = SaveInSum * (Math.pow((1 + YearRate / 360), diffday) - 1) * 0.05;
		} else {
			//obj.oncefullsum = SaveInSum * (Math.pow((1 + YearRate / 360), diffday) - 1) + SaveInSum;//复利
			obj.oncefullsum = SaveInSum * diffday * (YearRate / 360) + SaveInSum;//单利
			obj.oncesavesum = 0;
		}
		return obj;
	}
</SCRIPT>

<SCRIPT type="text/javascript">
function cal(){
	if (!CheckEmpty(beginDateID, "无效的初始存入日期"))
		return false;
	if (Cal_strtodate(beginDateID.value) < Cal_strtodate("1999-11-1")) {
		DispMessage(beginDateID, "初始存入日期不得小于1999年11月1日");
		return false;
	}
	if (!CheckFN3(edSaveSum, "存入金额请输入正数", false))
		return false;
	if (Cal_strtodate(endDateID.value) <= Cal_strtodate(beginDateID.value)) {
		DispMessage(endDateID, "你存入的初始存入日期大于或等于提取日期,请修改");
		return false;
	}
	if (!CheckEmpty(endDateID, "无效的提取日期"))
		return false;
	if (!CheckFN3(edFullRate, "年利率请输入正数", false))
		return false;

	computefullsum(document);
}
</SCRIPT>

</head>
<body>
	<FORM id=CompPartSumCalc onsubmit="return false;" name=CompPartSumCalc action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">活期储蓄计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
								
				</TR>
			</TBODY>
		</TABLE>

		<div class="add_h3">活期储蓄计算器可以帮您计算活期储蓄的本息额</div>

		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">计算项目</DIV>
						<DIV class=L>
							<INPUT id=Radio1 onclick=typechange() CHECKED style="border: 0;"
								type=radio name=CalcType> 实得本息总额
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">存入日期:</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
									<INPUT class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd"
									data-link-format="yyyy-mm-dd"  onblur=ChkCZDate(beginDateID) id=beginDateID name=beginDate>
								    <span class="input-group-addon">
									 <i class="icon-1x icon-calendar"></i>
								   </span> 
							 </div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">存入金额:</DIV>
						<DIV class=L>
							<input type="text" class="input-sm" id=edSaveSum name=edSaveSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">年利率:</DIV>
						<DIV class=L>
							<input type="text" class="input-sm" id=edFullRate name=edFullRate> %
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">提取日期:</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
								<INPUT class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd"
									data-link-format="yyyy-mm-dd"  onblur=ChkCZDate(endDateID) id=endDateID  name=endDateID>
								<span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span> 
							</div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">是否计算利息税：</DIV>
						<DIV class=L>
							<INPUT id=edtax_yes style="border: 0;" tabIndex=1 value=1
								type=radio name=edtaxselect> <LABEL for=rdselect_0> 是</LABEL>
							<INPUT id=edtax_no style="border: 0;" value=2 CHECKED type=radio
								name=edtaxselect> <LABEL for=rdselect_1> 否</LABEL>
					</LI>
				</UL>
				<DIV class=btnArea>
					<!-- <INPUT id="backBtn" class="btnStyle" onclick="javascript:history.go(-1);return false;"  value="返回" type="button">
					<INPUT id=btnCalc onclick="cal()" class=btnStyle value=开始计算 type=button> -->
					
					<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="cal()">
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
						<DIV id=lbSDBX class="L txt">应得利息</DIV>
						<DIV id=SDBX class=L>
							<INPUT type="text" class="input-sm" id=enlixiSum placeholder="计算得出" name=enlixiSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">应付利息税</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edTaxSum placeholder="计算得出" name=edTaxSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">实得利息</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=sdlixiSum placeholder="计算得出" name=sdlixiSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV id=lbSDBX class="L txt">本息合计</DIV>
						<DIV id=SDBX class=L>
							<INPUT type="text" class="input-sm" id=edFullSum placeholder="计算得出" name=edFullSum> 元
						</DIV>
					</LI>

				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>