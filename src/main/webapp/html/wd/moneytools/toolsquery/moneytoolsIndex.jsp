<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<title>工具查看</title>
<meta charset="utf-8">
<meta name="decorator" content="window" />
<!-- 
<script type="text/javascript" src="potecustlist.js"></script>
 -->
<script type="text/javascript">
    var Global = {};
    Global.ctx = "<%=request.getContextPath()%>";
    function toDetail(url){
		window.location =Global.ctx + url ;
	}
</script> 
</head>
<body>
	<div class="row">
		<div class="col-md-12">
			<div class="widget-box">
				<div class="widget-header">
					<h4 class="smaller">
						存储工具<span id="selectOrgInfo" style="color: green"></span>
					</h4>
				</div>
				<div class="widget-body">
					<div class="widget-main">
						<div id="div_seacchCondition">
							<form class="form-horizontal" id="poteCustSearchForm" name="poteCustSearchForm" role="form">
								<div class="form-group">
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/deposit/OptionalDeposit.jsp')" href="javascript:void(0);">定活两便计算器</a>
									</div>
									 
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/deposit/currentDeposit.jsp')" href="javascript:void(0);">活期储蓄计算器</a>
									</div>
									
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/deposit/educationSavings.jsp')" href="javascript:void(0);">教育储蓄计算器</a>
									</div>
								</div>
								
								
								<div class="form-group">
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/deposit/lumpsumorinstallments.jsp')" href="javascript:void(0);">整(零)存整取计算器</a>
									</div>
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/deposit/lumpsumwithdrawinstallments.jsp')" href="javascript:void(0);">整存零取定期</a>
									</div>
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/deposit/lumpsumwithdrawinterestperiodically.jsp')" href="javascript:void(0);">存本取息定期</a>
									</div>
								</div>
								
								
							</form>
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="widget-box">
				<div class="widget-header">
					<h4 class="smaller">
						贷款工具<span id="selectOrgInfo" style="color: green"></span>
					</h4>
				</div>
				<div class="widget-body">
					<div class="widget-main">
						<div id="div_seacchCondition">
							<form class="form-horizontal" id="poteCustSearchForm" name="poteCustSearchForm" role="form">
								<div class="form-group">
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Loan/personCredit.jsp')" href="javascript:void(0);">贷款计算器</a>
									</div>
									
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Loan/compareBuyRental.jsp')" href="javascript:void(0);">购房租房净资产比较器</a>
									</div>
									
									<div class="col-md-4 col-sm-4">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Loan/advanceOwingOntheloan.jsp')" href="javascript:void(0);">提前还贷计算器</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			
			
			<div class="widget-box">
				<div class="widget-header">
					<h4 class="smaller">
						投资工具<span id="selectOrgInfo" style="color: green"></span>
					</h4>
				</div>
				<div class="widget-body">
					<div class="widget-main">
						<div id="div_seacchCondition">
							<form class="form-horizontal" id="poteCustSearchForm" name="poteCustSearchForm" role="form">
								<div class="form-group">
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Investment/purchaseFund.jsp')" href="javascript:void(0);">基金申购计算器</a>
									</div>
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Investment/redemptionFund.jsp')" href="javascript:void(0);">基金赎回计算器</a>
									</div>
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Investment/fundSubscription.jsp')" href="javascript:void(0);">基金认购计算器</a>
									</div>
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/Investment/bondSubscription.jsp')" href="javascript:void(0);">债券认购收益率计算器</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="widget-box">
				<div class="widget-header">
					<h4 class="smaller">
						外汇工具<span id="selectOrgInfo" style="color: green"></span>
					</h4>
				</div>
				<div class="widget-body">
					<div class="widget-main">
						<div id="div_seacchCondition">
							<form class="form-horizontal" id="poteCustSearchForm" name="poteCustSearchForm" role="form">
								<div class="form-group">
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/foreignexchange/forExchangeConvert.jsp')" href="javascript:void(0);">外币兑换计算器</a>
									</div>
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/financial/financialtool.jsp')"  href="javascript:void(0);">理财投资收益计算器</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			
			
			<div class="widget-box">
				<div class="widget-header">
					<h4 class="smaller">
						税费工具<span id="selectOrgInfo" style="color: green"></span>
					</h4>
				</div>
				<div class="widget-body">
					<div class="widget-main">
						<div id="div_seacchCondition">
							<form class="form-horizontal" id="poteCustSearchForm" name="poteCustSearchForm" role="form">
								<div class="form-group">
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/taxation/carBuying.jsp')" href="javascript:void(0);">购车相关税费计算器</a>
									</div>
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/taxation/houseBuyingTax.jsp')" href="javascript:void(0);">购房税费</a>
									</div>
									<div class="col-md-3 col-sm-3">
										<a onclick="toDetail('/html/wd/moneytools/toolsquery/taxation/personalIncomeTax.jsp')" href="javascript:void(0);">个人所得税</a>
									</div>
								</div>
									
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>