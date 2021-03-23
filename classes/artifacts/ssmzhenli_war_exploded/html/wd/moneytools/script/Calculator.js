
/*------------------------------------------------------------------------
  计算器控件 
  function Calc_dropdown(edit)
    弹出计算器，参数edit可无 
  
*/

var Calc_popup;

var Calc_edit;
var Calc_stored = 0;
var Calc_state = "0";
var Calc_newnum = false;

function Calc_hide()
{
  Calc_popup.releaseCapture();
  Calc_popup.style.display="none";
}

function Calc_capture_click()
{
  var obj=event.srcElement;
  if (Calc_popup.contains(obj)) {
    if ( (obj!=Calc_popup) && obj.onclick) obj.onclick();
  } else {
    Calc_hide();
  }
}

function Calc_writeHTML()
{
  if (typeof(Calc_popup) != "undefined") return;
  var html =
    '<table style="border:black 1px solid;text-align:center;width:108px;FONT-SIZE:10.5pt;cursor:hand;'+
    'background-color:#fffef5;" cellspacing="1" hidefocus="true" class="calc_table">'+
	'<style>'+
	'TD.calc_btn {border-top:#e3eff4 1px solid;border-left:#e3eff4 1px solid;border-right:#a5c2d1 1px solid;'+
	'border-bottom:#a5c2d1 1px solid;BACKGROUND-COLOR:#d6e7ef;vertical-align:bottom;font-size:9pt;color:#800000}'+
	'TD.calc_num {border-top:#e7ebd6 1px solid;border-left:#e7ebd6 1px solid;border-right:#c6d09d 1px solid;'+
	'border-bottom:#c6d09d 1px solid;BACKGROUND-COLOR:#e7ebd6;color:navy}'+
	'</style>'+
	'<tr><td colspan="2" class="calc_btn" onclick="Calc_clear()">清除</td>'+
	'<td colspan="2" class="calc_btn" onclick="Calc_backspace()" ondblclick="this.click()">←</td></tr>'+
	'<tr><td class="calc_num" width="25%" onclick="Calc_number(7)" ondblclick="this.click()">7</td>'+
	'<td class="calc_num" width="25%" onclick="Calc_number(8)" ondblclick="this.click()">8</td>'+
	'<td class="calc_num" width="25%" onclick="Calc_number(9)" ondblclick="this.click()">9</td>'+
	'<td class="calc_btn" width="25%" onclick="Calc_plus()">┼'+
	'</td></tr><tr>'+
	'<td class="calc_num" onclick="Calc_number(4)" ondblclick="this.click()">4</td>'+
	'<td class="calc_num" onclick="Calc_number(5)" ondblclick="this.click()">5</td>'+
	'<td class="calc_num" onclick="Calc_number(6)" ondblclick="this.click()">6</td>'+
	'<td class="calc_btn" onclick="Calc_minus()">─</td>'+
	'</tr><tr>'+
	'<td class="calc_num" onclick="Calc_number(1)" ondblclick="this.click()">1</td>'+
	'<td class="calc_num" onclick="Calc_number(2)" ondblclick="this.click()">2</td>'+
	'<td class="calc_num" onclick="Calc_number(3)" ondblclick="this.click()">3</td>'+
	'<td class="calc_btn" onclick="Calc_times()">╳</td>'+
	'</tr><tr>'+
	'<td colspan="2" class="calc_num" onclick="Calc_number(0)" ondblclick="this.click()">0</td>'+
	'<td class="calc_num" style="font-weight:bold" onclick="Calc_dot()">.</td>'+
	'<td class="calc_btn" onclick="Calc_divide()">╱</td>'+
	'</tr><tr>'+
	'<td class="calc_btn" colspan="4" onclick="Calc_enter()">'+
	'<font color=green>=</font> 确定</td></tr></table>';

  Calc_popup = document.createElement(
    '<Div style="z-index:20000;position: absolute;display:none" hidefocus=true '
   +'onclick="Calc_capture_click()" ondblclick="this.click()">');
  document.body.insertAdjacentElement('beforeEnd',Calc_popup);
  Calc_popup.innerHTML = html;
}

