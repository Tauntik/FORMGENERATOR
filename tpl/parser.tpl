{$elements_obj|@var_dump}
<meta http-equiv="content-type" content="text/html; charset=utf-8" />


<link type="text/css" href="css/style_pgu.css" rel="stylesheet" />
<script src="js/jquery-1.6.2.min.js" type="text/javascript"></script>
<script src="js/jquery.validate.min.js" type="text/javascript"></script>
<script src="js/app.js" type="text/javascript"></script>
<script src="js/jquery.tooltip_example.js" type="text/javascript"></script>
<script src="js/jquery.maskedinput.js" type="text/javascript"></script>
<script src="js/ui.datepicker.js" type="text/javascript"></script>
<script src="js/ui.core.js" type="text/javascript"></script>


<script type="text/javascript">
	
// заполняем массив values для вывода "примера заполнения" и подсказок
{foreach from=$elements_obj item=item}
{if $item -> elem_example}
	values.push( new Array('{$item -> elem_id}', '{$item -> elem_example}') );
{/if}
{/foreach}
{literal}
// показывает/скрывает пример заполнения
function show_hide_example() {
	if ($("#show_example_container").is(":visible")) {
		showExample();
		$("#show_example_container").hide();
		$("#hide_example_container").show();
	} else {
		clearForm();
		$("#show_example_container").show();
		$("#hide_example_container").hide();
	}
}

// выделяет номер шага в меню
function changeMenuStep() {
	$('.menu1').removeClass('sel');
	$('#menu_step_'+step()).addClass('sel');
	if (step()==1)
		$('.hint_div').hide();
	else
		$('.hint_div').show();
}

// получает номер видимого шага
function step() {
	return $('.step:visible').attr('id').split('_').slice(1)*1;
}

// изменяет название кнопки "Подать"/"Продолжить" в зависимости от шага
function submitButtonRename() {
	if (step() == $('.step').length) {
		$("#button_submit").attr('value', "Подать");
	} else {
		$("#button_submit").attr('value', "Продолжить");
	}
}

jQuery(document).ready(function() {
	{/literal}
	{foreach from=$elements_obj item=item}{if $item -> elem_mask}$('#{$item -> elem_id}').mask('{$item -> elem_mask}');
	{/if}{/foreach}
	{literal}
	
	changeMenuStep();
	applyHints();
	bindCalendar();
	submitButtonRename();

	{/literal}
{foreach from=$elements_obj item=item}
{if $item -> elem_onchange}
	//TODO событие onChange элемента id: {$item -> elem_id}; name: {$item -> elem_name}; title: {$item -> elem_title};
	$("#{$item -> elem_id}").change(function() {ldelim}
		
	{rdelim});

{/if}
{/foreach}{literal}
	
	//Если нет checkbox`ов .agree то сделать кнопку активной
	if (!$(".agree")[0]) $("#button_submit").removeAttr('disabled');

   	//Обработка галочек Согласен
	$(".agree").click(function() {
		$("#button_submit").removeAttr('disabled');
		$(".agree").each(function(){
			if (!$(this).attr("checked")) {
				$("#button_submit").attr('disabled', 'disabled');
			}
		});
	});

	//Обработка нажатия кнопки "Подать"/"Продолжить"
	$("#button_submit").click(function() {
		var allow_submit = false;
		var current_step = step();
		
		if ($("#form_element").valid()) {		
			if (current_step == $('.step').length) {
				$("#form_element").submit();
			} else {
				$('#step_'+(current_step+1)).show();
				$('#step_'+current_step).hide();
				
				if (step() != 1) {
					$("#button_back").show();
				}
			}
			
			submitButtonRename();
			changeMenuStep();
		}
	});

	//Обработка нажатия кнопки "Назад"
	$("#button_back").click(function() {
		var current_step = step();
		$('#step_'+(current_step-1)).show();
		$('#step_'+current_step).hide();

		if (step() == 1) {
			$("#button_back").hide();
		}
		
		submitButtonRename();
		changeMenuStep();
	});


	jQuery("#form_element").validate({
		ignore: ".ignore",
		ignore: ".disabled, :hidden",
		errorPlacement: function(error,element) {
		return true;
		},
		showErrors: function(errorMap, errorList) {
			if (this.numberOfInvalids()) {
				$("#error_validate").show();
			} else {
				$("#error_validate").hide();
			}
			this.defaultShowErrors();
		},
		focusInvalid: true,
		rules: {
			{/literal}
			{foreach from=$elements_obj item=item}
{if $item -> elem_required || $item -> elem_maxlength || $item -> elem_digits || $item -> elem_max || $item -> elem_min || $item -> elem_number || $item -> elem_email || $item -> elem_url}
'{$item -> elem_name}': {literal}{{/literal}{if $item -> elem_required==true}required: true, {/if}
{if $item -> elem_maxlength}maxlength: {$item -> elem_maxlength}, {/if}
{if $item -> elem_digits}digits: true, {/if}
{if $item -> elem_max}max: {$item -> elem_max}, {/if}
{if $item -> elem_min}min: {$item -> elem_min}, {/if}
{if $item -> elem_number}number: true, {/if}
{if $item -> elem_email}email: true, {/if}
{if $item -> elem_url}url: true, {/if}{literal}}{/literal},
			{/if}{/foreach}
			{literal}
		}
	});
		
	

	
	var clb_show = false;
	
	//Для Кладра и ещё внизу
	$(document).bind('cbox_open', function() {
        clb_show = true;
	});

	$(document).bind('cbox_closed', function() {
        clb_show = false;
	});


	
	//утсановка максимальных значений Textarea
	//$('#name_full').maxLength(1000);


	
});






