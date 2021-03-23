<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>基金赎回计算器</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">



<SCRIPT language=javascript>
	//数据校验，判断输入的是否为数字
	function numberCheck(str) {
		if (isNaN(str))
			return false;
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
	function onForm3() {
		if (document.form3.ctl32.value == '') {
			alert("请输入 <赎回份额>.");
			document.form3.ctl32.focus();
			return;
		}
		if (document.form3.ctl33.value == '') {
			alert("请输入 <单位基金净值>.");
			document.form3.ctl33.focus();
			return;
		}
		if (document.form3.ctl35.value == '') {
			alert("请输入 <赎回费率>.");
			document.form3.ctl35.focus();
			return;
		}
		if (numberCheck(document.form3.ctl32.value) == false) {
			alert("<赎回份额> 输入有误，请重新输入.");
			document.form3.ctl32.select();
			return;
		}
		if (numberCheck(document.form3.ctl33.value) == false) {
			alert("<单位基金净值> 输入有误，请重新输入.");
			document.form3.ctl33.select();
			return;
		}
		if (numberCheck(document.form3.ctl35.value) == false) {
			alert("<赎回费率> 输入有误，请重新输入.");
			document.form3.ctl35.select();
			return;
		}
		if (eval(document.form3.ctl35.value) > 1.5
				|| eval(document.form3.ctl35.value) < 0) {
			alert("<赎回费率> 需在0~1.5之间，请重新输入.");
			document.form3.ctl35.select();
			return;
		}

		var text32 = document.form3.ctl32.value;
		var text33 = document.form3.ctl33.value;
		var text35 = document.form3.ctl35.value;

		var shsxf = text32 * text33 * text35 / 100;
		var sjkdzj = text32 * text33 - shsxf;

		shsxf = "" + shsxf;
		sjkdzj = "" + sjkdzj;
		var ind1 = shsxf.indexOf(".");
		var ind2 = sjkdzj.indexOf(".");

		if (ind1 >= 0)
			shsxf = "" + shsxf.substring(0, ind1)
					+ shsxf.substring(ind1, ind1 + 3);
		else
			shsxf = shsxf + ".00";
		if (ind2 >= 0)
			sjkdzj = "" + sjkdzj.substring(0, ind2)
					+ sjkdzj.substring(ind2, ind2 + 3);
		else
			sjkdzj = sjkdzj + ".00";

		var v1 = shsxf.substring(ind1, ind1 + 3);
		var v2 = sjkdzj.substring(ind2, ind2 + 3);

		if (v1.length <= 2)
			shsxf = shsxf + "0";
		if (v2.length <= 2)
			sjkdzj = sjkdzj + "0";

		document.all.shsxf.value = shsxf;
		document.all.sjkdzj.value = sjkdzj;
	}
</SCRIPT>

</head>
<body>

	<FORM id=form3 onsubmit="return false;" name=form3 action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">基金赎回资金计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">
			该计算器适用于计算基金日常赎回时的基金费用和实际可得资金 <br> 赎回手续费 = 赎回份额 × 单位基金净值 × 赎回费率<br>
			实际可得资金 = 赎回份额 × 单位基金净值 － 赎回手续费
		</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">赎回份额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=ctl32> &nbsp;&nbsp;份
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">单位基金净值：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm"  name=ctl33> &nbsp;&nbsp;元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">赎回费率：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" value=0.5  name=ctl35> % (范围：0-0.5)
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="javaScript:onForm3()">
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
						<DIV class="L txt">赎回手续费：</DIV>
						<DIV id=DQBX class=L>
							<INPUT type="text" class="input-sm" name=shsxf> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">实际可得资金：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=sjkdzj> 元
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>