// 弹出日历，参数edit可无 
function Calc_dropdown(edit) {
  if (!edit) {
    edit = window.event.srcElement.parentElement.children(0);
    if ((!edit.type) || (edit.type.toLowerCase() != "text")) return;
  }
  if(edit.readOnly) return;
  if ((Calc_edit==edit)&&(Calc_popup.style.display="")) return;
  Calc_edit = edit;
  Calc_stored = Number(Calc_edit.value);
  if (isNaN(Calc_stored)) Calc_stored = 0;
  edit.focus();
  Calc_state = 0;
  Calc_newnum = true;
  Calc_writeHTML();
  
  // 定位
  Calc_popup.style.left = 
    event.clientX - event.offsetX + edit.offsetWidth - 108
    - edit.clientLeft - document.body.clientLeft + document.body.scrollLeft;
  
  var top = 
    event.clientY - event.offsetY + edit.offsetHeight
    - edit.clientTop - document.body.clientTop + document.body.scrollTop;
  
  // 如果下拉框高度超出则往上弹出
  if (top > document.body.scrollTop + document.body.getBoundingClientRect().bottom - 117)
    top -= edit.offsetHeight + 117; 
  Calc_popup.style.top = top;
  
  Calc_popup.style.display="";
  
  // 如果下拉框弹出后看不见（超出底部），则自动滚页
//  if (Calc_popup.offsetTop + Calc_popup.offsetHeight + document.body.clientTop>= 
//      document.body.offsetHeight + document.body.scrollTop)
//    document.body.doScroll("scrollbarPageDown");
  
  Calc_popup.setCapture();
}

function Calc_clear()
{
  Calc_stored = 0;
  Calc_state = 0;
  Calc_newnum = false;
  Calc_edit.value = 0;
}

function Calc_backspace()
{
  if (Calc_newnum) return;
  var str = Calc_edit.value;
  if (str.length <= 1)
    Calc_edit.value = 0;
  else {
    str = str.substr(0,str.length-1);
    if (isNaN(Number(str))) Calc_edit.value = 0;
    else Calc_edit.value = str;
  }
}

function Calc_docalc(state)
{
  if (Calc_newnum) return;
  var num = Number(Calc_edit.value);
  if (isNaN(num)) return;
  switch (state) {
    case '+':
      num = Calc_stored + num;
      break;
    case '-':
      num = Calc_stored - num;
      break;
    case '*':
      num = Calc_stored * num;
      break;
    case '/':
      if (num == 0) num = Calc_stored;
      else num = Calc_stored / num;
      break;
  }
  Calc_edit.value = Math.round(num*10000)/10000; //结果保留4位小数
  Calc_stored = num;
  Calc_newnum = true;
}

function Calc_plus()
{
  Calc_docalc(Calc_state);
  Calc_state = "+";
}

function Calc_minus()
{
  Calc_docalc(Calc_state);
  Calc_state = "-";
}

function Calc_times()
{
  Calc_docalc(Calc_state);
  Calc_state = "*";
}

function Calc_divide()
{
  Calc_docalc(Calc_state);
  Calc_state = "/";
}

function Calc_dot()
{
  if (Calc_newnum) {
    Calc_edit.value = '0.';
    Calc_newnum = false;
    return;
  }
  var str = Calc_edit.value;
  if (str.indexOf('.') < 0)
    Calc_edit.value +='.';
}

function Calc_enter()
{
  Calc_docalc(Calc_state);
  Calc_hide();
}

