(function($) {
	ICRM.setOptDate();//更新操作时间
	
	
	$.extend({
		/**
		 * @class $.icrmCombox请求
		 * @param {Object} options
		 */
		icrmCombox:function(options) {
			var data = []; 
			/*
			 * 参数覆盖
			 */
			$.extend(data, options.data);
			/*
			 * 调用实际组件
			 */
			if(options.url!=null){
				return ICRM.Select2.initSelect(data,options.url,options.isLocal,options.async,options.callback);
			}
			else{
				return ICRM.Select2.initSelect(data,null,options.isLocal,options.async,options.callback);
			}
		},
		icrmId2Txt:function(codeType,key,data) {
			if(key && data){
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
		},
		icrmId2Txt1:function(str,delim,codeType,codes){  //str需要转换的字符串    delim分隔符   codeType数据字典类型  codes代码集合 例子icrmId2Txt1(data,",","brLevel",codes);
			if(str == undefined)
				return "";
			var strArr=str.split(",");
			var val="";
			for(var i=0;i<strArr.length;i++){
				val=val+$.icrmId2Txt(codeType,strArr[i],codes)+",";
			}
			if(val.endWith(",")){
				val=val.substring(0,val.length-1);
			}
			return val;
		}
	});
})(jQuery);