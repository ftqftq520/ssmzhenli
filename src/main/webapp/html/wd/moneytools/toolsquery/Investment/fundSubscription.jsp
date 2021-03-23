<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>基金认购计算器</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">


<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>
<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js">
</SCRIPT>


<SCRIPT language=javascript>



$(function(){
		//初始日期
		$(".form_date").icrmDate();});
		
function nload(){
var today = new Date();
   var nYear = today.getYear();
   var nMonth = today.getMonth();
   var nday = today.getDate();
   
   var smonth="";
   var sday="";
   m = parseInt(nMonth)+1;
   d = parseInt(nday);
   if(m<10) smonth="0"+m; else smonth +=m; 
   if(d<10) sday="0"+d; else sday +=d ;
   var stoday=""+nYear+smonth+sday;
   
   document.all.ctl15.value=stoday;
}
</SCRIPT>

<SCRIPT language=javascript>
//数据校验，判断输入的是否为数字
function numberCheck(str) { 
var strTmp = "" + str + "" ; 
if(strTmp.length>0) { 
strNum = "0123456789.-" ; 
//for(var i=0;i0) return false; 
if(str.indexOf('.')>=0) { 
if(str.indexOf('.')==0 || str.indexOf('.')==(str.length-1)) return false; 
if(str.indexOf('.') != str.lastIndexOf('.')) return false ; 
} return true; 
} 
} 
//日期数据格式检查 (yyyymmdd) 
function dateCheck2(str) { 
var strTmp = "" + str + "" ; 
if(strTmp.length>0) { 
if(strTmp.length != 8) return false; 
strNum = "0123456789" ; 
//for(var i=0;i12 || eval(str.substring(4,6))<=0) return false ; 
if(eval(str.substring(6,8))>31 || eval(str.substring(6,8))<=0) 
return false; 
return true; 
} 
}
function newWindow(url,type)
{
  if(type == '1')
    window.open(url,"","top=150,left=250,width=500,height=300,resizable=yes,scrollbars=yes");
  else
    window.open(url,"","top=150,left=250,width=380,height=250,resizable=yes,scrollbars=yes");
}
function onForm1()
{
    if(document.form1.ctl12.value == '')
    {
        alert( "请输入 <认购金额>.");
        document.form1.ctl12.focus() ;
        return ;
    }
    if(document.form1.ctl13.value == '')
    {
        alert( "请输入 <单位份额基金净值>.");
        document.form1.ctl13.focus() ;
        return ;
    }
    if(document.form1.ctl14.value == '')
    {
        alert( "请输入 <认购费率>.");
        document.form1.ctl14.focus() ;
        return ;
    }
    if(document.form1.ctl17.value == '')
    {
        alert( "请输入 <同业存款利率>.");
        document.form1.ctl17.focus() ;
        return ;
    }    
    if(document.form1.ctl15.value == '')
    {
        alert( "请输入 <认购日期>.");
        document.form1.ctl15.focus() ;
        return ;
    }
    if(document.form1.ctl16.value == '')
    {
        alert( "请输入 <(预计)成立日期>.");
        document.form1.ctl16.focus() ;
        return ;
    }
    if(numberCheck(document.form1.ctl12.value)==false)
    {
        alert( "<认购金额> 输入有误，请重新输入.");
        document.form1.ctl12.select() ;
        return ;
    }
    if(numberCheck(document.form1.ctl13.value)==false)
    {
        alert( "<单位份额基金净值> 输入有误，请重新输入.");
        document.form1.ctl13.select() ;
        return ;
    }
    if(numberCheck(document.form1.ctl14.value)==false)
    {
        alert( "<认购费率> 输入有误，请重新输入.");
        document.form1.ctl14.select() ;
        return ;
    }
    if(numberCheck(document.form1.ctl17.value)==false || eval(document.form1.ctl17.value)<0 ||  eval(document.form1.ctl17.value)>100 )
    {
        alert( "<同业存款利率> 输入有误，请重新输入.");
        document.form1.ctl17.select() ;
        return ;
    }    
    /*if(dateCheck2(document.form1.ctl15.value)==false)
    {
        alert( "<认购日期> 输入有误，请重新输入.");
        document.form1.ctl15.select() ;
        return ;
    }
    if(dateCheck2(document.form1.ctl16.value)==false)
    {
        alert( "<(预计)成立日期> 输入有误，请重新输入.");
        document.form1.ctl16.select() ;
        return ;
    }*/
    if(eval(document.form1.ctl14.value)>1.5 ||eval(document.form1.ctl14.value)<0 )
    {
        alert( "<认购费率> 需在0~1.5之间，请重新输入.");
        document.form1.ctl14.select() ;
        return ;
    }
   var text12 = document.form1.ctl12.value ;
   var text13= document.form1.ctl13.value ;
   var text14 = document.form1.ctl14.value ;
   var text17= document.form1.ctl17.value ;   
   date1 = dateFormat(new Date(document.form1.ctl15.value.replace(/-/g,"/")), 'yyyyMMdd');
   date2 = dateFormat(new Date(document.form1.ctl16.value.replace(/-/g,"/")), 'yyyyMMdd');
   year1 = eval(date1.substring(0,4));
   month1 = eval(date1.substring(4,6));
   day1 = eval(date1.substring(6,8));
   year2 = eval(date2.substring(0,4));
   month2 = eval(date2.substring(4,6));
   day2 = eval(date2.substring(6,8));
   var day = 0 ;
  if((year2-year1)<0)
   {
     alert("<(预计)成立日期> 不能比 <认购日期> 早，请重新输入.") ;
     document.form1.ctl16.select() ;
     return ;
   }
   else
   {
      if((year2-year1)==0)
      {
        if((month2-month1)<0)
        {
            alert("<(预计)成立日期> 不能比 <认购日期> 早，请重新输入.") ;
            document.form1.ctl16.select() ;
            return ;
        }
        else
        {
          if((month2-month1)==0)
          {
             if((day2-day1)<0)
             {
                alert("<(预计)成立日期> 不能比 <认购日期> 早，请重新输入.") ;
                document.form1.ctl16.select() ;
                return ;
             }
             else
                day = day2 - day1 ;
          }
          else
          {
             day = (month2-month1)*30 ;
             day += (day2-day1) ;
          }
        }
      }
      else
      {
         day = (year2-year1)*365 ;
         day += (month2-month1)*30 ;
         day += (day2-day1) ;
      }
   }      
   var text156= day ;
   var rgsxf = text12*[1-1/(1+text14/100)];
   var rgqlxjz = text12*text17*(text156/365)/100;
   var rgfe = (text12-rgsxf+rgqlxjz)/text13;
   
   rgsxf=""+rgsxf;
   rgqlxjz=""+rgqlxjz;
   rgfe=""+rgfe;
   
   var ind1=rgsxf.indexOf(".");
   var ind2=rgqlxjz.indexOf(".");
   var ind3=rgfe.indexOf(".");
   
   if(ind1>=0) rgsxf =""+rgsxf.substring(0,ind1)+rgsxf.substring(ind1,ind1+3); 
   else rgsxf=rgsxf+".00";
   if(ind2>=0) rgqlxjz =""+rgqlxjz.substring(0,ind2)+rgqlxjz.substring(ind2,ind2+3);
   else rgqlxjz=rgqlxjz+".00";
   if(ind3>=0) rgfe =""+rgfe.substring(0,ind3)+rgfe.substring(ind3,ind3+3);
   else rgfe=rgfe+".00";
   var v1 = rgsxf.substring(ind1,ind1+3);
   var v2 = rgqlxjz.substring(ind2,ind2+3);
   var v3 = rgfe.substring(ind3,ind3+3);
 
   if(v1.length<=2) rgsxf =rgsxf+"0";
   if(v2.length<=2) rgqlxjz =rgqlxjz+"0";
   if(v3.length<=2) rgfe =rgfe+"0";
   
   document.all.rgsxf.value=rgsxf;
   document.all.rgqlxjz.value=rgqlxjz;
   document.all.rgfe.value=rgfe;
}
</SCRIPT>