function Calc_number(num)
{
  var en = Number(Calc_edit.value);
  if (isNaN(en) || ((en==0)&&(Calc_edit.value.indexOf('0.') != 0)) || Calc_newnum) {
    Calc_edit.value = num;
    Calc_newnum = false;
  } else {
    Calc_edit.value += num;
  }
}
//生成计算器关闭按扭的字符串
function GetCalc_Close()
{
   var headstr;
   headstr='<IMG onmouseover="this.src='+"'../Images/CalcClose2.gif'"+
           '" style="right: 10px; CURSOR: hand; POSITION: absolute; TOP: 0px" onclick="document.location.href ='+
           "'EXIT'"+
           '" onmouseout="this.src='+
           "'../Images/CalcClose1.gif'"+
           '" src="../Images/CalcClose1.gif"><IMG onmouseover="this.src='+
           "'../Images/CalcMini2.gif'"+
           '" style="right: 34px; CURSOR: hand; POSITION: absolute; TOP: 0px" onclick="document.location.href = '+
           "'MINI'"+
           '" onmouseout="this.src='
           +"'../Images/CalcMini1.gif'"+
           '" src="../Images/CalcMini1.gif">';
   document.writeln(headstr);
}

/**以下为计算器计算公式函数，分别为个人储蓄存款计算器、个人住房贷款计算器、
 **个人贷款计算器、企业贷款计算器、外币兑换计算器、外币存款计算器、外汇贷款计算器
 */
/*函数：COMMON------
 *输入参数：original（存款金额）         active（存款金额）
 *          timeSpan（存款时间：月份）   interestRate（利息税率）
 *输出参数：objArray   其中:
 *	    objArray[0]为存款利息 objArray[1]为利息税额
 *	    objArray[2]为实得利息 objArray[3]为本息合计
 *	    结果保留两位小数
 */
function privateSaveCommon(original,active,timeSpan,interestRate){
	var interest=original*active*0.001*timeSpan;
	//interest=(Math.round(interest*100))/100;//存款利息：取两位小数
	var interestTaxe=interest*interestRate;
	//interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数
        var realInterest=interest*(1-interestRate);
        //realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数
        var total=parseFloat(original)+parseFloat(realInterest);
        //total=(Math.round(total*100))/100;//本息合计：取两位小数
        var objArray=new Array();
        objArray[0]=interest;
        objArray[1]=interestTaxe;
        objArray[2]=realInterest;
        objArray[3]=total;
        return objArray;
}
/*函数：个人储蓄存款计算器计算公式--非活期
 *输入参数：original（存款金额）         active（存款金额）
 *          timeSpan（存款时间：月份）   interestRate（利息税率）
 *输出参数：objArray   其中:
 *	    objArray[0]为存款利息 objArray[1]为利息税额
 *	    objArray[2]为实得利息 objArray[3]为本息合计
 *	    结果保留两位小数
 */
function privateSave(original,active,timeSpan,interestRate){
	//alert(timeSpan);
	var interest=original*active*0.01*timeSpan;
	var interestTaxe=interest*interestRate;
        var realInterest=interest*(1-interestRate);
        var total=parseFloat(original)+parseFloat(realInterest);
	interest=(Math.round(interest*100))/100;//存款利息：取两位小数        
	realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数   
	interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数 	     
        total=(Math.round(total*100))/100;//本息合计：取两位小数
        var objArray=new Array();
        objArray[0]=interest;
        objArray[1]=interestTaxe;
        objArray[2]=realInterest;
        objArray[3]=total;
        return objArray;
}
function privateSaveDHLB(original,active,timeSpan,interestRate){
	//alert(timeSpan);
	var interest=original*active*0.01*timeSpan/12;	
	var interestTaxe=interest*interestRate;
        var realInterest=interest-interestTaxe;
        var total=parseFloat(original)+parseFloat(realInterest);
	interest=(Math.round(interest*100))/100;//存款利息：取两位小数        
	realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数   
	interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数 	     
        total=(Math.round(total*100))/100;//本息合计：取两位小数
        var objArray=new Array();
        objArray[0]=interest;
        objArray[1]=interestTaxe;
        objArray[2]=realInterest;
        objArray[3]=total;
        return objArray;
}

