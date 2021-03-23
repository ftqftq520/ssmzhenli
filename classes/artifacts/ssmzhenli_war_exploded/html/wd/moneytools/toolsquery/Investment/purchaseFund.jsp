<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>基金申购计算器 </title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">



<SCRIPT language=javascript>
	//数据校验，判断输入的是否为数字
	function numberCheck(str) {
		if (isNaN(str)) {
			return false;
		}
		var strTmp = "" + str + "";
		if (strTmp.length > 0) {
			strNum = "0123456789.-";
			//for(var i=0;i0) return false; 
			if (str.indexOf('.') >= 0) {
				if (str.indexOf('.') == 0
						|| str.indexOf('.') == (str.length - 1))
					return false;
				if (str.indexOf('.') != str.lastIndexOf('.'))
					return false;
			}
			return true;
		}
	}
	function onForm2() {
		if (document.form2.ctl22.value == '') {
			alert("请输入 <申购金额>.");
			document.form2.ctl22.focus();
			return;
		}
		if (document.form2.ctl23.value == '') {
			alert("请输入 <单位基金净值>.");
			document.form2.ctl23.focus();
			return;
		}
		if (document.form2.ctl24.value == '') {
			alert("请输入 <申购费率>.");
			document.form2.ctl24.focus();
			return;
		}
		if (numberCheck(document.form2.ctl22.value) == false) {
			alert("<申购金额> 输入有误，请重新输入.");
			document.form2.ctl22.select();
			return;
		}
		if (numberCheck(document.form2.ctl23.value) == false) {
			alert("<单位基金净值> 输入有误，请重新输入.");
			document.form2.ctl23.select();
			return;
		}
		if (numberCheck(document.form2.ctl24.value) == false) {
			alert("<申购费率> 输入有误，请重新输入.");
			document.form2.ctl24.select();
			return;
		}
		if (eval(document.form2.ctl24.value) > 1.5
				|| eval(document.form2.ctl24.value) < 0) {
			alert("<申购费率> 需在0~1.5之间，请重新输入.");
			document.form2.ctl24.select();
			return;
		}

		var text22 = document.form2.ctl22.value;
		var text23 = document.form2.ctl23.value;
		var text24 = document.form2.ctl24.value;

		var sgsxf = text22 * text24 / 100;
		var sgfe = (text22 - sgsxf) / text23;

		sgsxf = "" + sgsxf;
		sgfe = "" + sgfe;
		var ind1 = sgsxf.indexOf(".");
		var ind2 = sgfe.indexOf(".");

		if (ind1 >= 0)
			sgsxf = "" + sgsxf.substring(0, ind1)
					+ sgsxf.substring(ind1, ind1 + 3);
		else
			sgsxf = sgsxf + ".00";
		if (ind2 >= 0)
			sgfe = "" + sgfe.substring(0, ind2)
					+ sgfe.substring(ind2, ind2 + 3);
		else
			sgfe = sgfe + ".00";

		var v1 = sgsxf.substring(ind1, ind1 + 3);
		var v2 = sgfe.substring(ind2, ind2 + 3);

		if (v1.length <= 2)
			sgsxf = sgsxf + "0";
		if (v2.length <= 2)
			sgfe = sgfe + "0";

		document.all.sgsxf.value = sgsxf;
		document.all.sgfe.value = sgfe;
	}
</SCRIPT>

</head>
<body>


	<FORM id=form2 onsubmit="return false;" name=form2 action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">基金申购份额计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">
			该计算器适用于计算基金日常申购时的基金费用和基金份额<br> 申购手续费 = 申购金额 × 申购费率 <br>
			申购份额 = ( 申购金额-申购手续费 )/单位基金净值
		</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">申购金额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=ctl22> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">单位基金净值：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=ctl23> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">申购费率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" value=1.5  name=ctl24> % (范围：0-1.5)
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="javaScript:onForm2()">
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
						<DIV class="L txt">申购手续费：</DIV>
						<DIV id=DQBX class=L>
							<INPUT type="text" class="input-sm" name=sgsxf> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">申购份额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=sgfe> 份
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>