<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>存本取息计算器</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/WinControl.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calculator.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/WBselect.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/GetRate.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/Components.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/CalcSaveCapGetAcc.js"></SCRIPT>
<script language="javascript" src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT type=text/javascript>
    var  xmlFile;
	$(function() {
		//初始日期
		$(".form_date").icrmDate();
		xmlFile=loadXMLDoc("/hnb-crm-web/html/wd/moneytools/script/RMBSaveRate.xml");
	});
	//加载xml文档
	function loadXMLDoc(xmlFile){
	    var xmlDoc;
	    try{
	        //Internet Explorer 可以使用其原生方法加载 XML
	        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	    }catch(e){
	        try{
	            //Firefox 也有标准方法,但可能造成其他浏览器报错,故省略
	            //使用 XMLHttpRequest 替代,适用于大部分浏览器
	            var xmlHttp=new XMLHttpRequest() ;
	            xmlHttp.open("GET",xmlFile,false) ;
	            xmlHttp.send(null) ;
	            return xmlHttp.responseXML;
	        }catch(e){
	            return null;
	        }
	    }
	    xmlDoc.async=false;
	    xmlDoc.load(xmlFile);
	    return xmlDoc;
	}
	
	
	function getElement(t) {
		return document.getElementById(t);
	}
	function getrate() { //alert(GetRMBSaveRatio(4,document.all.SaveTerm.options(document.all.SaveTerm.selectedIndex).value),window.xmlRMBSaveRate.XMLDocument);
		// document.CompPartSumCalc.edFullRate.value=GetRMBSaveRatio(4,document.CompPartSumCalc.SaveTerm.options(document.CompPartSumCalc.SaveTerm.selectedIndex).value,window.xmlRMBSaveRate.XMLDocument);
		var stime;
		getElement("edFullRate").value = 0;
		stime = parseInt(document.all.SaveTerm.options[document.all.SaveTerm.selectedIndex].value);
		var srate;
		srate = ratejson.findRate(stime, ratejson.findRateItem("depositLump",
				ratejson));

		getElement("edFullRate").value = (parseFloat(srate) * 100).toFixed(4);
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

	var startdate = new Array('2002-2-21', '2002-2-21', '2002-2-21');
	var minterm = new Array(12, 36, 60);
	var rate = new Array(0.0171, 0.0189, 0.0198);

	function changeobject(objectid) {
		var ss1 = document.all.CSCR.innerHTML;
		var ss2 = document.all.MCZQ.innerHTML;

		if (ss1.indexOf(objectid) > 0) {
			ls = document.all.lbCSCR.innerHTML;
			document.all.lbCSCR.innerHTML = document.all.lbMCZQ.innerHTML;
			document.all.lbMCZQ.innerHTML = ls;

			document.all.CSCR.innerHTML = document.all.MCZQ.innerHTML;
			document.all.MCZQ.innerHTML = ss1;
		}
	}

	function calctypechange() {
		document.all.edCapitalSum.value = "";
		//document.all.edCapitalSum.className="txtnum";
		document.all.edCapitalSum.disabled = false;
		document.all.edInitSaveSum.value = "";
		//document.all.edInitSaveSum.className="txtnum";
		document.all.edInitSaveSum.disabled = false;
		Cleartxt();
		if (document.all.CalcType_0.checked == true) {
			changeobject("edCapitalSum");
			document.all.edInitSaveSum.value = '';
			document.all.edCapitalSum.value = "计算得出";
			//document.all.edCapitalSum.className="txtd";
			document.all.edCapitalSum.disabled = true;
		} else if (document.all.CalcType_1.checked == true) {
			changeobject("edInitSaveSum");
			document.all.edCapitalSum.value = '';
			document.all.edInitSaveSum.value = "计算得出";
			//	document.all.edInitSaveSum.className="txtd";
			document.all.edInitSaveSum.disabled = true;
		}

	}

	function loadinit() {
		calctypechange();

		document.all.edFullSum.disabled = true;
		document.all.edTaxSum.disabled = true;
	}

	function locaterate(sdate, term) {
		var result = null;
		for (var i = 0; i < startdate.length; i++)
			if ((sdate >= Cal_strtodate(startdate[i])) && (term == minterm[i])) {
				result = rate[i];
			}
		return result;
	}

	function compute(type) {
		var isCalcTax = false;//是否计算利息税
		if (document.all.edtax_yes.checked) {
			isCalcTax = true;
		}
		var initsavesum, term, capitalsum, taxsum;
		term = parseInt(document.all.SaveTerm.value) / 12; //年为单位
		//var calc = new ActiveXObject("FinanceCalculator.ICalcSaveCapGetAcc");
		if (type == 0) //计算每次支取利息金额
		{
			//calc.Calc(term,document.all.beginDateID.value,document.all.edInitSaveSum.value,document.all.edFullRate.value,1);
			//document.all.edCapitalSum.value=calc.EverySum;
			initsavesum = document.all.edInitSaveSum.value;
			capitalsum = CalcGetAcc(document);
			document.all.edCapitalSum.value = Round(capitalsum * 1000) / 1000;
		} else if (type == 1) //计算初始存入金额
		{
			//calc.Calc(term,document.all.beginDateID.value,document.all.edCapitalSum.value,document.all.edFullRate.value,2);
			//document.all.edInitSaveSum.value=calc.InitSum;
			initsavesum = CalcSaveCap(document);
			capitalsum = document.all.edCapitalSum.value;
			document.all.edInitSaveSum.value = Round(initsavesum);
		}
		taxsum = CalcTaxofRate(document, initsavesum, term);

		if (isCalcTax == false) {
			document.all.edTaxSum.value = 0;
			document.all.edFullSum.value = Round(parseFloat(initsavesum)
					+ parseFloat(capitalsum) * parseFloat(term * 12));
		} else {
			document.all.edTaxSum.value = Round(taxsum);
			document.all.edFullSum.value = Round(parseFloat(initsavesum)
					+ parseFloat(capitalsum) * parseFloat(term * 12) - taxsum);
		}

	}
	function Cleartxt() {
		document.all.edFullSum.value = '计算得出';
		document.all.edTaxSum.value = '计算得出';
	}

	//获得存期
	function addterm() {
		document.all.SaveTerm.options.length = 0;
		ComSaveTime(document.all.SaveTerm, 5, xmlFile);
		if (document.all.E_SaveTerm != null)
			document.all.E_SaveTerm.value = document.all.SaveTerm.options(0).text;
		document.all.SaveTerm.selectedIndex = 0;
		getrate();
	}
	/* document.all.beginDateID.value = datetostring(new Date()); */
	function ksjs(){
		if (!CheckEmpty(document.all.beginDateID, "无效的初始存入日期"))
			return false;
		if (Cal_strtodate(document.all.beginDateID.value) < Cal_strtodate("1999-11-1")) {
			DispMessage(document.all.beginDateID, "初始存入日期不得小于1999年11月1日");
			return false;
		}
		if (document.CompPartSumCalc.CalcType_0.checked == true)
			if (!CheckFN3(edInitSaveSum, "初始存入金额请输入正数", false))
				return false;
		if (!CheckFN3(edFullRate, "年利率请输入正数", false, null, 4))
			return false;
		if (document.CompPartSumCalc.CalcType_1.checked == true)
			if (!CheckFN3(edCapitalSum, "每次支取利息金额请输入正数", false))
				return false;
		if (document.CompPartSumCalc.CalcType_0.checked == true)
			compute(0);
		else
			compute(1);
	}
</SCRIPT>

</head>
<body>

	<FORM id=CompPartSumCalc name=CompPartSumCalc action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">存本取息计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">通过本计算器可以对每次支取利息金额和初始存入金额进行计算。
			其中到期本息金额为本金与最后一次支取利息金额之和（已扣除利息税）。</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">计算项目：</DIV>
						<DIV class=L>
							<INPUT id=CalcType_0 onclick=calctypechange(); CHECKED style="border: 0;" type=radio name=CalcType> 每次支取利息金额 
							<INPUT id=CalcType_1 style="border: 0;" onclick=calctypechange(); type=radio name=CalcType> 初始存入金额
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">储蓄存期：</DIV>
						<DIV class=L>
							<SELECT style="width:140px" id=E_SaveTerm onchange="getrate()" name=SaveTerm style="width: 100px;">
							  <OPTION >请选择</OPTION>
							  <OPTION value=12>一年</OPTION>
								<OPTION value=36>三年</OPTION>
								<OPTION value=60>五年</OPTION></SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">是否计算利息税：</DIV>
						<DIV class=L>
							<INPUT id=edtax_yes style="border: 0;" CHECKED tabIndex=1 value=1
								type=radio name=edtaxselect> <LABEL for=rdselect_0>是</LABEL>
							<INPUT id=edtax_no style="border: 0;" value=2 type=radio
								name=edtaxselect checked="checked"> <LABEL
								for=rdselect_1>否</LABEL>
						</DIV>
					</LI>
					<LI>
						<DIV id=lbCSCR class="L txt">初始存入日期：</DIV>
						<DIV id=CSCR class=L style="width:300px">
							<div class="input-group">
								<input class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd"
									data-link-format="yyyy-mm-dd" onblur="ChkCZDate(beginDateID)" id="beginDateID"  name="beginDate">
								<span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span>
							</div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">初始存入金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edInitSaveSum tabIndex=4 name=edInitSaveSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">年利率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edFullRate tabIndex=5  name=edFullRate>%
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
				    <!-- <INPUT id="backBtn" class="btnStyle" onclick="javascript:history.go(-1);return false;"  value="返回" type="button">
					<INPUT id="btnCalc" class="btnStyle" onclick="ksjs()"  value="开始计算" type="button" tabIndex="1006"> -->
					<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="ksjs()">
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
						<DIV id=lbMCZQ class="L txt">每次支取利息金额：</DIV>
						<DIV id=MCZQ class=L>
							<INPUT type="text" class="input-sm" id=edCapitalSum disabled tabIndex=7 placeholder="计算得出" 
								name=edCapitalSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">到期支取本息金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edFullSum disabled tabIndex=7 placeholder="计算得出"  name=edFullSum>
							元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">扣除利息税金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edTaxSum disabled tabIndex=7
								placeholder="计算得出"  name=edTaxSum> 元
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>


</body>
</html>