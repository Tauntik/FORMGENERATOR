<?php
	if (!isset($_SESSION)) { 
		session_start();
	}
	if ((!isset($_SESSION['id'])) && (!isset($_REQUEST['page']))) {
		header ("Location: ?page=login");	
	}
	require_once ('libs/smarty/Smarty.class.php');
	require_once ('include/user.class.php');
	require_once ('include/form.class.php');
	
	$smarty = new Smarty;
	$smarty -> template_dir = 'tpl/';
	$page   = isset($_REQUEST['page'])?$_REQUEST['page']:'';
	$form   = new form();
	$data   = new user();

	// Обрабатываем различные ответы от клиента, переданные в POST массиве
	$request = isset ($_POST['request']) ? $_POST['request'] : '';
	if ($request) {
		switch ($request) {
			case 'save':
				// TODO: реализовать на клиенте отправку мне имени и id ведомства
				$name = isset ($_POST['name']) ? $_POST['name'] : '';
				$json = isset ($_POST['json']) ? $_POST['json'] : '';
				$sub_projectid = isset ($_POST['sub_projectid']) ? $_POST['sub_projectid'] : '';
				if ($name && $json && $sub_projectid) {
					$form -> save_form ($name, $json, $sub_projectid);
					if (!$form) {
						echo("Ошибка при сохраниении формы.");
					}
				}
				else {
					$smarty -> assign('error', 'Произошла ошибка при записи формы.');
					$smarty -> display('tpl/error.tpl');
				}
			break;
		
			case 'load':
				$name = isset ($_POST['name']) ? $_POST['name'] : '';
				$sub_projectid = isset ($_POST['sub_projectid']) ? $_POST['sub_projectid'] : '';
				if ($name && $sub_projectid) {
					$json = $form -> load_form ($name, $sub_projectid);
					echo($json);	// Передаем клиенту JSON
					exit();
				}
				else {
					$smarty -> assign('error', 'Произошла ошибка при записи формы.');
					$smarty -> display('tpl/error.tpl');				
				}
			break;
			
			case 'get_sub_projects':
				$id_project = isset($_POST['id_project']) ? $_POST['id_project'] : '';
				$sub_projects = $form -> get_sub_projects($id_project);
				echo ($sub_projects);
				exit();
			break;
			
			case 'get_forms':
				$id_sub_project = isset($_POST['id_sub_project']) ? $_POST['id_sub_project'] : '';
				$forms = $form -> get_forms($id_sub_project);
				echo ($forms);
				exit();
			break;
			
			default: 
			
			break;
		}
	}

		// DELETE
	//$form -> get_html_gosuslugi( "test", 1);
		// DELETE
		
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
		
		case 'form_browse':
			if(isset($_SESSION['id'])) {
				$projects = $form -> get_projects();
				$smarty -> assign ('projects', $projects);
				$smarty -> display('tpl/form_browse.tpl');
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
					header("Location: ?page=form_browse");
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
				header("Location: ?page=form_browse");
				exit();
			}
				$smarty -> assign('error', 'Такой страницы не существует!');
				$smarty -> display('tpl/'.$page.'.tpl');
		break;		
	}