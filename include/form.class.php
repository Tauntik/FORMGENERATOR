<?php

require_once("db.class.php");

class form {
	
	private $sql = '';		// Строка запроса

	// Сохранить форму, которую нам отправил пользователь
	public function save_form ($formid, $json) {
		if (!isset($_SESSION)) session_start();
		db::db_connect();
		$this -> sql = "UPDATE forms SET json = '$json' WHERE id = $formid ";
		if (db::mq($this -> sql) === true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public function create_form ($name, $sub_projectid) {
		if (!isset($_SESSION)) session_start();
		db::db_connect();
		$this -> sql = "INSERT INTO forms SET name = '$name', json = '', userid = '{$_SESSION['id']}', sub_projectid = '$sub_projectid'";
		db::mq($this -> sql);
		$formid = mysql_insert_id();
		return $formid;
	}

	// Взять из БД форму и отдать ее клиенту
	public function load_form ($formid) {
		$json = $this -> get_json($formid);
		return $json;	// Возвращаем $json строку или false
	}

	// Загружаем .xls файл, парсим его в JSON и отдаем клиенту
	public function getset_xls () {
		
	}
	
	// Отдать количество шагов клиенту
	public function get_max_step ($formid) {
		$max_step = 0;
		$array_json = $this -> get_html($formid);
		if (!$array_json) return false;
		foreach ($array_json as $k => $v) {
			foreach ($v as $key => $value) {
				if (($key == 'step') && ($value > $max_step)) {
					$max_step = $value;
				}
			}
		}
		return $max_step;
	}
	
	// Отдать максимальное количество колонок клиенту
	public function get_array_max_columns ($formid) {
		$array_max_columns = array();
		$array_json = $this -> get_html($formid);
		if (!$array_json) return false;
		foreach ($array_json as $k => $v) {
			foreach ($v as $key => $value) {
				if (($key == 'step') && ($value > $max_step)) {
					$max_step = $value;
				}
			}
		}
		return $max_step;
	}
	
	// Формируем массив, где ключ = шаг, значение - массив всех объектов первого шага
	public function get_array_steps_key ($formid) {
    	$array_json = (array) $this -> get_html($formid);
		foreach ($array_json as $k => $v) {
			$array_json[$k] = (array) $v;
		}
		
		// Создаем массив
		foreach ($array_json as $k => $v) {
			$array_values[$v['step']][] = $v;
		}
		return $array_values;
	}

	// Отдаем клиенту массив json
	public function get_html ($formid) {
		$array_json =array();
		$json = $this -> get_json($formid);
    	$array_json = json_decode($json);
		if (!count($array_json)) return false;
		foreach ($array_json as $k => $v) {
			foreach ($v as $kk => $vv) {
				if (!$vv) {
					unset($array_json[$k] -> $kk);
				}
			}
		}
		return $array_json;
	}
	
	// Отдаем пользователю html код формы без заголовков в стиле gosuslugi.ru
	public function get_html_gosuslugi ($formid) {
	//	$count_elem_on_tr = 0;		// Количество элементов на странице
	//	$html = '<table>';
		$json = $this -> get_json($formid);
    	$array_json = json_decode($json);
		
		return $array_json;
		
/*		//$scripts .= "<script type='text/javascript'>\n";
		$scripts .= "// заполняем массив values для вывода 'примера заполнения' и подсказок\n";
		foreach ($array_json as $k => $v) {
			if ($v -> elem_example) {
				$scripts .= "values.push (new Array('{$v -> elem_id}', '{$v -> elem_example}') );\n";
			}
		}
		$scripts .= "\n";
		
		$scripts .="// показывает/скрывает пример заполнения
		function show_hide_example() {
			if ($(\"#show_example_container\").is(\":visible\")) {
				showExample();
				$(\"#show_example_container\").hide();
				$(\"#hide_example_container\").show();
			} else {
				clearForm();
				$(\"#show_example_container\").show();
				$(\"#hide_example_container\").hide();
			}
		}\n";

		echo($scripts);

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
		*/
	}
	
	// Получает json
	private function get_json ($formid) {
		db::db_connect();
		$this -> sql = "SELECT json FROM forms WHERE id = '$formid'";
		$res = db::mq($this -> sql);
		if ($r = mysql_fetch_assoc($res)) {
			return $r['json'];
		}
		else {
			return false;
		}
	}
	
	// Получить все доступные проекты для текущего пользователя
	public function get_allow_projects ($userid = 0) {
		if (!$userid) $userid = $_SESSION['id'];
		$allow_projects = array();
		$projects = array();
		
		db::db_connect();

		$this -> sql = "SELECT * FROM users_projects where userid = $userid";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$allow_projects[] = $r['projectid'];
		}

		if (count($allow_projects)) {
			foreach ($allow_projects as $v) {
				$this -> sql = "SELECT * FROM projects";
				$res = db::mq($this -> sql);
				while ($r = mysql_fetch_assoc($res)) {
					if (in_array($r['id'], $allow_projects)) {
						$projects[] = $r;
					}
				}
				return $projects;
			}
		}
	}
	
	// Получить все доступные формы ведомства
	public function get_sub_projects ($projectid, $with_options = true) {
		$sub_projects_ids = array();
		$sub_projects = "<option value='0'>Не выбрано</option>";
		db::db_connect();
		$this -> sql = "SELECT * FROM sub_projects WHERE projectid = $projectid";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$sub_projects_ids[] = $r['id'];
			$sub_projects .= "<option value='{$r['id']}'>{$r['name']}</option>";
		}
		if ($with_options) {
			return $sub_projects;
		}
		else {
			return $sub_projects_ids;
		}
	}
	
