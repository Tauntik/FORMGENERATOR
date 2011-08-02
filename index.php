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
				$formid = isset ($_POST['form_id']) ? $_POST['form_id'] : '';
				$json = isset ($_POST['json']) ? $_POST['json'] : '';
				if ($formid && $json) {
					$form -> save_form ($formid, $json);
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
				$formid = isset ($_REQUEST['form_id']) ? $_REQUEST['form_id'] : '';
				if ($formid) {
					$json = $form -> load_form ($formid);
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
			
			case 'get_user_in_project':
				$userid = isset($_POST['id_user']) ? $_POST['id_user'] : '';
				$projectid = isset($_POST['id_project']) ? $_POST['id_project'] : '';
				$user_in_project = $data -> user_in_project($userid, $projectid, false);		// true если доступен проект и false если недоступен
				echo ($user_in_project);
				exit();
			break;
			
			case 'set_user_in_project':
				$userid = isset($_POST['id_user']) ? $_POST['id_user'] : '';
				$projectid = isset($_POST['id_project']) ? $_POST['id_project'] : '';
				$user_in_project = $data -> user_in_project($userid, $projectid, true);		// если успешная операция true, иначе - false
				echo ($user_in_project);
				exit();
			break;
			
			case 'delete_user':
				$userid = isset($_POST['id_user']) ? $_POST['id_user'] : '';
				$result_delete = $data -> user_delete($userid);		// если удалили "deleted", "еrror" если не удалили
				echo($result_delete);
				exit();
			break;
			
			case 'add_user':
				$login = isset($_POST['user_login']) ? $_POST['user_login'] : '';
				$email = isset($_POST['user_email']) ? $_POST['user_email'] : '';
				$name = isset($_POST['user_name']) ? $_POST['user_name'] : '';
				$result_add = $data -> user_add($login, $email, $name);		// если удалили "deleted", "еrror" если не удалили
				$result_add = base64_encode($result_add);
				header("Location: ?page=admin&error=$result_add");
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
				$json = '';
				$user = $data -> get_array_user($_SESSION['id']);
				if(!count($user)) {
					$smarty -> assign('error', 'Такого пользователя не существует!');
					$smarty -> display('tpl/error.tpl');
					exit();
				}
				if (isset($_REQUEST['form_id']) && $_REQUEST['form_id']) {
					$form -> load_form ($_REQUEST['form_id']);
				}
				$smarty -> assign ('user', $user);
				$smarty -> display('tpl/form_edit.tpl');
			}
			else {
				header("Location: ?page=login");
			}
		break;
		
		case 'form_create':
			if(isset($_SESSION['id'])) {
				$name = isset($_REQUEST['new_form_name']) ? $_REQUEST['new_form_name'] : '';
				$sub_projectid = isset($_REQUEST['id_sub_project']) ? $_REQUEST['id_sub_project'] : '';
				$formid = $form -> create_form ($name, $sub_projectid);				
				header("Location: ?page=form_edit&form_id=$formid");
			}
			else {
				header("Location: ?page=login");
			}
		break;
		
		case 'form_browse':
			if(isset($_SESSION['id'])) {
				$projects = $form -> get_allow_projects();
				$smarty -> assign ('projects', $projects);
				$user = $data -> get_array_user($_SESSION['id']);
			}
			else {
				header("Location: ?page=login");
			}
		break;
		
		case 'login':
			$login    = isset($_POST['login'])?$_POST['login']:'';
			$password = isset($_POST['password'])?$_POST['password']:'';
			$capcha   = isset($_POST['capcha'])?$_POST['capcha']:'';
			if (!$login&&!$password&&!$capcha) {
				$smarty -> display ('tpl/login.tpl');
			}
			else {
				// Логинимся
				$insite = $data->login($login, $password, $capcha);
				if ($insite&&isset($_SESSION['id'])) {
					$smarty -> assign ('user', $user);
					$smarty -> display('tpl/form_browse.tpl');
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
		
		case 'admin':
			$users    = $data -> get_users();
			$projects = $form -> get_projects();
			$smarty -> assign('users', $users);
			$smarty -> assign('projects', $projects);	
			$error = isset($_REQUEST['error']) ? $_REQUEST['error'] : '';
			$smarty -> assign("add_user_message", $error);	
			$smarty -> display ('tpl/admin.tpl');
		break;
		
		default:
			if (!isset($_SESSION['id'])) {
				header("Location: ?page=form_browse");
				exit();
			}
			if($page) {
				$smarty -> assign('error', 'Такой страницы не существует!');
				$smarty -> display('tpl/'.$page.'.tpl');
			}
		break;		
	}