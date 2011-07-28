<?php
	require('libs/smarty/Smarty.class.php');
	$smarty = new Smarty;
	
	if ($_GET['page'] == 'form_edit') {
		$smarty->display('tpl/form_edit.tpl');
	}
	
?>