<?php
	require('libs/smarty/Smarty.class.php');
	$smarty = new Smarty;
	$smarty -> template_dir = 'tpl/';
	if ($_GET['page'] == 'form_edit') {
		$smarty -> display('tpl/form_edit.tpl');
		
	}
	//Русские символы
?>