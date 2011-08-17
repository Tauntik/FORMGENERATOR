var values = new Array();
var example = 0;

jQuery(document).ready(function() {
    // кнопка очистить
    jQuery("#button_clear").click(function() {
        clearForm( jQuery("#form_element"), getStep());
    });
});

// всплывающие подсказки
function applyHints()
{
    for (i=0; i<values.length; i++) {
        if (values[i][1]) {
            jQuery("input[name='field[" + values[i][0] + "]'], " +
                   "select[name='field[" + values[i][0] + "]'], " +
                    "textarea[name='field[" + values[i][0] + "]'],").attr("title", values[i][1]).tooltip({
                track: true
            });
        }
    }
    //makeTooltips();
}

// изменение подсказки для поля
function changeHint(name, value1, value2)
{
	$.each(values, function(idx, el) {
		if (el[0] == name) {
			values[idx][1] = value1;
			values[idx][2] = value2;
			applyHints();
		}
	});
}

/*
function makeTooltips()
{
    jQuery("input[name^='field'], select[name^='field'], textarea[name^='field']").tooltip({
        track: true
    });
}*/

function showExample()
{
    for (i=0; i<values.length; i++) {

        if (values[i][2]) {
            example_value = values[i][2];
        } else {
            example_value = values[i][1];
        }
        if (!example_value) continue;

		// Код проверки поля :file
		/*if ( jQuery("input[name^='field[" + field_name + "']").is(":file") ) {
			alert(field_name);
		    continue;
		}*/

        var field_name = values[i][0];

        var checkbox_el = jQuery("input[name='field[" + field_name + "]']:checkbox").filter("*[value='" + example_value + "']");
        if ( checkbox_el.size() ){
            checkbox_el.attr("checked", true).change();
        } else {
            var radio_el = jQuery("input[name='field[" + field_name + "]']:radio").filter("*[value='" + example_value + "']");
            if (radio_el.size()){
                radio_el.attr("checked", true).change();
            } else {
                jQuery(":input[name='field[" + field_name + "]']:first").val(example_value).change();
            }
        }

    }
}

function showExample2()
{
    for (i=0; i<values.length; i++) {

        if (values[i][2]) {
            example_value = values[i][2];
        } else {
            example_value = values[i][1];
        }
        if (!example_value) continue;

		// Код проверки поля :file
		/*if ( jQuery("input[name^='field[" + field_name + "']").is(":file") ) {
			alert(field_name);
		    continue;
		}*/

        var field_name = values[i][0];

	//	if(jQuery("name='field[" + field_name + "]'").is(":visible")){
	        var checkbox_el = jQuery("input[name='field[" + field_name + "]']:checkbox:visible").filter("*[value='" + example_value + "']");
	        if ( checkbox_el.size() ){
	            checkbox_el.attr("checked", true).change();
	        } else {
	            var radio_el = jQuery("input[name='field[" + field_name + "]']:radio:visible").filter("*[value='" + example_value + "']");
	            if (radio_el.size()){
	                radio_el.attr("checked", true).change();
	            } else {
	                jQuery(":input[name='field[" + field_name + "]']:first:visible").val(example_value).change();
	            }
	        }
     //   }

    }
}

function switchExample(){

    if (example == 1){
        example = 0;
        clearForm('form');
        jQuery("#show_example_container").show();
        jQuery("#hide_example_container").hide();
    } else {
        example = 1;
        showExample();
        jQuery("#show_example_container").hide();
        jQuery("#hide_example_container").show();
    }
}

function clearForm(form, step) {
    var selector = '';
    if (step) {
        selector = '#step_' + step;
    }
    selector = selector + ' :input';

    jQuery(selector, form).each(function() {

        if (jQuery(this).attr("disabled") || jQuery(this).attr("readonly")) {
            return;
        }
        var type = this.type;
        var tag  = this.tagName.toLowerCase(); // normalize case
        // it's ok to reset the value attr of text inputs,
        // password inputs, and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea') {
            this.value = "";
        } else if (type == 'checkbox') {// || type == 'radio')
            // checkboxes and radios need to have their checked state cleared
            // but should *not* have their 'value' changed
            this.checked = false;
        } else if (tag == 'select') {
            // select elements need to have their 'selectedIndex' property set to -1
            // (this works for both single and multiple select elements)
            this.selectedIndex = -1;
        }
    });
};

