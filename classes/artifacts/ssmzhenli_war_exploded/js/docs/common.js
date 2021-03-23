(function($) {
	// 把生成命名空间的方法绑定在jQuery上  
	/**
	 * @class 生成命名空间
	 * @param {string}namespace
	 * 示例：
	 * <pre><code>
	 * jQuery.namespace("ICRM.file");
	 * </code></pre>
	 */
	jQuery.namespace = function() {
	    var a = arguments, o = null, i, j, d;    
	    for (i = 0; i < a.length; i = i+1) {
		    d = a[i].split(".");        
		    if(d[0] == "jQuery"){
			    o = jQuery;
		    	for (j = 1; j<d.length; j = j+1) {
			        o[d[j]] = o[d[j]] || {};
			        o = o[d[j]];        
			    }
		    } else {
			    o = window;
		    	for (j = 0; j<d.length; j = j+1) {
			        o[d[j]] = o[d[j]] || {};
			        o = o[d[j]];        
			    }
		    }
	    }
	    return o;
	};
	
	// 全局系统对象
	jQuery.namespace("ICRM");
	
	
	ICRM.cache = {
		/**
		 * @class ICRM.cache.org
		 * 组织缓存
		 */
		org : {
			/**
			 * @method 设置数据到缓存
			 * @param data
			 */
			setData : function(data){
				$("body").data("org", data);
			},
			/**
			 * 获取数据
			 * @return {Array}orgList
			 */
			getData : function(){
				if(!ICRM.cache.org.getCacheData()){
					ICRM.cache.org.load();
				}
				return ICRM.cache.org.getCacheData();
			},
			/**
			 * 从缓存中获取数据
			 * @return {Array}orgList
			 */
			getCacheData : function(orgArr){
				return $("body").data("org");
			},
			/**
			 * 重新加载数据，并设置到缓存
			 */
			load : function(){
				$.icrmAjax({
					async: false,
					url : Global.ctx + "/html/huap/org/findAllTree.do",
					success : function(data){
						ICRM.cache.org.setData(data);
					}
				});
			}
		}
	};
	
	/**
	 * @class ICRM.loadCss
	 * 加载css
	 * @param src
	 */
	ICRM.loadCss = function(src) {
		document.write('<link href="'+Global.ctx+src+'" rel="stylesheet" type="text/css">');
	}

	/**
	 * @class ICRM.loadJs
	 * 加载js
	 * @param src
	 */
	ICRM.loadJs = function(src) {
		document.write('<script src="'+Global.ctx+src+'"></script>');
	}
	
	
	/**
	 * @class ICRM.isEmpty
	 * 判断是否为空
	 * @param {string}str
	 */
	ICRM.isEmpty = function(str){
		if(str == undefined || str.trim() == "" || str == null){
			return true;
		}
		
		return false;
	};

	
	var options = {
		bootstrapMajorVersion:3,
		currentPage: 1,
		totalPages: 10,
		numberOfPages:10,
		onPageClicked: function(event, originalEvent, type, page){
			pageChange(page);
	    }
	};
	
	ICRM.request = function(paras){
		var url = location.href; 
		var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
		var paraObj = {};
		for (i=0; j=paraString[i]; i++){
			paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
		} 
		var returnValue = paraObj[paras.toLowerCase()]; 
		if(typeof(returnValue)=="undefined"){ 
			return ""; 
		}else{ 
			return returnValue; 
		} 
	};
	ICRM.logout = function(){
		$.icrmAjax({
            url: Global.ctx + '/html/huap/user/logout.do',
            success:function (data, textStatus) {
            	window.location.href = Global.ctx + "/";
            }
        });
	};
	ICRM.setOptDate = function(){
		_opt_date = new Date();//更新操作时间为当前时间
	};
	
	//请求参数
	ICRM.Request = {
		//根据参数名称获取参数值
		"getRequestParamValue" : function (strName) {
			var strHref = window.document.location.href; 
			var intPos = strHref.indexOf("?"); 
			var strRight = strHref.substr(intPos + 1); 
			var arrTmp = strRight.split("&"); 
			//console.info(arrTmp);
			for(var i = 0; i < arrTmp.length; i++) { 
				var arrTemp = arrTmp[i].split("="); 
				if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1]; 
			} 
			return "";
		}
	};
	
	//下拉控件
	ICRM.Select2 = {
		//初始化下拉
		"initSelect" : function(optData,url,local,async) {
			var selectData = new Object();
			if(url==null||url==""){
				url = Global.ctx + "/html/iplatform/Code/initSelect.do";
			}
			/*
			 * 后台取
			 */
			if(local==false || local==null || local==undefined){
				if(async == undefined || async == null) {
					async = false;
				}
				$.ajax({
					type : "post",
					contentType : "application/json",
					dataType : "json",
					async:async,
					url : url,
					data : JSON.stringify(optData),
					success : function(data) {
							$.each(data,function(index,item){
								//设置下拉框数据
								if(item.selectIds!=null&&item.selectIds!=""){
									var selectIdArr = item.selectIds.split(",");
									for(var i =0;i<selectIdArr.length;i++){
										$("#"+selectIdArr[i]).select2({
											data : item.data
										})
									}
								}
								selectData[item.typeCode] = item.data;
						});
					}
				});
				
			}
			else{
				/*
				 * 本地取
				 */
				//console.log(JSON.stringify(AllCodeItemsData));
				$.each(optData,function(index,item){
					//设置下拉框数据
					if(item.selectIds!=null&&item.selectIds!=""){
						var selectIdArr = item.selectIds.split(",");
						for(var i =0;i<selectIdArr.length;i++){
							$("#"+selectIdArr[i]).select2({
								data : AllCodeItemsData[item.typeCode]
							})
						}
					}
					selectData[item.typeCode] = AllCodeItemsData[item.typeCode];
				});
			}
			return selectData;
		}
	};
	
	
	//转化代码集code为name
	ICRM.transfCodeNo = function transfCodeNo(data,url) {
		if(url==null||url==""){
			url = Global.ctx + "/html/iplatform/Code/initSelect.do";
		}
		$.ajax({
			type : "post",
			contentType : "application/json",
			dataType : "json",
			url : url,
			data : JSON.stringify(data),
			success : function(data) {
				//console.info(data);	
					$.each(data,function(index,item){
						//console.info(item.selectIds);
						console.info(JSON.stringify(item.data));
						var selectIdArr = item.selectIds.split(",");
						for(var i=0; i< selectIdArr.length; i++) {
							for(var j=0;j<item.data.length;j++){
								var id = item.data[j].id;
								var text = item.data[j].text;
								if($("#"+selectIdArr[i]).text()==id){
									$("#"+selectIdArr[i]).text(text);
									break;
								}
							}
						}
				});
			}
		});
	};
	
	//datatable
	ICRM.Datatable = {
		//datatable中文
		"oLanguage" : {
		    "sProcessing":   "处理中...",
		    "sLengthMenu":   "显示 _MENU_ 项结果",
		    "sZeroRecords":  "没有匹配结果",
		    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
		    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
		    "sInfoPostFix":  "",
		    "sSearch":       "搜索:",
		    "sUrl":          "",
		    "sEmptyTable":     "表中数据为空",
		    "sLoadingRecords": "载入中...",
		    "sInfoThousands":  ",",
		    "oPaginate": {
		        "sFirst":    "首页",
		        "sPrevious": "上页",
		        "sNext":     "下页",
		        "sLast":     "末页"
		    },
		    "oAria": {
		        "sSortAscending":  ": 以升序排列此列",
		        "sSortDescending": ": 以降序排列此列"
		    }
		}
	};
	
	//日期范围选择 中文
	ICRM.options_daterange =  {
			locale: {
	            applyLabel: '确认',
	            cancelLabel: '取消',
	            fromLabel: '从',
	            toLabel: '到',
	            customRangeLabel: 'Custom',
	            daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
	            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	            firstDay: 1
	        }
	};
	
	//模态窗口
	/**
	 * @class ICRM.Modal
	 */
	ICRM.Modal = {
		/**
		 * @method
		 * 关闭：只关闭当前模态窗口
		 */
		"close" : function(btn) {
			$(btn).closest(".modal").modal('hide');
		}
	};
	
	//对话框
	/**
	 * @class ICRM.Dialog
	 */
	ICRM.Dialog = {
		/**
		 * @method 成功提示框
		 * @param {string}msg 提示信息
		 */
		"success" : function(msg){
			BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: '提示',
                message: msg || "操作成功！",
                buttons: [{
                    label: '确定',
                    cssClass: 'btn-success',
                    action: function(dialogRef){
                        dialogRef.close();
                    }
                }]
            }); 
		},
		/**
		 * @method 错误提示框
		 * @param {Object}xhr xmlhttprequest对象
		 */
		"error" : function(xhr){
			BootstrapDialog.show({
                type: BootstrapDialog.TYPE_SUCCESS,
                title: '提示',
                message: xhr.responseJSON.errorMsg || "系统异常",
                buttons: [{
                    label: '确定',
                    cssClass: 'btn-danger',
                    action: function(dialogRef){
                        dialogRef.close();
                    }
                }]
            }); 
		},
		/**
		 * @method 确认提示框
		 * @param {string} message 提示信息
		 * @param {Function} callback 回调函数
		 */
		"showConfirm" : function (title,message, callback) {
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
		 * @method 提示信息框
		 * @param {string} message 提示信息
		 * @param {Function} callback 回调函数
		 */
		"showMessge" : function (title,message) {
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
	};
	
	jQuery.namespace("ICRM.file");
	ICRM.file = {
		getValue : function(container){
			var ids = "";
			var name = "";
			var arr = [];
			
			$(".dropzone .dz-success", container).each(function(i){
				if(ids != ""){
					ids += ",";
					name += ",";
				}
				
				var data = {
					id : $(this).attr("user-data"),
					name : $(".dz-filename span", $(this)).text(),
					size : $(".dz-size", $(this)).text()
				};
				ids += data.id;
				name += data.name;
				arr.push(data);
			})
			
			return {id : ids, name : name, data : arr};
		},
		confirm : function(btn){
			modal_close(btn);
			var id = $(btn).closest(".modal").attr("id");
			var oModal = $("#"+id).data('bs.modal');
			
			var json = ICRM.file.getValue($("#"+id));
			
			oModal.options.extOpt.callback.call(btn, json);
		}
	};
	/**
	 * @class ICRM.webflow
	 * 工作流页面组件
	 */
	ICRM.webflow = {
		/**
		 * @method 获取状态中文
		 * @param {string}value状态值
		 */
		status2Text : function(value){
			if(value == "1"){
				return "待处理";
			} else if (value == "2"){
				return "已处理";
			} else if (value == "3"){
				return "取消";
			} else if (value == "4"){
				return "驳回";
			} else {
				return "未知状态";
			}
		},
		/**
		 * @method 提交流程
		 * @param {string}btn提交按钮jquery选择器
		 */
		confirm : function(btn){
			var id = $(btn).closest(".modal").attr("id");
			var oModal = $("#"+id).data('bs.modal');
			
			var nodeKey = $(btn).closest(".modal-dialog").find(".active").attr("nodeKey");
			if(ICRM.isEmpty(nodeKey)){
				ICRM.Dialog.showMessge("提示", "请先选择审批节点");
				return;
			}
			
			var zTree = $.fn.zTree.getZTreeObj("orgEmpTree");
			var chkNodeArr = [];
			if(zTree){
				chkNodeArr = zTree.getCheckedNodes(true);
			}
			
			var executorNo = "";
			for(var i=0; i<chkNodeArr.length; i++){
				if(executorNo != ""){
					executorNo += ",";
				}
				executorNo += chkNodeArr[i].codeKey;
			}
			
			
			if(ICRM.isEmpty(executorNo)){
				ICRM.Dialog.showMessge("提示", "请先选择审批人员");
				return;
			}
			
			modal_close(btn);
			
			var json = {
				nodeKey : nodeKey,
				executorNo : executorNo,
				taskKey : oModal.options.extOpt.data.taskKey || ""
			};
			oModal.options.extOpt.callback.call(this, json, btn);
		},
		/**
		 * @method 提交到下一流程节点
		 * @param {Object}json参数json串。格式为:
		 * <pre><code>
		 * {
		 *     taskKey : "",//任务编号
		 *     memo : "",	//审批意见
		 *     nodeKey : "",//当前节点key
		 *     executorNo : ""//执行人
		 * }
		 * </code></pre>
		 */
		submit2NextNode : function(json){
		  if(json){
	        $.icrmAjax({
	          dataType : "json",
	          type : "post",
	          url : Global.ctx + "/html/webflow/submit2NextNode.do",
	          data : {
	            taskKey:json.taskKey,
	            memo:json.memo,
	            nodeKey:json.nodeKey,
	            executorNo:json.executorNo
	          },
	          success : function(data) {
	            showMessge("提示", '操作成功');
	          }
	        });
		  }
		}
	};
	/**
	 * @class ICRM.UI
	 */
	ICRM.UI = {
		/**
		 * @method 文件上传输入框
		 * @param {Object}options
		 * <div class="mdetail-params"><ul>
		 * <li><b>id</b> : String</li>
		 * <li><b>name</b> : String</li>
		 * <li><b>binding</b> : String</li>
		 * <li><b>readOnly</b> : Boolean</li>
		 * <li><b>type</b> : String</li>
		 * <li><b>fileType</b> : String</li>
		 * <li><b>maxFiles</b> : Integer</li>
		 * <li><b>showList</b> : Boolean</li>
		 * <li><b>callback</b> : Function</li>
		 * <li><b>selector</b> : String</li>
		 * <li><b>busiKey</b> : String</li>
		 * </ul></div>
		 */
		fileUpload : function(options){
			if(!jQuery.isPlainObject(options)){
				options = {
					selector : options
				};
			}
			
			//绑定事件
			var defEvent = {
				"afterSelect" : function(event, json){}
			}
			var listeners = jQuery.extend(defEvent, options.listeners || {});
			for(var type in listeners){
				$(this).bind(type, listeners[type]);
			}
			
			var self = this;
			
			options = jQuery.extend({
				id : "fileIds",
				name : "fileNames",
				binding : "input",
				readOnly : false,
				type : "file",
				fileType : "1",
				maxFiles : 5,
				showList : true,
				callback : function(json){
					addFileItem(options, json, true);
					$(self).triggerHandler("afterSelect", [json]);
				}
					
			}, options);
			
			var getValue = function(tagsEl){
				var json = {
					ids : "",
					names : "",
					datas : []
				};
				$("span", tagsEl).each(function(){
					if(json.ids != ""){
						json.ids += ",";
						json.names += ",";
					}
					var data = {
						id : $(this).attr("data"),
						name : $("b", this).html()
					};
					json.datas.push(data);
					json.ids += data.id;
					json.names += data.name;
				});
				return json;
			}
			
			/*
			 *	添加文件明细 
			 */
			var addFileItem = function(options, json, append){
				if(append){
					var oldId = $("#"+options.id).val();
					var oldName = $("#"+options.name).val();
					
					if(!ICRM.isEmpty(oldId)){
						$("#"+options.id).val(oldId + "," + json.id);
						$("#"+options.name).val(oldName + "," + json.name);
					} else {
						$("#"+options.id).val(json.id);
						$("#"+options.name).val(json.name);
					}
					
				} else {
					$("#"+options.id).val(json.id);
					$("#"+options.name).val(json.name);
				}
				
				var tagsEl = $("#"+options.id).closest(".js-att-container").find(".js-att-list");
				
				//先清空
				//$(".js-att-item", tagsEl).remove();
				
				for(var i=0; i<json.data.length; i++){
					//var tpl = '<span class="tag" data="'+json.data[i].id+'"><a href="javascript:void(0);">'+json.data[i].name+'</a><button class="close" type="button">×</button></span>';
					var href = Global.ctx + "/file/get/"+json.data[i].id+"/g.do";
					var tpl = '<div class="pt-5 js-att-item" data="'+json.data[i].id+'"><span class="glyphicon glyphicon-paperclip blue pl-8"></span><a href="'+href+'" target="_blank"><b class="pl-5 c-b">'+json.data[i].name+'</b></a><span class="grey pl-5">('+json.data[i].size+')</span>';
					
					if(options.readOnly === false){
						tpl += '<a class="pl-5 pointer">删除</a></div>';
					}
					tpl += '</div>';
					
					tagsEl.append(tpl);
					
					var n = tagsEl.find(".js-att-item a:last-child");
					
					var id = json.data[i].id;
					n.on("click", function(e){
						var _optId = options.id;
						var _optName = options.name;
						//删除
						$.ajax({
							type : "post",
							dataType : "json",
							url : Global.ctx + "/file/del.do",
							data : {
								id : id
							},
							success : function(data) {
								$(n).closest(".js-att-item").empty().remove();
						
								var newjson = getValue(tagsEl);
								$("#"+_optId).val(newjson.ids);
								$("#"+_optName).val(newjson.names);
							},
							error : function(xhr){
								if(xhr.status=="200"){
									$(n).closest(".js-att-item").empty().remove();
									var newjson = getValue(tagsEl);
									$("#"+_optId).val(newjson.ids);
									$("#"+_optName).val(newjson.names);
								}
							}
						});
						
						
						
						e.stopPropagation();
						return false;
					});
				}
				
			};
			
			if(options.binding == "input"){
				var tpl = '<div class="js-att-container">';
				
				if(options.inputSelector == undefined){
					tpl += '<input type="hidden" id="'+options.id+'" name="'+options.id+'">';
					tpl += '<input type="hidden" id="'+options.name+'" name="'+options.name+'">';
				}
				tpl += '<div id="div_upload_link"><span class="glyphicon glyphicon-paperclip blue"></span><a class="js-upload-link pointer">附件上传</a></div>'+
						'<div class="js-att-list label-primary">'+
//								'<div class="pt-5 js-att-item"><span class="glyphicon glyphicon-paperclip blue pl-8"></span><b class="pl-5">2.txt</b><span class="grey pl-5">(22.4k)</span><a class="pl-5">删除</a></div>'+
						'</div>'+
					'</div>';
				if(options.inputSelector == 'undefined'){
					tpl += '<input type="hidden" id="'+options.id+'" name="'+options.id+'">';
					tpl += '<input type="hidden" id="'+options.name+'" name="'+options.name+'">';
				}
				$(options.selector).html(tpl);
				if(options.readOnly != undefined && options.readOnly != null && options.readOnly == true) {
					$("#div_upload_link").hide();
				}
			}
			
			//绑定事件
			if(options.readOnly === false){
				var url = Global.ctx + "/html/common/fileUpload.html";
				if(options.type == "image"){
					url = Global.ctx + "/html/common/imgUpload.html";
				}
				
				var windowId = "fileupload-window";
				
				$(".js-upload-link", options.selector).bind("click", function() {
					var oModel = $("#"+windowId).modal({
						  extOpt : options,
						  keyboard: false,
						  remote : url
					});
					oModel.extOpt = options;
				});
				
				
				//添加弹出窗口
				if($("#"+windowId).length == 0){
					var tpl2 = '<div class="modal fade" id="'+windowId+'" tabindex="-2" role="dialog"'+
								'aria-labelledby="myModalLabel" aria-hidden="true" selectType="selectAll">'+
							'</div>';
					$("body").append(tpl2);
					
					$('#'+windowId).on('hidden.bs.modal', function (e) {
						//关闭后清空
						$("#fileupload-window").data('bs.modal').dropzone[0].dropzone.removeAllFiles(true);
					 	//$(".dz-preview", '#'+windowId).remove();
					 	//$(".dropzone", '#'+windowId).removeClass("dz-started");
					})
				}
			}
			
			
			if(options.busiKey){
				//获取已有附件
				$.icrmAjax({
					type : "post",
					dataType : "json",
					url : Global.ctx + "/file/item.do",
					data : {
						busiKey : options.busiKey
					},
					success : function(arr) {
						if(arr.length > 0){
							addFileItem(options, {data : arr});
						}
					}
				});
			}
		},
	
		/**
		 * @method webflow
		 * 任务处理人分派
		 * @param {String/Object}options
		 * <div class="mdetail-params"><ul>
		 * <li><b>selector</b> : String</li>
		 * <li><b>data</b> : String</li>
		 * <li><b>callback</b> : Function</li>
		 * </ul></div>
		 */
		webflow : function(options){
			if(!jQuery.isPlainObject(options)){
				options = {
					selector : options
				};
			}
			
			options = jQuery.extend({
				data : {
					templateKey : '',
					taskKey : '',
					removeNode : '',
					reload:false
				},
				callback : function(json){}
			}, options);
			
			if(ICRM.isEmpty(options.data.templateKey)){
				ICRM.Dialog.error("模版编号templateKey不能为空");
				return;
			}
			
			/**
			 * 初始化弹出窗口
			 */
			var initWindow = function(options){
				var windowId = "webflow-window";
				
				//添加弹出窗口
				if($("#"+windowId).length == 0){
					var tpl = '<div class="modal fade" id="'+windowId+'" tabindex="-2" role="dialog"'+
								'aria-labelledby="myModalLabel" aria-hidden="true" selectType="selectAll">'+
							'</div>';
					$("body").append(tpl);
					
					$('#'+windowId).on('hidden.bs.modal', function (e) {
					 	//关闭前触发事件
						//reload页面
						if(options.data.reload == true){
							$(this).removeData("bs.modal");
						}
					})
				}
				
				var url = Global.ctx + "/html/common/nodeSelector.html";
				if(options.selector){
					$(options.selector).bind("click", function() {
						var oModel = $("#"+windowId).modal({
							  extOpt : options,
							  keyboard: false,
							  remote : url
						});
						oModel.extOpt = options;
					});
				} else {
					var oModel = $("#"+windowId).modal({
						  extOpt : options,
						  keyboard: false,
						  remote : url
					});
					oModel.extOpt = options;
				}
			};
			
			initWindow(options);
		},
		
		/**
		 * @method taskMemo
		 * 任务审批意见
		 * @param {Object}options
		 */
		taskMemo : function(options){
			var tpl = '<div class="widget-box collapsed">'+
					      '<div class="widget-header widget-header-small" data-action="collapse">'+
					        '<h6 class="lighter">审批历史</h6>'+
					        '<div class="widget-toolbar">'+
								'<a href="#"><i class="icon-chevron-down"></i></a>'+
							'</div>'+
					      '</div>'+
					      '<div class="widget-body">'+
					        '<div class="widget-main">'+
					         '<div class="table-responsive">'+
								'<table id="memo_grid" class="table table-condensed table-striped table-bordered table-hover"></table>'+
							'</div>'+
					        '</div>'+
					      '</div>'+
					    '</div>';
			
			$(options.selector).append(tpl);
			
		   	var aoColumns = [
		    		{
		    	       	"sTitle": "业务类型",
		    	    	"sClass": "center hidden-480",
		    			"mData" : "busiFlowType"
		    		}, {
		    			"sTitle": "处理人",
		    			"mData" : "executor"
		    		} , {
		    			"sTitle": "节点名称",
		    			"sClass": "center hidden-480",
		    			"mData" : "nodeName"
		    		}, {
		    			"sTitle": "任务状态",
		    			"sClass": "center hidden-480",
		    			"mData" : "taskStat",
		    			"mRender" : function(data, type, full) {
		    				return ICRM.webflow.status2Text(data);
		    			}
		    		}, {
		    			"sTitle": "意见",
		    			"sClass": "center hidden-480",
		    			"mData" : "memo",
		    			"mRender" : function(data, type, full) {
		     				if(data != null && data != ''){
		     					var rs = "";
		     			    	if(data.length > 8){
		     						rs = data.substr(0, 8) + "...";
		     						return '<label title="'+ data +'">' + rs + '</label>';
		     					}else{
		     						return data;
		     					}
		     				}else{
		     					return data;
		     				}
		     			}
		    		}, {
		    			"sTitle": "开始时间",
		    			"sClass": "center hidden-480",
		    			"mData" : "startTm",
		    			"mRender" : function(data, type, full) {
		    				return new Date(full.startTm).format("yyyy-MM-dd");
		    			}
		    		}, {
		    			"sTitle": "结束时间",
		    			"sClass": "center hidden-480",
		    			"mData" : "entTm",
		    			"mRender" : function(data, type, full) {
		    				return new Date(full.entTm).format("yyyy-MM-dd");
		    			}
		    		}];
			datatable = $('#memo_grid').icrmGrid({
				//formId:'taskSearchForm',
				toolbar:[],
				//key:'tableKey',
				data:{
					processKey : options.processKey
				},
				url: Global.ctx + "/html/webflow/memo.do",
				//delUrl : Global.ctx + '/html/mm/pe/active/list/delActive.do',
				aoColumns: aoColumns,
				"bSort" : false
			});
		},
		/**
		 * @method window
		 * 弹出层
		 * @param {Object}options
		 */
		window : function(options){
			if(!jQuery.isPlainObject(options)){
				options = {
					url : options
				};
			}
			
			options = jQuery.extend({
				url : "",
				title : "",
				data : {},
				buttons : [],
				listeners : {
				}
			}, options);
			
			for(var type in options.listeners){
				$(this).bind(type, listeners[type]);
			}
			
			var self = this;
			var buttons = {
				confirm : {
					text : "确定",
					className : 'btn btn-info btn-sm',
					formId : '',
					url : '',
					params : {},
					success : function(){},
					click : function(){return true;}
				},
				save : {
					text : "保存",
					className : 'btn btn-success btn-sm',
					formId : '',
					url : '',
					params : {},
					success : function(){},
					click : function(){return true;}
				},
				close : {
					text : "关闭",
					className : 'btn btn-default btn-sm',
					click : function(){return true;}
				}
			};
			
			var windowId = "icrm-window";
			if(options.id != undefined && options.id != null) {
				windowId = options.id;
			}
			var html = '<div class="modal fade" id="'+windowId+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<button type="button" class="close" aria-hidden="true">&times;</button>'+
						'<h4 class="modal-title">'+options.title+'</h4>'+
					'</div>'+
					'<div class="modal-body" id="'+windowId+'_body">'+
					'</div>'+
					'<div class="modal-footer">'+
						initButton(options.buttons)
					'</div>'+
				'</div>'+
			'</div>'+
			'</div>';
			
			var $html = $(html);
			if($("#"+windowId).length == 0){
				$html.appendTo($("body"));
			}
			
			var oModel = $("#"+windowId).modal({
				  keyboard: false
			});
			$("#"+windowId).data('bs.modal').data = options.data;
			
			initEvent($html);
			
			$("#"+windowId+"_body").load(options.url, options.data || {}, function(){
				
			}); 
			
			function initButton(btns){
				var tpl = "";
				if(btns.length == 0){
					tpl = '<button type="button" class="btn btn-default btn-sm">关闭</button>';
				} else {
					for(var i=0; i<btns.length; i++){
						if(buttons[btns[i].type] === undefined){
							continue;
						}
						
						$.extend(buttons[btns[i].type], btns[i]);//参数覆盖
						tpl += '<button type="button" class="'+buttons[btns[i].type].className+'">'+buttons[btns[i].type].text+'</button>';
					}
				}
				
				return tpl;
			};
			function initEvent(container){
				$(".close", container).on("click", function(event){
					modal_close(this);
					buttons.close.click.call(this)
				});
				$(".btn-info", container).on("click", function(event){
					var self = this;
					if(!ICRM.isEmpty(buttons.confirm.formId) && !ICRM.isEmpty(buttons.confirm.url)){
						$.icrmAjax({
							url : buttons.confirm.url,
							data : $('#'+buttons.confirm.formId).serialize(),
							success : function(data) {
								buttons.confirm.success.call(data);
								$(self).removeAttr("disabled");
								modal_close(this);
							},
							error : function(){
								$(self).removeAttr("disabled");
							}
						});
					}
					if(buttons.confirm.click.call(this)){
						modal_close(this);
					}
				});
				$(".btn-success", container).on("click", function(event){
					var self = this;
					if(!ICRM.isEmpty(buttons.save.formId) && !ICRM.isEmpty(buttons.save.url)){
						$.icrmAjax({
							url : buttons.save.url,
							data : $('#'+buttons.save.formId).serialize(),
							success : function(data) {
								buttons.save.success.call(data);
								$(self).removeAttr("disabled");
								modal_close(this);
							},
							error : function(){
								$(self).removeAttr("disabled");
							}
						});
					}
					if(buttons.save.click.call(this)){
						modal_close(this);
					}
				});
				$(".btn-default", container).on("click", function(event){
					modal_close(this);
					buttons.close.click.call(this)
				});
				
			};
		}
	};
	
	ICRM.REG = {
		/** 大小写字母与数字的组合,长度在6-10位之间 */
		num_char_6_10 : /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,10}/,
	//	num_char_6_10 : /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,10}$/,   包含字母（不区分大小写）和数字，6-10位
		/** 金额 */
		money : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
	};
	
	ICRM.PWD = {  //  包含字母（不区分大小写）和数字，8-10位
			num_char_8_10 : /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,10}$/  ,
			/** 金额 */
			money : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
		};
})(jQuery);



