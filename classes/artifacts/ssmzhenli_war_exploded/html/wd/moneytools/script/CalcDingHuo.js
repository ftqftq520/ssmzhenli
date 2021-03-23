			function calc1(oDocument)
			{
				var valstart;
				var valrate;
				var valstartdate;
				var valenddate;
				var valresult;
				var valtax;
				var dayMi=24*60*60*1000;
				var months;
	
		
	     		valstart=parseFloat(oDocument.all.edstart.value);

				valstartdate=StrToDate(oDocument.all.beginDateID.value);
				valenddate=StrToDate(oDocument.all.endDateID.value);				
				valrate=parseFloat(oDocument.all.edRate.value)/100;
				//到期本息总额＝初始存入金额×（年利率/360）×（提取日期－初始存入日期）×0.8+初始存入金额
				
				valmonths=getDiffDay(valenddate,valstartdate);
				if(oDocument.all.edtax_yes.checked){
					valresult=valstart*(valrate/360)*valmonths*0.8+valstart;
					valtax=valstart*(valrate/360)*valmonths*0.2;
				} else {
					var from1 = new Date(valstartdate.getTime());
					var temp3 = from1.add(3).month();//开始日期+3个月的日期
					if(valenddate - temp3 <0){//在3个月内
						valmonths = getNatrueDiffDay(valenddate,valstartdate);
					}
					valresult=valstart*(valrate/360)*valmonths + valstart;
					valtax=0;
					
				}

			oDocument.all.edend.value=Round(valresult);
			oDocument.all.edtax.value=Round(valtax);
			}
			function calc1_back(oDocument)
			{
				var valstart;
				var valrate;
				var valstartdate;
				var valenddate;
				var valresult;
				var valtax;
				var dayMi=24*60*60*1000;
				var months;
	
		
	     		valstart=parseFloat(oDocument.all.edstart.value);

				valstartdate=StrToDate(oDocument.all.beginDateID.value);
				valenddate=StrToDate(oDocument.all.endDateID.value);				
				valrate=parseFloat(oDocument.all.edRate.value)/100;
				//zhfeng
				//3个月以内（不含），按活期利率计算
				//到期本息总额＝初始存入金额*(活期年利率/360)*自然天数 + 初始存入金额
				if(valenddate - addMonth(valstartdate,3) < 0){
					valmonths = getNatrueDiffDay(valenddate,valstartdate);
					valresult = valstart*(valrate/360)*valmonths + valstart;
				}
				//超过3个月，在6个月内（不含），按3个月利率60%计算
				//到期本息总额＝初始存入金额*(实际整月数*30+剩余月内超出天数)*(3个月年利率/360)*60% + 初始存入金额
				else if((valenddate - addMonth(valstartdate,3) >= 0) && (valenddate - addMonth(valstartdate,6) < 0)){
					valmonths = getNatrueDiffDay(valenddate,valstartdate);
					valresult = valstart*(valrate/360)*valmonths + valstart;
				}
				//超过6个月，1年内（不含），按6个月利率60%计算
				//到期本息总额＝初始存入金额*(实际整月数*30+剩余月内超出天数)*(6个月年利率/360)*60% + 初始存入金额
				
				//超过1年，按1年利率60%计算
				//到期本息总额＝初始存入金额*(实际整月数*30+剩余月内超出天数)*(1年年利率/360)*60% + 初始存入金额
				
				
				if(oDocument.all.edtax_yes.checked){
					valresult=valstart*(valrate/360)*valmonths*0.8+valstart;
					valtax=valstart*(valrate/360)*valmonths*0.2;
				} else{
					valresult=valstart*(valrate/360)*valmonths+valstart;
					valtax=0;
				}

			oDocument.all.edend.value=Round(valresult);
			oDocument.all.edtax.value=Round(valtax);
			}
			function calc2(oDocument)
			{
				var valstart;
				var valrate;
				var valstartdate;
				var valenddate;
				var valresult;
				var valtax;
				var dayMi=24*60*60*1000;
				var valmonths;
				
	
			
				valstartdate=StrToDate(oDocument.all.beginDateID.value);
				valenddate=StrToDate(oDocument.all.endDateID.value);				
				valrate=parseFloat(oDocument.all.edRate.value)/100;
	     		valresult=parseFloat(oDocument.all.edend.value);		
	     				
				//初始存入金额=到期本息总额/ (1+（年利率/360）×（提取日期－初始存入日期）×0.8)
				valmonths=getDiffDay(valenddate,valstartdate);
				if(oDocument.all.edtax_yes.checked){
				valstart=valresult /( valrate/360*valmonths*0.8+1);
				valtax=(valresult-valstart)/4;
				}else {
					valstart=valresult /( valrate/360*valmonths+1);
				valtax=0;
				}
			oDocument.all.edstart.value=Round(valstart);
			oDocument.all.edtax.value=Round(valtax);
			}

			function calc3(oDocument)
			{
				var valstart;
				var valrate;
				var valstartdate;
				var valenddate;
				var valresult;
				var valtax;
				var dayMi=24*60*60*1000;
				var valday;
			
	
				valstart=parseFloat(oDocument.all.edstart.value);
				valstartdate=StrToDate(oDocument.all.beginDateID.value);
						
				valrate=parseFloat(oDocument.all.edRate.value)/100;
	     		valresult=parseFloat(oDocument.all.edend.value);		
	     		
	     		
				
				//提取日期=开始日期+(到期本息总额-初始存入金额)/初始存入金额*360/0.8/年利率
	     		if(oDocument.all.edtax_yes.checked){
				valday=(valresult-valstart)*360/valstart/0.8/valrate;
	
		        valday=Math.ceil(valday);
				addday(valstartdate,valday);
				valtax=(valresult-valstart)/4;
	     		}else {
	     			valday=(valresult-valstart)*360/valstart/valrate;
	
		        valday=Math.ceil(valday);
				addday(valstartdate,valday);
				valtax=0;
	     		}
				oDocument.all.endDateID.value=datetostring(valstartdate) ;
				
				oDocument.all.edtax.value=Round(valtax);

			}
