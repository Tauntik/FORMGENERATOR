<?php

require_once("db.class.php");

class user {	
	
	private $sql = ''; 			// запрос в БД.
	private $salt = 'fg'; 		// соль
	
	//Типы пользователей
	//private $USER_TYPE_NONE  = 0;
	//private $USER_TYPE_ADMIN = 1;
	
	private $user_types_array = array (
		0 => 'Пользователь',
		1 => 'Админ'
	);
	
	// Авторизация на сайт
	public function login ($login, $password, $capcha) {
		$captcha_check = false;
		if (!isset($_SESSION)) session_start();
		if (isset($capcha)) {
			if ((isset($_SESSION['random_string'])) && ($capcha)) {
				if ($capcha == $_SESSION['random_string']) {
					$captcha_check = true;
					unset($_SESSION['random_string']);
				}
			}
		}

		if($captcha_check) {
			db::db_connect();
			$password_md5 = md5($password.md5($this -> salt));
			$this->sql = "SELECT * from users WHERE login = '$login' and password = '$password_md5' and active = 1";
			$result = db::mq($this->sql);
			if ($r = mysql_fetch_assoc($result)) {
				$_SESSION['id'] = $r['id'];
				$_SESSION['email'] = $r['email'];
				return true;	// Все успешно, возвращаем правду
			}
			else {
				return false;		// Что-то не сощлось. Юзер - лох.
			}
		}
		return false;		// Что-то не сощлось. Юзер - лох.
	}
	
	// Выходим из сайта
	public function logout () {
		if (!isset($_SESSION)) session_start();
		if (isset($_SESSION)&& count($_SESSION)>0) {
			foreach ($_SESSION as $k => $v) {
				unset($_SESSION[$k]);
			}
		}
	}
	
	// Получаем массив $user текущего пользователя
	public function get_array_user($user_id) {
		$user = array();
		db::db_connect();
		$this->sql = "SELECT * from users WHERE id = '$user_id'";
		$result = db::mq($this->sql);
		if ($r = mysql_fetch_assoc($result)) {
			$user = $r;
		}
		if(isset($user['password'])) unset ($user['password']);
		return $user;
	}
	
	// Функция возвращает true если пользователю доступен проект и false если нет.
	public function user_in_project ($userid, $projectid, $change = false) {
		db::db_connect();
		$this->sql = "SELECT * from users_projects WHERE userid = '$userid' and projectid = '$projectid'";
		$result = db::mq($this->sql);
		if (mysql_num_rows($result)) {
			if(!$change) {
				return true;
			}
			else {
				$this->sql = "DELETE FROM users_projects WHERE userid = '$userid' and projectid = '$projectid'";
				$result = db::mq($this->sql);
				if (mysql_affected_rows()) {
				return true;
				}
			}
		}
		else {
			if(!$change) {
				return false;
			}
			else {
				$this->sql = "INSERT INTO users_projects SET userid = '$userid', projectid = '$projectid'";
				$result = db::mq($this->sql);
				if (mysql_insert_id()) {
					return true;
				}
			}
		}
		if(!$change) {
			return false;
		}
	}
	
	// Получает список юзеров 
	public function get_users () {
		$options = "<option value='0'>Не выбрано</option>";
		db::db_connect();		
		$this -> sql = "SELECT * FROM users WHERE active = 1";
		$result = db::mq($this->sql);
		while ($r = mysql_fetch_assoc($result)) {
			if (in_array($r['sub_projectid'], $allow_sub_projects )) {
				$options .= "<option value='{$r['id']}'>{$r['login']}</option>";
			}
		}
		return ($options) ;
	}

	// Изменяем профиль пользователя
	public function change_profile ($login) {
		
	}
	
	// Добавляем проект к юзеру (ПГУ, МПГУ), чтобы он потом видел все формы, созданные на этом проекте
	public function add_project ($login) {
		
	}
	
	// Удаляем пользователя (точнее перемещаем его в таблицу 
	public function user_add ($login, $email, $name) {
		if(!preg_match('/^[a-z0-9_\-]+$/i',$array_values['login'])){
			$error_message = "В логине могут использоваться только латинские буквы и цифры. Логин не может быть пустым.<br>\n";
			return $error_message;
		}
		db::db_connect();		
		$this -> sql = "INSERT INTO users SET active = 0 WHERE id = $userid";
		$result = db::mq($this->sql);
		if (mysql_affected_rows()) {
			return "deleted";
		}
		else {
			return "error";
		}
		
		$password = $this -> gen_password ();
		$password_md5 = md5($password.md5($this -> salt));
		

		$sql="insert into users set login = '$login', password = '$password_md5', email = '$email', name = '$name', active = 1, user_type = 0";
		mysql_query($sql);
		if($mer=mysql_error()){
			$error_message = "Пользователь с таким логином уже есть.<br>\n";
			return $error_message;
		}
		else {
			mail ($email, "Регестрация на formgenerator", "Вы успешно зарегестрированы на сайте formgenerator.<br> Ваш логин: $login<br> Ваш пароль: $password");
			return "OK";
		}
	}

	// Удаляем пользователя (точнее перемещаем его в таблицу 
	public function user_delete ($userid) {
		db::db_connect();		
		$this -> sql = "UPDATE users SET active = 0 WHERE id = $userid";
		$result = db::mq($this->sql);
		if (mysql_affected_rows()) {
			return "deleted";
		}
		else {
			return "error";
		}
	}
	
	private function gen_password () {
		$array_chars = array(0,1,2,3,4,5,6,7,8,9,'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m');
		$password = '';
		for ($i = 0; $i < 8; $i++ ) {
			$rand = rand(0, count($array_chars) - 1);
			$password .= $array_chars[$rand];
		}
		return $password;
	}
}