<?php

require_once("db.class.php");

class user {	
	
	private $sql = ''; 		// запрос в БД.
	private $salt = 'fg'; 		// запрос в БД.
	
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
			$this->sql = "SELECT * from users WHERE login = '$login' and password = '$password_md5'";
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
	
	// Изменяем профиль пользователя
	public function change_profile ($login) {
		
	}
	
	// Добавляем проект к юзеру (ПГУ, МПГУ), чтобы он потом видел все формы, созданные на этом проекте
	public function add_project ($login) {
		
	}
}