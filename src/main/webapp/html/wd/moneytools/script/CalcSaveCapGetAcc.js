//计算每次支取利息金额
function CalcGetAcc(oDocument)
{

	var initsavesum=parseInt(oDocument.all.edInitSaveSum.value);
	var capitalsum=initsavesum*(oDocument.all.edFullRate.value/100)/12;
	
	return capitalsum;
}

//计算初始存入金额
function CalcSaveCap(oDocument)
{

	var capitalsum=parseFloat(oDocument.all.edCapitalSum.value);
	var initsavesum=(capitalsum*12)/(oDocument.all.edFullRate.value/100);
	
	return initsavesum;
}

//计算利息税
function CalcTaxofRate(oDocument,fInitsavesum,fTerm)
{

	var taxsum=fInitsavesum*fTerm*(oDocument.all.edFullRate.value/100)*0.2;

	return taxsum;
}