//重新加载分页iframe
function reloadPageIframe(pager) {
	var beginPageIndex = pager.beginPageIndex;
	var endPageIndex = pager.endPageIndex;
	var totalPageCount = pager.totalPageCount;
	var currentPageNo = pager.currentPageNo;
	var pageSize = pager.pageSize;
	var totalCount = pager.totalCount; 
	window.frames[0].window.location="../../jsp/page.jsp?beginPageIndex="+beginPageIndex+"&endPageIndex="+endPageIndex
			+"&totalPageCount="+totalPageCount + "&currentPageNo="+currentPageNo 
			+"&pageSize="+pageSize+"&totalCount="+totalCount;
};



function page(data) {
	options.currentPage = data.currentPageNo;
	options.totalPages = data.totalPageCount;
	options.numberOfPages = data.pageSize;
	$("#pageInfo").bootstrapPaginator(options);
	$("#pageDetail").remove();
	$("#page").append("<div id='pageDetail'>页次："+ data.currentPageNo + "/" + data.totalPageCount +"页 &nbsp;每页显示："+ data.pageSize + "条 &nbsp; 总记录数：" + data.totalCount + "条&nbsp; 转到：<select id='show-page-select' style='width:50px'></select></div>");
	for(var i=1; i<=data.totalPageCount; i++) {
		$("#show-page-select").append("<option value='"+i+"'>"+i+"</option>");
	};
	$("#show-page-select").bind("change", function(){
		var page = $("#show-page-select").find("option:selected").val();
		pageChange(page);
	});
};

