var yadd,gadd,yavg,gavg;
(function($) {
	ICRM.setOptDate();//更新操作时间
	
	//中文
	var oLanguage = {
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
	        "sPrevious": "&lt;",
	        "sNext":     "&gt;",
	        "sLast":     "末页"
	    },
	    "oAria": {
	        "sSortAscending":  ": 以升序排列此列",
	        "sSortDescending": ": 以降序排列此列"
	    }
	};
	
	/**
	 * 自定义事件
	 */
	var event = {
		/*
		 * 行check事件
		 */
		rowCheckEvent	:"rowSelect"	//复选框点击事件
	};
	
	///智能初始化表格布局
	var initSDom = function(options){
		//分页样式调整
		if(options.pagingType && options.pagingType == 'drawProd'){//个人客户视图优化版产品详细信息专用 
			var sDomDefault = "<'row'<'col-lg-10 col-md-10 col-sm-10 col-xs-8'<'toolbar'>><'col-lg-2 col-md-2 col-sm-2 col-xs-4'>>"
				+"rt"
				+"<'row'<'col-lg-5 col-md-6 col-sm-4 col-xs-12'i><'col-lg-7 col-md-6 col-sm-8 col-xs-12'p>>";
			options.sDom = sDomDefault;
			//修改info信息
			options.oLanguage.sInfo = "当前显示第 _START_条至第 _END_条信息，共 _TOTAL_ 条";
			options.oLanguage.oPaginate.sPrevious = "上一页";
			options.oLanguage.oPaginate.sNext = "下一页";
			options.pagingType='simple';
		} else if(options.pagingType && options.pagingType == 'simple'){//简单分页
			var sDomDefault = "<'row'<'col-lg-10 col-md-10 col-sm-10 col-xs-8'<'toolbar'>><'col-lg-2 col-md-2 col-sm-2 col-xs-4'>>"
				+"rt"
				+"<'row'<'col-lg-5 col-md-6 col-sm-4 col-xs-12'l i><'col-lg-7 col-md-6 col-sm-8 col-xs-12'p>>";
			options.sDom = sDomDefault;
			//修改info信息
			options.oLanguage.sInfo = "共_PAGES_页";
		} else {//默认分页
			var sDomFull = "<'row'<'col-lg-10 col-md-10 col-sm-10 col-xs-8'<'toolbar'>><'col-lg-2 col-md-2 col-sm-2 col-xs-4'>>"
				+"rt"
				+"<'row'<'col-lg-4 col-md-4 col-sm-4 col-xs-12'l i><'col-lg-8 col-md-8 col-sm-8 col-xs-12'p>>";
			options.sDom = sDomFull;
		}
		//分页样式调整 end
	};
	/**
	 * aoColumns:  新增属性  修改人：赵碧波
	 * groupName： 数据类型：字符串；          用途：字段分组名字，在显示列中按组显示字段，如果不写则归到其他组里
	 * dataType：  数据类型：字符串；          用途：按指定的数据类型格式化数据  可选值：numberic/date/percent/longtext
	 * precision： 数据类型：数字类型字符串；  用途：格式化数字需要保留的小数位数， dataType为numberic时有效  默认值：precision="2" 
	 * format：    数据类型：字符串；          用途：按指定的格式格式化日期 ， dataType为date时有效       默认值：format="yyyy-MM-dd" 
	 * displayNum：数据类型：数字类型字符串；   用途：大字段显示字符数， dataType为longtext时有效  默认值：displayNum="30" 
	 */
	
	/**
	 * 参数配置,构造函数
	 * @author pt
	 * @param String 
	 * @returns
	 */
	$.fn.icrmGrid = function(options) {
		//屏蔽 
		options.sScrollX='';
		options.sScrollY='';
		if(!options.maxHeight){
			//options.maxHeight = "540px";//默认
			options.maxHeight = "100%";//默认
		}
		
		//默认参数
		var ajaxFormData = "";
		var formId="";
		var key = '';
		var gridDiv ='';
		var otherParam = [];
		var onDelSuccess;
		var ismodw = '';
		var numberFld=[];
		var footTh="";
		if(typeof(options.isTotal) != "undefined"){
			if(options.isTotal == true){
				$.each(options.aoColumns,function(i,curr){
					//构造表的tfoot以显示合计行
					footTh=footTh+"<th>";
					//构造需要汇总的参数
					if(curr["dataType"]=="numberic" && curr["isTotal"] != false){
						numberFld.push(curr["mData"]);
					}
				});
			}
		}
		//toolbar 解析
		var toolbar=null;
		var toolbarStr = "";
		if(options.toolbar != null && options.toolbar != undefined) {
			for(var i=0;i<options.toolbar.length;i++){
				var item = options.toolbar[i];
				if(item != null && item != undefined){
					var text = "";
					var icon = "";
					var clsClass = "";
					var toolId ="";
					if(item.type == "-"){
						toolbarStr += '<a class="ui-pg-button ui-state-disabled">︱</a>&nbsp;';
					}
					else{
						if(item.type=='add'){
							text = "增加";
							icon = "icon-plus-sign purple bigger-150";
							clsClass = "tooltip-info";
							toolId = "toolIdAdd";
							item.text = item.text || text;
						}
						else if(item.type=='edit'){
							text ="修改";
							icon = "icon-pencil green bigger-150";
							toolId = "toolIdEdit";
							clsClass = "tooltip-info";
							item.text =item.text || text;
						}
						else if(item.type=='view'){
							text ="查看";
							icon = "icon-zoom-in blue bigger-150";
							toolId = "toolIdView";
							clsClass = "tooltip-default";
							item.text =item.text || text;
						}
						else if(item.type=='del'){
							text ="删除";
							icon = "icon-trash red bigger-150";
							clsClass = "tooltip-error";
							toolId = "toolIdDel";
							item.text =item.text || text;
						} 
						else if(item.type=='save') {
							text = "保存";
							icon = "icon-save green bigger-150";
							toolId = "toolIdSave";
							clsClass = "tooltip-success";
							item.text =item.text || text;
						}
						else{
							clsClass = item["class"];
							icon = item.icon;
							toolId = item.toolId;
							text = item.text;
						}
						toolbarStr += '<i class="'+icon+'"></i>&nbsp;<a class="'+clsClass+'" id="'+ toolId +'" data-rel="tooltip" data-placement="right" text="'+item.text+'" href="javascript:void(0);" ><span>'+item.text+'</span></a>&nbsp;';
					}
				}
			}
		}
		toolbar = $(toolbarStr);

		var defaults = {
			"oLanguage" : oLanguage,
			"bFilter" : false,
			"bSort" : false,
			"sScrollX" : false,
			"sScrollY" : false,
			"autoLoad" : true,
			"bProcessing" : true,
			"bServerSide" : true,
			"bLengthChange" : true,
			"bInfo" : true,
			"bAutoWidth" : false,
			"onLoadSuccess":null,
			//"iDeferLoading" :null,
			//"bInitialised" : true,
			//"bPaginate" : true,
			//"sPaginationType" : "custom",
			"footerCallback": function ( tfoot,data,sumData,start, end, display ) {
					if(typeof(options.isTotal) == "undefined"){
						return;
					}
					if(options.isTotal == false){
						return;
					}
				    var api = this.api();
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		            $( api.column(0).footer() ).html(
		            	'合计'
		            );
		            if(formId == "advanced_queryForm"){
		        		var url = Global.ctx + "/html/cm/pe/custinfo/advancedPecustListSum.do";
		        		var sumData;
		        		$.icrmAjax({
		        			dataType : "json",
		        			type : "post",
		        			url : url,
		        			data :$('#'+formId).serializeArray(),
		        			//async:false,
		        			success : function(data) {
                                   sumData = data.sumData;
                                   var columns=api.context[0].aoColumns;
               		            if(sumData != null){
               			            $.each(columns,function(i,oCol){
               							if(oCol["dataType"]=="numberic" && oCol["isTotal"] != false){
               								//所有数据汇总
               		            			var precision="2";
               		        				if(typeof(oCol.precision) != "undefined"){
               		        					if(!ICRM.isEmpty(oCol.precision,true)){
               		        						precision=oCol.precision;
               		        					}
               		        				}
               		        				var singleData=sumData[oCol.mData.toUpperCase()];
               		        				if(!ICRM.isEmpty(singleData,true)){
            		        					singleData=Number.fmoney(singleData,parseInt(precision));
            		        				}
               		            			$( api.column(i).footer() ).html(
               		            				singleData
               					            );
               							}
               						});
               		            }
		        			},
		        			error:function(data){
		        				console.log(data.sumData);
		        			}
		        		});
		            }else if(formId == "intelligent_queryForm"){
		            	var url = Global.ctx + "/html/cm/pe/custinfo/intelligentPecustListSum.do";
		        		var sumData;
		        		$.icrmAjax({
		        			dataType : "json",
		        			type : "post",
		        			url : url,
		        			data : $('#'+formId).serializeArray(),
		        			//async:false,
		        			success : function(data) {
                                   sumData = data.sumData;
                                   var columns=api.context[0].aoColumns;
               		            if(sumData != null){
               			            $.each(columns,function(i,oCol){
               							if(oCol["dataType"]=="numberic" && oCol["isTotal"] != false){
               								//所有数据汇总
               		            			var precision="2";
               		        				if(typeof(oCol.precision) != "undefined"){
               		        					if(!ICRM.isEmpty(oCol.precision,true)){
               		        						precision=oCol.precision;
               		        					}
               		        				}
               		        				var singleData=sumData[oCol.mData.toUpperCase()];
               		        				if(!ICRM.isEmpty(singleData,true)){
            		        					singleData=Number.fmoney(singleData,parseInt(precision));
            		        				}
               		            			$( api.column(i).footer() ).html(
               		            				singleData
               					            );
               							}
               						});
               		            }
		        			},
		        			error:function(data){
		        				console.log(data.sumData);
		        			}
		        		});
		            }
		            var columns=api.context[0].aoColumns;
		            if(sumData != null){
			            $.each(columns,function(i,oCol){
							if(oCol["dataType"]=="numberic" && oCol["isTotal"] != false){
								//所有数据汇总
		            			var precision="2";
		        				if(typeof(oCol.precision) != "undefined"){
		        					if(!ICRM.isEmpty(oCol.precision,true)){
		        						precision=oCol.precision;
		        					}
		        				}
		        				var singleData=sumData[oCol.mData.toUpperCase()];
		        				//开门红合计为万元
		        				if(ismodw == 'peCustOdoored'){
		        					if(oCol.mData.toUpperCase() == 'DEPTBALYADD'){
		        						yadd = singleData;
		        					}
		        					if(oCol.mData.toUpperCase() == 'DEPTBALGADD'){
		        						gadd = singleData;
		        					}
		        					if(oCol.mData.toUpperCase() == 'DEPTBALYAVG'){
		        						yavg = singleData;
		        					}
		        					if(oCol.mData.toUpperCase() == 'DEPTBALGAVG'){
		        						gavg = singleData;
		        					}
		        					if(oCol.mData.toUpperCase() == 'DEPTBALPADD'){
		        						if(gadd == 0){
		        							singleData = 0.00;
		        						} else {
		        							singleData = yadd/gadd*100;		        							
		        						}
		        					} else if(oCol.mData.toUpperCase() == 'DEPTBALPAVG') {
		        						if(gavg == 0){
		        							singleData = 0.00;
		        						} else {
		        							singleData = yavg/gavg*100;
		        						}
		        					} else {		        						
		        						singleData = singleData/10000;		        							        						
		        					}
		        				}
		        				if(!ICRM.isEmpty(singleData,true)){
		        					singleData=Number.fmoney(singleData,parseInt(precision));
		        				}
		        				if(ismodw == 'peCustOdoored'){
		        					if(oCol.mData.toUpperCase() == 'DEPTBALPADD' || oCol.mData.toUpperCase() == 'DEPTBALPAVG'){
		        						singleData = singleData + '%';
		        					}
		        				}
		            			$( api.column(i).footer() ).html(
		            				singleData
					            );
		            			
			            		/** 本页小计
			            		var pageTotal = api.column(i, { page: 'current'} ).data()
					                .reduce( function (a, b) {
					                    return intVal(a) + intVal(b);
					                }, 0 );
					            $( api.column(i).footer() ).html(
					            	Number.fmoney(pageTotal)
					            );**/
							}
						});
		            }
	        },
			'fnServerData': function ( sSource, aoData, fnCallback ) {//服务器端，数据回调处理  
				var $table = $(this);
				var data = $.merge(aoData,$('#'+formId).serializeArray());
				
				//添加额外参数
				if(options.data){
					var t = [];
					for(var key in options.data){
						var rs = false;
						for(var j = 0;j < data.length;j++){//检查变量是否重复
							if(data[j].name == key){//重复
								rs = true;
								data[j].value = options.data[key];
								break;
							}
						}
						if(rs == false){//没有重复
							t.push({
								"name" : key,
								"value" : options.data[key]
							});
						}
					}
					data = $.merge(data, t);
				}
				//需要汇总的参数
				data = $.merge(data, [{"name":"sumFld","value":numberFld.join(",")}]);
				$.icrmAjax({
					url : sSource,
					data : data,
					mask:options.mask,
					success : function(data) {
						//有数据则显示汇总值 否则隐藏
						if(data.aaData.length == 0){
							$table.find('tfoot').hide();
						}else{
							$table.find('tfoot').show();
						}
						fnCallback(data);
						//设置左侧快捷菜单高度
						setSiderBarHeight();
						//抛出行选中事件
						$table.find('th input:checkbox').prop("checked",false);//重置全选复选框未选中
						$table.find('input[name="'+gridDiv+'_selectKey"]').each(function(index,item){
							$(item).on('click', function(){
								var row = {};
								for(var i=0; i<data.aaData.length; i++){
									if(data.aaData[i][options.key] == $(this).attr(options.key)){
										row = data.aaData[i];
										break;
									}
								}
								$table.trigger(event.rowCheckEvent,[$(this), row, $(this).prop("checked")]);
							});
						});
						
					}
				});
			}
		};
		
		//参数覆盖
		var opts = $.extend({}, defaults, options);
		key = opts.key;
		//格式化组件
		initSDom(opts);
		formId = opts.formId;
		opts.sAjaxSource = opts.url;
		otherParam = opts.otherParam;
		gridDiv =$(this).attr("id");
		onDelSuccess = opts.onDelSuccess;
		ismodw = opts.ismodw;
		ajaxFormData = opts.ajaxFormData;
		//如果设置了key，表示要增加复选框列
		if(key != null && key != undefined &&  key != '') {
			//在行tr上添加主键、根据主键获取数据
			var rowCallBack=opts.fnRowCallback;
			opts.fnRowCallback=function(nRow, aData, iDisplayIndex){
				//在tr上设置主键 在没有单选框、复选框时能够根据主键获取数据
				$(nRow).attr(key,aData[key]);
				if ($.isFunction(rowCallBack)) {
					rowCallBack(nRow, aData, iDisplayIndex);
				}
			};
			//添加复选框、单选框
			var checkbox_columns;
			// 单选框列 zhfeng
			if(options.selectType =='radio'){
				checkbox_columns = [{
					"sTitle": "",
					"mData" : null,
					"sClass" : "center",
					"bSortable" : false,
					"mRender" : function(data, type, full) {
						var str = '';
						if(key != null && key != undefined && key != '') {
							str += key + '=' + full[key] + ' ';
							if(otherParam!=null){
								for(var i=0; i<otherParam.length; i++) {
									str += otherParam[i] + '=' + full[otherParam[i]] + ' ';
								}
							}
						}//style=\"display:none;\"
						return '<label><input type="radio" name="'+gridDiv+'_selectKey" class="ace" '+ str +' /><span class="lbl"></span></label>';
					}
				}];
			}else if(options.selectType =='none'){ //设置不需要单选框和复选框
				checkbox_columns = [];
			}else{
				checkbox_columns = [{  //复选框列
					// style=\"display:none;\"
			       	"sTitle": "<label><input type='checkbox' class='ace' /><span class='lbl'></span></label>",
			       	"mData" : null,
			       	"sClass" : "center",
			       	"bSortable" : false,
			       	"mRender" : function(data, type, full) {
			       		var str = '';
			       		if(key != null && key != undefined && key != '') {
			       			str += key + '=' + full[key] + ' ';
			       			if(otherParam!=null){
			       				for(var i=0; i<otherParam.length; i++) {
			               			str += otherParam[i] + '=' + full[otherParam[i]] + ' ';
			               		}
			       			}
			       		}
			       		// style=\"display:none;\"
			       		return '<div style="position:"><label><input type="checkbox" name="'+gridDiv+'_selectKey" class="ace" '+ str +' /><span class="lbl"></span></label><div>';
					}
				}];
			}
			opts.aoColumns = $.merge($.merge([],checkbox_columns),opts.aoColumns);
			//有复选框或者单选框则需要再增加一列
			if(!ICRM.isEmpty(footTh,true)){
				footTh=footTh+"<th>";
			}
		}
		if(!ICRM.isEmpty(footTh,true)){
			$(this).append("<tfoot><tr>"+footTh);
			if(!opts.autoLoad){
				$(this).find('tfoot').hide();
			}
		}
		
		/*
		 * 调用实际组件
		 */
		var dataTable =$(this).dataTable(opts);
		
		/*
		 * 设置复选框按钮选中事件
		 */
		var $table_body = $(this);
		/**var $table_head = $table_body.closest(".dataTables_scroll").find(".dataTables_scrollHead table");
		$table_head.find('th input:checkbox').on('click', function(){
			var that = this;
			$table_body.find('tr > td input:checkbox').each(function(){
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			});
		});**/
		//sScrollX = ''的情况 zfheng begin
		$table_body.find('th input:checkbox').on('click', function(){
			var that = this;
			$table_body.find('tr > td input:checkbox').each(function(){
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			});
		});
		//选中行变色
		if(key != null && key != undefined &&  key != '') {
			 $table_body.find('tbody').on( 'click', function (eve) {
				 var selectType='checkbox';
			 	 if(options.selectType != undefined){
			 		if(options.selectType != ""){
			 			selectType=options.selectType.toLowerCase();
			 		}
			 	 }
				 if(eve.target.tagName != 'TD' && eve.target.tagName != 'INPUT') {
				 	 return;
				 }
				 var row=$(eve.target).closest('tr');
				 if(selectType == 'radio' || selectType == 'none'){
					 if(eve.target.tagName == 'INPUT'){
					 	 return;
					 }
					 if (row.hasClass('selected') ) {
						 row.find("td input:radio").removeAttr("checked");
						 row.removeClass('selected');
					 }else {
			    	   	 $table_body.find('tbody tr.selected').removeClass('selected');
			    	   	 row.addClass('selected');
			    	   	 row.find("td input:radio").prop("checked",true);
					 }
				 }else{
				 	 row.toggleClass('selected');	
				 	// if(eve.target.tagName == 'INPUT'){
					 //	return;
					 //}
					 if(row.hasClass('selected')){
			     		row.find("td input:checkbox").prop("checked",true); 
				     }else{
				     	row.find("td input:checkbox").removeAttr("checked");
				     }
					 //根据选中的复选框来判断全选复选框是否选中
					 if($table_body.find('tr > td input:checkbox').size() == $table_body.find('tr > td input:checkbox:checked').size()){
						 $table_body.find('th input:checkbox').prop("checked",true);//全选复选框选中 
					 }else{
						 //$table_body.find('th input:checkbox').prop("checked",false);//全选复选框未选中  
					 }
				 }
			 });
		}else{
			$table_body.find('tbody').on( 'click', function (eve) {
				var row=$(eve.target).closest('tr');
				 if (row.hasClass('selected') ) {
					 row.removeClass('selected');
				 }else {
		    	   	 $table_body.find('tbody tr.selected').removeClass('selected');
		    	   	 row.addClass('selected');
				 }
			});
		}
		
		if(options.sScrollX == ''){
			$table_body.wrap("<div style=\"width:100%; max-height:"+ options.maxHeight+"; overflow:auto;\"></div>");
		}
		//sScrollX = ''的情况 zfheng end
		/*.bind('click', function(){
			alert("val = "+this.val());
			$table.trigger(event.rowCheckedEvent,[$(this),this.val()]);
		});*/
		
		
		//初始化toolbar
		if(toolbar != null && toolbar != undefined) {
			$("div.toolbar",$('#'+gridDiv+"_wrapper")).append(toolbar);
			//绑定按钮事件
			if(options.toolbar != null && options.toolbar != undefined) {
				for(var i=0;i<options.toolbar.length;i++){
					var item = options.toolbar[i];
					if(item != null && item != undefined){
						if(item.onclick!=null){
							$("[text='"+item.text+"']",$('#'+gridDiv+"_wrapper")).click(item.onclick);
						}
					}
				}
			}
			//$('[data-rel=tooltip]').tooltip();//初始化tooltip
		}
		
		/**
		 * 自定义方法
		 */
		dataTable.myMethod = function() {
			alert('test function');
		};
		/**
		 * 设置被选择行序号
		 */
		dataTable.$('td').click(function() {
			 var aPos = dataTable.fnGetPosition(this);
			 dataTable.selecedIndex = aPos[0];
		 });
		
		/*
		 * 查询方法
		 */
		dataTable.reload = function(data){
			var oSettings = dataTable.fnSettings();
			oSettings._iDisplayStart = 0;
			if (data) {
				oSettings.aoServerParams = [ {
					"fn" : function(param) {
						for ( var keyName_ in data) {
							param.push({
								"name" : keyName_,
								"value" : data[keyName_]
							});
						}
					}
				} ];
			}
			dataTable.fnClearTable(0); // 清空数据
			dataTable.fnDraw(); //重新加载数据 
		};
		//获取选中行的主键
		dataTable.getSelectedIds = function(){
			var del_value =[];
			$('input[name="'+gridDiv+'_selectKey"]:checked').each(function(){    
				if(key != null && key != undefined &&  key != '') {
					del_value.push($(this).attr(key));
				}else{
					del_value.push($(this).val());    
				}
			});
			return del_value;
		};
		//获取选中行列序号
		dataTable.getSelectedIndex = function(){
			var $checkbox = $('input[name="'+gridDiv+'_selectKey"]:checked')[0];
			var $td = $($checkbox).closest('td');
			var aPos = dataTable.fnGetPosition($td[0]);
			return aPos[0];
		};
		/*
		 * 删除方法
		 */
		dataTable.del = function(){
			var del_value =dataTable.getSelectedIds();
			if(del_value.length<=0){
			    $.icrmDialog.showMessge('提示','请选择要删除的记录!');
				return false;  
			};
			$.icrmDialog.showConfirm('提示','你确定要删除选中记录吗?', function(result){
				if(result) {
					$.icrmAjax({
						url: opts.delUrl+"?"+key+"="+del_value,
						async: false,
						data:{data:JSON.stringify(dataTable.getSelectedData())},
						success: function(res) {
							var batchType=res.batchType;
							if(batchType == undefined){
								$.icrmDialog.showMessge('提示','删除成功');
							}else{
								batchResultParse(res);
							}
							dataTable.reload();
							if(onDelSuccess != null && onDelSuccess != undefined) {
								onDelSuccess(res);
							}
						}
					});
				}
			});
		};
		//获取选中行记录数据
		dataTable.getSelectedData = function(){
			var dataArray = [];
			var $checkboxs = $('input[name="'+gridDiv+'_selectKey"]:checked');
			$.each($checkboxs,function(index,item){
				var $td = $(item).closest('td');
				var aPos = dataTable.fnGetPosition($td[0]);
				var aData = dataTable.fnGetData(aPos[0]); 
				dataArray.push(aData);
			});
			return dataArray;
		};
		//获取选中行记录数据中某一字段的值
		dataTable.getSelectedFieldValue = function(field){
			var dataArray = [];
			var $checkboxs = $('input[name="'+gridDiv+'_selectKey"]:checked');
			$.each($checkboxs,function(index,item){
				var $td = $(item).closest('td');
				var aPos = dataTable.fnGetPosition($td[0]);
				var aData = dataTable.fnGetData(aPos[0]); 
				dataArray.push(aData[field]);
			});
			return JSON.stringify(dataArray);
		};
		
		//根据主键获取记录数据
		dataTable.getRowById = function(rowId){
			var rowKey = $('input[name="'+gridDiv+'_selectKey"]['+key+'='+rowId+']');
			var aPos;
			if(rowKey.length>0){
				var $td = $(rowKey).closest('td');
				aPos = dataTable.fnGetPosition($td[0]);
			}else{
				var $td = $('tr['+key+'='+rowId+']').find('td:first');
				aPos = dataTable.fnGetPosition($td[0]);
			}
			var aData = dataTable.fnGetData(aPos[0]); 
			return aData;
		};
		
		//获取选中行的列数
		dataTable.getSelectedRows = function(){
			return $('input[name="'+gridDiv+'_selectKey"]:checked').size();
		};
		
		//获取jsonObject数据
		dataTable.fnGetLocalJsonStringData = function(){
			var dataArray = [];
			var aData = dataTable.fnGetData();
			$.each(aData,function(index,item){
				if(item["isLocal"]==true){
					dataArray.push(item);
				}
			});
			return JSON.stringify(dataArray);
		};
		//添加本地数据
		dataTable.fnAddLocalData = function(object){
			//添加是否本地数据标识
			object["isLocal"] = true;
			dataTable.fnAddData(object);
		};
		dataTable.columns = opts.aoColumns;
		return dataTable;
	};

})(jQuery);