function downloadAppFile(download_fields, org_id, form_id)
{
    if (typeof(document.forms["download_form"]) == "undefined") {
        jQuery("body").append(
            '<form name="download_form" target="_blank" method="post" action="" enctype="multipart/form-data" class="form gService">' +
            '<input type="hidden" name="download_fields" value="' + download_fields + '">' +
            //'<input type="hidden" name="app_id" value="' + app_id + '">' +
            '<input type="hidden" name="org_id" value="' + org_id + '">' +
            '<input type="hidden" name="form_id" value="' + form_id + '">' +
            '<input type="hidden" name="action" value="download_app_file">'+
            '</form>'
        );
    }

    document.forms["download_form"].submit();
}

function downloadAppFileFromForm(serialized_post)
{
    if (serialized_post) {
        // после отправки формы
        if (typeof(document.forms["download_form"]) == "undefined") {
            jQuery("body").append(
                '<form name="download_form" target="_blank" method="post" action="" enctype="multipart/form-data" >' +
                '<input type="hidden" name="serialized_post" value="' + serialized_post + '">' +
                '<input type="hidden" name="action" value="download_app_file">'+
                '</form>'
            );
        }
        document.forms["download_form"].submit();
    } else {
        // из формы

        var app_form = getFormElement();

        jQuery("*[name='action']").val("download_app_file");
        jQuery("*[name^='field']").addClass("ignore");
        app_form.attr("target", "_blank");

        app_form.submit();

        jQuery("*[name='action']").val("send");
        jQuery("*[name^='field']").removeClass("ignore");
        app_form.removeAttr("target");
    }
}

// получение элемента формы
function getFormElement()
{
    return jQuery("*[name^='field']").parents("form").first();
}

