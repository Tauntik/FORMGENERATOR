<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>FormGenerator 1.0</title>
	<meta name="title" content="" />
	<meta name="keywords" content="" />
	<meta name="description" content="" />

	<link type="text/css" href="css/custom-theme/jquery-ui-1.8.14.custom.css" rel="stylesheet" />
	<link type="text/css" href="css/style.css" rel="stylesheet" />

	<script src="js/jquery-1.6.2.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery-ui-1.8.14.custom.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	
	<script type="text/javascript" src="js/jquery-contained-sticky-scroll-min.js"></script>
	
</head>

<body>

<div id="wrapper">

	<div id="header" class="ui-widget-header ui-corner-all">
		<img src="images/logo.png"/>
		<div align="right">
			LINKS: 
			<a href="?page=admin">ADMIN_PANEL</a>&nbsp;
			<a href="?page=form_browse">FORM_BROWSE</a>&nbsp;
			<a href="?page=form_edit&form_id=1">FORM_EDIT</a>&nbsp;
			<a href="?page=login">LOGIN</a>&nbsp;
		</div>
		<br/>
		{if $user.user_type}
			<div align="right"><a href="?page=admin">ADMIN_PANEL</a></div>
		{/if}
		
		{if $user.login}
			<div align="right">Вы вошли как {$user.login}, <a href="?page=logout">Выйти</a></div>
		{/if}
	</div><!-- #header-->

	<div id="middle">

		{block name="content"}It's a parent{/block}

	</div><!-- #middle-->

</div><!-- #wrapper -->

<div id="footer" class="ui-widget-header ui-corner-all">
	FOOTER
</div><!-- #footer -->

</body>
</html>