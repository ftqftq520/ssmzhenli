<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta name="decorator" content="window" />
<title>提前还贷计算器 </title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/html/wd/moneytools/toolsquery/css/moneytools.css">


<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calendar.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/CheckDataFunction.js"></SCRIPT>

<SCRIPT language=javascript
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/Calculator.js"></SCRIPT>
<script language="javascript"
	src="<%=request.getContextPath() %>/html/wd/moneytools/script/moneyRateJson.js"></script>
<SCRIPT language=javascript>
function initTree(){
	 $(".form_date").icrmDate();
	    setRate();
}

	function setRate() {
		var stime;
		getElement("edFullRate").value = 0;
		stime = parseInt(document.myform.ydkqx.options[document.myform.ydkqx.selectedIndex].value);
		var srate;
		if (document.myform.dklx[0].checked)
			srate = ratejson.findRate(stime, ratejson.findRateItem(
					"cpf_credit", ratejson));
		if (document.myform.dklx[1].checked)
			srate = ratejson.findRate(stime, ratejson.findRateItem("bu_credit",
					ratejson));

		getElement("edFullRate").value = (parseFloat(srate) * 100).toFixed(4);

	}

	function getElement(t) {
		return document.getElementById(t);
	}
	function ChkCZDate(id) {
		var edit = new Object();
		edit.value = getElement(id).value;
		if (edit.value == '')
			return true;
		if (!Cal_datevalid(edit, '1910-1-1', '3000-1-1')) {
			alert('日期格式不正确,日期有效范围为1910年到3000年');
			return false;
			getElement(id).focus();
		}
		return true;
	}

	function play() {

		if (document.myform.dkze.value == '') {
			alert('请填入贷款总额');
			return false;
		}

		else

			sm = parseFloat(document.myform.dkze.value) * 10000;

		if (document.myform.hklx[1].checked)

		{

			if (document.myform.hklxje.value == '')

			{

				alert('请填入部分提前还款额度');

				return false;

			}

		}

		stime = parseInt(document.myform.ydkqx.options[document.myform.ydkqx.selectedIndex].value);
		srate = parseFloat(getElement("edFullRate").value) / 1200;
		var firstTime = getElement("dychksj").value;
		var firstTimeArr = firstTime.split("-");
		var aheadTime = getElement("yjtqhksj").value;
		var aheadTimeArr = aheadTime.split("-");

		md = (parseInt(aheadTimeArr[0]) - parseInt(firstTimeArr[0])) * 12
				+ (parseInt(aheadTimeArr[1]) - parseInt(firstTimeArr[1]));

		if (md<0 || md>stime)

		{

			alert('预计提前还款时间与第一次还款时间有矛盾，请查实');

			return false;

		}

		yhk = sm * (srate * Math.pow((1 + srate), stime))
				/ (Math.pow((1 + srate), stime) - 1);

		//Math.floor((parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value) + s_yhkqs - 2) / 12) + '年' + ((parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value) + s_yhkqs - 2) % 12 + 1) + '月';
		lrq = Math.floor((parseInt(firstTimeArr[0]) * 12
				+ parseInt(firstTimeArr[1]) + stime - 2) / 12)
				+ '年'
				+ ((parseInt(firstTimeArr[0]) * 12 + parseInt(firstTimeArr[1])
						+ stime - 2) % 12 + 1) + '月';

		pol = yhk * md;

		rsd = 0;

		uir = 0;

		for (i = 1; i <= md; i++) {

			rsd = rsd + (sm - uir) * srate;

			uir = uir + yhk - (sm - uir) * srate;

		}

		remark = '';

		if (document.myform.hklx[1].checked) {

			ert = document.myform.hklxje.value * 10000;

			if (ert + yhk >= yhk
					* (1 / srate - 1 / (srate * Math.pow((1 + srate),
							(stime - md))))) {

				remark = '您的提前还款额已经可以一次还清所有未还款项！';

			} else {

				if (document.myform.clfs[0].checked) {

					wer = 0;

					qwa = 0;

					for (j = sm - uir - yhk - ert; j >= 0; j = j - qwa) {

						qwa = yhk / Math.pow((1 + srate), wer);

						wer++;

					}

					vbr = (sm - uir - yhk - ert)
							* (srate * Math.pow((1 + srate), wer))
							/ (Math.pow((1 + srate), wer) - 1);

					bnf = yhk + ert;

					thx = yhk * stime - pol - bnf - vbr * wer;

					//lrq=Math.floor((parseInt(firstTimeArr[0]) * 12 + parseInt(firstTimeArr[1]) + stime - 2) / 12)+'年'+((parseInt(firstTimeArr[0]) * 12 + parseInt(firstTimeArr[1]) + stime -2) % 12+1)+'月';
					bncc = Math.floor((parseInt(firstTimeArr[0]) * 12
							+ parseInt(firstTimeArr[1]) + wer + md - 2) / 12)
							+ '年'
							+ ((parseInt(firstTimeArr[0]) * 12
									+ parseInt(firstTimeArr[1]) + wer + md - 2 - 1) % 12 + 1)
							+ '月';

				} else {

					vbr = (sm - uir - yhk - ert)
							* (srate * Math.pow((1 + srate), (stime - md)))
							/ (Math.pow((1 + srate), (stime - md)) - 1);

					bnf = yhk + ert;

					thx = yhk * stime - pol - bnf - vbr * (stime - md);
					bncc = lrq;

				}

			}

		}

		if (document.myform.hklx[0].checked || remark != '') {

			bnf = (sm - uir) * (1 + srate);

			vbr = 0;

			thx = yhk * stime - pol - bnf;

			bncc = aheadTimeArr[0] + '年' + aheadTimeArr[1] + '月';

		}

		document.myform.ykhke.value = chgnum(yhk);

		document.myform.yzhhkq.value = lrq;

		document.myform.yhkze.value = chgnum(pol);

		document.myform.yhlxe.value = chgnum(rsd);

		document.myform.gyyihke.value = chgnum(bnf);

		document.myform.xyqyhke.value = chgnum(vbr);

		document.myform.jslxzc.value = chgnum(thx);

		document.myform.xdzhhkq.value = bncc;

		document.myform.jsjgts.value = remark;

	}

	function chgnum(sum) {

		return Math.round(sum * 100) / 100;

	}
