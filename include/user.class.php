<?php

include("db.class.php");

class users {	
	
	private $sql = ''; 		// ������ � ��.
	private $user = array();	// ������ � ������� � ������������.
	private $salt = 'fg'; 		// ������ � ��.
	
	// ����������� �� ����
	function login ($login, $password, $capcha) {
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
			return true;	// ��� �������, ���������� ������
		}
		return false;		// ���-�� �� �������. ���� - ���.
	}
	
	// ������� �� �����
	function logout ($login) {
		
	}
	
	
	// �������� ������� ������������
	function change_profile ($login) {
		
	}
	
	// ��������� ������ � ����� (���, ����), ����� �� ����� ����� ��� �����, ��������� �� ���� �������
	function add_project ($login) {
		
	}
}