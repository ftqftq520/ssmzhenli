(function($) {
	
	document.onselectstart = function(){
		return false;
		};
	window.document.oncontextmenu = function() {
		return false;
	};
	document.onkeydown = function(){
		if((event.ctrlKey) && (event.keyCode == 83)){
			event.keyCode=0;
			event.returnValue=false;
			
		}
		
	};
	
	// 把生成命名空间的方法绑定在jQuery上  
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
		org : {
			setData : function(data){
				$("body").data("org", data);
			},
			getData : function(){
				if(!ICRM.cache.org.getCacheData()){
					ICRM.cache.org.load();
				}
				return ICRM.cache.org.getCacheData();
			},
			getCacheData : function(orgArr){
				return $("body").data("org");
			},
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
	
	
	ICRM.formatNum = function(num){
		return Number.fmoney(num);
	};
	
	/**
	 * 加载css
	 * @param src
	 */
	ICRM.loadCss = function(src) {
		document.write('<link href="'+Global.ctx+src+'" rel="stylesheet" type="text/css">');
	};

	/**
	 * 加载js
	 * @param src
	 */
	ICRM.loadJs = function(src) {
		document.write('<script src="'+Global.ctx+src+'"></script>');
	};
	
	
	/**
	 * 判断是否为空
	 */
	ICRM.isEmpty = function(str, isNullStr){
		if(str == undefined || $.trim(str) == "" || str == null){
			return true;
		}
		
		if(isNullStr === true){
			if(str == "null"){
				return true;
			}
		}
		
		return false;
	};

	/**
	 * 判断权限
	 */
	ICRM.isFunAuth = function(funCode,callback){
		var isFunAuth = false;
		$.icrmAjax({
			type : "post",
			async: false,
			url : Global.ctx + "/html/huap/system/funAuth/isFunAuth.do",
			data : {"funCode":funCode},
			success : function(data) {
				isFunAuth = data.isFunAuth;
				if(typeof(callback) == 'function'){
					callback(data.isFunAuth);
				}
			}
		});
		return isFunAuth;
	}
	/**
	 * 判断是否是ipad
	 */
	ICRM.isIpad = function(){
		var sUserAgent = navigator.userAgent.toLowerCase();
		return sUserAgent.match(/ipad/i) == "ipad";
	}
	/**
	 * 内容截取函数,超长拼接"..."
	 */
	ICRM.subString = function(str, len){
		if(str){
			if(str.length > len){
			    return str.substr(0,len)+"...";
			}else{
				return str;
			}
		} else{
			return "";
		}
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
		"initSelect" : function(optData,url,local,async,callback) {
			var selectData = new Object();
			if(url==null||url==""){
				url = Global.ctx + "/html/iplatform/Code/initSelect.do";
			}
			/*
			 * 后台取
			 */
			if(local==false || local==null || local==undefined){
				if(async == undefined || async == null) {
					async = true;
				}
				var selectId = "";
				var typeCode = "";
				var exclude = "";
				for(var i=0;i<optData.length;i++){
					if((optData[i].selectIds || null) == null){
						selectId += "selectIdsIsNull" + "|";
					}else{
						selectId += optData[i].selectIds + "|";
						if(optData[i].exclude != null && optData[i].exclude != ""){
							exclude += optData[i].exclude + ",";
						}
					}
					typeCode += optData[i].typeCode + "|";
				}
				$.icrmAjax({
					type : "post",
					dataType : "json",
					url : url,
					async:async,
					//data : JSON.stringify(optData),
					data : {"ids" : selectId + "@_@" + typeCode, "exclude" : exclude},
					success : function(data) {
							$.each(data,function(index,item){
								//设置下拉框数据
								if(item.selectIds!=null&&item.selectIds!=""){
									var selectIdArr = item.selectIds.split(",");
									for(var i =0;i<selectIdArr.length;i++){
										$("#"+selectIdArr[i]).select2({
											data : item.data,
											placeholder:'请选择',
										    allowClear:true,
											minimumResultsForSearch: -1,
											multiple:optData[index].multiple
										});
									}
								}
								selectData[item.typeCode] = item.data;
						});
						if(callback && typeof callback =='function'){
							callback(selectData);
						}
					}
				});
				
			}else{
				/*
				 * 本地取
				 */
				$.each(optData,function(index,item){
					//设置下拉框数据
					if(item.selectIds!=null&&item.selectIds!=""){
						var selectIdArr = item.selectIds.split(",");
						for(var i =0;i<selectIdArr.length;i++){
							$("#"+selectIdArr[i]).select2({
								data : AllCodeItemsData[item.typeCode],
								minimumResultsForSearch: -1,
								placeholder:'请选择',
							    allowClear:true,
								multiple:optData[index].multiple
							});
						}
					}
					selectData[item.typeCode] = AllCodeItemsData[item.typeCode];
				});
				if(callback && typeof callback =='function'){
					callback(selectData);
				}
			}
			return selectData;
		},
		"init":function(selectIds){
			var selectIdArr = selectIds.split(",");
			for(var i =0;i<selectIdArr.length;i++){
				var selectObj=$("#"+selectIdArr[i]);
				var data=[];
				var defualtVal="";
				selectObj.find("option").each(function(){   
					var text=$(this).text();
					var val=$(this).val();
					var itemData={id:val,text:text};
					data.push(itemData);
					if($(this).attr("selected") == "selected"){
						defualtVal=defualtVal+val+",";
					}
				});
				if(defualtVal.endWith(",")){
					defualtVal=defualtVal.substring(0,defualtVal.length-1);
				}
				var selectName=selectObj.attr("name");
				var multiple=selectObj.attr("multiple")=="multiple"?true:false;
				var selectParentObj=selectObj.parent();
				$("#"+selectIdArr[i]).remove();
				selectParentObj.append("<input type='hidden' value='"+defualtVal+"' id='"+selectIdArr[i]+"' class='form-control input-sm select2' name='"+selectName+"'>");
				$("#"+selectIdArr[i]).select2({
					data : data,
					placeholder:'请选择',
				    allowClear:true,
				    multiple:multiple
				});
			}
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
		"oLanguage" : {
		    "sProcessing":   "加载中...",
		    "sLengthMenu":   "每页_MENU_条",
		    "sZeroRecords":  "无查询结果",
		    "sInfo":         "共 _TOTAL_ 条",//共_PAGES_页 //共 _TOTAL_ 条//"显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		    "sInfoEmpty":    "共 0 条",// "显示第 0 至 0 项结果，共 0 项",
		    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
		    "sInfoPostFix":  "",
		    "sSearch":       "搜索:",
		    "sUrl":          "",
		    "sEmptyTable":     "无相关业务数据",
		    "sLoadingRecords": "加载中...",
		    "sInfoThousands":  ",",
		    "oPaginate": {
		        "sFirst":    "首页",
		        "sPrevious": "<",
		        "sNext":     ">",
		        "sLast":     "末页"
		    },
		    "oAria": {
		        "sSortAscending":  ": 以升序排列此列",
		        "sSortDescending": ": 以降序排列此列"
		    }
		},
		"sDomFull":"<'row'<'col-lg-10 col-md-10 col-sm-10 col-xs-8'<'toolbar'>><'col-lg-2 col-md-2 col-sm-2 col-xs-4'>>"
		+"rt"
		+"<'row'<'col-lg-4 col-md-4 col-sm-4 col-xs-12'l i><'col-lg-8 col-md-8 col-sm-8 col-xs-12'p>>"
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
	ICRM.Modal = {
		/**
		 * 关闭：只关闭当前模态窗口
		 */
		"close" : function(btn) {
			$(btn).closest(".modal").modal('hide');
		}
	};
	
	//对话框
	ICRM.Dialog = {
		"info" : function(msg, callback, arguments){
			BootstrapDialog.show({
                type: BootstrapDialog.TYPE_INFO,
                title: '提示',
                message: msg,
                buttons: [{
                    label: '确定',
                    cssClass: 'btn-success',
                    action: function(dialogRef){
                    	if(typeof callback === 'function'){
                    		callback.call(this, arguments);
                    	} 
	                    dialogRef.close();
                    }
                }]
            }); 
		},
		"success" : function(msg, callback, arguments){
			BootstrapDialog.show({
                type: BootstrapDialog.TYPE_SUCCESS,
                title: '提示',
                message: msg || "操作成功！",
                buttons: [{
                    label: '确定',
                    cssClass: 'btn-success',
                    action: function(dialogRef){
                    	if(typeof callback === 'function'){
                    		callback.call(this, arguments);
                    	} 
	                    dialogRef.close();
                    }
                }]
            }); 
		},
		"warn" : function(msg, callback, arguments){
			BootstrapDialog.show({
				type : BootstrapDialog.TYPE_WARNING,
                title: '提示',
                message: msg,
                buttons: [{
                    label: '确定',
                    cssClass : 'btn-warning',
                    action: function(dialogRef){
                    	if(typeof callback === 'function'){
                    		callback.call(this, arguments);
                    	} 
	                    dialogRef.close();
                    }
                }]
            }); 
		},
		"error" : function(xhr){
			BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
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
		 * Confirm window
		 * 
		 * @param {type} message
		 * @param {type} callback
		 * @returns {undefined}
		 */
		"showConfirm" : function (title,message,callback1,param1,callback2,param2) {
		    new BootstrapDialog({
		        title: (typeof title == 'undefined' || title == null) ? '提示' : title,
		        message: message,
		        closable: false,
		        buttons: [{
		            label: '确定',
		            cssClass: 'btn-primary',
		            action: function(dialog) {
		                if(typeof callback1 === 'function'){
                    		callback1.call(this, param1);
                    	} 
		                dialog.close();
		            }
		        },{
		                label: '取消',
		                action: function(dialog) {
		                	if(typeof callback2 === 'function'){
	                    		callback2.call(this, param2);
	                    	}
		                    dialog.close();
		                }
		            }]
		    }).open();
		},
		"showWarnConfirm" : function (title,message,callback1,param1,callback2,param2) {
		    new BootstrapDialog({
		    	type : BootstrapDialog.TYPE_WARNING,
		        title: (typeof title == 'undefined' || title == null) ? '提示' : title,
		        message: message,
		        closable: false,
		        buttons: [{
		            label: '确定',
		            cssClass: 'btn-primary',
		            action: function(dialog) {
		                if(typeof callback1 === 'function'){
                    		callback1.call(this, param1);
                    	} 
		                dialog.close();
		            }
		        },{
		                label: '取消',
		                action: function(dialog) {
		                	if(typeof callback2 === 'function'){
	                    		callback2.call(this, param2);
	                    	}
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
		"showMessge" : function (title,message) {
		    return new BootstrapDialog({
		    	type: BootstrapDialog.TYPE_SUCCESS,//使用成功提示的颜色
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
			});
			 
			
			return {id : ids, name : name, data : arr};
		},
		confirm : function(btn){
			modal_close(btn);
			var id = $(btn).closest(".modal").attr("id");
			var oModal = $("#"+id).data('bs.modal');
			var json = ICRM.file.getValue($("#"+id));
			if(oModal){
				oModal.data.callback.call(btn, json);
			}
		}
	};
	ICRM.webflow = {
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
			
			var executorNo = "",executorName="";
			for(var i=0; i<chkNodeArr.length; i++){
				if(executorNo != ""){
					executorNo += ",";
					executorName += ",";
				}
				executorNo += chkNodeArr[i].codeKey;
				executorName += chkNodeArr[i].codeName;
			}
			
			
			if(ICRM.isEmpty(executorNo)){
				ICRM.Dialog.showMessge("提示", "请先选择审批人员");
				return;
			}
			
			modal_close(btn);
			
			var json = {
				nodeKey : nodeKey,
				executorNo : executorNo,
				executorName : executorName,
				taskKey : oModal.options.extOpt.data.taskKey || ""
			};
			oModal.options.extOpt.callback.call(this, json, btn);
		},
		cancel : function(btn){
			var id = $(btn).closest(".modal").attr("id");
			var oModal = $("#"+id).data('bs.modal');
			
			modal_close(btn);
			
			var json = {
				nodeKey : "",
				executorNo : "",
				executorName : "",
				taskKey : ""
			};
			oModal.options.extOpt.callback.call(this, json, btn);
		},
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
	             var hideBtnIds=json.hideBtnIds;
	             $(hideBtnIds).hide();
	          }
	        });
		  }
		},
		submitApply : function(taskKey,memoSelector,btnsSelector){ //taskKey任务key  memoSelector:审批意见（#memo）    btns：需要隐藏的按钮（#submitBackBtn,#agreeApplyBtn,#rejectBackBtn,#cancelBtn）
			var templateKey=$("#auditForm").find("input[name=templateKey]").val();
			ICRM.UI.webflow({
				data : {
					templateKey : templateKey,// 模版号
					taskKey : taskKey, // 任务号,发起流程时为空
					removeNode : '', // 排除节点号,发起流程时为空
					reload : true
				},
				callback : function(json) {
					 var data={
						taskKey : json.taskKey,
						nodeKey : json.nodeKey,
						executorNo : json.executorNo,
						memo : $(memoSelector).val(),
						hideBtnIds:btnsSelector
					 };
					 ICRM.webflow.submit2NextNode(data);
				 }
			});
		}
	};
	ICRM.UI = {
		
		loadFile : function(options){
			ICRM.UI._clearItems(options);
			
			var self = this;
			$.icrmAjax({
				type : "post",
				dataType : "json",
				url : Global.ctx + "/file/item.do",
				data : {
					busiKey : options.busiKey,
					busiFileType : options.busiFileType
				},
				success : function(arr) {
					if(options.binding == 'image'){
						if(arr.length > 0){
							ICRM.UI._addImg(options, arr[0], true);
						} else {
							ICRM.UI._clearItems(options);
						}
					} else if (options.binding == 'input') {
						ICRM.UI._addFileItem(options, {data : arr}, true);
					}
				}
			});
		},
		_addItems : function(options, json, append){
			if(options.binding == 'input'){
				ICRM.UI._addFileItem(options, json, true);
			} else if (options.binding == 'image'){
				ICRM.UI._addImg(options, json, true);
			}
		},
		_clearItems : function(options){
			if(options.binding == 'input'){
				
			} else if (options.binding == 'image'){
				var imgEl = $(".js-upload-link", options.selector);
				imgEl.attr('src', "");
				imgEl.attr('data', "");
			}
		},
			
			/*
			 * 反显图片 
			 */
		_addImg : function(options, json, append){
			var imgEl = $(".js-upload-link", options.selector);
			imgEl.attr('src', Global.ctx + "/file/picture/"+json.id+"/g.do");
			imgEl.attr('data', json.id);
		},
			
			/*
			 *	添加文件明细 
			 */
		_addFileItem : function(options, json, append){
			//获取添加之前已经有的对象数
			var hasOjb=$("#"+options.id).val();
			if(!ICRM.isEmpty(hasOjb)){
				var objNum=hasOjb.split(",").length+json.data.length;
				if(objNum>options.maxFiles){
					$.icrmDialog.showMessge('提示',"您不能上传更多的文件，最多只能上传"+options.maxFiles+"个文件！");
					return;
				}
			}
			var tagsEl = $("#"+options.id).closest(".js-att-container").find(".js-att-list");
			//先清空
			//$(".js-att-item", tagsEl).remove();
			for(var i=0; i<json.data.length; i++){
				//var tpl = '<span class="tag" data="'+json.data[i].id+'"><a href="javascript:void(0);">'+json.data[i].name+'</a><button class="close" type="button">×</button></span>';
				var href = Global.ctx + "/file/get/"+json.data[i].id+"/g.do";
				var tpl = '<div class="pt-5 js-att-item" data="'+json.data[i].id+'"><span class="glyphicon glyphicon-paperclip blue pl-8"></span><a href="'+href+'" target="_blank"><b class="pl-5 c-b">'+json.data[i].name+'</b></a><span class="grey pl-5">('+json.data[i].size+')</span>';
				if(options.readOnly === false){
					tpl += '<a id="'+json.data[i].id+'" onclick=fileDel(event,this,"'+json.data[i].id+'","'+options.id+'","'+options.name+'")  class="pl-5 pointer">删除</a></div>';
				}
				tpl += '</div>';
				tagsEl.append(tpl);
				
				var oldId = $("#"+options.id).val();
				var oldName = $("#"+options.name).val();
				if(append){
					if(!ICRM.isEmpty(oldId)){
						$("#"+options.id).val(oldId + "," + json.data[i].id);
						$("#"+options.name).val(oldName + "," + json.data[i].name);
					} else {
						$("#"+options.id).val(json.data[i].id);
						$("#"+options.name).val(json.data[i].name);
					}
				} else {
					$("#"+options.id).val(json.data[i].id);
					$("#"+options.name).val(json.data[i].name);
				}
			}
		},
	
		
		/**
		 * 文件上传输入框
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
			};
			var listeners = jQuery.extend(defEvent, options.listeners || {});
			for(var type in listeners){
				$(this).bind(type, listeners[type]);
			}
			
			var self = this;
			
			options = jQuery.extend({
				id : "fileIds_" + options.selector.substr(1),
				name : "fileNames_" + options.selector.substr(1),
				binding : "input",
				readOnly : false,
				type : "file",
				fileType : "1",
				maxFiles : 5,
				showList : true,
				callback : function(json){
					ICRM.UI._addItems(options, json, true);
					$(self).triggerHandler("afterSelect", [json]);
				}
					
			}, options);
			
			getValue = function(tagsEl){
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
			};
			if(options.binding == "input"){
				var tpl = '<div class="js-att-container">';
				
				if(options.inputSelector == undefined){
					tpl += '<input type="hidden" id="'+options.id+'" name="'+options.id+'">';
					tpl += '<input type="hidden" id="'+options.name+'" name="'+options.name+'">';
				}
				tpl += '<div id="div_upload_link" class="div_upload_link"><span class="glyphicon glyphicon-paperclip blue"></span><a class="js-upload-link pointer">附件上传</a></div>'+
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
					//$("#div_upload_link").hide();
					$(options.selector).find(".div_upload_link").hide();
				}
			}
			
			//绑定事件
			if(options.readOnly === false){
				var url = Global.ctx + "/html/common/fileUpload.html";
				if(options.type == "image"){
					url = Global.ctx + "/html/common/imgUpload.html";
				}
				
				var windowId = "fileupload-window";
				//添加点击事件
				$(".js-upload-link", options.selector).bind("click", function() {
					var oModel = $("#"+windowId).modal({
						  extOpt : options,
						  keyboard: false,
						  remote : url+"?menuClickTime="+new Date().getTime()
					});
					oModel.data('bs.modal').data=options;
				});
				//设置图片为手型
				$(".js-upload-link", options.selector).css({'cursor':'pointer'});
				
				//添加弹出窗口
				if($("#"+windowId).length == 0){
					var tpl2 = '<div class="modal fade" id="'+windowId+'" tabindex="-2" role="dialog"'+
								'aria-labelledby="myModalLabel" aria-hidden="true" selectType="selectAll">'+
							'</div>';
					$("body").append(tpl2);
					
					$('#'+windowId).on('hidden.bs.modal', function (e) {
						//关闭后清空
						Dropzone.forElement(".dropzone").removeAllFiles(true);
					});
				}
			}
			if(options.readOnly === true){
				//解除点击事件
				$(".js-upload-link", options.selector).unbind("click");
				//设置图片为手型
				$(".js-upload-link", options.selector).css({'cursor':''});
			}
			
			if(options.busiKey){
				//获取已有附件
				ICRM.UI.loadFile(options);
			}
			
			return this;
		},
	
		/**
		 * 任务处理人分派
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
					});
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
		 * 任务审批意见
		 */
		taskMemo : function(options){
			var tpl = '<div class="widget-box ">'+
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
		    			"mData" : "busiFlowType",
		    			"sClass" : "center"
		    		}, {
		    			"sTitle": "处理人",
		    			"mData" : "executor",
		    			"sClass" : "center"
		    		} , {
		    			"sTitle": "节点名称",
		    			"mData" : "nodeName",
		    			"sClass" : "center"
		    		}, {
		    			"sTitle": "任务状态",
		    			"mData" : "taskStat",
		    			"mRender" : function(data, type, full) {
		    				return ICRM.webflow.status2Text(data);
		    			},
		    			"sClass" : "center"
		    		}, {
		    			"sTitle": "意见",
		    			"mData" : "memo",
		    			"sClass" : "center",
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
		    			"mData" : "startTm",
		    			"mRender" : function(data, type, full) {
		    				return new Date(full.startTm).format("yyyy-MM-dd");
		    			},
		    			"sClass" : "center"
		    		}, {
		    			"sTitle": "结束时间",
		    			"mData" : "entTm",
		    			"mRender" : function(data, type, full) {
		    				return new Date(full.entTm).format("yyyy-MM-dd");
		    			},
		    			"sClass" : "center"
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
		 * 任务审批
		 */
		taskApprove : function(options){
			var taskKey=options.taskKey;
			var tpl = '<div class="widget-box">'+
					      '<div class="widget-header">'+
					        '<h6 class="lighter">审批信息</h6>'+
					      '</div>'+
					      '<div class="widget-body">'+
					        '<div class="widget-main">'+
				        		'<form id="auditForm">'+
				        				'<input name="templateKey" type="hidden"/>'+
							            '<fieldset>'+
									         '<div class="form-group">'+
										         '<div class="col-md-12">'+
											          '<label for="remark" class="col-md-3 control-label input-sm" style="text-align:right;">意见<span class="required-color">*</span></label>'+
											          '<div class="col-md-8">'+
											            '<textarea id="memo" name="memo" maxlength="512" id="form-field-9" class="form-control limited" style="resize:none;"></textarea>'+
											          '</div>'+
										         '</div>'+
									         '</div>'+
								       '</fieldset>'+
								       '<div class="center" style="margin-top:10px">'+
									         '<button style="display:none;margin-right:10px" type="button" class="btn btn-info btn-sm" id="submitBackBtn" onclick="ICRM.webflow.submitApply(\''+taskKey+'\',\'#memo\',\'#submitBackBtn,#agreeApplyBtn,#rejectBackBtn,#cancelBtn\')">'+
									           '<i class="glyphicon glyphicon-thumbs-up bigger-110"></i> 提交'+
									         '</button>'+
									         '<button style="display:none;margin-right:10px" type="button" class="btn btn-info btn-sm" id="agreeApplyBtn" onclick="approveApply(\'2\')">'+
									           '<i class="glyphicon glyphicon-thumbs-up bigger-110"></i>同意'+
									         '</button>'+
									         '<button style="display:none;margin-right:10px" type="button" class="btn btn-info btn-sm" id="rejectBackBtn" onclick="approveApply(\'4\')">'+
									           '<i class="glyphicon glyphicon-thumbs-down bigger-110"></i>驳回'+
									         '</button>'+
									         '<button style="display:none;margin-right:10px" type="button"  class="btn btn-info btn-sm" id="cancelBtn" onclick="approveApply(\'3\')">'+
									           '<i class="glyphicon glyphicon-thumbs-down bigger-110"></i> 取消'+
									         '</button>'+	
									         '<button type="button" id="btn_back2list" class="btn btn-info btn-sm" onclick="javascript:history.go(-1);return false;">'+
									              '<i class="icon-refresh bigger-110"></i>返回'+
									         '</button>'+
								       '</div>'+
							     '</form>'+
							'</div>'+
						   '</div>'+
						'</div>';
			$(options.selector).append(tpl);
			$.icrmAjax({
				url: Global.ctx + "/html/webflow/getTaskInfo.do",
				data : {
					taskKey : options.taskKey
				},
				success : function(data) {
					var templateKey=data.templateKey;
					$("#auditForm").find("input[name=templateKey]").val(templateKey);
					var nodeIndex=data.nodeIndex;
					var lastNodeIndex=data.lastNodeIndex;
					var firstNodeIndex=data.firstNodeIndex;
					var status = data.taskStat;
					if(status == "1"){ //待处理
						if(nodeIndex == lastNodeIndex){
							$("#rejectBackBtn").show();
							$("#agreeApplyBtn").show();
							$("#submitBackBtn").hide();
							$("#cancelBtn").hide();
						}else if(nodeIndex == firstNodeIndex){
							$("#rejectBackBtn").hide();
							$("#agreeApplyBtn").hide();
							$("#submitBackBtn").show();
							$("#cancelBtn").show();
						}else{
							$("#rejectBackBtn").show();
							$("#agreeApplyBtn").hide();
							$("#submitBackBtn").show();
							$("#cancelBtn").hide();
						}
					}else if(status == "2" || status == "3" || status == "4"){ //已处理、取消、驳回
						$("#submitBackBtn,#agreeApplyBtn,#rejectBackBtn,#cancelBtn").hide();
					}
				}
			});
		},
		window : function(options){
			if(!jQuery.isPlainObject(options)){
				options = {
					url : options
				};
			}
			
			options = jQuery.extend({
				url : "",
				title : "",
				showTitle:true,
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
						initButton(options.buttons) +
					'</div>'+
				'</div>'+
			'</div>'+
			'</div>';
			var loadHtmlDivId = "#"+windowId + "_body";
			if(options.showTitle == false){//默认为true，为false时，表示加载的页面中已经包含title
				html = '<div class="modal fade" id="'+windowId+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>';
				loadHtmlDivId = "#"+windowId;
			}
			var $html = $(html);
			if($("#"+windowId).length == 0){
				$html.appendTo($("body"));
			}
			var oModel = $("#"+windowId).modal({
				  keyboard: false
			});
			
			$("#"+windowId).data('bs.modal').data = options.data;
			
			initEvent($html);
			
			
			$(loadHtmlDivId).load(options.url,{}, function(){
				
			}); 
			function initButton(btns){
				var tpl = "";
				if(btns.length == 0){
					tpl = '<button type="button" class="btn btn-default btn-sm">关闭</button>';
				} else {
					for(var i=0; i<btns.length; i++){
						if(buttons[btns[i].type] === undefined){
							//continue;
							buttons[btns[i].type]=btns[i];
							tpl += '<button type="button" btnType='+btns[i].type+' class="'+btns[i].className+'">'+btns[i].text+'</button>';
						}else{
							$.extend(buttons[btns[i].type], btns[i]);//参数覆盖
							tpl += '<button type="button" class="'+buttons[btns[i].type].className+'">'+buttons[btns[i].type].text+'</button>';
						}
					}
				}
				
				return tpl;
			};
			function initEvent(container){
				$("button", container).not('.btn-info, .close, .btn-success,.btn-default').on("click", function(event){
					buttons[$(this).attr("btnType")].click(this);
				});
				$(".close", container).on("click", function(event){
					modal_close(this);
					buttons.close.click(this);
				});
				$(".btn-info", container).on("click", function(event){
					var self = this;
					if(!ICRM.isEmpty(buttons.confirm.formId) && !ICRM.isEmpty(buttons.confirm.url)){
						$.icrmAjax({
							url : buttons.confirm.url,
							data : $('#'+buttons.confirm.formId).serialize(),
							success : function(data) {
								buttons.confirm.success(data);
								$(self).removeAttr("disabled");
								modal_close(this);
							},
							error : function(){
								$(self).removeAttr("disabled");
							}
						});
					}
					if(buttons.confirm.click($("#"+windowId).data('bs.modal').data)){
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
								buttons.save.success(data);
								$(self).removeAttr("disabled");
								modal_close(this);
							},
							error : function(){
								$(self).removeAttr("disabled");
							}
						});
					}
					if(buttons.save.click(this)){
						modal_close(this);
					}
				});
				$(".btn-default", container).on("click", function(event){
					modal_close(this);
					buttons.close.click(this);
				});
				
			};
		},
		/**
		 * 显示正在处理遮罩层
		 */
		showProcessingMask : function(){
			if($("#processing").length == 0){
				var str = "<div id='processing' style='display: block; position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; z-index:99998;background-color: black;  -moz-opacity: 0.15; opacity:.15; filter: alpha(opacity=15);'></div>";
				str = str + "<div id='processingimg'  style='display: block; left: 45%; overflow: auto; position: absolute; top: "
				+ parseInt($(document).scrollTop() + 250)
				+ "px; z-index: 99999; font-size:14px; color:#FF0000;'>";
				str = str + "<img src='"+ Global.ctx +"/img/loadingData.gif'alt='加载中...' height='25' width='25'/></div>";
				$("body").append(str);
				$(window).scroll(function(){
					$("#processingimg").css("top",$(document).scrollTop() + 250);
				});
			}
		},
		/**
		 * 移除正在处理遮罩层
		 */
		hidenProcessingMask : function(){
			$("body #processing").remove();
			$("body #processingimg").remove();
		},
		
		/**
		 * 自定义复选框
		 * @param options
		 */
		checkbox : function(options){
			for(var n = 0; n < options.length; n ++){
				var checkboxsIds = options[n].checkboxIds;
				var typeCode = options[n].typeCode;
				var checked = options[n].checked;
				if(!checked){
					checked = "";
				}
				var readonly = options[n].readonly;
				var ifSel =  options[n].ifSel;
				if(checkboxsIds == null || checkboxsIds == ""){
					return;
				}
				var checkboxsIdArr = checkboxsIds.split(",");
				for(var i = 0; i < checkboxsIdArr.length; i ++){
					if(AllCodeItemsData[typeCode]){
						var html = "";
						var typeCodeArr = AllCodeItemsData[typeCode];
						for(var j = 0; j < typeCodeArr.length; j ++){
							var checked_flag = "";
							if(checked != ""){
								var arr = checked.split(",");
								for(var k = 0; k < arr.length; k ++){
									if(arr[k] == typeCodeArr[j].id){
										checked_flag = "checked";
										break;
									}
								}
							}
							if(ifSel == true){
								if(checked != "" && checked_flag != ""){
									html += '<span>' + typeCodeArr[j].text +'</span>';
									html += "、";
								}
							}else{
								html += '<input onclick="return ICRM.UI.checkboxClick(' + readonly + ')" type="checkbox" name="' + checkboxsIdArr[i] + '" value="' + typeCodeArr[j].id + '" ' + checked_flag + ' style="vertical-align: middle;"> <span style="vertical-align: middle;">' + typeCodeArr[j].text +'</span>';
								html += " ";
							}
						}
						if(ifSel == true){
							if(html != ""){
								if(html.lastIndexOf("、") != -1){
									html = html.substr(0, html.length - 1);
								}
							}else{
								html = " ";
							}
						}
						$("#" + checkboxsIdArr[i]).html(html);
					}
				}
			}
		},
		
		checkboxClick : function(val){
			if(val == true){
				return false;
			}
			return true;
		}
	};

	ICRM.REG = {
		/** 大小写字母与数字的组合,长度在6-10位之间 */
		num_char_6_10 : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/,
	//	num_char_6_10 : /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,10}$/,   包含字母（不区分大小写）和数字，6-10位
		/** 金额 */
		money : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
	};
	ICRM.PWD = {  //  包含字母（不区分大小写）和数字，6-10位
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
//中文
var oLanguage = ICRM.Datatable.oLanguage;
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

//模态窗口关闭
function modal_close(btn) {
	$(btn).closest(".modal").modal('hide');
}

//模态窗口关闭并确认数据
function modalConfirm(btn,dg) {
	if(dg != null && dg != undefined){
		if (dg.getSelectedRows() == 0) {
			$.icrmDialog.showMessge('提示', '你还没有选择任何记录！');
			return;
		}
	}
	var f_attr=$(btn).closest(".modal").closest(".modal").attr("callback");
	if(f_attr !=undefined){
		var callback = eval(f_attr);
		if ($.isFunction(callback)) {
			callback.call(dg);
		}
	}
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
    	type: BootstrapDialog.TYPE_SUCCESS,//使用成功提示的颜色
    	title: (typeof title == 'undefined' || title == null) ? '提示信息' : title,
        message: message,
        closable: false,
        buttons: [{
                label: '确认',
                hotkey: 13, // Enter.
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
	var url = Global.ctx +"/servlet/upload?sname="+escape(encodeURIComponent(sname));
	if(type != null && type.length>0){
		url = url + "&type="+type;
	}
    if(otherParam){
        url = url + "&otherParam=" + otherParam;
    }
    //url = encodeURI(url);
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
String.prototype.startWith=function(str){    
	  var reg=new RegExp("^"+str);    
	  return reg.test(this);       
	};
String.prototype.endWith=function(str){    
	  var reg=new RegExp(str+"$");
	  return reg.test(this);       
	};
/**
 * 设置左侧快捷菜单高度
 */
function setSiderBarHeight(){
	if($("#sider").attr("id") != undefined){
		$("#sider").css("height","100px");
		var h5 =$("#main-container").css("height");
		$("#sider").css("height",h5);
	}
}
/**
 * 屏蔽右键菜单以及相关事件
 * @param eve
 */
function winCtrl(eve) {
	var curEvent = $.event.fix(eve);
	var eventTarget = curEvent.target;
	var eventType = curEvent.type;
	var eventKeyCode=curEvent.keyCode;
	var eventCtrlKey=curEvent.ctrlKey;
	var eventShiftKey=curEvent.shiftKey;
	var tagName=eventTarget.tagName;
	//得到按键码 event.keyCode
 
	//取消浏览器默认行为 event.preventDefault();
 
	//取消事件冒泡 event.stopPropagation();
 
	// onclick, ondblclick
	// onmousedown, onmouseup, onmouseover, onmousemove, onmouseout
	// onkeypress, onkeydown, onkeyup
	// oncontextmenu	右键菜单
	// ondragstart		开始拖动
	// onselectstart	开始选择CTRAL-A
	if (eventType=='contextmenu'||eventType=='dragstart'||eventType=='selectstart') {
		// 还应处理编辑窗口，应允许在输入域操作
		if (tagName!="INPUT" && tagName!="TEXTAREA") {
			curEvent.preventDefault();
			return;
		}
	}
	if (eventType=='click') {
		if (tagName == "A" && eventShiftKey) {
			curEvent.preventDefault();
			return;
		}
	}
	if (eventType=='keydown') {
		if (eventCtrlKey && (eventKeyCode==69||eventKeyCode==72)) {
			curEvent.preventDefault();   //屏蔽 Ctrl+E/H
			return;
		}
		if (eventCtrlKey && eventKeyCode==78) {
			curEvent.preventDefault();  //屏蔽 Ctrl+n
			return;
		}
		if (eventKeyCode==122){	//屏蔽 F11
			curEvent.keyCode=0;
			curEvent.preventDefault();
			return;
		}
	}
}
/**
 * 检查图片是否存在
 * @param imgUrl
 * @returns {Boolean}
 */
function checkImgExists(imgUrl) {
  var ImgObj = new Image(); //判断图片是否存在  
  ImgObj.src = imgUrl; 
  //没有图片，则返回-1  
  if (ImgObj.width > 0 && ImgObj.height > 0) {  
    return true;  
  } else {  
    return false;
  }  
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * @param num 数值(Number或者String)
 * @returns {String}  金额格式的字符串,如'1,234,567.45'
 */
function fmoney(num) {
	if(num==undefined||num==null||num==""){
		return "0.00";
	}
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num)){
		num = "0";
	}
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10){
		cents = "0" + cents;
	}
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
		num = num.substring(0,num.length-(4*i+3))+','+
		num.substring(num.length-(4*i+3));
	}
	return (((sign)?'':'-') + num + '.' + cents);
	/*return Number.fmoney(num);*/
}
function formatCurrency(num) {
	return fmoney(num);
}

/**
 * 更多列
 * @param datatable  表格对象
 * @param notDisplayCol  不需要显示的列  例如  "col1,col2,col3"
 * @param targetId   生成的页面需要添加到targetId
 * @param group       是否分组显示  "true/false"
 * @returns {Array}   返回默认显示的列 数组
 */
function moreColumn(datatable,notDisplayCol,targetId,group){
	var defaultCol=[];
	var $target = $("#"+targetId);
	//分组显示信息
  	var map={};
  	var defaultGroup=$("<div><div><font color=black style=font-weight:bold;>其他信息</font><hr/></div></div>");
  	var flag=false;
  	var allMap={"all":$("<div></div>")};
	var columns = datatable.columns;
	$.each(columns,function(index,column){
		if(column.mData != null) {
			if(notDisplayCol != null){
				if($.inArray(column.mData, notDisplayCol) != -1){
					return true; //如果不在不显示的列数组中，即要显示
				}
			}
			var $div = $('<div class="col-md-3"></div>');
			var checkedStr = "";
			if(column.bVisible == null || column.bVisible == true) {
				checkedStr = "checked";
				defaultCol.push(column.mData);
			}
			var $input = $('<input type="checkbox" class="ace" name="columns" id="'+column.mData+'" ' + checkedStr +' iCol=' + column.iCol + ' /><span class="lbl">'+column.sTitle+'</span>');
			$input.appendTo($div);
			if(group == "true"){
				if(column.groupName != undefined){
					if(map[column.groupName] == undefined){
						var $group=$("<div><div><font color=black style=font-weight:bold;>"+column.groupName+"</font><hr/></div></div>");
						$div.appendTo($group);
						map[column.groupName] =$group;
					}else{
						$div.appendTo(map[column.groupName]);
					}
				}else{
					flag=true;
					$div.appendTo(defaultGroup);
				}
			}else{
				$div.appendTo(allMap["all"]);
			}
		}
	});
	if(group != "true"){
		map=allMap;
	}
	if(flag){
		map["default"]=defaultGroup;
	}
	for(var prop in map){ 
	    if(map.hasOwnProperty(prop)){
	    	var groupSize=map[prop].find("input:checkbox").size();
	    	var lastItem=map[prop].find("input:checkbox:last");
	    	if(groupSize % 4 == 3){
	    		lastItem.closest("div").attr("class","col-md-6");
	    	}
	    	if(groupSize % 4 == 2){
	    		lastItem.closest("div").attr("class","col-md-9");
	    	}
			if(groupSize % 4 == 1){
				map[prop].find("input:checkbox").last().closest("div").attr("class","col-md-12");
	    	}
			$("<br/><br/>").appendTo(lastItem.next("span"));
	    	map[prop].appendTo($target);
	    } 
	}
	return defaultCol;
}
//上传控件使用
function fileDel(eve,item,fileId,_optId,_optName){
	var e = $.event.fix(eve);
	var tagsEl = $("#"+_optId).closest(".js-att-container").find(".js-att-list");
	
	//删除
	$.ajax({
		type : "post",
		dataType : "json",
		url : Global.ctx + "/file/del.do",
		data : {
			id : fileId
		},
		success : function(data) {
			$(item).closest(".js-att-item").empty().remove();
			var newjson = getFileValue(tagsEl);
			$("#"+_optId).val(newjson.id);
			$("#"+_optName).val(newjson.name);
		},
		error : function(xhr){
			if(xhr.status=="200"){
				$(item).closest(".js-att-item").empty().remove();
				var newjson = getFileValue(tagsEl);
				$("#"+_optId).val(newjson.id);
				$("#"+_optName).val(newjson.name);
			}
		}
	});
	e.stopPropagation();
	return true;
}
//上传控件使用
function getFileValue(container){
	var ids = "";
	var name = "";
	var arr = [];
	$(".js-att-item", container).each(function(i){
		if(ids != ""){
			ids += ",";
			name += ",";
		}
		var data = {
			id : $(this).attr("data"),
			name : $(this).find("a:first").find("b").text(),
			size : $(this).find("span:last").text()
		};
		ids += data.id;
		name += data.name;
		arr.push(data);
	});
	return {id : ids, name : name, data : arr};
}
/**
 * 日期比较
 * beginDate_temp<endDate_temp  return -1;beginDate_temp>endDate_temp  return 1;beginDate_temp=endDate_temp  return0
 */
function compareDate(beginDate_temp, endDate_temp) {
	if (!ICRM.isEmpty(beginDate_temp) && !ICRM.isEmpty(endDate_temp)) {
		var d1 = parseInt(beginDate_temp.replace(/\-/g, "\/"));
		var d2 = parseInt(endDate_temp.replace(/\-/g, "\/"));
		if (d1 > d2) {
			return 1;
		}
		if (d1 == d2) {
			return 0;
		}
		if (d1 < d2) {
			return -1;
		}
	}
}
function getStrNotNull(s){
	if(s == undefined || s == null){
		return "";
	}
	if($.trim(s) == ""  || s == "null"){
		return "";
	}
	return s;
}
/**
 * 字符串转换日期
 * @param str
 * @returns {Date}
 */
function converToDate(str){
	if(ICRM.isEmpty(str,true)){
		return null;
	}
	if(str.indexOf("-")==-1){
		return new Date(str.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1/$2/$3"));
	}else{
		return new Date(str);
	}
}
/**
 * 全部展开或折叠widgetbox
 * @param flag true展开/false折叠
 */
function collapseAll(flag) {
	$widgetBox = $(".widget-box");
	if (flag) {
		$.each($widgetBox, function(index, item) {
			if (!$(item).hasClass("collapsed")) {
				$(item).find(".expandBar").click();
			}
		});
	} else {
		$.each($widgetBox, function(index, item) {
			if ($(item).hasClass("collapsed")) {
				$(item).find(".expandBar").click();
			}
		});
	}
}
/**
 * 获取任意一周的日期
 * @param date
 * @param day
 * @returns {Date}
 */
function getDateByDay(date,day){
	var dateDayOfWeek = date.getDay(); //今天本周的第几天  
	var dateYear = date.getFullYear(); //当前年   
	var dateMonth = date.getMonth(); //月   
	var dateDay = date.getDate(); //日
    var weekDate = new Date(dateYear,dateMonth,dateDay - dateDayOfWeek+day);  
	return weekDate;
}

/**
 * 选择机构  js:  selectOrg("btn_select_org",{"type":"self_and_children","pageFlag":"pote"});
   html:
   <input type="hidden" id="orgId" name="orgId">
	<input type="hidden" id="orgNo" name="orgNo"> 
	<input type="text" class="form-control input-sm"
		id="orgName" name="orgName" readonly="readonly"> 
	<span class="input-group-btn">
		<button type='button' id='btn_select_org' disabled="disabled"
			class='btn btn-xs btn-purple input-sm'>...</button>
	</span>
 */
function selectOrg(btnId,data,callback){
	if(callback !=null){
		data.callback=callback;
	}
	data.btnId=btnId;
	$("#"+btnId).bind("click", function() {
		ICRM.UI.window({
			id : "orgSelector",
			data:data,
			title : '选择机构',
			url : Global.ctx + "/html/common/orgSelector1.html?menuClickTime="+new Date().getTime(),
			buttons :[{
				type: 'confirm',
				click:function(o){
					if ($.isFunction(o.callback)) {
						o.callback();
					}
					var org = getOrg();
					if(org != null){
						var nameFld=$("#"+o.btnId).parent().prev();
						var noFld=$("#"+o.btnId).parent().prev().prev();
						var idFld=$("#"+o.btnId).parent().prev().prev().prev();
						nameFld.val(org.orgCName);
						noFld.val(org.orgNo);
						idFld.val(org.orgId);
					}
					return true;
				}
			},{
				type: 'close'
			}]
		});
	});
}

function openWin(url,custNo){
	features ="top=50,left=50,width=920,height=600,toolbar=no,location=no,directories=0,status=1,menubar=no,scrollbars=yes,resizable=yes";
	//window.showModalDialog(Global.ctx+url,window,"dialogLeft:400;dialogTop:100;scroll:1;status:1;help:0;resizable:1;dialogWidth:1100px;dialogHeight:700px");
	window.open(Global.ctx+url,custNo,"width=auto,height=auto,status=yes,toolbar=yes,menubar=yes,location=no,scrollbars=yes,resizable=yes");
}
function custView(custNo,bizType,type,param){ //01：零售   02：对公   03：小微
	var url="/html/cm/pe/customDraw/customDraw_new.html?type="+type+"&custNo="+custNo+"&menuClickTime="+new Date().getTime();
	if(bizType == "02"){
		url="/html/cm/ep/customDraw/customDraw.html?type="+type+"&custNo="+custNo+"&menuClickTime="+new Date().getTime();
	}else if(bizType == "03"){
		url="/html/cm/pe/customDraw/mcCustomDraw.html?type="+type+"&custNo="+custNo+"&menuClickTime="+new Date().getTime();
	}
	return openWin(url,custNo);
}
function batchResultParse(data){
	var msg="";
	var batchType=data.batchType;
	if(ICRM.isEmpty(batchType,true)){
		batchType="操作";
	}
	var successNum=data.successNum;
	var failureNum=data.failureNum;
	if(failureNum != "0"){
		msg=successNum+"条数据"+batchType+"成功，"+failureNum+"条数据"+batchType+"失败！<br/>";
		var failureResults=data.failureResults;
		for(var i=0;i<failureResults.length;i++){
			var failureTitle=failureResults[i].failureTitle;
			var failureMsg=failureResults[i].failureMsg;
			msg=msg+"【"+failureTitle+"】"+failureMsg+"<br/>";
		}
	}
	if(!ICRM.isEmpty(msg,true)){
		$.icrmDialog.showMessge("提示",msg);
	}else{
		$.icrmDialog.showMessge("提示",batchType+"成功！");
	}
}

/*var AllCodeItemsData = 
{"rskType":[
            {"id":"31001001","text":"保守型"},{"id":"31001002","text":"稳健型"},
            {"id":"31001003","text":"平衡型"},{"id":"31001004","text":"进取型"},
            {"id":"31001005","text":"激进型"},{"id":"31001000","text":"未评定"}
		],
"PECUST_LEVEL":[
            {"id":"20810001","text":"基础客户"},{"id":"20810002","text":"大众客户"},
            {"id":"20810003","text":"成长客户"},{"id":"20810004","text":"初级黄金客户"},
            {"id":"20810005","text":"高级黄金客户"},{"id":"20810006","text":"白金客户"},
            {"id":"20810007","text":"私行客户"}
		],
"custLevelMids_more":[{"id":"1","text":"特批评级长期有效"},{"id":"2","text":"特批评级不占用本机构名额"}]
};*/

var AllCodeItemsData = [];
function getSysCodeInfoByCodes(typeCodes){
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : Global.ctx + "/html/iplatform/Code/initCodeInfo.do",
		data : {"typeCodes" : typeCodes},
		success : function(data) {
			//console.info(data);	
			$.each(data,function(index,item){
				var codes = [];
				for(var j=0;j<item.data.length;j++){
					var id = item.data[j].id;
					var text = item.data[j].text;
					codes.push({
						"id" : id,
						"text" : text
					});
				}
				AllCodeItemsData[item.typeCode] = codes;
			});
		}
	});
}


function getWarnPageId(eventType){
	var pageId = "";
	var muneId = "";
	if(eventType == "20940001"){
		pageId = "pewarnDeptExpire.html";
		menuId="pe.warn.dept_expire";
	}else if(eventType == "20940002"){
		pageId = "pewarnLevelDescend.html";
		muneId = "pe.warn.levelDescend";
	}else if(eventType == "20940003"){
		pageId = "pewarnLevelUp.html";
		muneId = "pe.warn.level_up";
	}else if(eventType == "20940004"){
		pageId = "pewarnOverdueCCCard.html";
		muneId = "pe.warn.Overdue_CCCard";
	}/* else if(eventType == "20940005"){
		pageId = "pewarnDeptExpire.html";
	} */else if(eventType == "20940006"){
		pageId = "pewarnDistriCust.html";
		muneId = "pe.warn.distribute_cust";
	}else if(eventType == "20940007"){
		pageId = "pewarnAdvanceDepo.html";
		muneId = "pe.warn.advance_depo";
	}else if(eventType == "20940008"){
		pageId = "pewarnApprovedCust.html";
		muneId = "pe.warn.approved_cust";
	}else if(eventType == "20940009"){
		pageId = "pewarnCCLargeChange.html";
		muneId = "pe.warn.CCLarge_change";
	}else if(eventType == "20940010"){
		pageId = "pewarnDecreaseCust.html";
		muneId = "pe.warn.decrease_cust";
	}else if(eventType == "20940011"){
		pageId = "pewarnAddCust.html";
		muneId = "pe.warn.add_cust";
	}else if(eventType == "20940012"){
		pageId = "pewarnExpireCont.html";
		muneId = "pe.warn.expire_cont";
	}else if(eventType == "20940013"){
		pageId = "pewarnRepBalLess.html";
		muneId = "pe.warn.rep_bal_less";
	}else if(eventType == "20940014"){
		pageId = "pewarnFinaExpire.html";
		muneId = "pewarnFinaExpire";
	}else if(eventType == "20940015"){
		pageId = "pewarnNationalDebt.html";
		muneId = "pe.warn.national_debt";
	}else if(eventType == "20940016"){
		pageId = "pewarnCCRepayment.html";
		muneId = "pe.warn.CC_repay_ment";
	}else if(eventType == "20940017"){
		pageId = "pewarnTranLargeFunds.html";
		muneId = "pe.warn.tran_large_funds";
	}else if(eventType == "20940018"){
		pageId = "pewarnLoanPrepay.html";
		muneId = "pe.warn.loan_prepay";
	}else if(eventType == "20940019"){
		pageId = "pewarnLoanOverdue.html";
		muneId = "pe.warn.loan_overdue";
	}else if(eventType == "20940020"){
		pageId = "pewarnImportantdates.html";
		muneId = "pe.warn.importantdates";
	}else if(eventType == "20940021"){
		pageId = "pewarnRiskCust.html";
		muneId = "pe.warn.risk_cust";
	}else if(eventType == "20940022"){
		pageId = "pewarnCacctExpire.html";
		muneId = "pe.warn.cacct_expire";
	}else if(eventType == "20940023"){
		pageId = "pewarnCardExpire.html";
		muneId = "pe.warn.card_expire";
	}else if(eventType == "20940024"){
		pageId = "pewarnSSWExpire.html";
		muneId = "pe.warn.SSW_expire";
	}else if(eventType == "20940025"){
		pageId = "pewarnInsuranceExpire.html";
		muneId = "pe.warn.insurance_expire";
	}
	// 下面是对公提醒
	else if(eventType == "21050001"){
		pageId = "epwarnLargechange.html"; //客户账户大额资金变动
		muneId = "epwarn.client_largeChange";
	}else if(eventType == "21050002"){ // 贷款到期提醒 
		pageId = "epwarnExpireCont.html";
		muneId = "epwarn.loan_expireCont";
	}else if(eventType == "21050003"){ //定期存款到期提醒      
		pageId = "epwarnDeptExpire.html";
		muneId = "ep.warn.deptExpire";
	}else if(eventType == "21050004"){ //对公客户分配提醒    
		pageId = "epwarnDistribute.html";
		muneId = "ep.warn.distribute";
	}else if(eventType == "21050008"){ //理财产品到期提醒
		pageId = "epwarnFinaExpire.html";
		muneId = "epwarn.fina_Expire";
	}else if(eventType == "21050011"){ //客户减少
		pageId = "epwarnDecreaseCust.html";
		muneId = "epwarn.clien_decreaseCust";
	}else if(eventType == "21050012"){ //期供到期提醒
		pageId = "epwarnLoanPeriod.html";
		muneId = "epwarn.loan_period";
	}else if(eventType == "21050013"){//  	贷款欠息提醒
		pageId = "epwarnLoanBitintr.html"; 
		muneId = "epwarn.loan_bitintr";
	}else if(eventType == "21050014"){ // 贷款逾期提醒
		pageId = "epwarnLoanOverDue.html";
		muneId = "epwarn.loan_overDue";
	}else if(eventType == "21050015"){ // 银行承兑汇票到期提醒
		pageId = "epwarnCheckExpire.html";
		muneId = "epwarn.check_expire";
	}else if(eventType == "21050016"){ //  	 客户升级提醒  
		pageId = "epwarnLevelUp.html";
		muneId = "ep.warn.level_up";
	}else if(eventType == "21050017"){ // 客户新增
		pageId = "epwarnAddCust.html";
		muneId = "epwarn.client_addCust";
	}else if(eventType == "21050018"){ //  客户降级提醒
		pageId = "epwarnLevelDesc.html";
		muneId = "ep.warn.level_desc";
	}else if(eventType == "21050019"){ //  客户走访提醒
		pageId = "epwarnVisitRemark.html";
		muneId = "epwarn.client_visitRemark";
	}
	return pageId + "," + muneId;
}

function viewTaskStat(taskStat){
	if(!taskStat || taskStat == null || taskStat == ""){
		return "";
	}
	
	if(taskStat == "1"){
		return "待处理";
	}else if(taskStat == "2"){
		return "已审批";
	}else if(taskStat == "3"){
		return "已取消";
	}else if(taskStat == "4"){
		return "已驳回";
	}
}

function getProdPageId(indexTypeId){
	var pageId = "";
	var muneId = "";
	var prodTitle = "";
	var windowId = "";
	 if(indexTypeId == "1010"){ // 贷款 
		pageId = "epLoanProdView.html";
		muneId = "ep_prod_loan";
		prodTitle ="贷款产品查看";
		windowId  = "window_epLoanview";
	}else if(indexTypeId == "001" || indexTypeId == "002" || indexTypeId == "111" || indexTypeId == "112"|| indexTypeId == "121"|| indexTypeId == "122"
		      || indexTypeId == "131"|| indexTypeId == "141"){ // 存款
		pageId = "epDepositProdView.html";  
		muneId = "ep_prod_deposit";
		prodTitle ="存款产品查看";
		windowId  = "window_epDepositview";
	}else if(indexTypeId == "1020"){ // 信用证 
		pageId = "epBilocProdView.html";
		muneId = "ep_prod_biloc";
		prodTitle ="信用证产品查看";
		windowId  = "window_epBilocview";
	}else if(indexTypeId == "1030" ){ // 银行承兑汇票
		pageId = "epRaccProdView.html";  
		muneId = "ep_prod_racc";
		prodTitle ="银行承兑汇票产品查看";
		windowId  = "window_epRaccview";
	}else if(indexTypeId == "1040"){ // 保函 
		pageId = "epLetterProdView.html";
		muneId = "ep_prod_letter";
		prodTitle ="保函 产品查看";
		windowId  = "window_epLetterview";
	}else if(indexTypeId == "3010010" ){ // 授信额度
		pageId = "epLimitProdView.html";  
		muneId = "ep_prod_limit";
		prodTitle ="授信额度产品查看";
		windowId  = "window_epLimitview";
	}else if(indexTypeId == "3010020"){ // 产品额度 
		pageId = "epPdlimitProdView.html";
		muneId = "ep_prod_pdlimit";
		prodTitle ="产品额度产品查看";
		windowId  = "window_epPdlimitview";
	}else  if(indexTypeId == "3010040" ){ // 承诺函
		pageId = "epCnletProdView.html";  
		muneId = "ep_prod_cnlet";
		prodTitle ="承诺函产品查看";
		windowId  = "window_epCnletview";
	}else if(indexTypeId == "3010050"){ // 供应链额度 
		pageId = "epGylProdView.html";
		muneId = "ep_prod_gyl";
		prodTitle ="供应链额度产品查看";
		windowId  = "window_epGylview";
	}else if(indexTypeId == "3010060" ){ // 同业产品额度
		pageId = "epTongyProdView.html";  
		muneId = "ep_prod_tongy";
		prodTitle ="同业产品额度产品查看";
		windowId  = "window_epTongyview";
	}else if(indexTypeId == "311" || indexTypeId == "312" || indexTypeId == "313" ){ // 理财 
		pageId = "epFinProdView.html";
		muneId = "ep_prod_fin";
		prodTitle ="理财产品查看";
		windowId  = "window_epFinview";
	}else  if(indexTypeId == "981"  ){ // 签约 
		pageId = "epSignProdView.html";
		muneId = "ep_prod_sign";
		prodTitle ="签约产品查看";
		windowId  = "window_epSignview";
	}
		
		return pageId + "," + muneId + "," + prodTitle + "," + windowId;
}

function ajaxNowDate() {
	var nowtime = null ;
	$.ajax({
		url : Global.ctx + "/html/cs/common/initDate.do",
		dataType : "json",
		type : "post",
		data : {},
		async : false,
		success : function(data) {
			nowtime = data.nowDate;
		}
	});
	return nowtime;
}
