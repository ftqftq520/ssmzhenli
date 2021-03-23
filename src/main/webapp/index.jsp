<html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Language" content="zh-CN" />
<body>
<%--<h2 id = 'ss'>Hello World!</h2>--%>
</body>
<%--<input id="banniu" type="button" onclick="tt()" value="替换">--%>
<%--<table id="table_id_example" class="display">--%>
    <%--<thead>--%>
    <%--<tr>--%>

    <%--</tr>--%>
    <%--</thead>--%>
<%--<tbody></tbody>--%>
<%--</table>--%>
<div id="main" style="width: 1200px;height:400px;"></div>
</html>
<script src="jquery-3.5.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="./datatable/jquery.dataTables.min.css">
<script type="text/javascript" charset="utf8" src="./datatable/jquery.dataTables.min.js"></script>
<script src="echarts.min.js"></script>


<script type="text/javascript" >
    $(document).ready( function () {
//        $('#table_id_example').DataTable();
        tt();
        $('#table_id_example').dataTable( {
            "ajax": {
                "url": "/getSanseqiu.do",
                "type":"post",
                "dataSrc": "data"
            },
            "columns": [
                { "title" : "姓名",

                    "data": "name"
                },
                { "title" : "年龄",

                    "data": "age"
                }
            ]
        } );
    } );

    function tt() {
     $.post(
         "/getEcahrt.do",
         {name: 'Brad'},
         function(data) {
             console.log(data)
             init(data.Arr)
         },
         "json"
     );
 }

 function init(Arr) {
     var myChart = echarts.init(document.getElementById('main'));

     // 指定图表的配置项和数据
     var option = {
         title: {
             text: 'ECharts 入门示例'
         },
         tooltip: {},
         legend: {
             data:['销量']
         },
         xAxis: {
             data: ["1","2","3","4","5",
                 "6","7","8","9","10",
                 "11","12","13","14","15",
                 "16","17","18","19","20",
                 "21","22","23","24","25",
                 "26","27","28","29","30",
                 "31","32","33","34","35"]
         },
         yAxis: {},
         series: [{
             name: '销量',
             type: 'bar',
             data:Arr
         }]
     };

     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);

 }

</script>
