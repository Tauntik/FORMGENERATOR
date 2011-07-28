<?php
	if (!isset($_SESSION)) { 
		session_start();
	}
	
	require_once ('libs/smarty/Smarty.class.php');
	require_once ('include/user.class.php');
	
	$smarty = new Smarty;
	$page   = isset($_REQUEST['page'])?$_REQUEST['page']:'';
	
	switch ($page) {
		case 'form_egit':
			if(isset($_SESSION['id'])) {
				$smarty -> display('tpl/form_edit.tpl');
			}
		break;
		
		case 'login':
			$data = new user();
			$insite = $data->login($login, $password, $capcha);
			if ($insite&&isset($_SESSION['id'])) {
				header("Location: ?page=form_edit");		
			}
		//break;
		
		default:
			$smarty -> display('tpl/login.tpl');		
		break;
		
		
	}