<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>外币兑换计算器</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT type="text/javascript" src="<%=request.getContextPath() %>/html/wd/moneytools/script/base.js"></SCRIPT>
<SCRIPT type="text/javascript" src="<%=request.getContextPath() %>/html/wd/moneytools/script/forex_data.js"></SCRIPT>

<SCRIPT type="text/javascript">
function ForExc(formObj){
	if(!CheckElem(formObj.elements["amount"], "卖出金额")) return false;
	var amount = formObj.elements["amount"].value;
	if(!document.getElementById("hand").checked)
	culRate();
	if(!CheckElem(formObj.elements["rate"], "汇率")) return false;
	var rate = parseFloat(formObj.elements["rate"].value);
	formObj.elements["result"].value = Format(amount * rate);
}
function culRate(){
	var formObj = document.forExc;
	var rateSell = parseFloat(formObj.elements["sell"].value);//按银行买入汇率
	var rateBuy = parseFloat(formObj.elements["buy"].value);//按银行卖出汇率
	var rate = rateSell / rateBuy;
	formObj.elements["rate"].value = Math.round(rate*10000)/10000;
}
function genRate(type){
	for(var i=0;i<16;i++){
		document.forExc.sell.options[i].value = (parseInt(type)==0)?(parseFloat(lists[i+1][parseInt(type)])/100):((lists[i+1][parseInt(type)]=="")?(parseFloat(lists[i+1][0])/100):(parseFloat(lists[i+1][parseInt(type)])/100));
		document.forExc.buy.options[i].value = parseFloat(lists[i+1][2])/100;
	}
	culRate();
}
</SCRIPT>

<SCRIPT language=javascript type=text/javascript>
$(function(){
	  genRate(0);
});
</SCRIPT>
</head>
<body>

	<FORM id="forExc" onsubmit="ForExc(this);return false;" name=forExc
		action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top>
						<SPAN class="cy_lb_top_l cy_white14">外汇买卖（兑换）计算器</SPAN>
						<SPAN class=cy_lb_top_c></SPAN>
						<SPAN class="cy_lb_top_r cy_blue14"></SPAN>
					</TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">外汇买卖（兑换）计算器可以帮助您计算能够兑换或买卖外币的数额</div>

		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">钞汇选择：</DIV>
						<DIV class=L>
							<INPUT onclick=genRate(this.value) value=1 style="border: 0;" type=radio name=type> 钞 
							<INPUT onclick=genRate(this.value) value=0 CHECKED style="border: 0;" type=radio name=type> 汇
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">卖 出：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=amount>&nbsp;
							<SELECT  style="width:140px" onchange="culRate()"  name=sell>
								<OPTION selected value="7.953200000000001">美元</OPTION>
								<OPTION value="10.166699999999998">欧元</OPTION>
								<OPTION value="14.9921">英镑</OPTION>
								<OPTION value="0.068261">日元</OPTION>
								<OPTION value="1.0227">港币</OPTION>
								<OPTION value="7.1216">加拿大元</OPTION>
								<OPTION value="5.075">新西兰元</OPTION>
								<OPTION value="5.0412">新加坡元</OPTION>
								<OPTION value="6.4315">瑞士法郎</OPTION>
								<OPTION value="1.1055">瑞典克朗</OPTION>
								<OPTION value="0.2112">泰国铢</OPTION>
								<OPTION value="1.2658">挪威克朗</OPTION>
								<OPTION value="0.9956">澳门元</OPTION>
								<OPTION value="6.069299999999999">澳大利亚元</OPTION>
								<OPTION value="1.3627">丹麦克朗</OPTION>
								<OPTION value="0.15460000000000001">菲律宾比索</OPTION>
								<OPTION value="">人民币</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">汇 率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" value="" readOnly name=rate> 
							<INPUT id=hand onclick="document.forExc.rate.readOnly = (!this.checked)?true:false;" style="border: 0;" type=checkbox> 手动
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">买入币种</DIV>
						<DIV class=L>
							<SELECT style="width:140px" onchange="culRate()"  name=buy>
								<OPTION value=7.985>美元</OPTION>
								<OPTION value=10.248399999999998>欧元</OPTION>
								<OPTION value=15.1125>英镑</OPTION>
								<OPTION value=0.068809>日元</OPTION>
								<OPTION value=1.0266>港币</OPTION>
								<OPTION value=7.1788>加拿大元</OPTION>
								<OPTION value=5.1158>新西兰元</OPTION>
								<OPTION value=5.0817000000000005>新加坡元</OPTION>
								<OPTION value=6.4832>瑞士法郎</OPTION>
								<OPTION value=1.1144>瑞典克朗</OPTION>
								<OPTION value=0.21289999999999998>泰国铢</OPTION>
								<OPTION value=1.276>挪威克朗</OPTION>
								<OPTION value=0.9994>澳门元</OPTION>
								<OPTION value=6.118099999999999>澳大利亚元</OPTION>
								<OPTION value=1.3736000000000001>丹麦克朗</OPTION>
								<OPTION value=0.1558>菲律宾比索</OPTION>
								<OPTION selected value=1>人民币</OPTION>
							</SELECT>
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
					<button type="submit" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="">
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
						<DIV class="L txt">买入金额：</DIV>
						<DIV id=DQBX class=L>
							<INPUT type="text" class="input-sm" title=结果显示区，只能复制 readOnly name=result>
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>