//活期储蓄计算器
function computefullsum(oDocument) //计算出实得本息总额和存入总额
			 {
				if (savedatearray.length==0)
				{			   
					var tmparray=new Array();
					tmparray.push(oDocument.all.edSaveSum.value);
					tmparray.push(oDocument.all.beginDateID.value);
					tmparray.push(oDocument.all.endDateID.value);
					tmparray.push(oDocument.all.edFullRate.value);
					var obj=computeoncefullsum(tmparray);
					oDocument.all.edFullSum.value=Round(obj.oncefullsum);
					oDocument.all.edSaveTotal.value=Round(obj.oncesavesum);
				}
				else
				{
					var fullsumtotal=0;
					var savesumtotal=0;
				   for (var i=0;i<savedatearray.length;i++)
				    {
						var tmparray=new Array();
						tmparray.push(savesumarray[i]);
						tmparray.push(savedatearray[i]);
						tmparray.push(oDocument.all.endDateID.value);
						tmparray.push(oDocument.all.edFullRate.value);
						var obj=computeoncefullsum(tmparray);
						fullsumtotal+=obj.oncefullsum;
						savesumtotal+=obj.oncesavesum;
					}
						oDocument.all.edFullSum.value=Round(fullsumtotal);
						oDocument.all.edSaveTotal.value=Round(savesumtotal);
				    
				}
			 }
			 
			 function computeoutdate(oDocument) //计算出提取日期
			 {
				var fullsumtotal=0;
				var savesumtotal=0;
				var lastsavedate="";
				if (savedatearray.length==0)
				{		
					lastsavedate=oDocument.all.beginDateID.value; ////最后存入日期等于本次存入日期, 字符串	  
					var tmparray=new Array();
					tmparray.push(oDocument.all.edSaveSum.value);
					tmparray.push(oDocument.all.beginDateID.value);
					tmparray.push(lastsavedate); 
					tmparray.push(oDocument.all.edFullRate.value);
					var obj=computeoncefullsum(tmparray);
					fullsumtotal=(obj.oncefullsum);
					savesumtotal=(obj.oncesavesum);
				}
				else
				{							
				   for (var i=0;i<savedatearray.length;i++)
				    {
						lastsavedate=getmaxsavedate(); //返回字符串
						var tmparray=new Array();
						tmparray.push(savesumarray[i]);
						tmparray.push(savedatearray[i]);
						tmparray.push(lastsavedate);
						tmparray.push(oDocument.all.edFullRate.value);
						var obj=computeoncefullsum(tmparray);
						fullsumtotal+=obj.oncefullsum;
						savesumtotal+=obj.oncesavesum;
					}				    
				}
				if (fullsumtotal>=parseFloat(oDocument.all.edFullSum.value))
						oDocument.all.endDateID.value=lastsavedate;
				else
				{
					var currfullsum=parseFloat(oDocument.all.edFullSum.value);
					var currfullrate=parseFloat(oDocument.all.edFullRate.value)/100;
					var gg=Math.ceil((currfullsum-fullsumtotal)/(fullsumtotal * (currfullrate/360)*0.8));
					var objlastsavedate=new Date();
					objlastsavedate.setTime(Cal_strtodate(lastsavedate));
					datevaild=addday(objlastsavedate,gg);
					if (datevaild)
						oDocument.all.endDateID.value=objlastsavedate.getFullYear()+"-"+(objlastsavedate.getMonth()+1)+"-"+objlastsavedate.getDate();
					else
					   {
						DispMessage(oDocument.all.edSaveSum,"计算出来的提取日期不符合实际情况");
						return false;
					   }	
				
				}	
				oDocument.all.edSaveTotal.value=Round(savesumtotal);
			 }
			 
			 function computeoncefullsum(s) //计算出一次实得本息和存入金额
			{
					SaveInSum=parseInt(s[0]);
					var SaveDate=new Date();
					SaveDate.setTime(Cal_strtodate(s[1]));	
					var AdvDrawDate=new Date();
					AdvDrawDate.setTime(Cal_strtodate(s[2]));
					YearRate=parseFloat(s[3])/100;
					var diffday=getNatrueDiffDay(AdvDrawDate,SaveDate);
					var obj=new Object();
					obj.oncefullsum=SaveInSum *(YearRate/360)*diffday*0.8 + SaveInSum;
					obj.oncesavesum=SaveInSum;
					return obj;
			}