function pageChange(page) {
	$("#queryForm").append("<input type='hidden' name='pageNo' value='"+page+"'>");
    query();
    $("#queryForm input[name=pageNo]").remove();
    $("#show-page-select option[value="+page+"]").attr("selected","selected"); 
}


//获取请求类型
function getRequestParamValue(strName) {
	var strHref = window.document.location.href; 
	var intPos = strHref.indexOf("?"); 
	var strRight = strHref.substr(intPos + 1); 
	var arrTmp = strRight.split("&"); 
	//console.info(arrTmp);
	for(var i = 0; i < arrTmp.length; i++) { 
		var arrTemp = arrTmp[i].split("="); 
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1]; 
	} 
	return "";
}

//初始化下拉数据
function initSelect(data,url) {
	if(url==null||url==""){
		url = Global.ctx + "/html/iplatform/Code/initSelect.do";
	}
	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : "json",
		url : url,
		data : JSON.stringify(data),
		success : function(data) {
			//console.info(data);	
				$.each(data,function(index,item){
					//console.info(item.selectIds);
					//console.info(item.data);
					var selectIdArr = item.selectIds.split(",");
					for(var i=0; i< selectIdArr.length; i++) {
						$("#"+selectIdArr[i]).select2({
							data : item.data
						});
					}
			});
		}
	});
}

