<%@ page contentType="text/html; charset=utf-8"%>
		<!-- basic scripts -->
		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='<%=request.getContextPath() %>/component/aceadmin/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/bootstrap.min.js"></script>

		<!-- ace scripts -->

		<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/ace-elements.min.js"></script>
		<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->
		<!-- dialog -->
		<script src="<%=request.getContextPath() %>/component/bootstrap-dialog/bootstrap-dialog.js"></script>
		<script src="<%=request.getContextPath() %>/js/plugin/dialog.js"></script>
		<!-- tree -->
		<script src="<%=request.getContextPath() %>/component/ztree/js/jquery.ztree.core-3.5.js"></script>
		<script src="<%=request.getContextPath() %>/component/ztree/js/jquery.ztree.exedit-3.5.js"></script>
		<script src="<%=request.getContextPath() %>/component/ztree/js/jquery.ztree.excheck-3.5.js"></script>
		<script src="<%=request.getContextPath() %>/js/plugin/asyncTree.js"></script>
		<!-- grid -->
		<script src="<%=request.getContextPath() %>/component/DataTables-1.10.0/media/js/jquery.dataTables.js"></script>

		<!-- <script src="<%=request.getContextPath() %>/component/dataTables/extras/FixedColumns/media/js/FixedColumns.js"></script> -->

		<script src="<%=request.getContextPath() %>/component/dataTables/Plug-ins/Pagination/custom.dataTable.pagination.js"></script>

		<script src="<%=request.getContextPath() %>/component/dataTables/dataTables.bootstrap.js"></script>

		<script src="<%=request.getContextPath() %>/js/plugin/grid.js"></script>
		<!-- combobox -->
		<script src="<%=request.getContextPath() %>/component/select2/select2-3.5.1/select2.js"></script>
		<script src="<%=request.getContextPath() %>/component/select2/select2-3.5.1/select2_locale_zh-CN.js"></script>
		<script src="<%=request.getContextPath() %>/js/plugin/combox.js"></script>
		<!-- bootstrap-datetimepicker -->
		<script src="<%=request.getContextPath() %>/component/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js"></script>
		<script src="<%=request.getContextPath() %>/component/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
		<!-- form -->
		<script src="<%=request.getContextPath() %>/js/plugin/form.js"></script>
		<!-- validate -->
		<script src="<%=request.getContextPath() %>/component/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.js"></script>
		<script src="<%=request.getContextPath() %>/js/plugin/validate.js"></script>
		<!-- file-input -->
		<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/chosen.jquery.min.js"></script>
		<script src="<%=request.getContextPath() %>/component/boostrap-fileinput/bootstrap.file-input.js"></script>

		<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/dropzone.min.js"></script>
		<!-- date -->
		<script src="<%=request.getContextPath() %>/js/plugin/date.js"></script>
		<!-- ajax -->
		<script src="<%=request.getContextPath() %>/js/plugin/ajax.js"></script>
		<!-- numeric -->
		<script src="<%=request.getContextPath() %>/js/plugin/numeric.js"></script>
		<!-- typeahead -->
		<script src="<%=request.getContextPath() %>/component/bootstrap-typeahead3/bootstrap3-typeahead.js"></script>
		<script src="<%=request.getContextPath() %>/component/bootstrap-typeahead3/bloodhound.js"></script>

		<%-- <script src="<%=request.getContextPath() %>/js/parameter.js"></script> --%>

		<!-- scrollLoading.js -->
		<script src="<%=request.getContextPath() %>/js/plugin/scrollLoading.js"></script>
<script>
//??????
$(".page-content,.modal-content,.widget-body").css({"background":"url('"+Global.ctx+"/servlet/watermark')"});
var _opt_flag =true;
//???????????????????????????
var loginBtn=$("#loginBtn");
var _opt_date = new Date();
function checkTimeout() {
	setInterval(function(){
		var now = new Date();
		//????????????session???????????????????????????????????????
		if(_opt_date&&loginBtn.length == 0){
			var minute=(now.getTime() - _opt_date.getTime()) / parseInt(60000)
			if(minute> _max_leisure_time){
				_opt_date = false;
				BootstrapDialog.show({
		            type: BootstrapDialog.TYPE_SUCCESS,
		            title: '??????',
		            message: "???????????????????????????,???????????????",
		            onhide : function(){
		            	ICRM.logout();
		            },
		            buttons: [{
		                label: '??????',
		                cssClass: 'btn-success',
		                action: function(dialogRef){
		                	ICRM.logout();
		                }
		            }]
		        }); 
			}
		}
	}, 5000);
};
var isCheckTimeout = true;
if (self.frameElement && self.frameElement.tagName == "IFRAME") {
	isCheckTimeout = false;
}
if(isCheckTimeout) {
	//checkTimeout();//?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
}

</script>