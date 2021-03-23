
			function Calc1(a1,a2,a3)
			{
				return Round(a1/(a2*a3));
			}
			function Calc2(a1,a2,a3)
			{
				return Round(a1*a2*a3,0);
			}
			function Calc3(a1,a2,a3)
			{
				return Round(a1/(a2*a3));
			}
			function CalcTax(a1,a2,a3,a4)
			{
				return a1*(a2*a3+1)/2*(a2*a3)*(a4/a2);
			}
			function getFreq(oDocument)
			{
				if(oDocument.all.rblFreq_0.checked)
					return 1;
				else
					if(oDocument.all.rblFreq_1.checked)
						return 3;
					else
						return 6;
			}
			function Calc(oDocument)
			{
				var nc = 12/getFreq(oDocument);//年次数
				if(oDocument.all.rblItem_0.checked)
				{
					oDocument.all.tbEverySum.value=Calc1(parseInt(oDocument.all.tbFirstSum.value),parseInt(oDocument.all.cbMonth.value)/12,nc);
					Tax=CalcTax(parseFloat(oDocument.all.tbEverySum.value),nc,parseInt(oDocument.all.cbMonth.value)/12,parseFloat(oDocument.all.tbRate.value)/100);
					oDocument.all.tbInSum.value=Round(Tax*0.8);
					oDocument.all.tbTaxSum.value=Round(Tax*0.2);
				}
				else
				{
					if(oDocument.all.rblItem_1.checked)
					{
						oDocument.all.tbEverySum.value=Calc2(parseFloat(oDocument.all.tbFirstSum.value),parseInt(oDocument.all.cbMonth.value)/12,nc);
						Tax=CalcTax(parseFloat(oDocument.all.tbFirstSum.value),nc,parseInt(oDocument.all.cbMonth.value)/12,parseFloat(oDocument.all.tbRate.value)/100);
						oDocument.all.tbInSum.value=Round(Tax*0.8);
						oDocument.all.tbTaxSum.value=Round(Tax*0.2);
					}
					else
					{
						Tax=CalcTax(parseFloat(oDocument.all.tbEverySum.value),nc,parseInt(oDocument.all.cbMonth.value)/12,parseFloat(oDocument.all.tbRate.value)/100);
						oDocument.all.tbInSum.value=Round(Tax*0.8);
						oDocument.all.tbTaxSum.value=Round(Tax*0.2);
						
						if(oDocument.all.edtax_no.checked){
							oDocument.all.tbInSum.value= Round(parseFloat(oDocument.all.tbTaxSum.value)+parseFloat(oDocument.all.tbInSum.value));
							oDocument.all.tbTaxSum.value=0;
						}
						
						var Month = 12*Calc3(parseInt(oDocument.all.tbFirstSum.value),parseFloat(oDocument.all.tbEverySum.value),nc);
						var x = getTerm(Month);
						if(x < 0)
						{
							msg="计算得出的储蓄存期为"+Round(Month/12)+"年，不符合银行储蓄的实际情况。";
							DispMessage(oDocument.all.tbFirstSum,msg);
							return;
						}
						//oDocument.all.cbMonth.selectedIndex=getTerm(Month);
						msg="计算得出的储蓄存期为"+oDocument.all.cbMonth.options[x].text+"。";
						alert(msg);
					}
				}
				
				if(oDocument.all.edtax_no.checked){
					oDocument.all.tbInSum.value= Round(parseFloat(oDocument.all.tbTaxSum.value)+parseFloat(oDocument.all.tbInSum.value));
					oDocument.all.tbTaxSum.value=0;
				}
			}