//转化代码集code为name
function transfCodeNo(data,url) {
	if(url==null||url==""){
		url = Global.ctx + "/html/iplatform/Code/initSelect.do";
	}
	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : "json",
		url : url,
		data : JSON.stringify(data),
		success : function(data) {
			//console.info(data);	
				$.each(data,function(index,item){
					//console.info(item.selectIds);
					console.info(JSON.stringify(item.data));
					var selectIdArr = item.selectIds.split(",");
					for(var i=0; i< selectIdArr.length; i++) {
						for(var j=0;j<item.data.length;j++){
							var id = item.data[j].id;
							var text = item.data[j].text;
							if($("#"+selectIdArr[i]).text()==id){
								$("#"+selectIdArr[i]).text(text);
								break;
							}
						}
					}
			});
		}
	});
}



//datatable中文
var oLanguage = {
	    "sProcessing":   "处理中...",
	    "sLengthMenu":   "显示 _MENU_ 项结果",
	    "sZeroRecords":  "没有匹配结果",
	    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
	    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
	    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
	    "sInfoPostFix":  "",
	    "sSearch":       "搜索:",
	    "sUrl":          "",
	    "sEmptyTable":     "表中数据为空",
	    "sLoadingRecords": "载入中...",
	    "sInfoThousands":  ",",
	    "oPaginate": {
	        "sFirst":    "首页",
	        "sPrevious": "上页",
	        "sNext":     "下页",
	        "sLast":     "末页"
	    },
	    "oAria": {
	        "sSortAscending":  ": 以升序排列此列",
	        "sSortDescending": ": 以降序排列此列"
	    }
	};