	// Получить все доступные формы пользователю в зависимости от того, к каким проектам он привязан
	public function get_forms ($sub_projectid) {
		$allow_projects     = array();
		$allow_sub_projects = array();
		
		$forms = "<option value='0'>Не выбрано</option>";
		db::db_connect();
		// Проверка доступности для данного проекта
		$this -> sql = " select * from users_projects where userid = {$_SESSION['id']}";
		$res = db::mq($this -> sql);
		if (mysql_num_rows($res)) {
			while ($r = mysql_fetch_assoc($res)) {
				$allow_projects[] = $r['projectid'];
			}
		}
		if (count($allow_projects)) {
			foreach ($allow_projects as $v) {
				$this -> sql = " select * from sub_projects where projectid = $v";
				$res = db::mq($this -> sql);
				if (mysql_num_rows($res)) {
					while ($r = mysql_fetch_assoc($res)) {
						$allow_sub_projects[] = $r['id'];
					}
				}
			}
		}
		
		// Получаем формы
			$this -> sql = "SELECT id, name FROM forms WHERE sub_projectid = $sub_projectid";
			$res = db::mq($this -> sql);
			while ($r = mysql_fetch_assoc($res)) {
				$forms .= "<option value='{$r['id']}'>{$r['name']}</option>";
			}
		return $forms;
	}
		
	// Получает полный список проектов
	function get_projects () {
		$options = "<option value='0'>Не выбрано</option>";
		db::db_connect();		
		$this -> sql = "SELECT * FROM projects";
		$res = db::mq($this -> sql);
		while ($r = mysql_fetch_assoc($res)) {
			$options .= "<option value='{$r['id']}'>{$r['name']}</option>";
		}
		return ($options) ;
	}
	
	function check_allow_form ($userid, $formid) {
		$allow_subprj = array();
		$allow_prj = $this -> get_allow_projects ($userid);
		foreach ($allow_prj as $k => $v) {
			$allow_subprj[] = $this -> get_sub_projects ($v['id'], false);
		}
		db::db_connect();		
		$this -> sql = "SELECT sub_projectid FROM forms WHERE id=$formid";
		$res = db::mq($this -> sql);
		if (!mysql_num_rows($res)) {
			return false;
		}
		$formsubid = mysql_result($res,0,0);
		foreach ($allow_subprj  as $arr_prj) {
			if(in_array($formsubid, $arr_prj)) {
				$gut = true;
			}
		}
		if($gut) {
			return true;
		}
		else {
			return false;
		}
	}
}