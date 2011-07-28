<?php
	if (!isset($_SESSION)) { 
		session_start();
	}
	
	require_once ('libs/smarty/Smarty.class.php');
	require_once ('include/user.class.php');
	
	$smarty = new Smarty;
	$template_dir = 'tpl/';
	$page   = isset($_REQUEST['page'])?$_REQUEST['page']:'';
	
	switch ($page) {
		case 'form_egit':
			if(isset($_SESSION['id'])) {
				$smarty -> display('tpl/form_edit.tpl');
			}
		break;
		
		case 'login':
			$data     = new user();
			
			$login    = isset($_POST['login'])?$_POST['login']:'';
			$password = isset($_POST['password'])?$_POST['password']:'';
			$capcha   = isset($_POST['capcha'])?$_POST['capcha']:'';
			if ($login && $password && $capcha) {
				// Логинимся
				$insite = $data->login($login, $password, $capcha);
				if ($insite&&isset($_SESSION['id'])) {
					header("Location: ?page=form_edit");		
				}
			}
			else {
				
			}
		//break;
		
		default:
			$smarty -> display('tpl/login.tpl');		
		break;
		
		
	}