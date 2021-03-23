function Rate1(XSum)// 工资薪金
{
	var Rate;
	var Balan;
	var TSum;
	if (XSum <= 1500) {
		Rate = 3;
		Balan = 0;
	}
	if ((1500 < XSum) && (XSum <= 4500)) {
		Rate = 10;
		Balan = 105;
	}
	if ((4500 < XSum) && (XSum <= 9000)) {
		Rate = 20;
		Balan = 555;
	}
	if ((9000 < XSum) && (XSum <= 35000)) {
		Rate = 25;
		Balan = 1005;
	}
	if ((35000 < XSum) && (XSum <= 55000)) {
		Rate = 30;
		Balan = 2755;
	}
	if ((55000 < XSum) && (XSum <= 80000)) {
		Rate = 35;
		Balan = 5505;
	}
	/*
	 * if ((60000<XSum) && (XSum<=80000)) {Rate=35; Balan=6375; } if ((80000<XSum) &&
	 * (XSum<=100000)) {Rate=40; Balan=10375; }
	 */
	if (XSum > 80000) {
		Rate = 45;
		Balan = 13505;
	}
	TSum = (XSum * Rate) / 100 - Balan
	if (TSum < 0) {
		TSum = 0
	}
	return TSum
}
/**
 * 个体工商户生产、经营所得/对企事业单位的承包经营、承 租经营所得
 * @param {} XSum
 * @return {}
 */
function Rate2(XSum) {
	var Rate;
	var Balan;
	var TSum;
	if (XSum <= 15000) {
		Rate = 5;
		Balan = 0;
	} else if (XSum <= 30000) {
		Rate = 10;
		Balan = 750;
	} else if (XSum <= 60000) {
		Rate = 20;
		Balan = 3750;
	} else if (XSum <= 100000) {
		Rate = 30;
		Balan = 9750;
	} else {
		Rate = 35;
		Balan = 14750;
	}
	TSum = (XSum * Rate) / 100 - Balan;
	if (TSum < 0) {
		TSum = 0
	}
	return TSum
}

function R4568(XSum) {
	var TSum
	if (XSum <= 4000) {
		TSum = (XSum - 1600) * 20 / 100;
	}
	if (XSum > 4000) {
		TSum = (XSum - (XSum * 20 / 100)) * 20 / 100
	}
	if (TSum < 0) {
		TSum = 0
	}
	return TSum
}
function gong() {
	var qznum
	var ff
	qznum = document.form1.textfield3.value;
	ff = document.all.checkbox.checked;
	if (ff) {
		document.form1.textfield3.value = 4000;
	}
	if (!ff) {
		document.form1.textfield3.value = 1600;
	}
}

function bookfee(income) {
	if (income <= 800)
		return 0;
	if (income > 800 && income <= 4000)
		return (income - 800) * 0.2 * 0.7;
	if (income > 4000)
		return income * 0.8 * 0.2 * 0.7;
}
function spe(income) {
	if (income <= 800)
		return 0;
	if (income > 800 && income <= 4000)
		return (income - 800) * 0.2;
	if (income > 4000)
		return income * 0.8 * 0.2;
}
function Rate3(XSum)/* 劳务报酬 */
{
	var TSum
	var Rate
	var Balan
	if (XSum <= 20000) {
		Rate = 20;
		Balan = 0;
	}
	if ((XSum > 20000) && (XSum <= 50000)) {
		Rate = 30;
		Balan = 2000;
	}
	if (XSum > 50000) {
		Rate = 40;
		Balan = 7000;
	}
	if (XSum <= 4000) {
		XSum = XSum - 800;
	}
	if (XSum > 4000) {
		XSum = XSum - (XSum * 20 / 100);
	}

	TSum = XSum * Rate / 100 - Balan;

	if (TSum < 0) {
		TSum = 0
	}
	return TSum
}