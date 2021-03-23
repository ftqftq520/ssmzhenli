$.fn.extend({
	pieChart : function(options) {
		options.zone = $(this).get(0);
		getChartData(options, legend4Pie, initPie);
	},
	barChart : function(options) {
		options.zone = $(this).get(0);
		getChartData(options, legend4Bar, initBar);
	},
	barChart2 : function(options) {
		options.zone = $(this).get(0);
		getChartData(options, legend4Bar, initBar2);
	},
	lineChart : function(options) {
		options.zone = $(this).get(0);
		getChartData(options, legend4Bar, initLine);
	},
	loopChart : function(options) {
		options.zone = $(this).get(0);
		getChartData(options, legend4Pie, initLoop);
	},
	pie : function(options) {
		options.zone = $(this).get(0);
		initChart(options, options.chart, legend4Pie, initPie);
	},
	funnel : function(options) {
		options.zone = $(this).get(0);
		initChart(options, options.chart, legend4Pie, initFunnel);
	},
	line : function(options) {
		options.zone = $(this).get(0);
		initChart(options, options.chart, legend4Bar, initLine);
	},
	bar : function(options) {
		options.zone = $(this).get(0);
		initChart(options, options.chart, legend4Bar, initBar);
	},
	bar2 : function(options) {
		options.zone = $(this).get(0);
		initChart(options, options.chart, legend4Bar, initBar2);
	},
	loop : function(options) {
		options.zone = $(this).get(0);
		initChart(options, options.chart, legend4Pie, initLoop);
	}
});

var setting = {
	type : "get",
	legend : true,
	title_x : "center",
	legend_x : "right",
	legend_y : "top",
	grid_x : "120",
	grid_x2 : "80",
	grid_y : "60",
	grid_y2 : "60",
	unit : ""
};

function getChartData(options, getLegendTitile, init) {
	$.ajax({
		url : Global.ctx + options.url,
		dataType : "json",
		type : options.type ? options.type : setting.type,
		data : options.data,
		success : function(chartData) {
			initChart(options, chartData, getLegendTitile, init);
			if (options.callback) {
				options.callback(chartData);
			}
		}
	});
}

function initChart(options, chart, getLegendTitile, init) {
	getLegendTitile(chart);
	//config();
	init(options, chart);
}

/**
 * 获取图例数据，主要针对饼图，环形图
 * 
 * @param chart
 */
function legend4Pie(chart) {
	var legendTitile = new Array();
	for ( var i = 0; i < chart.series[0].data.length; i++) {
		legendTitile.push(chart.series[0].data[i].name);
	}
	chart.legend = legendTitile;
}

/**
 * 获取图例数据，主要针对柱状图，线性图
 * 
 * @param chart
 */
function legend4Bar(chart) {
	var legendTitile = new Array();
	for ( var i = 0; i < chart.series.length; i++) {
		legendTitile.push(chart.series[i].name);
	}
	chart.legend = legendTitile;
}

function config() {
	try{
		require.config({
			paths : {
				echarts : Global.ctx + "/component/echarts"
			}
		});
	}catch(e){}
}

//加载动画
var effect = ['spin' , 'bar' , 'ring' , 'whirling' , 'dynamicLine' , 'bubble'];
var loadingEffect = {
	text : '图表正在加载...',
	effect : 'bar',
	fontSize : 20,
	time : 1000
};

//无数据时加载动画
var noDataLoadingOption  = {
	text: '暂无数据',
    effect: 'bubble',
    effectOption: {
        effect: {
            n: 0
        }
    }
};

