<?php

include("db.class.php");

class user {	
	
	private $sql = ''; 		// запрос в БД.
	private $user = array();	// Массив с данными о пользователе.
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
			$this->sql = "SELECT * from users WHERE login = '$login' and password = 'md5(".$password."md5(".$salt."))'";
			$result = db::mq($this->sql);
			while ($r = mysql_fetch_assoc($result)) {
				$this->user[] = $r;
			}
			$_SESSION['id'] = $this->user['id'];
			return true;	// Все успешно, возвращаем правду
		}
		return false;		// Что-то не сощлось. Юзер - лох.
	}
	
	// Выходим из сайта
	public function logout ($login) {
		
	}
	
	
	// Изменяем профиль пользователя
	public function change_profile ($login) {
		
	}
	
	// Добавляем проект к юзеру (ПГУ, МПГУ), чтобы он потом видел все формы, созданные на этом проекте
	public function add_project ($login) {
		
	}
}