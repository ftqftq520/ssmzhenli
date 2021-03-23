(function($) {
	ICRM.setOptDate();//更新操作时间
	
	var data = []; 
	$.extend({
		/**
		 * @class $.icrmCombox请求
		 * @param {Object} options
		 */
		icrmCombox:function(options) {
			/*
			 * 参数覆盖
			 */
			$.extend(data, options.data);
			/*
			 * 调用实际组件
			 */
			if(options.url!=null){
				return ICRM.Select2.initSelect(data,options.url,options.isLocal);
			}
			else{
				return ICRM.Select2.initSelect(data,null,options.isLocal,options.async);
			}
		},
		icrmId2Txt:function(codeType,key,data) {
			if(key){
				var itemData = data[codeType];
				if(itemData){
					for(var i = 0;i<itemData.length;i++){
						if(itemData[i].id == key){
							return itemData[i].text;
						}
					}
				}
			}
			return key;
		}
	});
})(jQuery);