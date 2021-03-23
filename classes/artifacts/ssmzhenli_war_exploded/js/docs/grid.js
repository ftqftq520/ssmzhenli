(function($) {
	ICRM.setOptDate();//更新操作时间
	
	//中文
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
	
	
	/**
	 * @class 工具条
	 */
	var Toolbars = {
		/**
		 * @cfg 类型可选值['-','add','edit','view','del','save']
		 */
		type : "",
		/**
		 * @cfg 按钮文本，type不存在时生效
		 */
		text : "",
		/**
		 * @cfg 按钮图标，type不存在时生效
		 */
		icon : "",
		/**
		 * @cfg 按钮样式，type不存在时生效
		 */
		clsClass : "",
		/**
		 * @cfg 按钮点击事件
		 */
		onclick : function(){}
	};
	
	/**
	 * @class 表格
	 * @author pt
	 * @param {json}  options
	 * 示例：
	 * <pre><code>
	 var toolbar = [{
			class : 'glyphicon glyphicon-forward',
			text:"任务处理",
			onclick:function(){
				dealTask();
			}
		}
	];
   	var aoColumns = [
    		{
    	       	"sTitle": "任务主题",
    			"mData" : "subject"
    		}, {
    			"sTitle": "任务状态",
    			"mData" : "status",
    			"mRender" : function(data, type, full) {
    				return ICRM.webflow.status2Text(data);
    			}
    		} , {
    			"sTitle": "发起人",
    			"mData" : "staffName"
    		}, {
    			"sTitle": "发起时间",
    			"mData" : "applyTm"
    		}];
	datatable = $('#grid').icrmGrid({
		formId:'taskSearchForm',
		toolbar:toolbar,
		key:'tableKey',
		otherParam:null,
		url: Global.ctx + "/html/task/page.do",
		aoColumns: aoColumns,
		"bSort" : false
	});
		</code></pre>
	 */
	$.fn.icrmGrid = function(options) {
		/*
		 * 默认参数
		 */
		/**
		 * @cfg 表单id
		 */
		var formId="";
		var toolbarId = "";
		/**
		 * @cfg 数据主键名称,如定义将生成复选框
		 */
		var key = '';
		var gridDiv ='';
		/**
		 * @cfg 获取数据添加到复选框属性中
		 * <p>如otherParam=['name'],返回行数据为：{id:'1',name:'test'},那么复选框将增加属性name='test'
		 */
		var otherParam = [];
		/**
		 * @method 删除成功后回调方法,key存在时生效
		 */
		var onDelSuccess;
		
		
		/**
		 * @cfg aoColumns 列定义，详细见{@link aoColumns}
		 */
		
		//事件
		var event = {
			/**
			 * @method 绑定事件
			 * @param {string} eventName 事件名称
			 * @param {function} callback 响应方法
			 */
			on : function(eventName, callback){},
			/**
			 * @event 行复选框点击事件
			 * @alias rowSelect
			 * @param {Object}datatable 对象
			 * @param {json}data 选中行数据集
			 * @param {boolean}isCheck 是否选中状态
			 */
			rowCheckEvent	:"rowSelect"	//复选框点击事件
		};
		
		/**
		 * @cfg 工具条 见:{@link Toolbars}
		 * @param {Array[json]}
		 * 
		 */
		var toolbar=null;
		
		
		if(options.toolbar != null && options.toolbar != undefined) {
			var toolbarStr = "";
			for(var i=0;i<options.toolbar.length;i++){
				var item = options.toolbar[i];
				var text = "";
				var icon = "";
				var clsClass = "";
				if(item.type =="-"){
					toolbarStr += '<a class="ui-pg-button ui-state-disabled">︱</a>&nbsp;';
				}
				else{
					if(item.type=='add'){
						text = "增加";
						icon = "icon-plus-sign purple bigger-150";
						clsClass = "tooltip-info";
						item.text =text;
					}
					else if(item.type=='edit'){
						text ="修改";
						icon = "icon-pencil blue bigger-150";
						clsClass = "tooltip-info";
						item.text =text;
					}
					else if(item.type=='view'){
						text ="查看";
						icon = "icon-zoom-in grey bigger-150";
						clsClass = "tooltip-default";
						item.text =text;
					}
					else if(item.type=='del'){
						text ="删除";
						icon = "icon-trash red bigger-150";
						clsClass = "tooltip-error";
						item.text =text;
					} 
					else if(item.type=='save') {
						text = "保存";
						icon = "icon-save green bigger-150";
						clsClass = "tooltip-success";
						item.text =text;
					}
					else{
						clsClass = item.class;
						icon = item.icon;
						text = item.text;
					}
					toolbarStr += '<a class="'+clsClass+'" data-rel="tooltip" data-placement="right" title="'+text+'" href="javascript:void(0);" ><i class="'+icon+'"></i><span>'+text+'</span></a>&nbsp;';
				}
				
			}
			options.sDom = "<'row'<'col-lg-10 col-md-10 col-sm-10 col-xs-8'<'toolbar'>><'col-lg-2 col-md-2 col-sm-2 col-xs-4'r>>"
				+"t"
				+"<'row'<'col-lg-6 col-md-6 col-sm-6 col-xs-12'i><'col-lg-6 col-md-6 col-sm-6 col-xs-12'p>>";
		}
		toolbar = $(toolbarStr);
		
		var defaults = {
			/**
			 * @cfg 数据加载的url
			 */
			"url" : "",
			"oLanguage" : oLanguage,
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			/**
			 * @cfg 是否启用筛选,默认false
			 * */
			"bFilter" : false,
			/**
			 * @cfg 是否启用排序,默认false
			 */
			"bSort" : false,
			/**
			 * @cfg 是否启用水平滚动条,默认false
			 */
			sScrollX : false,
			/**
			 * @cfg 是否启用数据加载中效果,默认true
			 */
			"bProcessing" : true,
			/**
			 * @cfg 是否从服务端获取数据,默认true
			 */
			"bServerSide" : true,
			/**
			 * @cfg 是否可以拖动宽度，默认true
			 */
			"bLengthChange" : true,
			//"iDeferLoading" :null,
			"bInfo" : true,
			/**
			 * @cfg 是否自适应宽度，默认false
			 */
			"bAutoWidth" : false,
			/**
			 * @cfg 是否带分页条，默认true
			 */
			"bPaginate" : true,
			/**
			 * @cfg 分页条样式，默认custom。bPaginate=true时有效
			 */
			"sPaginationType" : "custom",
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
				$.icrmAjax({
					url : sSource,
					data : data,
					success : function(data) {
						fnCallback(data);
						/*
						 * 抛出行选中事件
						 */
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
							})
						});
						
					}
				});
			}
		};
		
		
		/*
		 * 参数覆盖
		 */
		var opts = $.extend({}, defaults, options);
		formId = opts.formId;
		opts.sAjaxSource = opts.url;
		key = opts.key;
		otherParam = opts.otherParam;
		gridDiv =$(this).attr("id");
		onDelSuccess = opts.onDelSuccess;
		
		
		//如果设置了key，表示要增加复选框列
		if(key != null && key != undefined &&  key != '') {
			/*
			 * 复选框列
			 */
			var checkbox_columns = [{
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
		       		return '<label><input type="checkbox" name="'+gridDiv+'_selectKey" class="ace" '+ str +' /><span class="lbl"></span></label>';
				}
			}];
			
			opts.aoColumns = $.merge($.merge([],checkbox_columns),opts.aoColumns);
		}
		
		$('[data-rel=tooltip]').tooltip();//初始化tooltip
		
		/*
		 * 调用实际组件
		 */
		var dataTable =$(this).dataTable(opts);
		/*
		 * 设置复选框按钮选中事件
		 */
		var $table_body = $(this);
		var $table_head = $table_body.closest(".dataTables_scroll").find(".dataTables_scrollHead table");
		$table_head.find('th input:checkbox').on('click', function(){
			var that = this;
			$table_body.find('tr > td input:checkbox').each(function(){
					this.checked = that.checked;
					$(this).closest('tr').toggleClass('selected');
				});
		});
		
		/*.bind('click', function(){
			alert("val = "+this.val());
			$table.trigger(event.rowCheckedEvent,[$(this),this.val()]);
		});*/
		
		
		//初始化toolbar
		if(toolbar != null && toolbar != undefined) {
			$("div.toolbar",$('#'+gridDiv+"_wrapper")).append(toolbar);
			/*$.each($("div.toolbar"),function(index,item){
				if($(item).html() == "") {
					$(item).append(toolbar);
				}
			});*/
			/*
			 * 绑定按钮事件
			 */
			if(options.toolbar != null && options.toolbar != undefined) {
				for(var i=0;i<options.toolbar.length;i++){
					var item = options.toolbar[i];
					if(item.onclick!=null){
						$("[title='"+item.text+"']",$('#'+gridDiv+"_wrapper")).click(item.onclick);
					}
				}
			}
		}
		
		/*
		 * 自定义方法
		 */
		dataTable.myMethod = function() {
			alert('test function');
		};
		/*
		 * 设置被选择行序号
		 */
		dataTable.$('td').click(function() {
			 var aPos = dataTable.fnGetPosition(this);
			 dataTable.selecedIndex = aPos[0];
		 });
		
		/**
		 * @method 重新加载数据
		 * @param {json}data 额外请求参数 
		 */
		dataTable.reload = function(data){
			var oSettings = dataTable.fnSettings();
			oSettings._iDisplayStart = 0;
			//console.log(oSettings);
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
		/**
		 * @method 获取选中行的主键，有复选框时生效
		 * @returns {array}array 有key时返回key属性值数组，无key时返回复选框value数组
		 */
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
		/**
		 * @method 获取选中行列序号，有复选框时生效
		 * @returns {string} index
		 */
		dataTable.getSelectedIndex = function(){
			var dataArray = [];
			var $checkbox = $('input[name="'+gridDiv+'_selectKey"]:checked')[0];
			var $td = $($checkbox).closest('td');
			var aPos = dataTable.fnGetPosition($td[0]);
			return aPos[0];
		};
		/**
		 * @method 删除方法，定义有key和delUrl时生效
		 * @event 删除成功后触发onDelSuccess事件
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
						success: function(res) {
							var ret = res.code;
							var msg = res.msg;
							$.icrmDialog.showMessge('提示','删除成功');
							dataTable.reload();
							if(onDelSuccess != null && onDelSuccess != undefined) {
								onDelSuccess();
							}
						}
					});
				}
			});
		};
		/**
		 * @method 获取选中行记录数据
		 * @returns {array[json]} array
		 */
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
		/**
		 * @method 获取选中行记录数据中某一字段的值
		 * @returns {array[string]}array
		 */
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
		
		/**
		 * @method 获取选中行的个数
		 * @returns {int} count
		 */
		dataTable.getSelectedRows = function(){
			return $('input[name="'+gridDiv+'_selectKey"]:checked').size();
		};
		
		/**
		 * @method 获取本地数据字符串
		 * @returns {string[array[json]]} str
		 */
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
		/**
		 * @method 添加本地数据
		 * @param {json} object
		 */
		dataTable.fnAddLocalData = function(object){
			/*
			 * 添加是否本地数据标识
			 */
			object["isLocal"] = true;
			var aData = dataTable.fnAddData(object);
		};
		
		dataTable.columns = opts.aoColumns;
		
		return dataTable;
	};

})(jQuery);