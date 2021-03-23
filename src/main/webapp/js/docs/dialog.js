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
			        closable: false,
			        buttons: [{
			                label: '确认',
			                action: function(dialog) {
			                    dialog.close();
			                }
			            }]
			    }).open();
			}
		}
	});
	
})(jQuery);