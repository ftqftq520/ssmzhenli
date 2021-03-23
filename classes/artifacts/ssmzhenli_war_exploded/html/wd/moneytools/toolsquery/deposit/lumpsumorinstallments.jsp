<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>整(零)存整取计算器</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/GetRate.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/Components.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>
<SCRIPT language=javascript src="<%=request.getContextPath() %>/html/wd/moneytools/script/CalcDeposit.js"></SCRIPT>
<script language="javascript" src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT type=text/javascript>
	var  xmlFile;
	$(function() {
		//初始日期
		$(".form_date").icrmDate();
		xmlFile=loadXMLDoc("/hnb-crm-web/html/wd/moneytools/script/RMBSaveRate.xml");
		
		document.DepositCalculator.beginDateID.value = datetostring(new Date());
		document.all.rbDepositWay_0.checked = true;
		
	});
	function getElement(t) {
		return document.getElementById(t);
	}
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
	function getrate() {
		var stime;
		getElement("tbYearRate").value = 0;
		stime = parseInt(getElement("tbSaveTime").options[getElement("tbSaveTime").selectedIndex].value);
		var srate;
		if (document.DepositCalculator.rbDepositWay_0.checked)
			srate = ratejson.findRate(stime, ratejson.findRateItem("Lump",ratejson));
		if (document.DepositCalculator.rbDepositWay_1.checked)
			srate = ratejson.findRate(stime, ratejson.findRateItem("depositLump", ratejson));
		getElement("tbYearRate").value = (parseFloat(srate) * 100).toFixed(4);//2
	}
	function check() {
		if (!CheckEmpty(this.document.all.tbYearRate, "年利率不能为空"))
			return false;
		if (!CheckFN3(this.document.all.tbYearRate, "请在年利率输入正数", false))
			return false;
		if (this.document.all.rbCalcOption_0.checked) {
			if (!CheckFN3(this.document.all.tbInitSaveSum, "请在"
					+ document.all.Layer1.innerText + "输入正数", false)) // 初期存入金额
				return false;
		} else {
			if (!CheckFN3(this.document.all.tbInitSaveSum, "请在到期本息总额输入正数",
					false))
				return false;
		}
		return true;
	}
	function calcu() {
		if (check() == false)
			return false;
		CalcDeposit();
		return false;
	}
</SCRIPT>
<SCRIPT type=text/javascript>
	function changeall() {
		if (document.DepositCalculator.rbDepositWay_0.checked == true) {
			getElement('layertotalSaveSum').style.display = "none";
			document.DepositCalculator.tbSaveTime.options.length = 0;
			ComSaveTime(document.DepositCalculator.tbSaveTime, 2, xmlFile);
			if (document.DepositCalculator.E_tbSaveTime != null)
				document.DepositCalculator.E_tbSaveTime.value = document.DepositCalculator.tbSaveTime.options(0).text;
			document.DepositCalculator.tbSaveTime.selectedIndex = 0;
			if (this.document.all.rbCalcOption_0.checked) {
				this.document.all.Layer1.innerText = "初期存入金额：";
				this.document.all.layerresult.innerText = "到期本息总额：";
			} else {
				this.document.all.Layer1.innerText = "到期本息总额：";
				this.document.all.layerresult.innerText = "初期存入金额：";
			}
		}
		if (document.DepositCalculator.rbDepositWay_1.checked == true) {
			getElement('layertotalSaveSum').style.display = "";
			document.DepositCalculator.tbSaveTime.options.length = 0;
			ComSaveTime(document.DepositCalculator.tbSaveTime, 3, xmlFile);
			if (document.DepositCalculator.E_tbSaveTime != null)
				document.DepositCalculator.E_tbSaveTime.value = document.DepositCalculator.tbSaveTime.options(0).text;
			document.DepositCalculator.tbSaveTime.selectedIndex = 0;
			if (this.document.all.rbCalcOption_0.checked) {
				this.document.all.Layer1.innerText = "每期存入金额：";
				this.document.all.layerresult.innerText = "到期本息总额：";
			} else {
				this.document.all.Layer1.innerText = "到期本息总额：";
				this.document.all.layerresult.innerText = "每期存入金额：";
			}
		}
		document.DepositCalculator.tbSaveTime.selectedIndex = 0;
		getrate();
	}
