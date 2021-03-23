(function($) {


    Date.prototype.format = function(format) {
        /*
         * eg:format="yyyy-MM-dd hh:mm:ss";
         */
        if(this.getTime() == 0){//判断等于空
            return "";
        }
        var o = {
            "M+" : this.getMonth() + 1, // month
            "d+" : this.getDate(), // day
            "h+" : this.getHours(), // hour
            "m+" : this.getMinutes(), // minute
            "s+" : this.getSeconds(), // second
            "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
            "S" : this.getMilliseconds() // millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    var setting = {
        language : 'zh-CN',
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        todayHighlight : 1,
        startView : 2,
        minView : 2,
        forceParse : 0,
        pickerPosition : "bottom-left"
    };


    /*
     * 参数配置,构造函数
     */
    $.fn.icrmDate = function(options) {
        var $this = $(this);
        var datetimepicker;
        //封装CRM日期选择控件 end 持续升级中，升级后写法案列：
        //<input name="xx" id="xx" type='text' class="form-control input-sm crm_date" data-date-format="yyyy-mm-dd" readonly="readonly"/>
        $this.each(function(){
            if($(this).hasClass('crm_date') && $(this).is("input")){//判断属性需要封装的条件
                if(!$(this).parent().hasClass("date")){
                    $(this).wrap(function() {
                        return "<div class='input-group date'  data-date-format='"+ $(this).attr("data-date-format") +"'>";
                    });
                    $(this).after("<span class=\"input-group-addon input-sm\"> <span class=\"glyphicon glyphicon-calendar icon-calendar\"></span></span>");
                }
            }else{//兼容老版本
                $(this).parent().attr("data-date-format",$(this).attr("data-date-format")).addClass("date");
                $(this).next("span").remove();
                $(this).after("<span class='input-group-addon input-sm'> <span class='glyphicon glyphicon-calendar icon-calendar'></span></span>");
            }

            var opts = $.extend(true, {}, setting, options);
            var dateFormat=$(this).attr("data-date-format");
            if(dateFormat.toLowerCase().indexOf('hh:ii')>0){
                opts.minView=0;//兼容选择 时间
            }
            $(this).parent().datetimepicker(opts).on('changeDate',opts.changeDate);
            //zhfeng 添加清空功能
            var data = $(this).parent().data('datetimepicker');
            var picker = data.picker;
            var today = $(picker).find("tfoot .today");
            today.attr("colspan",3);
            if($(picker).find("tfoot .clean").length == 0){
                today.after("<th colspan=\"1\"></th><th class=\"clean\" colspan=\"3\">清空</th>");
                $(picker).find("tfoot .clean").on('click',function(){
                    self.find("input").val('');
                    self.val('');
                    picker.hide();
                });
            }
            //zhfeng 添加清空功能
            var self = $(this);
            $(this).next().on("click", function(){
                //点击图标也显示日期控件
                //picker.show();
                self.val("");
            });//升级后删除原有清空功能
        });
        return datetimepicker;
    };


    /**
     * 时间范围选择
     * 选择开始时间后，结束时间添加起始时间为开始时间
     * 选择结束时间后，开始时间添加结束时间为结束时间
     */
    $.extend({
        icrmDatepickerRangeChange:function(start,end){
            //var dateSelector = $(this).selector.split(",");
            var $start = $(start);
            var $end = $(end);

            var startVal=$start.val();
            var endVal=$end.val();

            if($start.hasClass('crm_date')){//绑定到父级div上的
                $start = $start.parent();
                $end = $end.parent();
            }
            //初始化日期设置值
            if(!ICRM.isEmpty(startVal,true)){
                $end.datetimepicker('setStartDate', startVal);
            }
            if(!ICRM.isEmpty(endVal,true)){
                $start.datetimepicker('setEndDate', endVal);
            }

            $start.on("changeDate",function (e) {//选择开始时间后，结束时间添加起始时间为开始时间
                $end.datetimepicker('setStartDate', e.date);
            });
            $end.on("changeDate",function (e) {//选择结束时间后，开始时间添加结束时间为结束时间
                $start.datetimepicker('setEndDate', e.date);
            });
        }
    });
})(jQuery);