function privateSaveLCZQ(original,active,timeSpan,interestRate){
//	alert(timeSpan);
	var timeSpan=parseFloat(timeSpan)+1;
	var interest=original*active*0.01*timeSpan/(2*12);
	var interestTaxe=interest*interestRate;
        var realInterest=interest*(1-interestRate);
        var total=parseFloat(original)+parseFloat(realInterest);
	interest=(Math.round(interest*100))/100;//存款利息：取两位小数        
	realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数   
	interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数 	     
        total=(Math.round(total*100))/100;//本息合计：取两位小数
//        document.write("original",original,"active",active,"timeSpan",timeSpan);
        var objArray=new Array();
        objArray[0]=interest;
        objArray[1]=interestTaxe;
        objArray[2]=realInterest;
        objArray[3]=total;
        return objArray;
}
//函数：国债
function nationalDebtSave(original,active,timeSpan,interestRate){
	var interest=original*active*0.01*timeSpan;
	var interestTaxe=interest*interestRate;
        var realInterest=interest*(1-interestRate);
        var total=parseFloat(original)+parseFloat(realInterest);
	interest=(Math.round(interest*100))/100;//存款利息：取两位小数        
	interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数        
        realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数        
        total=(Math.round(total*100))/100;//本息合计：取两位小数
        var objArray=new Array();
        objArray[0]=interest;
        objArray[1]=interestTaxe;
        objArray[2]=realInterest;
        objArray[3]=total;
        return objArray;//利息税额：取两位小数        
     
}
//函数：个人储蓄存款计算器计算公式--活期
function privateSaveHQ(original,active,yearBegin,monthBegin,dayBegin,yearEnd,monthEnd,dayEnd,interestRate){
	var original1=original;
	var firstYear631;
	var firstMonth631;
	var firstDay631;
	var lastYear631;
	var lastMonth631;
	var lastDay631;
	var timeNow=new Date();
	//var nowYear=timeNow.getYear();
	//var nowMonth=timeNow.getMonth()+1;
	//var nowDay=timeNow.getDate();	
	var nowYear=yearEnd;
	var nowMonth=monthEnd;
	var nowDay=dayEnd;		
	if(nowMonth>=7){
		lastYear631=nowYear;			
        }
        else{
        	lastYear631=parseInt(nowYear)-1;        
        }
        if(monthBegin<7){
		firstYear631=yearBegin;	
		//alert("dddaaa:"+monthBegin+"::"+monthBegin*1+"<7")		
        }
        else{
        	firstYear631=parseInt(yearBegin)+1;    
        	//alert("ddd"+firstYear631);    
        }
        var n631=lastYear631-firstYear631;
        //alert(n631);
        if(parseInt(n631)>-1){
        	var timeSpan1=parseFloat(firstYear631)*12+parseFloat(7)
        		     -parseFloat(yearBegin)*12-parseFloat(monthBegin)-parseFloat(dayBegin/30);
        	var timeSpan2=parseFloat(nowYear)*12+parseFloat(nowMonth)+parseFloat(nowDay/30)
        		      -parseFloat(lastYear631)*12-parseFloat(7);
        	//alert("timeSpan1:"+timeSpan1+"###timeSpan2:"+timeSpan2);
        	var objArray=new Array();
        	objArray=privateSaveCommon(original,active,timeSpan1,interestRate); 
        	
        	//return objArray; 
        	
        	for(i=0;i<parseInt(n631);i++){
        		original=objArray[3];
        		//alert(original);
        		objArray=privateSaveCommon(original,active,"12",interestRate);       		
        	}
        	original=original=objArray[3];
        	objArray=privateSaveCommon(original,active,timeSpan2,interestRate);
		
		total=objArray[3];
        	realInterest=total-original1;
        	interest=realInterest/0.8;
		interestTaxe=interest-realInterest;
		interest=(Math.round(interest*100))/100;//存款利息：取两位小数        
		interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数        
        	realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数        
        	total=(Math.round(total*100))/100;//本息合计：取两位小数		
		
		objArray[0]=interest;
        	objArray[1]=interestTaxe;
        	objArray[2]=realInterest;
        	objArray[3]=total;
        	//alert(original1+":original1");        	
        	return objArray;   
        }
        if(parseInt(n631)==-1){ 
        	var timeSpan=parseFloat(nowYear*12)+parseFloat(nowMonth)+parseFloat(nowDay/30)
        		    -parseFloat(yearBegin*12)-parseFloat(monthBegin)-parseFloat(dayBegin/30)
        	var objArray=new Array();
        	//alert(timeSpan);
        	objArray=privateSave(original,active,timeSpan,interestRate);
        	return objArray;
	} 
	if(parseInt(n631)<-1){ 
		alert("选择正确的存款起止日期！");
		return;
		}
}
/*函数：外汇储蓄存款计算器计算公式
 *输入参数：original（存款金额）         active（存款金额）
 *          timeSpan（存款时间：月份）   
 *输出参数：objArray   其中:
 *	    objArray[0]为存款利息 objArray[1]为本息合计
 *	    结果保留两位小数
 */
