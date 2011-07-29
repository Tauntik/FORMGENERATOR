<?php

require_once("db.class.php");

class form {
	
	private $sql = '';		// Строка запроса
	
	// Получить все доступные формы пользователю в зависимости от того, к каким проектам он привязан
	function get_forms () {
		
	}
	
	// Сохранить форму, которую нам отправил пользователь
	function save_form ($name, $json, $sub_projectid) {
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
	function load_form ($name, $sub_projectid) {
		//if (!isset($_SESSION)) session_start();
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

	// Загружаем .xls файл, парсим его в JSON и отдаем клиенту
	function getset_xls () {
		
	}
	
	// Отдаем пользователю html код формы
	function get_html () {
		
	}
	
	// Отдаем пользователю html код формы без заголовков в стиле gosuslugi.ru
	function get_html_gosuslugi () {
		
	}
}