<SCRIPT language=javascript>
<!--
	var minterm;
	var rate1;
	var rate2;
	var rate3;
	var rate;
	function init()
	{
		minterm =  new Array(12,36,60,-1);
		rate1 = GetRMBSaveRatio(5,12,window.xmlRMBSaveRate.XMLDocument)/100;
		rate2 = GetRMBSaveRatio(5,36,window.xmlRMBSaveRate.XMLDocument)/100;
		rate3 = GetRMBSaveRatio(5,60,window.xmlRMBSaveRate.XMLDocument)/100;
		rate =  new Array(rate1,rate2,rate3,-1);
		setRate();
	}
		// -->

function dateFormat(date, format){
	var o = {
		"M+" : date.getMonth() + 1, //month 
		"d+" : date.getDate(), //day 
		"h+" : date.getHours(), //hour 
		"m+" : date.getMinutes(), //minute 
		"s+" : date.getSeconds(), //second 
		"q+" : Math.floor((date.getMonth() + 3) / 3), //quarter 
		"S" : date.getMilliseconds()
	//millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
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

	<FORM style="MARGIN: 0px" id=form1 onsubmit="return false;" name=form1
		action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">基金认购份额计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">该计算器适用于计算基金发行期内的基金费用和基金份额</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">认购金额</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=ctl12> &nbsp;&nbsp;元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">单位份额基金净值</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" value=1.000 name=ctl13>&nbsp;&nbsp;元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">认购费率</DIV> 
						<INPUT type="text" class="input-sm" value=1.00  name=ctl14> &nbsp;&nbsp;<FONT size=2>%</FONT>&nbsp;(0-1.5)
					</LI>
					<LI>
						<DIV class="L txt">同业存款利率</DIV> 
						<INPUT type="text" class="input-sm" value=0.99  name=ctl17> &nbsp;&nbsp;<FONT size=2>%</FONT>&nbsp;
					</LI>
					<LI>
						<DIV class="L txt">认购日期</DIV> 
						<div  class=L style="width:300px">
							<div class="input-group">
								 <input class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd" name="ctl15" id="ctl15" onblur="ChkCZDate(this);">
						         <span class="input-group-addon">
									 <i class="icon-1x icon-calendar"></i>
								 </span>
						      </div> 
						</div>
					</LI>
					<!--  &nbsp;&nbsp;(yyyymmdd) -->
					<LI>
						<DIV class="L txt">成立日期</DIV>
						<div  class="L" style="width:300px">
							<div class="input-group">
								 <INPUT class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd"  name=ctl16 id="ctl16" onblur="ChkCZDate(ctl16);">
						         <span class="input-group-addon">
									 <i class="icon-1x icon-calendar"></i>
								 </span>
						      </div> 
						</div>
					</LI>
				</UL>
				<DIV class=btnArea>
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="javaScript:onForm1()">
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
						<DIV class="L txt">认购手续费：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=rgsxf> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">认购期利息结转：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm"  name=rgqlxjz> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">认购份额 ：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=rgfe> 份
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>