</SCRIPT>

<SCRIPT language=javascript for=rbCalcOption type=text/javascript event=onclick>
	if (this.document.all.rbCalcOption_0.checked) {

		document.all.layerresult.innerText = "到期本息总额：";
		if (document.DepositCalculator.rbDepositWay_0.checked == true)
			this.document.all.Layer1.innerText = "初期存入金额：";
		else
			this.document.all.Layer1.innerText = "每期存入金额：";
	} else {
		document.all.Layer1.innerText = "到期本息总额：";
		if (document.DepositCalculator.rbDepositWay_0.checked == true)
			document.all.layerresult.innerText = "初期存入金额：";
		else
			document.all.layerresult.innerText = "每期存入金额：";
	}
</SCRIPT>

<SCRIPT type=text/javascript>
	function star() {
		changeall();
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
	
</SCRIPT>
</head>
<body>
	<FORM id=DepositCalculator name=DepositCalculator action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">整(零)存整取计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>

		<div class="add_h3">银行存款是使用较多的投资方式，通过本计算器，可以对零存整取与整存整取的初始存入金额或到期本息总额进行计算。其中，到期本息总额为扣除利息税后的净值。</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">存款方式：</DIV>
						<DIV class=L>
							    <INPUT id=rbDepositWay_0 onclick=changeall() value=1 CHECKED style="border: 0;" type=radio name=rbDepositWay>
								<LABEL for=rbDepositWay_0>整存整取</LABEL>
								<INPUT id=rbDepositWay_1 onclick=changeall() value=2 style="border: 0;" type=radio name=rbDepositWay> 
								<LABEL for=rbDepositWay_1>零存整取</LABEL>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">计算选项：</DIV>
						<DIV class=L>
							<INPUT id=rbCalcOption_0 tabIndex=2 value=1 CHECKED style="border: 0;" type=radio name=rbCalcOption>
							<LABEL for=rbCalcOption_0>计算到期本息总额</LABEL>&nbsp;&nbsp;&nbsp;
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">初始存入日期：</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
								 <INPUT class="form-control input-sm date form_date"   class="form_date" data-date-format="yyyy-mm-dd"
									data-link-format="yyyy-mm-dd"  onblur=ChkCZDate(beginDateID); id=beginDateID name=beginDateID>
								 <span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span>
							</div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">储蓄存期：</DIV>
						<DIV class=L>
							<SELECT style="width:140px" id=tbSaveTime onchange=getrate() name=tbSaveTime>
							  	<OPTION>请选择</OPTION>
							  	<OPTION value=3>三个月</OPTION>
								<OPTION value=6>半年</OPTION>
								<OPTION value=12>一年</OPTION>
								<OPTION value=24>二年</OPTION>
								<OPTION value=36>三年</OPTION>
								<OPTION value=60>五年</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">年利率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbYearRate name=tbYearRate> %
						</DIV>
					</LI>
					<LI>
						<DIV id=Layer1 class="L txt">初期存入金额：</DIV>
						<!--<div id="Layer2" class="L txt">每期存入金额：</div>-->
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbInitSaveSum name=tbInitSaveSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">是否计算利息税：</DIV>
						<DIV class=L>
							<INPUT id=edtax_yes style="border: 0;" tabIndex=1 value=1
								type=radio name=edtaxselect> <LABEL for=rdselect_0> 是</LABEL>
							<INPUT id=edtax_no style="border: 0;" value=2 CHECKED type=radio
								name=edtaxselect> <LABEL for=rdselect_1> 否</LABEL>
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
					<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="calcu()">
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
					<LI id=layertotalSaveSum style="display: none;">
						<DIV class="L txt">累计存入金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbtotalSaveSum disabled placeholder="计算得出" readOnly
								name=tbtotalSaveSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV id=layerresult class="L txt">到期本息总额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbTermEndSum  placeholder="计算得出"  
								name=tbTermEndSum> 元
						</DIV>
					</LI>
					<LI>
						<DIV id=Label9 class="L txt">利息税金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=tbInterestTaxSum  placeholder="计算得出"  
								name=tbInterestTaxSum> 元
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>