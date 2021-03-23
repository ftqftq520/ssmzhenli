<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>债券认购收益率计算器</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/html/wd/moneytools/toolsquery/css/moneytools.css">


<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/WinControl.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/Calendar.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/Calculator.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/WBselect.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/GetRate.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/Components.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath()%>/html/wd/moneytools/script/CalcBondBuy.js"></SCRIPT>
<!-- 
<LINK href="images/Style.css" type=text/css rel=STYLESHEET>
 -->
<SCRIPT language=javascript>
	$(function() {
		//初始日期
		$(".form_date").icrmDate();
	});

	function calcu() {
		if (!CheckFN3(document.all.edCost, "请在债券面额输入正数", false))
			return false;
		if (!CheckFN3(document.all.edPrice, "请在认购价格输入正数", false))
			return false;
		if (!CheckPN(document.all.edYear, "请在债券期限输入正整数", false))
			return false;
		if (document.all.cbType_1.checked)
			if (!CheckFN(document.all.edRate, "请在票面利率输入非负数"))
				return false;
		if (document.all.cbType_2.checked) {
			if (!CheckFN(document.all.edRate, "请在票面利率输入非负数"))
				return false;
			if (!CheckEmpty(document.all.edDate, "认购日期格式不正确！"))
				return false;
			if (!CheckPN(document.all.edFreq, "请在利息支付频率输入正整数", false))
				return false;
		}
		return true;
	}
	function Visibleselect() {
		//贴现债券
		if (document.all.cbType_0.checked == true) {
			document.all.edCost.style.display = "";
			document.all.edRate.style.display = "none";
			document.all.edPrice.style.display = "";
			document.all.edYear.style.display = "";
			document.all.edDate.style.display = "none";
			document.all.edFreq.style.display = "none";
			document.all.Label1.style.display = "";
			document.all.Label2.style.display = "";
			document.all.Label3.style.display = "";
			document.all.Label4.style.display = "none";
			document.all.Label5.style.display = "none";
			document.all.Label6.style.display = "none";
			document.all.img1.style.display = "none";
		}
		//到期一次还本付息债券
		if (document.all.cbType_1.checked == true) {
			document.all.edCost.style.display = ""
			document.all.edRate.style.display = "";
			document.all.edPrice.style.display = "";
			document.all.edYear.style.display = "";
			document.all.edDate.style.display = "none";
			document.all.edFreq.style.display = "none";
			document.all.Label1.style.display = "";
			document.all.Label2.style.display = "";
			document.all.Label3.style.display = "";
			document.all.Label4.style.display = "";
			document.all.Label5.style.display = "none";
			document.all.Label6.style.display = "none";
			document.all.img1.style.display = "none";
		}
		//固定利率和浮动利率
		if (document.all.cbType_2.checked == true) {
			document.all.edCost.style.display = "";
			document.all.edRate.style.display = "";
			document.all.edPrice.style.display = "";
			document.all.edYear.style.display = "";
			document.all.edDate.style.display = "";
			document.all.edFreq.style.display = "";
			document.all.Label1.style.display = "";
			document.all.Label2.style.display = "";
			document.all.Label3.style.display = "";
			document.all.Label4.style.display = "";
			document.all.Label5.style.display = "";
			document.all.Label6.style.display = "";
			document.all.img1.style.display = "";
		}
	}
</SCRIPT>

<SCRIPT language=javascript>
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

<SCRIPT language=javascript>
	$(function() {
		document.all.edDate.value = datetostring(new Date());
	});
	////GetCalc_Close();
</SCRIPT>

</head>
<body>

	<FORM id=CalcBondProfit onsubmit="return false;" name=CalcBondProfit
		action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">债券认购收益率计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">从债券新发行就买进，持有到偿还期到期还本付息，这期间的收益率就为认购收益率。</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<INPUT id=cbType_0 onclick=Visibleselect() value=0 style="border:0;" type=radio name=cbType>
						<LABEL for=cbType_0> 贴现债券（认购价格大于债券面额则无收益）</LABEL>
					</LI>
					<LI>
						<INPUT id=cbType_1 onclick=Visibleselect() value=1  type=radio name=cbType>
						<LABEL for=cbType_1>到期一次还本付息债券</LABEL>
					</LI>
					<LI>
						<INPUT id=cbType_2 onclick=Visibleselect() value=2 CHECKED type=radio name=cbType>
						<LABEL for=cbType_2>固定利率附息债券和浮动利率债券</LABEL>
					</LI>
					<LI id=Label1>
						<DIV class="L txt">债券面额</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edCost value=100 class=txtnum tabIndex=1 name=edCost>元
						</DIV>
					</LI>
					<LI id=Label2>
						<DIV class="L txt">认购价格</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edPrice class=txtnum tabIndex=2 name=edPrice>元
						</DIV>
					</LI>
					<LI id=Label3>
						<DIV class="L txt">债券期限</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edYear class=txtnum tabIndex=3 name=edYear>年
						</DIV>
					</LI>
					<LI id=Label4>
						<DIV class="L txt">票面利率</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edRate class=txtnum tabIndex=4 name=edRate>%
						</DIV>
					</LI>
					<LI id=Label5>
						<DIV class="L txt">认购日期</DIV>
						<div  class=L style="width:300px">
							<div class="input-group">
								<INPUT class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd"
								data-link-format="yyyy-mm-dd" onblur=ChkCZDate(edDate) id=edDate
								value=2012-9-13 name=edDate>
						         <span class="input-group-addon">
									 <i class="icon-1x icon-calendar"></i>
								 </span>
						      </div> 
						</div>
					</LI>
					<LI id=Label6>
						<DIV class="L txt">利息支付频率</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edFreq class=txtnum tabIndex=6 name=edFreq>次/年
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
				</DIV>
			</DIV>
		</DIV>
		<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn"
			onclick="javascript:if(calcu()) CalcBondBuy(document);">
			<!-- <i class="icon-save"></i> -->
			开始计算
		</button>
		<button type="button" class="btn btn-xs btn-default" id="backBtn"
			onclick="javascript:history.go(-1);return false;">
			<!-- <i class="icon-reply"></i> -->
			返回
		</button>
		<DIV class=calculate>
			<DIV class=t>计算结果</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">债券的认购收益率为：</DIV>
						<DIV id=DQBX class=L>
							<INPUT type="text" class="input-sm" id=lbResult class=txtd disabled tabIndex=7  placeholder="计算得出" 
								name=lbResult>%
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>