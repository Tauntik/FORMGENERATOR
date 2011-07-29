<?php

require_once("db.class.php");

class form {
	
	private $sql = '';		// Строка запроса

	// Сохранить форму, которую нам отправил пользователь
	public function save_form ($name, $json, $sub_projectid) {
		if (!isset($_SESSION)) session_start();
		db::db_connect();
		$this -> sql = "INSERT INTO forms SET name = '$name', json = '$json', userid = '{$_SESSION['id']}', sub_projectid = '$sub_projectid' on duplicate key update json = '$json'";
		if (db::mq($this -> sql) === true) {
			return true;
		}
		else {
			return false;
		}
	}

	// Взять из БД форму и отдать ее клиенту
	public function load_form ($name, $sub_projectid) {
		$json = $this -> get_json($name, $sub_projectid);
		return $json;	// Возвращаем $json строку или false
	}

	// Загружаем .xls файл, парсим его в JSON и отдаем клиенту
	public function getset_xls () {
		
	}
	
	// Отдаем пользователю html код формы
	public function get_html ($name, $sub_projectid) {
		$json = $this -> get_json($name, $sub_projectid);
    	$array_json = json_decode($json);
		print_r($array_json);
	}
	
	// Отдаем пользователю html код формы без заголовков в стиле gosuslugi.ru
	public function get_html_gosuslugi ($name, $sub_projectid) {
		$count_elem_on_tr = 0;		// Количество элементов на странице
		$html = '<table>';
		$json = $this -> get_json($name, $sub_projectid);
    	$array_json = json_decode($json);
		foreach ($array_json as $k => $field) {
			$count_elem_on_tr++ ;
			if ($field -> elem_columns == $count_elem_on_tr) {
				$html .= "<tr>";
			}
			$html .= "<td>";
			switch ($field -> type) {
				case 'my_elem_title':
				break;
				case 'my_elem_title_small':
					$html .= "<input type = '{$field -> title}' type = '{$field -> title}' ";
				break;
				case 'my_elem_hr':
					$html .= "<hr>";
				break;
				case 'my_elem_text':
					$html .= "<input type = '{$field -> title}' type = '{$field -> title}' ";
				break;
				case 'my_elem_textarea':
				break;
				case 'my_elem_file':
				break;
				case 'my_elem_date':
				break;
				case 'my_elem_select':
				break;
				case 'my_elem_checkbox':
				break;
				case 'my_elem_radio':
				break;
				case 'my_elem_title':
				break;
				case 'my_elem_button':
				break;
				default:
				break;
			}
			$html .= "</td>";
			if ($field -> elem_columns == $count_elem_on_tr) {
				$html .= "</tr>";
			}
				print_r($field);echo("<br><br>");
		}
	}
	
	// Получает json
	private function get_json ($name, $sub_projectid) {
		db::db_connect();
		$this -> sql = "SELECT json FROM forms WHERE name = '$name' and sub_projectid='$sub_projectid'";
		$res = db::mq($this -> sql);
		if ($r = mysql_fetch_assoc($res)) {
			return $r['json'];
		}
		else {
			return false;
		}
	}
	// Получить все доступные проекты
	public function get_projects () {
		$projects = array();
		db::db_connect();
		$this -> sql = "SELECT * FROM projects";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$projects[] = $r;
		}
		return $projects;
	}
	
	// Получить все доступные формы ведомства
	public function get_sub_projects ($projectid) {
		$projects = array();
		db::db_connect();
		$this -> sql = "SELECT * FROM sub_projects WHERE projectid = $projectid";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$sub_projects[] = $r;
		}
		return $sub_projects;
	}
	
	// Получить все доступные формы пользователю в зависимости от того, к каким проектам он привязан
	public function get_forms ($sub_projectid) {
		$forms = array();
		db::db_connect();
		// Проверка доступности для данного проекта
		$this -> sql = "SELECT projectid FROM user_projects WHERE id = {$_SESSION['id']}";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$allow_projects[] = $r['projectid'];
		}
		
		// Получаем формы
		$this -> sql = "SELECT id, name FROM forms WHERE sub_projectid = $sub_projectid";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$forms[] = "<option value='{$r['id']}'>{$r['name']}</option>;
		}
		return $forms;
	}
}