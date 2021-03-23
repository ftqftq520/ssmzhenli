//教育储蓄计算器
function EduCalc1(oDocument)
{  
var InitSaveInDate = new Date(StrToDate(oDocument.all.beginDateID.value));
SaveYears = (oDocument.all.ccType.value)/12;
InitSaveSum = oDocument.all.edBalance.value;
YearRate = oDocument.all.edRate.value/100;
CalcOption=1;//计算选项：1,计算到期本息总额、2,计算初期存入金额
DepositWay=2;//存款方式：1,整存整取、2,零存整取
ShresholdDate=new Date(1999,11,1); //1999年11月1日

var dtime=new Date();
var months;

dtime.setMonth(InitSaveInDate.getMonth() + SaveYears*12);

/*	 零存整取本息和＝月存额×12×存期（年）+月存额×累计月数×存款月利率
		其中累计月数＝（12×存期+1）÷2×（12×存期）
*/
months=(12*SaveYears+1)/2*(12*SaveYears);
			if (dtime<ShresholdDate)
			{
				
				if (DepositWay==2)// 零存整取计算方法
				{
					/*（1）初始存入日期+储蓄存期在1999年11月1日之前：
						 已知A，求B：B＝12×A×n+[A×（12×n+1）÷2×12×n×（r％÷12）]
						 已知B，求A：A＝B÷[12×n+（12×n+1)÷2×12×n×（r％÷12）]
						 扣除利息税金额＝0
					*/
					if (CalcOption==1)
					{ //零存整取本息和＝月存额×12×存期（年）+月存额×累计月数×存款月利率
						TermEndSum=InitSaveSum*(12*SaveYears+months*(YearRate/12.0));
					}
					
					InterestTaxSum=0;
				}

			}
			else 
			if (InitSaveInDate<ShresholdDate)
			{
				var tDays;
				tDays=LoanCalc.GetDayLen(dtime,ShresholdDate);
				if (DepositWay==1)//
					/*
					 * （3）初始存入日期在1999年11月1日之前，初始存入日期+储蓄存期在1999年11月1日之后（含）：
						   已知A，求B：B＝A+ A×n×r％－0.2×A×（初始存入日期+储蓄存期－1999年11月1日）/360×r％
						   其中：（初始存入日期+储蓄存期－1999年11月1日）为天数
						   已知B，求A：A＝B÷[1+n×r％－0.2×（初始存入日期+储蓄存期－1999年11月1日）/360×r％]
						   扣除利息税金额＝0.2×A×（初始存入日期+储蓄存期－1999年11月1日）/360×r％
					 * */
				{
					if (CalcOption==1)
					{
						TermEndSum=InitSaveSum*(1+YearRate*SaveYears-0.2*tDays/360*YearRate);
					}
					else
					{
						if(CalcOption==2)
						{
							InitSaveSum=TermEndSum*1.0/(1+YearRate*SaveYears-0.2*tDays/360*YearRate); 
						}
						InterestTaxSum=0.2*InitSaveSum*tDays/360*YearRate;
					}
				}
				else //
					/*（3）初始存入日期在1999年11月1日之前，初始存入日期+储蓄存期都在1999年11月1日之后（含）：
						 已知A，求B：B＝12×A×n+ A×（12×n+1）÷2×12×n×（r％÷12）－0.2×[A×（12×n+1）÷2×12×n×（r％÷12）]×（初始存入日期+储蓄存期－1999年11月1日）÷（储蓄存期×360）
						 其中：（初始存入日期+储蓄存期－1999年11月1日）、（储蓄存期×360）都为天数。
						 已知B，求A：A＝B÷[12×n+（12×n+1）÷2×12×n×（r％÷12）－0.2×（12×n+1）÷2×12×n×（r％÷12）×（初始存入日期+储蓄存期－1999年11月1日）÷（储蓄存期×360）]
						 扣除利息税金额＝0.2×[A×（12×n+1）÷2×12×n×（r％÷12）]×（初始存入日期+储蓄存期－1999年11月1日）÷（储蓄存期×360）
					 */
				{
					if (CalcOption==1)
					{
						TermEndSum=InitSaveSum*(12*SaveYears+months*(YearRate/12.0)*(1-0.2*tDays/(360*SaveYears)));
					}
					else if(CalcOption==2)
					{
						InitSaveSum=TermEndSum*1.0/(12*SaveYears+months*(YearRate/12.0)*(1-0.2*tDays/(360*SaveYears)));
					}  
					InterestTaxSum=0.2*InitSaveSum*months*(YearRate/12.0)*tDays/(360*SaveYears);
				}
			}
			else
			{
				if (DepositWay==1)
					/*
					 *（2）初始存入日期、初始存入日期+储蓄存期都在1999年11月1日之后（含）：
							已知A，求B：B＝A+A×n×r％×0.8
							已知B，求A：A＝B÷[r％×n×0.8+1]
							扣除利息税金额＝A×n×r％×0.2
					  * */
				{
					if (CalcOption==1)
					{
						TermEndSum=InitSaveSum*(1+YearRate*SaveYears*0.8);
					}
					else if(CalcOption==2)
					{
						InitSaveSum=TermEndSum*1.0/(1+YearRate*SaveYears*0.8); 
					}
					InterestTaxSum=InitSaveSum*YearRate*SaveYears*0.2;
				}
				else
				{
					/*（2）初始存入日期、初始存入日期+储蓄存期都在1999年11月1日之后（含）：
						 已知A，求B：B＝12×A×n+[0.8×A×（12×n+1）÷2×12×n×（r％÷12）]
						 已知B，求A：A＝B÷[12×n+0.8×（12×n+1）÷2×12×n×（r％÷12）]
						 扣除利息税金额＝0.2×A×（12×n+1）÷2×12×n×（r％÷12）
					*/
					if (CalcOption==1)
					{
						TermEndSum=InitSaveSum*(12*SaveYears+0.8*months*(YearRate/12.0));
					}
					else if(CalcOption==2)
					{
						InitSaveSum=TermEndSum*1.0/(12*SaveYears+0.8*months*(YearRate/12.0)); 
					}
					InterestTaxSum=0.2*InitSaveSum*months*(YearRate/12.0);
				}
			}
document.all.lbSum.value=NBround(InterestTaxSum+TermEndSum,2);//教育储蓄不交纳利息税。故，教育储蓄本息总额=正常储蓄的本息总额+正常储蓄被扣除的利息税
}

function GetDayLen(StartDate,StandDate)
		{
			//以每月30天算一月，一年为360天
			return (StartDate.getYear()-StandDate.getYear())*360+(StartDate.getMonth()-StandDate.getMonth())*30+(StartDate.getDate()-StandDate.getDate());
		}