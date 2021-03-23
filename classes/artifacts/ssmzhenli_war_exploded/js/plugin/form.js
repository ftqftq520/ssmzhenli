(function($) {
	ICRM.setOptDate();//更新操作时间
	
	var data = []; 
	$.extend({
		/**
		 * @class $.icrmLoadForm 根据给定的数据重新加载表单
		 * @param {Object}data 待赋值的json数据
		 * @param {Object}form jquery表单对象
		 */
		icrmLoadForm:function(data,form) {
			for (var p in data) {
				var ele = form.find("input[name="+p+"],textarea[name="+p+"],select[name="+p+"]");
				if (ele.is(":checkbox,:radio", form)) {
					//ele[0].checked = data[p] ? true : false;
					for(var i = 0;i < ele.length; i++){
						ele[i].attr("defaultValue",data[p]);
						if(ele[i].value == data[p]){
							ele[i].checked = true;
						}else{
							ele[i].checked = false;
						}
					}
				} else if(ele.is(":hidden",form)) {
					ele.attr("defaultValue",data[p]);
					if(ele.hasClass('select2-offscreen')){// || ele.hasClass('_select2') || ele.hasClass('select2')
						ele.select2('val',data[p]);
					}else{
						ele.val(data[p]);
					}
				} else{//input:text
					ele.attr("defaultValue",data[p]);
					if($(ele).find("option").size()>0) {
						$.each($(ele).find("option"),function(index,itm){
							if($(this).attr("value") == data[p]) {
								if(ele.hasClass('select2-offscreen')){// || ele.hasClass('_select2') || ele.hasClass('select2')
									$(ele).select2("val",data[p]);
								} else {
									$(ele).val(data[p]);
								}
							}
						});
					} else {
						if(ele.hasClass('select2-offscreen')){// || ele.hasClass('_select2') || ele.hasClass('select2')
							$(ele).select2("val",data[p]);
						} else {
							ele.val(data[p]);
						}
					}
				}
			}
		},
		/**
		 * @class $.icrmResetForm 重置表单
		 * 1.如果表单元素存在defaultValue属性，将重置为该属性值
		 * 2.如果表单元素存在.js-clear css样式，将清空该元素值
		 * @param {Object}form jquery表单对象
		 */
		icrmResetForm:function(form){
			$(':input',form).not(':button, :submit, :reset').each(function (){//重置
				var type = $(this).attr("type");
				var defaultValue = $(this).attr("defaultValue");
				if(defaultValue == undefined){
					defaultValue="";
				}
				if(type == 'hidden'){//select2 下拉框
					if($(this).hasClass('select2-offscreen') || $(this).hasClass('_select2') || $(this).hasClass('select2')){
						$(this).select2('val',defaultValue.split(",")); 
					} else {
						$(this).val(defaultValue);
					}
				}else if(type == 'select'){
					$(this).select2('val',defaultValue);
				}else{//input
					if($(this).hasClass('select2-offscreen') || $(this).hasClass('_select2') || $(this).hasClass('select2')){
						$(this).select2('val',defaultValue);
					}else{
						$(this).val(defaultValue).removeAttr('selected').removeAttr('checked');
					}
				}
			});
			
			$(':input',form).not(':button, :submit, :reset').each(function (){
				if($(this).is(".js-clear")){//清空
					var type = $(this).attr("type");
					if(type == 'hidden'){//select2 下拉框
						if($(this).hasClass('select2-offscreen') || $(this).hasClass('_select2') || $(this).hasClass('select2')){
							$(this).select2('val','');
						} else {
							$(this).val('');
						}
					}else if(type == 'select'){
						$(this).select2('val','');
					}else{//input
						if($(this).hasClass('select2-offscreen') || $(this).hasClass('_select2') || $(this).hasClass('select2')){
							$(this).select2('val','');
						}else{
							$(this).val("").removeAttr('selected').removeAttr('checked');
						}
					}
				}
			});
		},
		/**
		 * @class $.icrmDisableForm 禁用表单
		 * @param {Object}form jquery表单对象
		 */
		icrmDisableForm:function(form){
			if (form instanceof Object) {
				$(':input',form).not(':button, :submit, :reset').each(function (){
					var type = $(this).attr("type");
					if(type == 'hidden'){//select2 下拉框
						if($(this).hasClass('select2-offscreen') || $(this).hasClass('_select2') || $(this).hasClass('select2')){
							//$(this).select2('disable', true);
							$(this).attr("disabled", true);
						}
					}else if(type == 'select'){
						$(this).select2('disable', true);
					}else if(type == 'checkbox' || type =='radio'){
						$(this).attr("disabled", true);
					}else{
						$(this).attr("readonly", true);
						$(this).unbind(); //主要是解除日期控件事件
						var inputGroupBtn = $(this).siblings(".input-group-btn");
						if(inputGroupBtn.length > 0){
							$("button",inputGroupBtn[0]).attr("disabled","disabled");	
						}
						var dateSpan = $(this).siblings("span");
						if(dateSpan.length > 0){
							$(dateSpan).unbind();//主要是解除日期控件事件
						}
					}
				});
			} else {
				alert(form + "不是一个对象");
			}
		},
		/**
		 * @class $.icrmDisableForm 启用表单
		 * @param {Object}form jquery表单对象
		 */
		icrmEnableForm:function(form){
			if (form instanceof Object) {
				$(':input',form).not(':button, :submit, :reset').each(function (){
					if($(this).attr("readonly")=='readonly' || $(this).attr("readonly")==true){
						$(this).removeAttr("readonly");
					}else if($(this).attr("disabled")=='disabled' || $(this).attr("disabled")==true){
						$(this).removeAttr("disabled");
					}
				});
			}
		}
	});
})(jQuery);