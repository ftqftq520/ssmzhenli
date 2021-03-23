<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>购车相关税费计算器</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/html/wd/moneytools/toolsquery/css/moneytools.css">
<SCRIPT type=text/javascript>
	function JiSuan() {
		document.carForm.TextGouzhi2.value = Math
				.round(document.carForm.TextGouzhi1.value * 10 / 117);
		document.carForm.TextGouzhi5.value = Math
				.round(document.carForm.TextGouzhi1.value * 0.009 + 175);
		document.carForm.TextGouzhi3.value = document.carForm.TextGouzhi4.value;
		document.carForm.TextGouzhi6.value = Math
				.round((document.carForm.TextGouzhi3.value * 1 + document.carForm.TextGouzhi5.value * 1) * 0.2);
		document.carForm.TextGouzhi7.value = document.carForm.TextGouzhi8.value;
		document.carForm.TextGouzhi9.value = document.carForm.TextGouzhi10.value;
		document.carForm.TextGouzhi23.value = document.carForm.TextGouzhi1.value
				* 1
				+ document.carForm.TextGouzhi2.value
				* 1
				+ document.carForm.TextGouzhi3.value
				* 1
				+ document.carForm.TextGouzhi5.value
				* 1
				+ document.carForm.TextGouzhi6.value
				* 1
				+ document.carForm.TextGouzhi7.value
				* 1
				+ document.carForm.TextGouzhi9.value
				* 1
				+ document.carForm.TextGouzhi11.value
				* 1
				+ document.carForm.TextGouzhi12.value
				* 1
				+ document.carForm.TextGouzhi13.value
				* 1
				+ document.carForm.TextGouzhi14.value
				* 1
				+ document.carForm.TextGouzhi15.value
				* 1
				+ document.carForm.TextGouzhi16.value
				* 1
				+ document.carForm.TextGouzhi17.value
				* 1
				+ document.carForm.TextGouzhi18.value
				* 1
				+ document.carForm.TextGouzhi19.value
				* 1
				+ document.carForm.TextGouzhi20.value
				* 1
				+ document.carForm.TextGouzhi21.value
				* 1
				+ document.carForm.TextGouzhi22.value
				* 1
				+ document.carForm.TextGouzhi24.value * 1
	}
</SCRIPT>

</head>
<body>
	<FORM id=carForm onsubmit="return false;" name=carForm action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">购车综合计算器</SPAN>
						<SPAN class=cy_lb_top_c></SPAN> <SPAN
						class="cy_lb_top_r cy_blue14"></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>
		<div class="add_h3">购车综合计算器可以帮助您方便购车</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">车辆购置价格：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi1> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">车辆购置附加费：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi2> 元 (车价÷11.7)
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">第三者责任险：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi3> 元 选择赔偿限额：
								 <SELECT style="width:140px" onclick=javascript:document.carForm.TextGouzhi3.value=document.carForm.TextGouzhi4.value;
									size=1 name=TextGouzhi4>
									<OPTION value=1150>5万元</OPTION>
									<OPTION selected value=1430>10万元</OPTION>
									<OPTION value=1650>20万元</OPTION>
									<OPTION value=1925>50万元</OPTION>
									<OPTION value=2035>100万元</OPTION>
								</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">车辆损失险：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi5> 元 (车价×0.9%+175)
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">不计责任免赔险：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi6> 元　(第三责任险+车辆损失险)×20%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">全车盗抢险：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi7> 元　选择赔偿限额：
								 <SELECT style="width:140px"
									onclick=javascript:document.carForm.TextGouzhi7.value=document.carForm.TextGouzhi8.value
									size=1 name=TextGouzhi8>
									<OPTION value=325>5万元</OPTION>
									<OPTION selected value=650>10万元</OPTION>
									<OPTION value=1300>20万元</OPTION>
									<OPTION value=3250>50万元</OPTION>
									<OPTION value=6500>100万元</OPTION>
								</SELECT> ×0.65%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">玻璃单独破碎险：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi9> 元　选择赔偿限额：
								 <SELECT style="width:140px"
									onclick=javascript:document.carForm.TextGouzhi9.value=document.carForm.TextGouzhi10.value
									size=1 name=TextGouzhi10>
									<OPTION value=60>5万元</OPTION>
									<OPTION selected value=120>10万元</OPTION>
									<OPTION value=240>20万元</OPTION>
									<OPTION value=600>50万元</OPTION>
									<OPTION value=1200>100万元</OPTION>
								</SELECT> ×0.12%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">其它保险费用：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi11> 元　如还有其它保险费用，客户自行填写。
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">养路费：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi12> 元 轿车120/月；面包车等140/月
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">车船使用费：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi13> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">无人道路看护费：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi14> 元 固定
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">照相费：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi15> 元 固定
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">三角牌：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi16> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">灭火器：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi17> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">牌照费用：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi18> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">上牌费用：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi19> 元 固定
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">车船使用税：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi20> 元
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">托盘费：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi21> 元 固定
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">交强险：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi24> 元
							固定
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">其它费用：</DIV>
						<DIV class="L">
							<INPUT type="text" class="input-sm" name=TextGouzhi22> 元
							如有其它费用，客户自行填写。
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
					<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn"
						onclick="JiSuan()">
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
									<DIV id=lbSDBX class="L txt">购车费用合计：</DIV>
									<DIV id=SDBX class=L>
										<INPUT type="text" class="input-sm" value=0 readOnly name=TextGouzhi23>
										元
									</DIV>
								</LI>
							</UL>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>