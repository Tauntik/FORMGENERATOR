<?php
	require_once ('libs/smarty/Smarty.class.php');

	$smarty = new Smarty;
	$smarty -> template_dir = 'tpl/';


	
	//$smarty -> assign('error', 'Такой страницы не существует!');
	$smarty -> display('tpl/elems/test.tpl');