//日期范围选择 中文
var options_daterange =  {
	locale: {
		applyLabel: '确认',
		cancelLabel: '取消',
		fromLabel: '从',
		toLabel: '到',
		customRangeLabel: 'Custom',
		daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		firstDay: 1
	},
	format: 'YYYY/MM/DD'
};

//模态窗口
//模态窗口关闭
function modal_close(btn) {
	$(btn).closest(".modal").modal('hide');
}

/**
 * Confirm window
 * 
 * @param {type} message
 * @param {type} callback
 * @returns {undefined}
 */
function showConfirm(title,message, callback) {
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
};

/**
 * Alert window
 * 
 * @param {type} message
 * @param {type} callback
 * @returns the created dialog instance
 */
function showMessge(title,message) {
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

/**
 * 将form格式化成json
 * fengzuhong
 */
(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        var str=this.serialize();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    };  
})(jQuery); 

/**
 * 下载
 * @param sname
 * @param type
 * @param otherParam
 * @author kxue
 */
function commonDownload(sname,type,otherParam){
	var url = Global.ctx +"/servlet/upload?sname="+sname;
	if(type != null && type.length>0){
		url = url + "&type="+type;
	}
    if(otherParam){
        url = url + "&" + otherParam;
    }
    url = encodeURI(url);
	if(!document.getElementById("_download_attribManage")){
		var attribDown = document.createElement('iframe');
		attribDown.width = '0';
		attribDown.height = '0';
		attribDown.name = "_download_attribManage";
		attribDown.id = "_download_attribManage";
		attribDown.src =  url;
		document.body.appendChild(attribDown);	
	}else{
		document.getElementById("_download_attribManage").src = url;
	}
}

/**
 * ajax下载
 * @author kxue
 */
function commonAjaxDownload(data) {
	var url = encodeURI(data.url);
	if(!document.getElementById("_download_attribManage")){
		var attribDown = document.createElement('iframe');
		attribDown.width = '0';
		attribDown.height = '0';
		attribDown.name = "_download_attribManage";
		attribDown.id = "_download_attribManage";
		attribDown.src =  url;
		document.body.appendChild(attribDown);	
	}else{
		document.getElementById("_download_attribManage").src = url;
	}
}

