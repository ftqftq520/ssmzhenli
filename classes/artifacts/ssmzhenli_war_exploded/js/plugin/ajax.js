var _applicationExceptionFlag=true;
(function($) {
	var data = []; 
	$.extend({
		/**
		 * @alternateClassName $.icrmAjax
		 * @class $.icrmAjax请求
		 * @param {Object} options
		 */
		icrmAjax:function(options) {
			if(options.mask == true){
				ICRM.UI.showProcessingMask();
			}
			
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
					} else if(xhr.status == "900"){
						_applicationExceptionFlag = false;
						if(xhr.responseJSON==null){
							xhr.responseJSON=new Object();
						}
						
						BootstrapDialog.show({
				            type: BootstrapDialog.TYPE_DANGER,
				            title: '提示',
				            message: xhr.responseJSON.errorMsg || "系统异常",
				            onhide : function(){
				            	ICRM.logout();
				            },
				            buttons: [{
				                label: '确定',
				                cssClass: 'btn-danger',
				                action: function(dialogRef){
				                	ICRM.logout();
				                }
				            }]
				        }); 
					}else{
						if(xhr.responseJSON==null){
							xhr.responseJSON=new Object();
						}
						ICRM.Dialog.error(xhr);
					}
				}
			};
			
			/*
			 * 参数覆盖
			 */
			
			var opts = $.extend({}, defaults, options);
			
			options.success = options.success || function(){};
			options.error = options.error || function(){};
			options.callback = options.callback || function(){};
			opts = $.extend({}, opts, {
				success : function(data) {
					options.success.call(this, data);
					options.callback.call(this);
				}, 
				error : function(xhr){
					//console.log("xhr = "+JSON.stringify(xhr));
					if(xhr.status=="200"&&xhr.responseJSON==null){
						options.success.call(this, xhr);
					}else if(xhr.status == "900"){
						_applicationExceptionFlag = false;
						if(xhr.responseJSON==null){
							xhr.responseJSON=new Object();
						}
						
						BootstrapDialog.show({
				            type: BootstrapDialog.TYPE_DANGER,
				            title: '提示',
				            message: xhr.responseJSON.errorMsg || "系统异常",
				            buttons: [{
				                label: '确定',
				                cssClass: 'btn-danger',
				                hotkey: 13, // Enter.
				                action: function(dialogRef){
				                	$.ajax({
				                        url: Global.ctx + '/html/huap/user/logout.do',
				                        success:function (data, textStatus) {
				                        	window.location.href = Global.ctx + "/";
				                        }
				                    });
				                }
				            }]
				        });
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
					options.callback.call(this);
				},
				complete:function(XHR, TS){
					if(options.mask == true){
						ICRM.UI.hidenProcessingMask();
					}
				}
			});
			
			/*
			 * 调用实际组件
			 */
			if(_applicationExceptionFlag){
				$.ajax(opts);
			}
		}
	});
})(jQuery);