</SCRIPT>

</head>
<body>

	<FORM id=myform onsubmit="return false;" name=myform action="">
		<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
			<TBODY>
				<TR>
					<TD class=cy_lb_top><SPAN class="cy_lb_top_l cy_white14">提前还贷计算器<A
							href="#"></A></SPAN><SPAN class=cy_lb_top_c></SPAN><SPAN
						class="cy_lb_top_r cy_blue14"> </A></SPAN></TD>
				</TR>
			</TBODY>
		</TABLE>

		<div class="add_h3">提前还贷计算器可以帮您计算提前还贷节省的利息支出</div>
		<DIV class=calculate>
			<DIV class=t>计算公式</DIV>
			<DIV class=c>
				<UL>
					<LI>
						<DIV class="L txt">贷款总额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=dkze> 万元
						</DIV>
					</LI>
					<LI>
						<DIV   class="L txt">原贷款期限：</DIV>
						<DIV class=L>
							<SELECT style="width:140px" onchange="setRate();" size=1 name=ydkqx>
								<OPTION value=24>2年(24期)</OPTION>
								<OPTION value=36>3年(36期)</OPTION>
								<OPTION value=48>4年(48期)</OPTION>
								<OPTION value=60>5年(60期)</OPTION>
								<OPTION value=72>6年(72期)</OPTION>
								<OPTION value=84>7年(84期)</OPTION>
								<OPTION value=96>8年(96期)</OPTION>
								<OPTION value=108>9年(108期)</OPTION>
								<OPTION value=120>10年(120期)</OPTION>
								<OPTION value=132>11年(132期)</OPTION>
								<OPTION value=144>12年(144期)</OPTION>
								<OPTION value=156>13年(156期)</OPTION>
								<OPTION value=168>14年(168期)</OPTION>
								<OPTION selected value=180>15年(180期)</OPTION>
								<OPTION value=240>20年(240期)</OPTION>
								<OPTION value=300>25年(300期)</OPTION>
								<OPTION value=360>30年(360期)</OPTION>
							</SELECT>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">第一次还款时间：</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
								 <INPUT class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd"
									data-link-format="yyyy-mm-dd" onblur='ChkCZDate("dychksj")'
									id=dychksj name=dychksj>
						         <span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span>
						      </div>
						</DIV>
					</LI>
					<LI>
						<DIV  class="L txt">预计提前还款时间：</DIV>
						<DIV class=L style="width:300px">
							<div class="input-group">
								<INPUT class="form-control input-sm date form_date" data-date-format="yyyy-mm-dd"
									data-link-format="yyyy-mm-dd"  onblur="ChkCZDate('yjtqhksj')"  id=yjtqhksj name=yjtqhksj>
								<span class="input-group-addon">
									<i class="icon-1x icon-calendar"></i>
								</span>
							</div>
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">贷款类型：</DIV>
						<DIV class=L>
							<INPUT CHECKED style="border: 0;" onclick="setRate();" style="border:0;" type=radio name=dklx> 公积金贷款
							<INPUT onclick="setRate();" style="border: 0;" type=radio name=dklx> 商业性贷款
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">年利率:</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" id=edFullRate name=edFullRate>%
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">还款方式：</DIV>
						<DIV class=L>
							<INPUT CHECKED style="border: 0;" style="border:0;" type=radio name=hklx> 一次提前还清
							<INPUT style="border: 0;" type=radio name=hklx> 部分提前还款
							<INPUT type="text" class="input-sm" size=6 name=hklxje> 万元（不含当月应还款额）
						</DIV>
					</LI>
					<LI>
						<DIV class="L txt">处理方式：</DIV>
						<DIV class=L>
							<INPUT CHECKED style="border: 0;" style="border:0;" type=radio name=clfs> 缩短还款年限，月还款额基本不变
							<INPUT style="border: 0;" type=radio name=clfs> 减少月还款额，还款期不变
						</DIV>
					</LI>
				</UL>
				<DIV class=btnArea>
						<button type="button" class="btn btn-xs btn-info" id="fb_calc_btn" onclick="play()">
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
						<DIV style="WIDTH: 120px" class="L txt">原月还款额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=ykhke> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">原最后还款期：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=yzhhkq>
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">已还款总额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=yhkze> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">已还利息额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=yhlxe> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">该月一次还款额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=gyyihke> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">下月起月还款额：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=xyqyhke> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">节省利息支出：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=jslxzc> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">新的最后还款期：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=xdzhhkq> 元
						</DIV>
					</LI>
					<LI>
						<DIV style="WIDTH: 120px" class="L txt">计算结果提示：</DIV>
						<DIV class=L>
							<INPUT type="text" class="input-sm" name=jsjgts>
						</DIV>
					</LI>
				</UL>
			</DIV>
		</DIV>
	</FORM>
</body>
</html>