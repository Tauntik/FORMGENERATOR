<?php

class db {
	
	static private $mysql_host = "localhost";
	static private $mysql_login = "root";
	static private $mysql_password = "";
	static private $mysql_database = "fg";
	static private $charset = "cp1251";

	// Подключаемся к базе
	static function db_connect()
	{
	
		if(!($dbc = mysql_connect(self::$mysql_host,self::$mysql_login,self::$mysql_password)))
		{
			$mer=mysql_error();
			$errormessage="!mysql_connect: $mer";
			die($errormessage);
		}
		if(!mysql_select_db(self::$mysql_database,$dbc))
		{
			$mer=mysql_error();
			$errormessage="!mysql_select_db: $mer";
			die($errormessage);
		}
		mysql_query('SET names '.self::$charset);
		if($mer=mysql_error())
		{
			$errormessage="!SET names: $mer";
			die($errormessage);
		}
		return 0;
	}
	
	// Выполняет запрос к БД
	static function mq($sql)
	{
		$res=mysql_query($sql);
		$mer=mysql_error();
		if($mer=mysql_error())
		{
			$errormessage="SQL: $sql;<br> Error: $mer<br>\n";
			die($errormessage);
		}
		return $res;
	}

	// Выполняем множественный запрос
	static function mysql_querys($sqls)
	{
		$sqlarr=explode(';',$sqls);
		foreach ($sqlarr as $v)
		{
			$sql=trim($v);
			if(!$sql) continue;
			mysql_query($sql);
			$mer=mysql_error();
			if($mer)
			{
				echo("ERROR: $mer");
				die();
			}
		}
	}
}