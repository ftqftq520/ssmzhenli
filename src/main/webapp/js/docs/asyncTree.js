(function($) {
	ICRM.setOptDate();//更新操作时间
	
	var treeObj = null;
	var opts = null;
	var nodeName = '';
	var iconSkinArr = [];
	var expandRoot = false;
	
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
				if(expandRoot) {
					var nodes = treeObj.getNodes();    
					treeObj.expandNode(nodes[0], true);
					expandRoot = false;
				}
				if(iconSkinArr != null && iconSkinArr.length > 0) {
					updateIcon(treeObj.transformToArray(treeObj.getNodes()));
				}
			},
			onClick : function(event, treeId, treeNode, clickFlag) {
				//treeObj.expandNode(treeNode);
				opts.onClick(event,treeId,treeNode);
			}
		}
	};
	
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
		//console.info(opts);
		opts.data.simpleData.idKey = options.idKey;
		opts.data.simpleData.pIdKey = options.pIdKey;
		opts.view.showTitle = true ;
		opts.data.key.title = options.title;
		opts.async.url = options.url;
		opts.async.autoParam = [options.idKey];
		nodeName = options.nodeName;
		iconSkinArr = options.iconSkinArr;
		expandRoot = options.expandRoot;
		treeObj = $.fn.zTree.init($(this), opts);
		return treeObj;
	};

})(jQuery);