// получение кнопки отправки формы
function getSubmitElement()
{
    var submit_button = $('#button_submit');

    if (submit_button) {
        var text = submit_button.val();
        text = $.trim(text);

        if (text != 'Продолжить') {
            return submit_button;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isOnStep(step)
{
    if (jQuery("#step_"+step).is(':visible') && jQuery("input[name='sub_action']").val() != 'back') {
        return true;
    }
    var cur_step = jQuery("#form_step").val() * 1;
    //alert( jQuery("input[name='sub_action']").val() );
    if (step == cur_step && jQuery("input[name='sub_action']").val() != 'back') {
        return true;
    }  else {
        return false;
    }
}
function getStep()
{
    return jQuery("#form_step").val();
}

function setDisabled(element_name, disabled)
{
    var selector;

    selector = "*[name='field[" + element_name + "]']";
    if (!jQuery(selector).size()) {
        selector = "*[name='" + element_name + "']";
    }

    if (disabled) {
        jQuery(selector).attr("disabled", "disabled");
        jQuery(selector).addClass("disabled");
    } else {
        jQuery(selector).removeAttr("disabled");
        jQuery(selector).removeClass("disabled");
    }
}

function setContainerDisabled(container_selector, disabled)
{
    jQuery(container_selector + " *[name^='field']").each( function(i){
        setDisabled(jQuery(this).attr("name"), disabled);
    });
}

function fillForm()
{
	jQuery("input[name^='field']").each(function(i){
		if (jQuery(this).is(':visible')) jQuery(this).val(i);
	});
}

// отображение комментария к полю
function showComment(field_name)
{
    // убираем "field[" и "]" из имени
    field_name = field_name.replace(/(field\[|\])/g, "");

    var value = jQuery("*[name='field[" + field_name + "]']:checked").val();
    if (!value) {
        value = jQuery("*[name='field[" + field_name + "]']").val();
    }
    jQuery("." + field_name + "_comment div").hide();
    var comment_by_value = jQuery("." + field_name + "_comment div[title='" +  value + "']");

    if (comment_by_value.size()) {
        comment_by_value.show();
    }
}

// очистить список ошибок
function clearErrors()
{
    jQuery("#error_list").html("");
}

// добавить ошибку
function addError(text)
{
    jQuery("#error_list").append('<p class="red">' + text + '</p>');
}

//http://www.linkexchanger.su/2009/103.html
function attachCalendar(field_name, step)
{
    if (step && !isOnStep(step)){
        return false;
    }

    var element = getFieldByName( field_name );

    if (!element) {
        return false;
    }
    element.datepicker( jQuery.datepicker.regional['ru'] );
    element.datepicker( "option", "dateFormat", 'dd.mm.yy' );
    element.datepicker( "option", "closeText", 'X' );
    element.datepicker( "option", "maxDate", '+0' );
    element.datepicker( "option", "showButtonPanel", true  );
    element.datepicker( "option", "showOn", 'button'  );
    element.datepicker( "option", "buttonImage", '/common/img/calendar.png' );
    element.datepicker( "option", "changeYear", 'true'  );
    element.datepicker( "option", "changeMonth", 'true'  );
    element.datepicker( "option", "buttonImageOnly", 'true'  );
    //element.mask('99.99.9999');
}

function getFieldByName(field_name)
{
    var element = jQuery("*[name='field[" + field_name + "]']");
    if (!element.size()) {
        element = jQuery("*[name='" + field_name + "']");
    }
    if (!element.size()) {
        return false;
    }
    return element;
}

// Прикрепляется клавиатура ко полям кроме полям  с датами
function keypad( active )
{
    var step     = getStep();
    var elements = jQuery("#step_" + step + " input[name^='field'][type='text']:not(.hasDatepicker,.disabled), " +
                          "#step_" + step + " textarea[name^='field']");
    if (active) {
        elements.keypad(
            jQuery.extend({
                prompt: '',
                layout: jQuery.keypad.azertyLayout,
                keypadOnly:false,
                showAnim: "fadeIn"
            }, jQuery.keypad.regional['ru'])
        );
    } else {
        elements.keypad('destroy');
    }
}


///////////////////////////////////////////////////////////////////////////////
// ЭЦП
// Работает с двумя видами токенов: eToken и CSP
///////////////////////////////////////////////////////////////////////////////

// Тип токена определяется плагином автоматически
//var TOKEN_ETOKEN     = 0; // eToken
//var TOKEN_CSP        = 1; // CSP

// получение плагина для подписания ЭЦП
function getEcpPlugin()
{
    return document.getElementById('plugin0');
}

// callback функция к которой плагин обращается в случае ошибки подписания
function signCallbackFn(errCode, message)
{
    alert('Произошла ошибка при подписании ЭЦП: ' + message);
    jQuery("#loader").hide();
};

// сallback функция к которой плагин обращается в случае успешного подписания
function signSuccessCallbackFN(digest, sign, cert)
{
    jQuery('#ecp_digest').val( digest );
    jQuery('#ecp_signature').val( sign );
    // информация о сертификате
    jQuery('#ecp_certificate').val( cert );

    jQuery("#loader").hide();

    // отправляем форму
    var form_element = getFormElement();
    if (form_element) {
        form_element.submit();
    } else {
        alert('Произошла ошибка при отправке формы');
    }
};

// сallback функция к которой плагин обращается в случае успешного подписания
function signProcessStepStart()
{
};
// сallback функция, к которой плагин обращается в случае успешного подписания
function signProcessStepDone()
{
};
//идентфикатор объекта плагин для подписи
function determineSignType() {
};

// Подпись данных ЭЦП
// data - XML для подписи
// form_id - ID формы, которая будет отправляться
function callSign(data)
{
    // результат подписи
    var result_data = {};
    // плагин для подписи
    var signPluginImpl;

    try {
        signPluginImpl     = new signPluginTp.SignPlugin({
            //идентфикатор объекта плагин для подписи
            pluginID: 'plugin0',
            //pluginID: 'edsPlugin',
            // collback-функця, вызываемая как только плагин определил что за тип токена
            tokenTypeCallback: determineSignType,
            // callback функция к которой плагин обращается для получения пароля
            promtPasswordCallback: function () {
                return prompt("Пожалуйста, введите пароль токена");
            },
            // callback функция к которой плагин обращается в случае ошибки подписания
            signErrorCallback: signCallbackFn,
            //сallback функция к которой плагин обращается в случае успешного подписания
            signSuccessCallback: signSuccessCallbackFN,
            signStepProcessBeginCallback: signProcessStepStart,
            signStepProcessDoneCallback: signProcessStepDone
        });
        signPluginImpl.init();

        if (signPluginImpl){
            signPluginImpl.makeSign(data);
        } else {
            alert('Произошла ошибка при подписании ЭЦП: не удалось инициализировать плагин');
        }
    } catch(e) {
        alert('Произошла ошибка при подписании ЭЦП: не удалось инифиализировать плагин');
    }
}

// Подписание формы ЭЦП
// Тип токена определяется плагином автоматически
function ecpSignForm(token){
	var file_signatures_xml = '';
	var ecp_digest          = '';
	var ecp_signature       = '';
	var ecp_certificate     = '';
	var sign_result;

    jQuery("#loader").show();

	form_fields_result = getFormTextFieldsXml();

    // проверка ошибок
    if (form_fields_result && form_fields_result.error) {
        alert(form_fields_result.error);
        jQuery("#loader").hide();
        return false;
    }
    if (!form_fields_result || !form_fields_result.xml) {
        alert("Произошла ошибка при отправке заявления");
        jQuery("#loader").hide();
        return false;
    }

    // подписываем XML
    callSign(form_fields_result.xml);

    return true;
}


// отправить поля формы и получить xml
function getFormTextFieldsXml(){

    // получение элемента формы
    var form_element = getFormElement();
    if (!form_element) {
        return;
    }

    // получаем канонизированный XML
	data = jQuery.ajax({
		async: false,
		type: 'POST',
		url: window.location+'',
		cache: false,
		data: form_element.serialize() + '&action=ecp_get_xml'
        /*
		error:function(xhr, status, errorThrown) {
            return false;
		}*/
	}).responseText;
    try {
        var result = eval('('+data+')');
    } catch (e) {
        return false;
    }

    return result;
}

// проверка, поддерживает браузер клиента подпись ЭЦП и установлен ли плагин
function checkEcpGeneral(){
    //для данных услуг подразумевается что ее может получить только Юрлицо, соответсвенно войти он может тока по ЭП
}

// проверка, поддерживает браузер клиента подпись ЭЦП и установлен ли плагин  и возврат соответствующего сообщения
function getEcpSupportMessage(){
    /*
	if (!$.browser.msie) {
		return 'Функция подписания электронной цифровой подписью доступна только в браузерах Internet Explorer версий 6.0 и выше';
	}
	if (!checkEcpPlugin()) {
		return 'Компонент для подписания ЭЦП не обнаружен';
	}*/
    return '';
}

// экранирование HTML-символов
function htmlEncode(val){
  return $("<div/>").text(val).html();
}

// обратнове преобразование HTML-символов
function htmlDecode(val){
  return $("<div/>").html(val).text();
}

// добавление чекбокса "Подписать заявление перед отправкой"
function showDSCheckbox()
{
    var button = getSubmitElement();

    if ( button && $('#use_digital_signature').size()==0 ) {
        button.after('&nbsp;<input type="checkbox" name="use_digital_signature" id="use_digital_signature" onClick="checkEcpGeneral();"><label for="use_digital_signature">Подписать заявление перед отправкой</label>');
    }
    setTimeout("showDSCheckbox()", 1000);
}

function humanFormatTelephone(country_code, telephone_number){
    var out = '';
	country_code = String(country_code);
	telephone_number = String(telephone_number);


    out = '+'+country_code;

    if(telephone_number.length == 10){//форматируем как на айфоне
            out += ' (';
            out += telephone_number.substr(0, 3);
            out += ') ';
            out += telephone_number.substr(3, 3);
            out += '-';
            out += telephone_number.substr(6, 2);
            out += '-';
            out += telephone_number.substr(8, 2);
    }
    else{
            out += telephone_number;
    }

    return out;

}

function clearFormChange(form, step) {
    var selector = '';

    selector = selector + ' :input';

    jQuery(selector, form).each(function() {
        if (jQuery(this).attr("disabled") || jQuery(this).attr("readonly") || jQuery(this).attr("name")=="app_file") {
            return;
        }
        var type = this.type;
        var tag  = this.tagName.toLowerCase(); // normalize case
        // it's ok to reset the value attr of text inputs,
        // password inputs, and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea') {
            this.value = "";
        } else if (type == 'checkbox') {// || type == 'radio')
            // checkboxes and radios need to have their checked state cleared
            // but should *not* have their 'value' changed
            this.checked = false;
        } else if (tag == 'select' && this.options.length > 1) {
            // select elements need to have their 'selectedIndex' property set to -1
            // (this works for both single and multiple select elements)
            this.selectedIndex = -1;
        }
        if (!(jQuery(this).hasClass('inputCalendarBefore')||jQuery(this).hasClass('inputCalendarAfter')||jQuery(this).hasClass('inputCalendar')||jQuery(this).hasClass('date_field')))
        	jQuery(this).change();
    });
};