var initPie = function(options, chart) {
		var myChart = echarts.init(options.zone);
		myChart.showLoading({
			text : loadingEffect.text,
		    effect : loadingEffect.effect,
		    textStyle : {
		        fontSize : loadingEffect.fontSize
		    }
        }); 

		var option = {
			title : {
				text : options.title == undefined ? chart.title.text : '',
				// subtext: '纯属虚构',
				x : options.title_x ? options.title_x : setting.title_x
			},
			tooltip : {
				trigger : 'item',
				//luozhu 2016-2-29 edit
				formatter: function (params,ticket,callback) {
			           
		            var res='';
		            if (params.seriesName != null && params.seriesName != '') {
		            	 res += params.seriesName + "<br/>";
		            }
		            res += params.name + ":";
		            res += formatMoney(params.value);
		            //res += "元("+params.percent+"%)";
		            res += ((options.unitName||null)==null?"":options.unitName)+"&nbsp;("+params.percent+"%)";
		            return res;
		        },
		        position : function(mouse_position) {
					var position = options.position;
		        	if(position == null||position == '')
		        		return [mouse_position[0] + 10, mouse_position[1] + 30];
		        		//return mouse_position;
		        	return position;
				}
				//formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			color: options.color == undefined ? setting.color : options.color,
			legend : {
				show : options.legend == undefined ? setting.legend : options.legend,
				orient : options.orient == undefined ? 'vertical' : options.orient,
				x : options.legend_x ? options.legend_x : setting.legend_x,
				y : options.legend_y ? options.legend_y : setting.legend_y,
				data : chart.legend
			},
			/*
			 * toolbox: { show : false, feature : { mark : {show: true}, dataView : {show: true, readOnly: false}, magicType : { show: true, type: ['pie', 'funnel'], option: { funnel: { x: '25%', width: '50%', funnelAlign: 'left', max: 1548 } } },
			 * restore : {show: true}, saveAsImage : {show: true} } },
			 */
			calculable : false,
			series : [ {
				name : chart.series[0].name,
				type : 'pie',
				radius : options.size ? options.size : '55%',
				center : [ options.left ? options.left :  '50%', options.top ? options.top : '50%' ],
				data : chart.series[0].data,
				//Wuxiao 2016-4-18
				label : {
					normal:{
	    				formatter: function (params,ticket,callback) {
	    					var unit = options.unitName ? options.unitName : setting.unit;
	    		            return params.name+"\n" + formatMoney(params.value) + unit;
	    		        }
					}
				},
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
			} ],
			noDataLoadingOption: noDataLoadingOption
		};

		if (options.click_callback) {
			myChart.on('click', function(param) {
				options.click_callback(chart.legend[param.dataIndex]);
			});
			/*myChart.on('click', function(param) {
				options.click_callback(chart.series[0].data[param.dataIndex].code);
			});*/
		}
		
		/*var ecConfig1 = require('echarts/config');
		myChart.on(ecConfig1.EVENT.DATA_VIEW_CHANGED, function(param) {
			alert("hehe");
		});*/
		
		clearTimeout(loadingTicket);
		var loadingTicket = setTimeout(function (){
			myChart.hideLoading();
			myChart.setOption(option);
		},loadingEffect.time);
		
/*		//自适应 fengzuhong
		window.addEventListener("resize", function () {
			myChart.resize();
        });*/
		
		//
	if(window.addEventListener){
			//IE
			window.addEventListener("resize", function (){ myChart.resize();},false);
		}else{
			// 非IE
			window.attachEvent("resize", function () {myChart.resize();});
		}
		
};

var initBar = function(options, chart) {

	// 使用
		// 基于准备好的dom，初始化echarts图表
		var myChart = echarts.init(options.zone);
		
		myChart.showLoading({
			text : loadingEffect.text,
		    effect : loadingEffect.effect,
		    textStyle : {
		        fontSize : loadingEffect.fontSize
		    }
        }); 
		
		var option = {
			title : {
				text : options.title == undefined ? chart.title.text : '',
				// subtext : '纯属虚构'
				x : options.title_x ? options.title_x : setting.title_x
			},
			tooltip : {
				trigger : 'item',
				position : function(mouse_position) {
					var position = options.position;
		        	if(position == null||position == '')
		        		return [mouse_position[0] - 60, mouse_position[1] + 30];
		        		//return mouse_position;
		        	return position;
				},
				formatter : options.tooltip_formatter ?  options.tooltip_formatter : null
			},
			legend : {
				show : options.legend == undefined ? setting.legend : options.legend,
				x : options.legend_x ? options.legend_x : setting.legend_x,
			    y : options.legend_y ? options.legend_y : setting.legend_y,
				data : chart.legend
			},
			/*
			 * toolbox : { show : true, feature : { mark : { show : true }, dataView : { show : true, readOnly : false }, magicType : { show : true, type : [ 'line', 'bar' ] }, restore : { show : true }, saveAsImage : { show : true } } },
			 */
			calculable : false,
			grid : {
				x : options.grid_x ? options.grid_x : setting.grid_x,
				x2 : options.grid_x2 ? options.grid_x2 : setting.grid_x2,
				y : options.grid_y ? options.grid_y : setting.grid_y,
				y2 : options.grid_y2 ? options.grid_y2 : setting.grid_y2
			},
			xAxis : [ {
				//name : chart.xAxis.title.text,//luozhu 2016-2-26 add
				nameTextStyle : {fontSize : '14', fontWeight : 'bold' ,color : '#ff7f50'},//luozhu 2016-2-26 add
				type : 'category',
				axisLabel:{
					interval : options.axisLabel_interval == undefined ? "auto" : options.axisLabel_interval,
					rotate : options.axisLabel_rotate ? options.axisLabel_rotate : 0,
					margin : options.axisLabel_margin? options.axisLabel_margin : null,
					show : options.axisLabelshow == undefined ? true : options.axisLabelshow,
					formatter : options.xLabelFormatter ? options.xLabelFormatter : null
				},
				data : chart.xAxis.categories
			} ],
			yAxis : [ {
				//name : chart.yAxis.title.text,//luozhu 2016-2-26 add
				name : "金额 ("+options.unit ? options.unit : setting.unit+")",//luozhu 2016-2-26 add
				nameTextStyle : {fontSize : '14', fontWeight : 'bold' ,color : '#ff7f50'},//luozhu 2016-2-26 add
				axisLabel:{
					formatter:function(a){
						return formatMoney(a);
					}
				},
				type : 'value'
			} ],
			//2016-4-27 伍晓
			label: {
                normal: {
                	show: options.labelShow == undefined ? false : options.labelShow,
                    position: 'top',
                	//Wuxiao 2016-4-18
//    				formatter: function (params,ticket,callback) {
//    					var unit = options.unit != undefined ? options.unit : setting.unit;
//    		            return formatMoney(params.value) + unit;
//    		        }
                    formatter : options.labelFormatter ? options.labelFormatter : null
                }
            },
			/*
			 * series : [ { name : '蒸发量', type : 'bar', data : [ 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3 ], markPoint : { data : [ { type : 'max', name : '最大值' }, { type : 'min', name : '最小值' } ] }, markLine : { data : [ {
			 * type : 'average', name : '平均值' } ] } }, { name : '降水量', type : 'bar', data : [ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ], markPoint : { data : [ { name : '年最高', value : 182.2, xAxis : 7, yAxis : 183,
			 * symbolSize : 18 }, { name : '年最低', value : 2.3, xAxis : 11, yAxis : 3 } ] }, markLine : { data : [ { type : 'average', name : '平均值' } ] } } ]
			 */
			series : chart.series,
			noDataLoadingOption: noDataLoadingOption			
		};
		
		if (options.click_callback) {
			myChart.on('click', function(param) {
				options.click_callback(chart.xAxis.categories[param.dataIndex].split("_")[1]);
			});
//			myChart.on('dblclick', function(param) {
//				options.click_callback("haha");
//			});
		}
		
		clearTimeout(loadingTicket);
		var loadingTicket = setTimeout(function (){
			myChart.hideLoading();
			myChart.setOption(option);
		},loadingEffect.time);
		
/*		//自适应 fengzuhong
		window.addEventListener("resize", function () {
			myChart.resize();
        });*/
		
		
		if(window.addEventListener){
			//IE
			window.addEventListener("resize", function (){ myChart.resize();},false);
		}else{
			// 非IE
			window.attachEvent("resize", function () {myChart.resize();});
		}
};

var initBar2 = function(options, chart) {

	// 使用
		// 基于准备好的dom，初始化echarts图表
		var myChart = echarts.init(options.zone);
		
		myChart.showLoading({
			text : loadingEffect.text,
		    effect : loadingEffect.effect,
		    textStyle : {
		        fontSize : loadingEffect.fontSize
		    }
        }); 
		
		var option = {
			title : {
				text : options.title == undefined ? chart.title.text : '',
				// subtext : '纯属虚构'
				x : options.title_x ? options.title_x : setting.title_x
			},
			tooltip : {
				trigger : 'item',
				position : function(mouse_position) {
					var position = options.position;
		        	if(position == null||position == '')
		        		return mouse_position;
		        	return position;
				},
				formatter : options.tooltip_formatter ?  options.tooltip_formatter : null
			},
			legend : {
				show : options.legend == undefined ? setting.legend : options.legend,
				x : options.legend_x ? options.legend_x : setting.legend_x,
			    y : options.legend_y ? options.legend_y : setting.legend_y,
			    orient : options.orient == undefined ? 'horizontal' : options.orient,
				data : chart.legend
			},
			/*
			 * toolbox : { show : true, feature : { mark : { show : true }, dataView : { show : true, readOnly : false }, magicType : { show : true, type : [ 'line', 'bar' ] }, restore : { show : true }, saveAsImage : { show : true } } },
			 */
			calculable : false,
			grid : {
				x : options.grid_x ? options.grid_x : setting.grid_x,
				x2 : options.grid_x2 ? options.grid_x2 : setting.grid_x2,
				y2 : options.grid_y2 ? options.grid_y2 : setting.grid_y2		
			},
			yAxis : [ {
				show : options.yAxis_show == undefined ?  true : options.yAxis_show,
				//name : chart.xAxis.title.text,//luozhu 2016-2-26 add
				nameTextStyle : {fontSize : '14', fontWeight : 'bold' ,color : '#ff7f50'},//luozhu 2016-2-26 add
				type : 'category',
				axisLabel:{
					interval : options.axisLabel_interval == undefined ? "auto" : options.axisLabel_interval,
					show : options.axisLabelshow == undefined ? true : options.axisLabelshow,
//					formatter:function(text){
//						return text.split("_")[0];
//					}
					formatter : options.yLabelFormatter ? options.yLabelFormatter : null
				},
				data : chart.xAxis.categories
			} ],
			xAxis : [ {
				show : options.xAxis_show == undefined ? true : options.xAxis_show,
				//name : chart.yAxis.title.text,//luozhu 2016-2-26 add
				name : "金额 ("+options.unit ? options.unit : setting.unit+")",//luozhu 2016-2-26 add
				nameTextStyle : {fontSize : '14', fontWeight : 'bold' ,color : '#ff7f50'},//luozhu 2016-2-26 add
				axisLabel:{
					show : options.xAxisLabelshow == undefined ? true : options.xAxisLabelshow,
					formatter:function(a){
						return formatMoney(a);
					}
				},
				type : 'value'
			} ],
			//2016-4-27 伍晓
			label: {
                normal: {
                    show: options.labelShow == undefined ? false : options.labelShow,
                    position: 'left',
                	//Wuxiao 2016-4-18
    				formatter : options.labelFormatter ? options.labelFormatter : null
                }
            },
			/*
			 * series : [ { name : '蒸发量', type : 'bar', data : [ 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3 ], markPoint : { data : [ { type : 'max', name : '最大值' }, { type : 'min', name : '最小值' } ] }, markLine : { data : [ {
			 * type : 'average', name : '平均值' } ] } }, { name : '降水量', type : 'bar', data : [ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ], markPoint : { data : [ { name : '年最高', value : 182.2, xAxis : 7, yAxis : 183,
			 * symbolSize : 18 }, { name : '年最低', value : 2.3, xAxis : 11, yAxis : 3 } ] }, markLine : { data : [ { type : 'average', name : '平均值' } ] } } ]
			 */
			series : chart.series,
			noDataLoadingOption: noDataLoadingOption			
		};
		
		if (options.click_callback) {
			myChart.on('click', function(param) {
				options.click_callback(chart.xAxis.categories[param.dataIndex].split("_")[1]);
			});
//			myChart.on('dblclick', function(param) {
//				options.click_callback("haha");
//			});
		}
		
		clearTimeout(loadingTicket);
		var loadingTicket = setTimeout(function (){
			myChart.hideLoading();
			myChart.setOption(option);
		},loadingEffect.time);
		
/*		//自适应 fengzuhong
		window.addEventListener("resize", function () {
			myChart.resize();
        });*/
		
		
		if(window.addEventListener){
			//IE
			window.addEventListener("resize", function (){ myChart.resize();},false);
		}else{
			// 非IE
			window.attachEvent("resize", function () {myChart.resize();});
		}
};

var initLine = function(options, chart) {
	//luozhu 2016-2-26 add 用于判断chart.xAxis.title.text或chart.yAxis.title.text是否存在
	var xAxisName;//定义折线图x坐标轴的名称
	var yAxisName;//定义折线图y坐标轴的名称
	//判断折线图x坐标轴的名称是否为空
	if(isEmptyData(chart.xAxis)){
		xAxisName='';
	}else if(isEmptyData(chart.xAxis.title)){
		xAxisName='';
	}else if(isEmptyData(chart.xAxis.title.text)){
		xAxisName='';
	}else{
		xAxisName=chart.xAxis.title.text;
	}
	//判断折线图y坐标轴的名称是否为空
	if(isEmptyData(chart.yAxis)){
		yAxisName='';
	}else if(isEmptyData(chart.yAxis.title)){
		yAxisName='';
	}else if(isEmptyData(chart.yAxis.title.text)){
		yAxisName='';
	}else{
		yAxisName=chart.yAxis.title.text;
	}
	// 使用
		// 基于准备好的dom，初始化echarts图表
		var myChart = echarts.init(options.zone);
		
		myChart.showLoading({
			text : loadingEffect.text,
		    effect : loadingEffect.effect,
		    textStyle : {
		        fontSize : loadingEffect.fontSize
		    }
        }); 
		
		var option = {
			title : {
				text : options.title == undefined ? chart.title.text : '',
				// subtext: '纯属虚构'
				x : options.title_x ? options.title_x : setting.title_x
			},
			/*label: {
                normal: {
                    show: true,
                    position: 'top',
                	//Wuxiao 2016-4-18
    				formatter: function (params,ticket,callback) {
    					var unit = options.unit ? options.unit : setting.unit;
    		            return formatMoney(params.value) + unit;
    		        }
                }
            },*/
			tooltip : {
				trigger : 'axis',
				position : function(mouse_position) {
					var position = options.position;
					var mousex = options.position_mousex;
					var mousey = options.position_mousey;
		        	if(position == null||position == ''){
		        		if((mousex == null || mousex =='') && (mousey == null || mousey == '')){
		        			return [mouse_position[0] - 150, mouse_position[1] + 30];		        				        			
		        		} else{
		        			return [mouse_position[0] - mousex, mouse_position[1] + mousey];
		        		}
		        	}
		        		//return mouse_position;
		        	return position;
				}
			},
			legend : {
				show : options.legend == undefined ? setting.legend : options.legend,
				selected :  options.selected ? options.selected : setting.selected,
				x : options.legend_x ? options.legend_x : setting.legend_x,
				y : options.legend_y ? options.legend_y : setting.legend_y,
				orient : options.orient == undefined ? 'horizontal' : options.orient,
				data : chart.legend
			},
			dataZoom : {
				show : options.dataZoom == undefined ? setting.dataZoom : options.dataZoom,
				start : 95,
				end : options.dataZoom_end ? options.dataZoom_end : setting.dataZoom_end,
				orient : options.dataZoom_orient == undefined ? 'vertical' : options.dataZoom_orient
			},
			/*
			 * toolbox: { show : true, feature : { mark : {show: true}, dataView : {show: true, readOnly: false}, magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']}, restore : {show: true}, saveAsImage : {show: true} } },
			 */
			calculable : false,
			grid : {
				x : options.grid_x ? options.grid_x : setting.grid_x,
				x2 : options.grid_x2 ? options.grid_x2 : setting.grid_x2,
				y : options.grid_y ? options.grid_y : setting.grid_y,
				y2 : options.grid_y2 ? options.grid_y2 : setting.grid_y2
			},
			xAxis : [ {
				name : xAxisName,//luozhu 2016-2-26 add
				nameTextStyle : {fontSize : '14', fontWeight : 'bold' ,color : '#ff7f50'},//luozhu 2016-2-26 add
				type : 'category',
				boundaryGap : false,
				data : options.xAxis_data? options.xAxis_data : chart.xAxis.categories,
				axisLabel:{
					interval : options.axisLabel_interval == undefined ? "auto" : options.axisLabel_interval,
					rotate : options.axisLabel_rotate ? options.axisLabel_rotate : 0,
					margin : options.axisLabel_margin? options.axisLabel_margin : 8,
				    show : options.axisLabelshow == undefined ? true : options.axisLabelshow
				}
			} ],
			yAxis : [ {
				name : yAxisName,//luozhu 2016-2-26 add
				nameTextStyle : {fontSize : '14', fontWeight : 'bold' ,color : '#ff7f50'},//luozhu 2016-2-26 add
				type : 'value',
				min : options.yAxis_min? options.yAxis_min : 0,
				splitNumber : options.yAxis_splitNumber? options.yAxis_splitNumber : 5
			} ],
			/*
			 * series : [ { name:'邮件营销', type:'line', stack: '总量', data:[120, 132, 101, 134, 90, 230, 210] }, { name:'联盟广告', type:'line', stack: '总量', data:[220, 182, 191, 234, 290, 330, 310] }, { name:'视频广告', type:'line', stack: '总量', data:[150,
			 * 232, 201, 154, 190, 330, 410] }, { name:'直接访问', type:'line', stack: '总量', data:[320, 332, 301, 334, 390, 330, 320] }, { name:'搜索引擎', type:'line', stack: '总量', data:[820, 932, 901, 934, 1290, 1330, 1320] } ]
			 */
			series : options.seriesdata? options.seriesdata : chart.series,
			noDataLoadingOption: noDataLoadingOption
		};
		
		clearTimeout(loadingTicket);
		var loadingTicket = setTimeout(function (){
			myChart.hideLoading();
			myChart.setOption(option);
		},loadingEffect.time);
		
/*		//自适应 fengzuhong
		window.addEventListener("resize", function () {
			myChart.resize();
        });*/
		
		if(window.addEventListener){
			//IE
			window.addEventListener("resize", function (){ myChart.resize();},false);
		}else{
			// 非IE
			window.attachEvent("resize", function () {myChart.resize();});
		}
		
};

var initFunnel = function(options, chart) {
	
		
	var myChart = echarts.init(options.zone);
		
	myChart.showLoading({
		text : loadingEffect.text,
		effect : loadingEffect.effect,
		textStyle : {
			fontSize : loadingEffect.fontSize
		}
	}); 

	var option = {
			title : {
				text : options.title == undefined ? chart.title.text : '',
						x : options.title_x ? options.title_x : setting.title_x
			},
			tooltip : {
				trigger : 'item',
				 formatter: "{b} : {c}"
			},
			legend : {
				data : chart.legend
			},
			calculable : false,
			series : [ {
				name : chart.series[0].name,
				type : 'funnel',
				x: '10%',
	            y: 60,
	            y2: 60,
	            width: '80%',
	            //min: 0,
	            max: getFunnelMaxData(chart.series[0].data),
	            minSize: '0%',
	            maxSize: '100%',
	            sort : 'descending', // 'ascending', 'descending'
	            gap : 0,
	            itemStyle: {
	                normal: {
	                    // color: 各异,
	                    borderColor: '#fff',
	                    borderWidth: 1,
	                    label: {
	                        show: true,
	                        position: 'outside'//inside
	                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
	                    },
	                    labelLine: {
	                        show: false,
	                        length: 10,
	                        lineStyle: {
	                            // color: 各异,
	                            width: 1,
	                            type: 'solid'
	                        }
	                    }
	                },
	                emphasis: {
	                    // color: 各异,
	                    borderColor: 'red',
	                    borderWidth: 1,
	                    label: {
	                        show: true,
	                        formatter: '{b} : {c}',
	                        textStyle:{
	                            fontSize:10
	                        }
	                    },
	                    labelLine: {
	                        show: true
	                    }
	                }
	            },
				data : chart.series[0].data
			} ]
	};
		
	clearTimeout(loadingTicket);
	var loadingTicket = setTimeout(function (){
		myChart.hideLoading();
		myChart.setOption(option);
	},loadingEffect.time);
	
/*	//自适应 fengzuhong
	window.addEventListener("resize", function () {
		myChart.resize();
    });*/
	
	if(window.addEventListener){
		//IE
		window.addEventListener("resize", function (){ myChart.resize();},false);
	}else{
		// 非IE
		window.attachEvent("resize", function () {myChart.resize();});
	}
	
};

var initLoop = function(options, chart) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = echarts.init(options.zone);
		
		myChart.showLoading({
			text : loadingEffect.text,
		    effect : loadingEffect.effect,
		    textStyle : {
		        fontSize : loadingEffect.fontSize
		    }
        }); 
		
		var option = {
			title : {
				text : options.title == undefined ? chart.title.text : '',
				// subtext: '纯属虚构',
				x : options.title_x ? options.title_x : setting.title_x
			},
			tooltip : {
				trigger : 'item',
				//formatter : "{a} <br/>{b} : {c}元 ({d}%)"
				formatter : "{a} <br/>{b} : {c}"+((options.unitName||null)==null?"":options.unitName)+" ({d}%)"
			},
			legend : {
				show : options.legend == undefined ? setting.legend : options.legend,
				orient : options.optionLegend?options.optionLegend:'vertical',
				x : options.legend_x ? options.legend_x : setting.legend_x,
				y : options.legend_y ? options.legend_y : setting.legend_y,
				data : chart.legend
			},
			/*
			 * toolbox: { show : true, feature : { mark : {show: true}, dataView : {show: true, readOnly: false}, magicType : { show: true, type: ['pie', 'funnel'], option: { funnel: { x: '25%', width: '50%', funnelAlign: 'center', max: 1548 } } },
			 * restore : {show: true}, saveAsImage : {show: true} } },
			 */
			calculable : false,
			series : [ {
				name : chart.series[0].name,
				type : 'pie',
				radius : [ '50%', options.sizeY?options.sizeY:'70%' ],
				label: {
	                normal: {
	                    show: true,
	                    position: 'center',
	                    formatter: '{b}: {d}%'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '14',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: true,
	                    length : 50
	                }
	            },
				data : chart.series[0].data
			} ],
			noDataLoadingOption: noDataLoadingOption
		};

		clearTimeout(loadingTicket);
		var loadingTicket = setTimeout(function (){
			myChart.hideLoading();
			myChart.setOption(option);
		},loadingEffect.time);
		
/*		//自适应 fengzuhong
		window.addEventListener("resize", function () {
			myChart.resize();
        });*/
		
		if(window.addEventListener){
			//IE
			window.addEventListener("resize", function (){ myChart.resize();},false);
		}else{
			// 非IE
			window.attachEvent("resize", function () {myChart.resize();});
		}
		
};
/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * luozhu 2016-2-23 
 * @param num 数值(Number或者String)
 * @returns {String}  金额格式的字符串,如'1,234,567.45'
 */
function formatMoney(num) { 
	/*if(num==undefined||num==null||num==""||num=="0"){
		return "0";
	}else{
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
			cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
			num = num.substring(0,num.length-(4*i+3))+','+
			num.substring(num.length-(4*i+3));
		return (((sign)?'':'-') + num + '.' + cents);
	}*/
	return Number.fmoney(num);
}
/**
 * 判断str是否为null或者undefined
 * @param str 字符串
 * @returns 为空则为true
 */
function isEmptyData(str){
	if(undefined==str||null==str){
		return true;
	}else{
		return false;
	}
}


var getFunnelMaxData = function(data){
	var max = 0;
	for(var i=0;i<data.length;i++){
		if(data[i].value > max){
			max = data[i].value;
		}
	}
	return max;
};