function foreignSave(original,active,timeSpan,interestRate){
	//alert("DD");
	var interest=original*active*0.01*timeSpan;
	var interestTaxe=interest*interestRate;
        var realInterest=interest*(1-interestRate);
        var total=parseFloat(original)+parseFloat(realInterest);
	interest=(Math.round(interest*100))/100;//存款利息：取两位小数        
	realInterest=(Math.round(realInterest*100))/100;//实得利息：取两位小数   
	interestTaxe=(Math.round(interestTaxe*100))/100;//利息税额：取两位小数 	     
        total=(Math.round(total*100))/100;//本息合计：取两位小数
        var objArray=new Array();
        objArray[0]=interest;
        objArray[1]=interestTaxe;
        objArray[2]=realInterest;
        objArray[3]=total;
        return objArray;        
}
/*函数：住房贷款计算器计算公式
 *输入参数：original（贷款金额）         active（贷款利率）
 *          timeSpan（贷款时间：月份）   
 *	    objArray[0]为月还款额 objArray[1]为月还款总额
 *	    结果保留两位小数
 */
function estateBorrow(original,active,timeSpan){
	var monthBack=original*active*0.001*Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))-1);
        var totalBack=monthBack*timeSpan;
        var totalInterest=totalBack-original;
        var monthInterest=totalInterest/timeSpan;
	totalInterest=(Math.round(totalInterest*100))/100;//存款利息：取两位小数
	monthInterest=(Math.round(monthInterest*10000))/10000;//存款利息：取两位小数	
	monthBack=(Math.round(monthBack*10000))/10000;//存款利息：取两位小数
        totalBack=(Math.round(totalBack*100))/100;//本息合计：取两位小数
        var objArray=new Array();
        objArray[0]=monthBack;
        objArray[1]=totalBack;
        objArray[2]=monthInterest;
        objArray[3]=totalInterest;        
        return objArray;
}
function estateBorrow1(original,active,timeSpan){
	active = active*0.001;
	var monthOriginal = original / timeSpan;
	var timeSpan1=parseInt(timeSpan);
	var interestTotal=0;	
	var backMonth = "";
	for(i=1;i<timeSpan1+1;i++){
		interestM=(original-original*(i-1)/timeSpan1)*active;
		backMonth += i + "月:" + (monthOriginal + interestM).toFixed(3) + "元\n";//2
		interestTotal=parseFloat(interestTotal)+parseFloat(interestM);			
	}
	var monthBack=original*active*Math.pow((1+parseFloat(active)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active)),parseFloat(timeSpan))-1);

	interestTotal=(Math.round(interestTotal*100))/100;//贷款利息：取两位小数
        var moneyTotal=parseFloat(original)+parseFloat(interestTotal);
        var objArray=new Array();
        objArray[0]=interestTotal;
        objArray[1]=moneyTotal;
		objArray[2] = backMonth;
        return objArray;
}
/*函数：企业贷款计算器计算公式
 *输入参数：original（贷款金额）         active（贷款利率）
 *          timeSpan（贷款时间：月份）   
 *	    objArray[0]为每月利息 objArray[1]为累计利息  objArray[2]为还款总额
 *	    结果保留两位小数
 */
