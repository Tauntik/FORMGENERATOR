<?php
	if (!isset($_SESSION)) { 
		session_start();
	}
	if ((!isset($_SESSION['id'])) && (!isset($_REQUEST['page']))) {
		header ("Location: ?page=login");	
	}

	require_once ('libs/smarty/Smarty.class.php');
	require_once ('include/user.class.php');
	
	$smarty = new Smarty;
	$smarty -> template_dir = 'tpl/';
	$page   = isset($_REQUEST['page'])?$_REQUEST['page']:'';
	$data     = new user();				
	
	switch ($page) {
		
		case 'form_edit':
			if(isset($_SESSION['id'])) {
				$user = $data -> get_array_user($_SESSION['id']);
				if(!count($user)) {
					$smarty -> assign('error', 'Такого пользователя не существует!');
					$smarty -> display('tpl/error.tpl');
					exit();
				}
				$smarty -> assign ('user',$user);
				$smarty -> display('tpl/form_edit.tpl');
			}
			else {
				header("Location: ?page=login");
			}
		break;
		
		case 'login':
			$login    = isset($_POST['login'])?$_POST['login']:'';
			$password = isset($_POST['password'])?$_POST['password']:'';
			$capcha   = isset($_POST['capcha'])?$_POST['capcha']:'';
			if (!$login||!$password||!$capcha) {
				$smarty -> display ('tpl/login.tpl');
			}
			else {
				// Логинимся
				$insite = $data->login($login, $password, $capcha);
				if ($insite&&isset($_SESSION['id'])) {
					header("Location: ?page=form_edit");
				}
				else {
					$smarty -> assign('error_message', 'Вы ввели неверно авторизационные данные');
					$smarty -> display ('tpl/login.tpl');
				}
			}
		break;
		
		case 'logout':
			$data -> logout();
			header("Location: ?page=login");
		break;
		
		default:
			if (isset($_SESSION['id'])) {
				header("Location: ?page=form_edit");
				exit();
			}
				$smarty -> assign('error', 'Такой страницы не существует!');
				$smarty -> display('tpl/error.tpl');
		break;		
	}