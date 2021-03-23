function getLength(val){
	var t_length=0;
	for(var j=0;j<val.length;j++){
		if(val.charAt(j)<=''){
			t_length = t_length+1;
		} else if(val.charAt(j)<='\t'){
			t_length = t_length+1;
		}else{
			t_length = t_length+2;
		}
	}
	return t_length;
}
(function($) {
	/*
	 * 默认参数
	 */
	var defaults = {
		message: '信息填写不完整',
		submitHandler: null,
		fields : null
	};
	/**
	 * @event icrmEventSubmitSuccess
	 * 提交成功事件
	 * @param {Object}this
	 * @param {Object}data 返回数据
	 */
	var submitSuccessEvent ="icrmEventSubmitSuccess";
	
	
	//字段验证通过
	/**
	 * @class 验证通过指定字段
	 * 将会更新状态，并取消不通过样式
	 * @param {String}name 字段名称
	 */
	$.fn.icrmValidField = function(name){
		$(this).data('bootstrapValidator')                                 
			.updateStatus(name, 'valid', null)      
			.validateField(name); 
	};
	
	//字段验证不通过
	/**
	 * @class 验证不通过字段
	 * 将会更新状态，并设置不通过样式
	 * @param {String}name 字段名称
	 */
	$.fn.icrmInvalidField = function(name){
		$(this).data('bootstrapValidator').updateStatus(name, 'invalid', null).validateField(name); 
	};
	
	//启用验证
	/**
	 * @class 启用指定字段验证
	 * @param {String}name 字段名称
	 */
	$.fn.enableValidateField = function(name){
		$(this).data('bootstrapValidator').enableFieldValidators(name, true); 
	};
	//关闭验证
	/**
	 * @class 关闭指定字段验证
	 * @param {String}name 字段名称
	 */
	$.fn.disableValidateField = function(name){
		$(this).data('bootstrapValidator').enableFieldValidators(name, false); 
	};
	/**
	 * @class 表单验证
	 * @param {Object}options
	 * 注册表单验证参数，配置详细信息如下：
	 * <div class="mdetail-params"><ul>
	 * <li><b>fields</b> : String
	 * <div class="sub-desc">需要验证的表单对象，值可以是：<ul>
	 * <li><tt>inputName</tt>：String</li>
	 *     <div class="sub-desc">表单元素名称,定义该表单元素的验证规则<ul>
	 *     <li><tt>validators</tt>：Object</li>
	 *         <div class="sub-desc">可用验证规则,均有配置项message，值可以是：<ul>
	 *             <li><tt>notEmpty</tt>不为空。</li>
	 *             <li><tt>digits</tt>数字</li>
	 *             <li><tt>different</tt>两个值不同。配置项：[field:待比较的表单对象name]</li>
	 *             <li><tt>date</tt>日期</li>
	 *             <li><tt>choice</tt>数字检查,大于或者小于给定的配置。配置项：[min,max]</li>
	 *             <li><tt>callback</tt>回调函数。配置项：[callback]<pre>
                  *callback: function(fieldValue, validator) {
                  *   // fieldValue：表单元素value
                  *   // validator：BootstrapValidator对象
                  *}</pre></li>
	 *             <li><tt>between</tt>数字检查,在给定的数字范围内。配置项：[min,max,inclusive:可选，默认true]</li>
	 *             <li><tt>greaterThan</tt>大于等于给定的数字。配置项：[value]</li>
	 *             <li><tt>lessThan</tt>小于等于给定的数字。配置项：[value]</li>
	 *             <li><tt>integer</tt>整数。配置项：[message]</li>
	 *             <li><tt>numeric</tt>数字。配置项：[message]</li>
	 *             <li><tt>regexp</tt>正则表达式。配置项：[message, regexp]</li>
	 *             <li><tt>remote</tt>到服务器验证。配置项：[message, url, data:可选, name:可选，表单元素的值改名]</li>
	 *             <li><tt>stringLength</tt>字符串长度。配置项：[message, min, max]</li>
	 *         </ul></div>
	 *     </ul></div>
	 * </ul></div>
	 * </ul></div>
	 * 示例：
	 * <pre><code>
	 var validate = {
		fields: {
			indexCode:{
        		validators:{
        			notEmpty: {
                        message: '不能为空'
                    }
        		}
        	},
        	indexName:{
        		validators:{
        			notEmpty: {
                        message: '不能为空'
                    }
        		}
        	}
		},
      submitHandler: function (form) {
        return false;
      }
	};
	var rs =  $('#prodFrom').icrmValidate(validate);
	rs.icrmManualValidate();
	if(!rs.isValid()){
	  	return;
	}
	 * </code></pre>
	 */
	//重写字符串长度验证
	$.fn.bootstrapValidator.validators.stringLength = {
			html5Attributes: {
	            message: 'message',
	            min: 'min',
	            max: 'max'
	        },
	        enableByHtml5: function($field) {
	            var maxLength = $field.attr('maxlength');
	            if (maxLength) {
	                return {
	                    max: parseInt(maxLength, 10)
	                };
	            }

	            return false;
	        },
	        validate: function(validator, $field, options) {
	            var value = $field.val();
	            if (value == '') {
	                return true;
	            }
	            var length = getLength(value);
	            if ((options.min && length < options.min) || (options.max && length > options.max)) {
	                return false;
	            }
	            return true;
	        }
	    };
	$.fn.icrmValidate = function(options) {
		/*
		 * 参数覆盖
		 */
		var opts = $.extend({}, defaults, options);
		var fields = opts.fields;
		var formId = $(this).attr("id");
		var formEle = $(this).find('input');
		
		//select2支持html写法
		for(var i=0;i<formEle.length;i++){
			var ele=$(formEle[i]);
			if(ele.hasClass('select2') || ele.hasClass('select2-offscreen')){
				if(ele.attr("data-bv-notempty") == "true"){ //需要验证不为空
					ele.on('change',function(e){
						if(e.val != ''){//如果选择值不为空，验证通过
							$('#'+formId).icrmValidField($(this).attr("name"));
						}else{//否则验证不通过
							$('#'+formId).icrmInvalidField($(this).attr("name"));
						}
					}); 
				}
			}
			if(ele.hasClass('form_date') || ele.hasClass('crm_date')){
				if(ele.attr("data-bv-date")){
					ele.change(function(e){//添加时间验证
						$('#'+formId).icrmValidField($(this).attr("name"));
					});
				}
			}
		}
		//js中写法
		for(var key in fields){
			var ele = $(this).find('input[name="'+key+'"]');
			if(ele.hasClass('form_date') || ele.hasClass('crm_date')){
				ele.change(function(e){//添加时间验证
					$('#'+formId).icrmValidField($(this).attr("name"));
				});
			}
			if(ele.hasClass('select2') || ele.hasClass('select2-offscreen')){
				ele.on('change',function(e){
					if(e.val != ''){//如果选择值不为空，验证通过
						$('#'+formId).icrmValidField($(this).attr("name"));
					}else{//否则验证不通过
						$('#'+formId).icrmInvalidField($(this).attr("name"));
					}
				});
			}
		};
		if(!(typeof opts.url == 'undefined' || opts.url == null)){
			opts.submitHandler = function(validator, form, submitButton) {
				$.icrmAjax({
					type : (typeof opts.type == 'undefined' || opts.type == null) ? 'post' : opts.type,
					url : opts.url,
					mask : true,
					dataType : (typeof opts.dataType == 'undefined' || opts.dataType == null) ? 'json' : opts.dataType, 
					data :  form.serialize(),
					success : function(data) {
							$.icrmDialog.showMessge('提示','数据保存成功');
							var grid = opts.grid;
							if(!(typeof grid == 'undefined' || grid == null)){
								grid.reload();//刷新列表
							}
							var dialog = opts.dialog;
							if(!(typeof dialog == 'undefined' || dialog == null)){
								dialog.modal('hide');//关闭dialog
							}
							/*
							 * 触发提交成功事件-add by pt at 2014-0522
							 */
							$("#"+formId).trigger(submitSuccessEvent,[$(this),data]);
					}
				});
			};
		}else{
			
		}
		var validateForm = $(this).bootstrapValidator(opts);
		/**
		 * @method 手动触发验证事件
		 */
		validateForm.icrmManualValidate = function() {
			$(this).bootstrapValidator('validate');
		};
		/**
		 * @method 判断fORM是否验证通过
		 */
		validateForm.isValid = function() {
			return $(this).data('bootstrapValidator').isValid();
		};
		/**
		 * @method 重置FORM表单验证
		 */
		validateForm.resetFormValid = function(){
			 $(this).data('bootstrapValidator').resetForm();
		};
		return validateForm;
	};
	
})(jQuery);