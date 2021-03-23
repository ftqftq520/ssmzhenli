<%@ page contentType="text/html; charset=utf-8"%>
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge" /> -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="author" content="hylandtec"/>
<!-- <meta http-equiv="X-UA-Compatible" content="IE=7,IE=9,IE=10" /> -->
<%
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragrma","no-cache");
response.setDateHeader("Expires",0);
if (application.getAttribute("ctx") == null) {
	application.setAttribute("ctx", request.getContextPath());
}
%>

<!-- basic styles -->
<link href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/font-awesome.min.css" />

<!--[if IE 7]>
  <link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/font-awesome-ie7.min.css" />
<![endif]-->

<!-- ace styles -->
<!-- 文件上传 -->
<link href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/dropzone.css" rel="stylesheet" type="text/css">

<link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/ace.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/cy.css" />
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/ace-rtl.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/ace-skins.min.css" />

<link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/chosen.css">

<!--[if lte IE 8]>
  <link rel="stylesheet" href="<%=request.getContextPath() %>/component/aceadmin/assets/css/default/ace-ie.min.css" />
<![endif]-->

<!-- ace settings handler -->
<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/ace-extra.min.js"></script>
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/html5shiv.js"></script>
<script src="<%=request.getContextPath() %>/component/aceadmin/assets/js/respond.min.js"></script>
<![endif]-->
<!--[if !IE]> -->
<script type="text/javascript">
	window.jQuery || document.write("<script src='<%=request.getContextPath() %>/component/aceadmin/assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
</script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
	window.jQuery || document.write("<script src='<%=request.getContextPath() %>/component/aceadmin/assets/js/jquery-1.10.2.min.js'>"+"<"+"/script>");
</script>
<![endif]-->

<!-- 公用js -->
<script src="<%=request.getContextPath() %>/js/common.js"></script>
<!-- tree -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<style type="text/css">
.ztree li span.button.pIcon01_ico_open{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/1_open.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.pIcon01_ico_close{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/1_close.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon01_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/2.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon02_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/3.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon03_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/4.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon04_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/5.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon05_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/6.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon06_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/7.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon07_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/8.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon08_ico_docu{margin-right:2px; background: url(<%=request.getContextPath() %>/component/ztree/css/zTreeStyle/img/diy/9.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
</style>  
<!-- combobox -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/select2/select2-3.5.1/select2.css">
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/select2/select2-3.5.1/select2-bootstrap.css">
<!-- bootstrap-datetimepicker -->
<link href="<%=request.getContextPath() %>/component/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<!-- dialog -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/component/bootstrap-dialog/bootstrap-dialog.css">

<link rel="stylesheet" href="<%=request.getContextPath() %>/component/dataTables/dataTables.bootstrap.css">

<!-- validate -->
<link href="<%=request.getContextPath() %>/component/bootstrapvalidator-0.4.5/dist/css/bootstrapValidator.css" type="text/css" media="screen" rel="stylesheet" />
<!-- icrm commUI css -->
<link href="<%=request.getContextPath() %>/css/default/commUI.css" type="text/css" media="screen" rel="stylesheet" />
<!-- menu css -->
<link href="<%=request.getContextPath() %>/css/default/menu.css" type="text/css" media="screen" rel="stylesheet" />
<link href="<%=request.getContextPath() %>/css/default/body.css" type="text/css" media="screen" rel="stylesheet" />