function bindCalendar() {
    var sel, options = {
        showOn: "button",
        buttonImage: "/common/img/fms01a/calendar.png",
        buttonImageOnly: true,
        changeYear: true,
		changeMonth: true,
        defaultDate: 'с',
        buttonText: 'Выбрать дату с помощью интерактивного календаря'
      };
      
    if (arguments[0]!==undefined) sel=arguments[0]+' ';
    else sel='';
      
    $(sel+'.inputCalendarBefore').datepicker($.extend({yearRange: '-111:с', maxDate: '0'},options));
    $(sel+'.inputCalendarAfter').datepicker($.extend({yearRange: 'с:+18',minDate: '0'},options));
    $(sel+'.inputCalendar').datepicker($.extend({yearRange: '-10:+10'},options));
	$(sel+'.date_field').datepicker($.extend({yearRange: '-150:c+50'},options));
	$(sel+'.inputCalendarBefore').mask('99.99.9999');
	$(sel+'.inputCalendarAfter').mask('99.99.9999');
	$(sel+'.inputCalendar').mask('99.99.9999');
	$(sel+'.date_field').mask('99.99.9999');
}

</script>

<style>
	.content {padding-right:2px;}
	.main_img_right {display:none;}
	.cont_bot {display:none;}
	.cont_tbl_1 {background:#fff;}
	.field_note{font-size:10px; color:#777777;}
	.ui-datepicker-trigger {
		height: 16px;
		width: 16px;
		margin-left:4px;
		cursor: pointer;
	}
	#form_element input[type=text] {
		width: 300px;
	}
	#form_element textarea {
		width: 600px;
	}
	.td8 {text-align:right}
	.hint_div {font-size: 10px; font-color:#888888; float:right}
	
	.td_1 {
		text-align:right;		
	}
	.td_2 {
		text-align:left;
		padding-left: 10px;
		padding-bottom: 10px;
	}
	.form_elem_required {
		color: red;
	}
	input[type=checkbox].error {
		border: 2px solid red;
	}
</style>
{/literal}



<pre>
{if $post}{$post|@debug_print_var}{/if}
</pre>



<form id="form_element" name="form" method="post" action="" enctype="multipart/form-data" id="formPD">
	
	<div id="show_example_container" style="display:block">
		<a href="javascript: void(0);" onClick="show_hide_example();" >Показать пример заполнения</a>
	</div>
	<div id="hide_example_container" style="display: none;">
		<a href="javascript: void(0);" onClick="show_hide_example();" >Скрыть пример заполнения</a> 
	</div>
	
<div class="menu_cont form_step">
	{section name=eee start=1 loop=$max_step+1 step=1}
		<div class="menu1 div2" id="menu_step_{$smarty.section.eee.index}">Шаг {$smarty.section.eee.index}</div>
    {/section}
</div>	
<div class="hint_div">Отмеченные <font style="color:red">*</font> поля обязательны для заполнения.</div><br />


{section name=eee start=1 loop=$max_step+1 step=1}
<!-- Шаг{$smarty.section.eee.index}------------------------------------------------------------------------------------------------------>
	<div class="step" id="step_{$smarty.section.eee.index}" style="display:{if $smarty.section.eee.index==1}block{else}none{/if}">
		{$max_column = $max_columns[$smarty.section.eee.index]}
		{assign key ="count_element_tr" value = "0"}
		<table width="100%">
		{foreach from=$elements[$smarty.section.eee.index] item=item}
		
			<tr>
				<td>
					
				</td>
			</tr>
			узнаю колумн элемента
			усли 1 то колспан 2
						
			{$item.elem_title}<br/>
		{/foreach}
		</table>
	</div>
{/section}

<span id="error_validate" style="color:red; display: none;"><br/>Пожалуйста, проверьте правильность заполнения полей.</br></span>
<input type="button" value="Назад" style="width:120px;display:none;" id="button_back" >
<input type="button" value="Продолжить" style="width:120px;" id="button_submit" disabled="disabled">
</form>