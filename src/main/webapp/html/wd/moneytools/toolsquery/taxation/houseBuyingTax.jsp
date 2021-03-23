<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>购房税费</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT type="text/javascript" src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>
<SCRIPT type=text/javascript>
	function runjs3(obj) {
		if (!CheckFN3(obj.dj3, "请在[单价]输入正数", false))
			return false;
		if (!CheckFN3(obj.mj3, "请在[面积]输入正数", false))
			return false;

		dj3 = parseFloat(obj.dj3.value);
		mj3 = parseFloat(obj.mj3.value);
		fkz3 = dj3 * mj3;
		yh = fkz3 * 0.0005;
		if (dj3 <= 9432){
			q = fkz3 * 0.015;
		}else if (dj3 > 9432){
			q = fkz3 * 0.03;
		}
		/* if (mj3 <= 120){ //废弃原来规则
			fw = 500;
		} else if (120 < mj3 <= 5000){
			fw = 1500;
		}
		if (mj3 > 5000){
			fw = 5000;
		} */
		fw = mj3 * 2.5;
		gzh = fkz3 * 0.003;
		obj.yh.value = Math.round(yh * 100, 5) / 100;
		obj.fkz3.value = Math.round(fkz3 * 100, 5) / 100;
		obj.q.value = Math.round(q * 100, 5) / 100;
		obj.gzh.value = Math.round(gzh * 100, 5) / 100;
		obj.wt.value = Math.round(gzh * 100, 5) / 100;
		obj.fw.value = Math.round(fw * 100, 5) / 100;
	}
</SCRIPT>

</head>
<body>

	<FORM id=formt3 onsubmit="return false;" name=formt3 action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top>
						<SPAN class="cy_lb_top_l cy_white14">购房相关税费计算器</SPAN>
						<SPAN class=cy_lb_top_c></SPAN>
						<SPAN class="cy_lb_top_r cy_blue14"></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">
			购房需交纳的第一组税费是契税、印花税、交易手续费、权属登记费。 <BR>
			<B>契税金额</B>是房价的1.5%，一般情况下是在交易签证时交一半，入住后拿房产证时交另一半 <BR>
			<B>印花税金额</B>为房价的0.05%，在交易签证时交纳 <BR>
			<B>交易手续费</B>一般是每平方米2.5元，也在交易签证时交纳 <BR>
			<B>权属登记费</B>100元到200元之间<BR>
		</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">单价:</DIV>
						<DIV>
							<INPUT type="text" class="input-sm" maxLength=10  name=dj3> 元/平米
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">面积:</DIV>
						<DIV>
							<INPUT type="text" class="input-sm" maxLength=10  name=mj3> 平米
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
					<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="runjs3(this.form)">
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
						<DIV class="L txt">房款总价：</DIV>
						<DIV><INPUT type="text" class="input-sm"  name=fkz3> 元</DIV>
					</LI>
					<LI>
						<DIV class="L txt">印 花 税：</DIV>
						<DIV><INPUT type="text" class="input-sm"  name=yh> 元</DIV>
					</LI>
					<LI>
						<DIV class="L txt">公 证 费：</DIV>
						<DIV><INPUT type="text" class="input-sm"  name=gzh> 元</DIV>
					</LI>
					<LI>
						<DIV class="L txt">契 税：</DIV>
						<DIV><INPUT type="text" class="input-sm"  name=q> 元</DIV>
					</LI>
					<LI>
						<DIV class="L txt">委托办理产权手续费：</DIV>
						<DIV><INPUT type="text" class="input-sm"  name=wt> 元</DIV>
					</LI>
					<LI>
						<DIV class="L txt">房屋买卖手续费：</DIV>
						<DIV><INPUT type="text" class="input-sm"  name=fw> 元</DIV>
					</LI> 
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>