function companyBorrow(original,active,timeSpan){
        //var monthInterest=original*active*0.01;
        var totalInterest=original*active*0.01*timeSpan;
        var totalBack=parseFloat(original)+parseFloat(totalInterest)
	//monthInterest=(Math.round(monthInterest*100))/100;//存款利息：取两位小数
	totalInterest=(Math.round(totalInterest*100))/100;//存款利息：取两位小数	
	totalBack=(Math.round(totalBack*100))/100;//存款利息：取两位小数
        var objArray=new Array();
        //objArray[0]=monthInterest;
        objArray[0]=totalInterest;
        objArray[1]=totalBack;    
        return objArray;
}
//旅游贷款 综合消费贷款  短期信用贷款  :::分期还本付息
function privateborrow1(original,active,timeSpanEvery,termNum){
	var timeSpan=parseInt(timeSpan);
	var interestTotal=0;	
	for(i=1;i<parseInt(termNum)+1;i++){
		interestM=parseFloat(original)/parseInt(termNum)+(parseFloat(original)
		-parseFloat(original)*(i-1)/parseInt(termNum))*active*0.01*timeSpanEvery/12;
		interestTotal=parseFloat(interestTotal)+parseFloat(interestM);			
	}
	//var monthBack=original*active*0.001*Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))-1);
	interestTotal=(Math.round(interestTotal*100))/100;//贷款利息：取两位小数
        //var moneyTotal=parseFloat(original)+parseFloat(interestTotal);
        var objArray=new Array();
        objArray[0]=interestTotal;
        //objArray[1]=moneyTotal;
        return interestTotal;
}
//函数：国家助学贷款
function privateborrow2(original,active,timeSpanEvery,termNum){
	var timeSpan=parseInt(timeSpan);
	var interestTotal=0;	
	for(i=1;i<parseInt(termNum)+1;i++){
		interestM=parseFloat(original)/parseInt(termNum)+(parseFloat(original)
		-parseFloat(original)*(i-1)/parseInt(termNum))*active*0.01*0.5*2*timeSpanEvery/12;
		interestTotal=parseFloat(interestTotal)+parseFloat(interestM);			
	}
	//var monthBack=original*active*0.001*Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))-1);
	interestTotal=(Math.round(interestTotal*100))/100;//贷款利息：取两位小数
        //var moneyTotal=parseFloat(original)+parseFloat(interestTotal);
        var objArray=new Array();
        objArray[0]=interestTotal;
        //objArray[1]=moneyTotal;
        return interestTotal;
}
//函数：商业助学贷款
function privateborrow3(original,active,timeSpanEvery,termNum){
	var timeSpan=parseInt(timeSpan);
	var interestTotal=0;	
	for(i=1;i<parseInt(termNum)+1;i++){
		interestM=parseFloat(original)/parseInt(termNum)+(parseFloat(original)
		-parseFloat(original)*(i-1)/parseInt(termNum))*active*0.01*2*timeSpanEvery/12;
		interestTotal=parseFloat(interestTotal)+parseFloat(interestM);			
	}
	//var monthBack=original*active*0.001*Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active*0.001)),parseFloat(timeSpan))-1);
	interestTotal=(Math.round(interestTotal*100))/100;//贷款利息：取两位小数
        //var moneyTotal=parseFloat(original)+parseFloat(interestTotal);
        var objArray=new Array();
        objArray[0]=interestTotal;
        //objArray[1]=moneyTotal;
        return interestTotal;
}
