(function($) {
	ICRM.setOptDate();//更新操作时间
	
	var data = []; 
	$.extend({
		icrmDialog:{
			showConfirm : function (title,message, callback) {
			    new BootstrapDialog({
			        title: (typeof title == 'undefined' || title == null) ? '提示' : title,
			        message: message,
			        closable: false,
			        data: {
			            'callback': callback
			        },
			        buttons: [{
			            label: '确定',
			            cssClass: 'btn-primary',
			            hotkey: 13, // Enter.
			            action: function(dialog) {
			                typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
			                dialog.close();
			            }
			        },{
			                label: '取消',
			                action: function(dialog) {
			                    typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
			                    dialog.close();
			                }
			            }]
			    }).open();
			},
			/**
			 * Alert window
			 * 
			 * @param {type} message
			 * @param {type} callback
			 * @returns the created dialog instance
			 */
			showMessge :function (title,message) {
			    return new BootstrapDialog({
			    	title: (typeof title == 'undefined' || title == null) ? '提示信息' : title,
			        message: message,
			        type: BootstrapDialog.TYPE_SUCCESS,
			        closable: false,
			        buttons: [{
			                label: '确认',
			                hotkey: 13, // Enter.
			                action: function(dialog) {
			                    dialog.close();
			                }
			            }]
			    }).open();
			},
			
			showMsgCallbak :function (title,message,func) {
				var callback = eval(func);
				BootstrapDialog.show({
			        type: BootstrapDialog.TYPE_SUCCESS,
			        title: '提示',
			        message: message,
			        onhide : function(){
			        	if ($.isFunction(callback)) {
			        		callback();
						}
			        },
			        buttons: [{
			            label: '确定',
			            cssClass: 'btn-success',
			            hotkey: 13, // Enter.
			            action: function(dialog){
			            	if ($.isFunction(callback)) {
				        		callback();
				        		dialog.close();
							}
			            }
			        }]
			    }); 
			}
		}
	});
	
})(jQuery);