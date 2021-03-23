(function($) {
	var data = []; 
	
	$.extend({
		/**
		 * @alternateClassName $.icrmAjax
		 * @class $.icrmAjax请求
		 * @param {Object} options
		 */
		icrmAjax:function(options) {
			ICRM.setOptDate();//更新操作时间
			
			/*
			 * 默认请求参数
			 */
			var defaults = {
				/**
				 * @cfg url 数据请求地址
				 */
				url : "",
				/**
				 * @cfg dataType 返回数据类型，默认:json
				 */
				dataType:"json",
				//contentType : "application/json",
				/**
				 * @cfg type 请求类型，默认：post
				 */
				type: "post",
				/**
				 * @cfg success 请求成功后回调方法
				 */
				success : function(data) {
					ICRM.Dialog.success("操作完成!");
				}, 
				/**
				 * @cfg error 请求失败后回调方法
				 */
				error : function(xhr){
					//console.log("xhr = "+JSON.stringify(xhr));
					if(xhr.status=="200"&&xhr.responseJSON==null){
						//ICRM.Dialog.success("返回信息为空!");
					}
					else{
						if(xhr.responseJSON==null){
							xhr.responseJSON=new Object();
						}
						ICRM.Dialog.error(xhr);
					}
				}
			}
			
			/*
			 * 参数覆盖
			 */
			
			var opts = $.extend({}, defaults, options);
			
			options.success = options.success || function(){};
			options.error = options.error || function(){};
			opts = $.extend({}, opts, {
				success : function(data) {
					options.success.call(this, data);
				}, 
				error : function(xhr){
					//console.log("xhr = "+JSON.stringify(xhr));
					if(xhr.status=="200"&&xhr.responseJSON==null){
						options.success.call(this, xhr);
					}
					else{
						if(xhr.responseJSON==null){
							xhr.responseJSON=new Object();
						}
						ICRM.Dialog.error(xhr);
						if(options.error){
							options.error.call(this, xhr);
						}
					}
				}
			});
			
			/*
			 * 调用实际组件
			 */
			$.ajax(opts);
		}
	});
})(jQuery);