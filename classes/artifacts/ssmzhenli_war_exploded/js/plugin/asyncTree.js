(function($) {
	ICRM.setOptDate();//更新操作时间
	
	var treeObj = null;
	var opts = null;
	var nodeName = '';
	var iconSkinArr = [];
	var expandRoot = false;
	var selectIds = '';
	
	function filter(treeId, parentNode, childNodes) {
		if (!childNodes)
			return null;
		for (var i = 0, l = childNodes.length; i < l; i++) {
			childNodes[i].name = childNodes[i][nodeName].replace(/\.n/g, '.');
		}
		return childNodes;
	}
	
	var setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : '',
				pIdKey : ''
			},key: {
				title: ""
			}
		},
		async : {
			enable : true,
			url : '',
			autoParam : [""],
			dataFilter : filter
		},
		view : {
			selectedMulti : false
		}, 
		callback : {
			onAsyncSuccess : function(event, treeId, treeNode, msg) {
				if(opts.onAsyncSuccess) {
					opts.onAsyncSuccess(event, treeId, treeNode, msg);
				}
				//展开根节点
				if(expandRoot) {
					var nodes = treeObj.getNodes();    
					treeObj.expandNode(nodes[0], true);
					expandRoot = false;
				}
				//更新图标
				if(iconSkinArr != null && iconSkinArr.length > 0) {
					updateIcon(treeObj.transformToArray(treeObj.getNodes()));
				}
				checkNodes(); //选择树节点
			},
			onClick : function(event, treeId, treeNode, clickFlag) {
				opts.onClick(event,treeId,treeNode);
			},
			onExpand : function(event, treeId, treeNode) {
			}
		}
	};
	
	//选择树节点（针对radio和checkbox）
	function checkNodes() {
		if(selectIds != null && selectIds != '') {
			var selectIdArr = selectIds.split(',');
			for(var i=0; i<selectIdArr.length; i++) {
				var node = treeObj.getNodeByParam(opts.data.simpleData.idKey,selectIdArr[i]);
				expandParentNode(node);
				treeObj.checkNode(node,true,false,false);
			}
		}
	}
	
	function expandParentNode(node) {
		node = node.getParentNode();
		if(node != null) {
			treeObj.expandNode(node,true);
			expandParentNode(node);
		}
	}
	
	//更新树图标
	function updateIcon(nodes) {
		for (var i=0, l=nodes.length; i<l; i++) {
			if (nodes[i].isParent) {
				nodes[i].iconSkin = iconSkinArr[0];
			} else {
				nodes[i].iconSkin = iconSkinArr[1];
			}
			treeObj.updateNode(nodes[i]);
		}
	} 
		
	/*
	 * 参数配置,构造函数
	 */
	$.fn.icrmAsyncTree = function(options) {
		/*
		 * 自定义方法
		 */
		this.myMethod = function() {
			alert('test tree');
		};
		/*
		 * 参数复制
		 */
		opts = $.extend(true, {}, setting, options);
		//console.info(options);
		opts.data.simpleData.idKey = options.idKey;
		opts.data.simpleData.pIdKey = options.pIdKey;
		opts.async.url = options.url;
		opts.async.otherParam = options.data;
		opts.async.autoParam = [options.idKey];
		opts.view.showTitle = true ;
		opts.data.key.title=options.title;
		nodeName = options.nodeName;
		iconSkinArr = options.iconSkinArr;
		expandRoot = options.expandRoot;
		treeObj = $.fn.zTree.init($(this), opts);
		selectIds = options.selectIds;
		return treeObj;
	};

})(jQuery);