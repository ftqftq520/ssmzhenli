function CalcBondBuy(oDocument)
{
		/// ծȯ��Ԫ������������Ĭ��ֵ��
		var Cost=0;
		///  Ʊ�����ʣ� %��������������λС����ծȯ����Ϊ���֣�����ʾ����Ĭ��ֵ��
		var Rate=0;
		///	�Ϲ��۸�Ԫ������������Ĭ��ֵ��
		var BuyPrice=0;
		///	ծȯ���ޣ��꣨��������
		var Years=0;
		///	�Ϲ����ڣ���/��/��
		var BuyDate= new Date();
		/// ծȯÿ�����Ϣ֧��Ƶ��: ��  �Σ�������
		var Freq=0;
		/// options  1������ծȯ
		///		    2������һ�λ�����Ϣծȯ 
		///         3���̶����ʸ�Ϣծȯ�͸�������ծȯ
var w,m;
var pv,x,s,e,isetp,ret=0;
var CurrDate=new Date();
			
//����ծȯ
	if (oDocument.all.cbType_0.checked==true)
	{
		options=0;
		Cost=parseFloat(oDocument.all.edCost.value);
		BuyPrice=parseFloat(oDocument.all.edPrice.value);
		Years=parseInt(oDocument.all.edYear.value);
	 } 
//����һ�λ�����Ϣծȯ
	 if (oDocument.all.cbType_1.checked==true)
	 {
		options=1;
		Cost=parseFloat(oDocument.all.edCost.value);
		BuyPrice=parseFloat(oDocument.all.edPrice.value);
		Years=parseInt(oDocument.all.edYear.value);
		Rate=parseFloat(oDocument.all.edRate.value)/100;
    }
//�̶����ʺ͸�������
	if (oDocument.all.cbType_2.checked==true)
	{
		options=2;
		Cost=parseFloat(oDocument.all.edCost.value);
		BuyPrice=parseFloat(oDocument.all.edPrice.value);
		Years=parseInt(oDocument.all.edYear.value);
		Rate=parseFloat(oDocument.all.edRate.value)/100;
		BuyDate=oDocument.all.edDate.value;
		Freq=parseInt(oDocument.all.edFreq.value);
		
		CurrDate =StrToDate(BuyDate);
		CurrDate.setYear(CurrDate.getYear()+Years);
    }
			switch(options)
			{
				case 0:
					ret=(Cost-BuyPrice*1.0)/(BuyPrice*Years);
					break;
				case 1:
					ret= Math.pow((Cost+Years*Cost*Rate)/BuyPrice,1.0/Years)-1;
					break;
				case 2:
					m=Years*Freq;
					w=1;
					isetp=0.0001;
					s=0.001;
					e=1;
					pv=0;						
					x=(1-isetp)/2;
					while ((Math.abs(pv-BuyPrice)>0.001)&&(Math.abs(e-s)>isetp))
					{
						pv=Calc(x,w,m,Cost,Rate,Freq);
						if (pv==0)
							break;
						if (pv<BuyPrice) 
						{
							e=x;
							x=s+(e-s)/2;
						}
						if (pv>BuyPrice)
						{
							s=x;
							x=s+(e-s)/2;
						}
					}
					ret=x;
					break;
			}
			oDocument.all.lbResult.value = NBround(ret*100,2);
		}
		
		function Calc(x,w,m,Cost,Rate,Freq)
		{
			var y=0;
			for (i=w;i<=w+m-1;i++)
				y=y+(Cost*Rate/Freq)/Math.pow((1+x/Freq),i);
			y=y+(Cost/Math.pow((1+x/Freq),(w+m-1)));
			return y;
		}