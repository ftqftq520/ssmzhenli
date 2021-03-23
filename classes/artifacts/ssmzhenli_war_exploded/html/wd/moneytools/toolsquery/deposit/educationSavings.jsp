<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>教育储蓄计算器 </title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">

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

<SCRIPT type=text/javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CalcEdu.js"></SCRIPT>
<script language="javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>


<SCRIPT type=text/javascript>


var  otherXmlFile;
$(function() {
	//初始日期
	$(".form_date").icrmDate();
	
	otherXmlFile=loadXMLDoc("/hnb-crm-web/html/wd/moneytools/script/OtherSaveRate.xml");
	
	
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
	function CheckData() {
		if (!CheckEmpty(this.document.all.beginDateID, "初始存入日期格式不正确"))
			return false;
		if (!CheckFN3(this.document.all.edRate, "请在年利率输入正数", false, null, 4))
			return false;
		if (!CheckFN3(this.document.all.edBalance, "请在月存入金额输入正数", false))
			return false;
		/* if (this.document.all.ccType.value == "12")
			if (!CheckFloatRange(this.document.all.edBalance, 50, 1666,
					"最低起存金额为50元；一年期每月存款不能高于1666元！"))
				return false;
		if (this.document.all.ccType.value == "36")
			if (!CheckFloatRange(this.document.all.edBalance, 50, 555,
					"最低起存金额为50元；三年期每月存款不能高于555元！"))
				return false;
		if (this.document.all.ccType.value == "72")
			if (!CheckFloatRange(this.document.all.edBalance, 50, 277,
					"最低起存金额为50元；五年期每月存款不能高于277元！"))
				return false; */
		return true;
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
	//获得教育储蓄存期列表

	function getterm() {
		document.all.ccType.options.length = 0;
		ComEduSaveTime(document.all.ccType, 1,
				otherXmlFile);
		if (document.all.E_cbType != null)
			document.all.E_cbType.value = document.all.ccType.options(0).text;
		document.all.ccType.selectedIndex = 0;
	}

	function getrateC(sl) {
		//document.all.edRate.value=GetOtherSaveRatio(1,document.all.cbType.options[document.all.cbType.selectedIndex].value,window.xmlOtherSaveRate.XMLDocument);
		var stime;
		getElement("edRate").value = 0;
		stime = parseInt(sl.options[sl.selectedIndex].value);
		//var  tt=$('#ccType option:selected').val();
		
		
		if (stime > 72) stime = 72;
		var srate;
		srate = ratejson.findRate(stime, ratejson
				.findRateItem("edu_deposit", ratejson));
		getElement("edRate").value = (parseFloat(srate) * 100).toFixed(4);//2

	}
	
	

	//star();
	function star() {
		getterm();
		getrate();
	}
</SCRIPT>
</head>
<body>

	<form id="education" onsubmit="return false;" name="education" action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">教育储蓄计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>

		<div class="add_h3">教育储蓄是国家为了大力发展教育事业而推出的储蓄品种，它采用的是零存整取的存款方法和定期存款的存款利息，而且实行免缴利息税的优惠政策。适用于有需要接受非义务教育的孩子的家庭。</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">初始存入日期：</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
								<input  class="form-control input-sm date form_date" class="form_date" data-date-format="yyyy-mm-dd"
								data-link-format="yyyy-mm-dd" onblur="ChkCZDate(beginDateID);" 
								id=Text1 value="" name="beginDateID">
								 <span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span>
							</div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">储蓄存期：</DIV>
						<div>
							<SELECT style="width:140px" id="ccType" onchange="getrateC(this)" name="ccType">
							    <OPTION selected value="">请选择</OPTION>
								<OPTION value="12">一年</OPTION>
								<OPTION value="36">三年</OPTION>
								<OPTION value="72">六年</OPTION>
							</SELECT>
							
						</div>
					</LI>
					<LI>
						<DIV class="L txt">年利率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edRate tabIndex=3 name=edRate  >
							%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">月存入金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edBalance tabIndex=4
								name=edBalance> 元
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
					<!-- <INPUT id=btnExecute class=btnStyle tabIndex=8
						onclick="javascript:if(CheckData()) EduCalc1(document);"
						value=开始计算 type=submit name=btnExecute>
					
					<INPUT id="backBtn" class="btnStyle" onclick="javascript:history.go(-1);return false;"  value="返回" type="button"> -->
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="javascript:if(CheckData()) EduCalc1(document);">
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
						<DIV id=layerresult class="L txt">到期本息金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=lbSum disabled placeholder="计算得出"  readOnly name=lbSum>
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</form>
</body>
</html>