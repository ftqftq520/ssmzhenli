var ratejson;
$(function() {
	$.icrmAjax({
				type : "post",
				url : Global.ctx + "/html/im/moneyRate/getRate.do",
				dataType : "json",
				data : {},
				success : function(data) {
					ratejson = {
						id : "rate",// 利率ID
						desc : "利率",// 利率描述
						rateitems : eval(data.json)[0],
						// 递归查询利率
						findRateItem : function(id, rateItem) {
							var result;
							if (rateItem.id == id) {
								return rateItem;
							} else if (rateItem.id != id
									&& rateItem.rateitems != null) {
								for ( var i = 0; i < rateItem.rateitems.length; i++) {
									result = this.findRateItem(id,
											rateItem.rateitems[i]);
									if (result != null)
										return result;
								}
							}
							return null;
						},
						// 查询对应区间的利率
						findRate : function(month, rateItem) {
							if (rateItem == null)
								return;

							if (typeof (rateItem) != "array"
									&& rateItem.time_rate != null) {
								rateItem = rateItem.time_rate;
							}
							for ( var i = 0; i < rateItem.length; i++) {
								if (typeof (rateItem[i].month) == "object") {
									var month_min = rateItem[i].month.month_min;
									var month_max = rateItem[i].month.month_max;
									if (month_max < 0)
										month_max = 999;
									if(month_max == ""){
										month_max=month_min;
									}
									if (month > month_min && month <= month_max){
										return parseFloat(rateItem[i].rate) / 100;
									}
									if(month == month_min && month == month_max){
										return parseFloat(rateItem[i].rate) / 100;
									}
								} else {
									if (month == rateItem[i].month)
										return parseFloat(rateItem[i].rate) / 100;
								}
							}
						}
					}
					try{
						initTree();
					}catch (e) {
					}
				}
			});
});