//_TODO Добавить удаление шагов
//_TODO К <title> выбор Bold, Align, H1-H6
//_TODO перетаскивание элемента при добавлении
//_TODO бегующий курсор
//_TODO добавление множества колонок
//_TODO если элемент не выделен на 2ой вкладке остаются кнопки "сохранить" и "удалить"
//_TODO названия шагов при удалении поправить
//_TODO переписать function get_elem_html(obj) для возврата не текста а объекта jQuery
//_TODO удаление по DELETE
//_TODO при удалении остается панель редактирования инструмента
//_TODO при добавлении элемента сделать чтобы он выделялся, чтобы последующие элементы вставлялись после него

//TODO сделать ctrl-z && ctrl-y
//TODO К <Date> добавить дата в прошлом/будущем
//TODO Добавить к <SELECT> возможность редактирования <OPTION>
//TODO фунцкия создать дубликат элемента
//TODO добавить HELP к элементам
//TODO сделать при выборе класса http://jqueryui.com/demos/autocomplete/#multiple
//TODO поправить <label> на чекбоксах панели инструментов

//TODO проверка на повторяющиеся id
//TODO сделать пример заполнения для <SELECT> <CHECKBOX>
//TODO загрузка в SELECT файла с OPTION
//TODO сделать готовые решения для масок


var elem_count = 0;
var current_step_tab = "#step_1";
var count_step_tab = 1;
var elem_accept_hover = true;
 

var history = new Array();
var history_inc = -1;
function history_add() {
	
	var n = 0;
	$("a[href^=#step_]").not("a[href^=#step_add], a[href^=#step_delete]").each(function(){
		n++;		
		$($(this).attr('href') + " .form_elem").attr('step', n);
	});
	
	var obj_mass = new Array();
	$(".form_elem").each(function(){
		var js = $(this).attr('json');		
		var obj = JSON.parse(js);
		obj.step = $(this).attr('step');
		
		
		obj_mass.push(obj);
	});
	var js = JSON.stringify(obj_mass);
	var js_ = JSON.stringify(history[history.length - 1]);

	if (js == js_) {
		//alert(1);
	} else {
		history_inc++;
		history[history_inc] = obj_mass;
		
		
		history.splice(history_inc + 1, history.length - history_inc);
		

		
	}
	//var js = JSON.stringify(obj_mass);
	$("#form_forward").button( "disable" );
	$("#form_back").button( "enable" );
	//alert(history.length);
	//console.log(history_inc);
}
 
function getParam(str){
	var tmp = new Array();      // два вспомагательных    
	var tmp2 = new Array();     // массива    
	var param = new Array();    
			
	var get = location.search;  // строка GET запроса    
	if(get != '')    
	{    
		tmp = (get.substr(1)).split('&');   // разделяем переменные    
		for(var i=0; i < tmp.length; i++)    
		{    
			tmp2 = tmp[i].split('=');       // массив param будет содержать    
			param[tmp2[0]] = tmp2[1];       // пары ключ(имя переменной)->значение    
		}    
		var obj = document.getElementById('greq');  // вывод на экран    
	  
		
	}
	return param[str]
}



//Добавление шага формы
function add_step_tab(){
	//var selected = $( "#step_tabs" ).tabs( "option", "selected" );
	count_step_tab++;
	//$( "#step_tabs" ).tabs( "length" )
	var n = count_step_tab;
	while ($("#step_" + n).length > 0) {
		alert("++");
		n++;
	}
	
	current_step_tab = "#step_" + n;
	$( "#step_tabs" ).tabs( "add" , current_step_tab, "Шаг " + count_step_tab, count_step_tab - 1);
	$( "#step_tabs" ).tabs( "select" , count_step_tab - 1 );
}

//Удаление шага формы
function delete_step_tab(){
	//var selected = $( "#step_tabs" ).tabs( "option", "selected" );
	if ( ($( "#step_tabs" ).tabs( "length" ) - 2) > 1) {
		
		//alert($( "#step_tabs" ).tabs( "length" )-2);
		//<a href="#step_2"><span>Шаг 2</span></a>
		
		var for_del = current_step_tab; //"#step_*"
		$( "#step_tabs" ).tabs( "select" , 0 );
		$( "#step_tabs" ).tabs( "remove" , for_del);

		count_step_tab--;
		
		var n = 0;
		$("a[href^=#step_]").not("a[href^=#step_add], a[href^=#step_delete]").each(function(){
			n++;
			$(this).html("<span>Шаг " + n + "</span>");
		});
		
		
	}	
}

/*Функция получения хтмл кода элемента
 	Входной параметр тип обьект, поля:
 	-type (id элементов на панели инструментов)

	properties.elem_title = true;	
	properties.elem_name = true;
	properties.elem_id = true;
	properties.elem_class = true;
	
	properties.elem_maxlength = true;
	properties.elem_example = true;
	properties.elem_mask = true;
	properties.elem_digits = true;
	properties.elem_min = true;
	properties.elem_max = true;
	properties.elem_number = true;
	properties.elem_email = true;
	properties.elem_url = true;	
	properties.elem_required = true;
	properties.elem_onchange = true;
	properties.elem_onclick = true;
	properties.elem_bold = true;
	properties.elem_align = true;
	properties.elem_h = true;
	properties.elem_file_accept = true;
	properties.elem_file_size = true;	
	properties.elem_select_default = true;
	properties.elem_del_options_select = true;
	properties.elem_add_options_val = true;

 */
function get_elem_html(obj) {
	
	
	
	while($(".form_elem[number=" + elem_count + "]").attr('elem_type')) {
		elem_count++;
	}
	
	
	if (!obj.elem_title) obj.elem_title = "Title";
	if (!obj.elem_id) obj.elem_id = "elem_" + elem_count;
	if (!obj.elem_name) obj.elem_name = "field[elem_" + elem_count + "]";
	//if (!obj.elem_required) obj.elem_required = "";
	if (!obj.select_options) obj.select_options = new Array();

	
	
	var id = obj.elem_id;
	var name = obj.elem_name;
	var required = obj.elem_required ? "*" : "";

	
	
	var json = JSON.stringify(obj);
	
	
	
	json = json.replace(/ /g, '&nbsp;');
	
	
	var el_col = obj.elem_columns;
	if (!el_col) el_col = 1;
	var percent = (100 / el_col) - 1;
	var form_elem = jQuery('<div>', {
						elem_type: obj.type,
						'class': 'form_elem',
						json: json,
						number: elem_count,
						css: {
							display: 'inline-table',
							width: percent + '%'
						}
					});
	
	var form_elem_title = jQuery('<div>', {
								'class': 'form_elem_title',
								html: obj.elem_title
							});
	var form_elem_required = jQuery('<span>', {
								'class': 'form_elem_required',
								html: required
							}).appendTo(form_elem_title);
	
	//В зависимости от типа объекта возвращает HTML элемента
	switch (obj.type) {			
		
		case 'my_elem_title_small':
			
			if (!obj.elem_align) obj.elem_align = "left";
			if (!obj.elem_h) obj.elem_h = "span";
			if (!obj.elem_bold) {
				obj.elem_bold = "normal";
			} else {
				obj.elem_bold = "bold";
			}
			
			if (!obj.elem_italic) {
				obj.elem_italic = "normal";
			} else {
				obj.elem_italic = "italic";
			}
			jQuery('<div>', {
				'class': 'form_block_title_small',
				'align': obj.elem_align,
				css: {
					'font-style': obj.elem_italic,
					'font-weight': obj.elem_bold
				}
			}).append(jQuery('<' + obj.elem_h + '>', {
							html: obj.elem_title
						}
			).append(form_elem_required).appendTo(form_elem)).appendTo(form_elem);

			break;

		case 'my_elem_hr':
		
			jQuery('<hr />').appendTo(jQuery('<div>', {
										'class': 'form_block_title'
									}).appendTo(form_elem));
			
			break;

		case 'my_elem_text':
			form_elem_title.appendTo(form_elem);
			jQuery('<input>', {
				'type': 'text',
				'name': name,
				'id': id
			}).appendTo(form_elem);

			break;

		case 'my_elem_textarea':
			form_elem_title.appendTo(form_elem);
			jQuery('<textarea>', {
				'name': name,
				'id': id
			}).appendTo(form_elem);
			
			break;

		case 'my_elem_file':
			form_elem_title.appendTo(form_elem);
			jQuery('<input>', {
				'type': 'file',
				'name': name,
				'id': id
			}).appendTo(form_elem);
			
			break;

		case 'my_elem_date':
			form_elem_title.appendTo(form_elem);
			jQuery('<input>', {
				'type': 'text',
				'name': name,
				'id': id,
				'class': "datepicker"
			}).appendTo(form_elem);
			
			break;

		case 'my_elem_select':
			
			form_elem_title.appendTo(form_elem);
			var sel_el = jQuery('<select>', {
				'name': name,
				'id': id
			});
			
			for (var i = 0; i < obj.select_options.length; i++) {
				var opt = jQuery('<option>', {
					'value': obj.select_options[i].val,
					html: obj.select_options[i].text
				});
				if (obj.select_default == obj.select_options[i].val) opt.attr('selected', 'selected');				
				sel_el.append(opt);
			}
			
			sel_el.appendTo(form_elem);

			break;

		case 'my_elem_checkbox':
			
			form_elem_title.appendTo(form_elem);
			jQuery('<input>', {
				'type': 'checkbox',
				'name': name,
				'id': "my_" + elem_count
			}).appendTo(form_elem);

			break;

		case 'my_elem_radio':
			
			form_elem_title.appendTo(form_elem);
			jQuery('<input>', {
				'type': 'radio',
				'name': name,
				'id': "my_" + elem_count
			}).appendTo(form_elem);
			
			break;

		case 'my_elem_button':
			form_elem_title.html("&nbsp;");
			form_elem_title.appendTo(form_elem);
			jQuery('<button>', {
				'id': id,
				html: obj.elem_title
			}).appendTo(form_elem);
			
			break;

		default:
			break;
	}
	
	return form_elem;
}

//Функция отображает/скрывает элементы редактирования полей формы в зависимости от типа выбранного поля
//устанавливает параметры выделенного элемента
function show_hide_elem_panel() {
	
	var json = $(".form_elem[sel=sel]").attr('json');
	if (!json) {json = '{}';}		
	var b = JSON.parse(json);
	
	//скрываем все элементы редактирования
	$(".my_form_elem").hide();
	
	
	
	if (!b.type) {
		$("#save_elem, #delete_elem").hide();
		return false;
	} else {
		$("#save_elem, #delete_elem").show();
	}
	
	//Очищаем все значения элементов для редактирования
	$("#elem_del_options_select").html("");
	$("#elem_select_default").html("");	
	$(".my_form_elem input").val("");
	$(".my_form_elem input[type=checkbox]").removeAttr('checked');
	$("#elem_columns option[value=1]").attr('selected', 'selected');
	
	
	//Устанавливаем значения элементов для редактирования, значения берутся из объекта JSON.parse(json)
	$("#elem_title").val(b.elem_title);
	$("#elem_id").val(b.elem_id);
	$("#elem_name").val(b.elem_name);
	$("#elem_class").val(b.elem_class);
	
	$("#elem_maxlength").val(b.elem_maxlength);
	$("#elem_example").val(b.elem_example);
	$("#elem_mask").val(b.elem_mask);
	
	$("#elem_min").val(b.elem_min);
	$("#elem_max").val(b.elem_max);
	
	$("#elem_file_accept").val(b.elem_file_accept);
	$("#elem_file_size").val(b.elem_file_size);
	
	if (b.select_options) {
		$("#elem_del_options_select").html($("#" + b.elem_id).html());
		$("#elem_select_default").html($("#elem_del_options_select").html());
	}	
	
	if (b.elem_digits) {
		$("#elem_digits").attr('checked', 'checked');
	}
	
	if (b.elem_number) {
		$("#elem_number").attr('checked', 'checked');
	}
	
	if (b.elem_email) {
		$("#elem_email").attr('checked', 'checked');
	}
	
	if (b.elem_url) {
		$("#elem_url").attr('checked', 'checked');
	}
	
	if (b.elem_required) {
		$("#elem_required").attr('checked', 'checked');
	}
	
	if (b.elem_onchange) {
		$("#elem_onchange").attr('checked', 'checked');
	}
	
	if (b.elem_onclick) {
		$("#elem_onclick").attr('checked', 'checked');
	}
	
	if (b.elem_bold) {
		$("#elem_bold").attr('checked', 'checked');
	}

	if (b.elem_italic) {
		$("#elem_italic").attr('checked', 'checked');
	}
	

	
	$("#elem_align option[value=" + b.elem_align + "]").attr('selected', 'selected');
	$("#elem_h option[value=" + b.elem_h + "]").attr('selected', 'selected');
	$("#elem_columns option[value=" + b.elem_columns + "]").attr('selected', 'selected');
	//Устанавливаем видимость элементов для редактирования
	var properties = new Object();

	properties.elem_class = true;
	properties.elem_title = true;
	properties.elem_id = true;
	properties.elem_name = true;
	properties.elem_columns = true;
	switch (b.type) {			
		case 'my_elem_title':
			properties.elem_name = false;			
			properties.elem_bold = true;
			properties.elem_italic = true;
			properties.elem_align = true;
			properties.elem_h = true;			
			break;

		case 'my_elem_title_small':
			properties.elem_name = false;			
			properties.elem_required = true;			
			properties.elem_bold = true;
			properties.elem_italic = true;
			properties.elem_align = true;
			properties.elem_h = true;
			break;

		case 'my_elem_hr':
			properties.elem_name = false;
			properties.elem_title = false;
			break;

		case 'my_elem_text':
			properties.elem_maxlength = true;
			properties.elem_example = true;
			properties.elem_mask = true;
			properties.elem_digits = true;
			properties.elem_min = true;
			properties.elem_max = true;
			properties.elem_number = true;
			properties.elem_email = true;
			properties.elem_url = true;	
			properties.elem_required = true;
			break;

		case 'my_elem_textarea':
			properties.elem_maxlength = true;
			properties.elem_example = true;			
			properties.elem_required = true;			
			break;

		case 'my_elem_file':
			
			properties.elem_required = true;			
			properties.elem_file_accept = true;
			properties.elem_file_size = true;
			break;

		case 'my_elem_date':
			properties.elem_maxlength = true;
			properties.elem_example = true;
			properties.elem_mask = true;
			properties.elem_digits = true;			
			properties.elem_required = true;
			break;

		case 'my_elem_select':
			properties.elem_required = true;
			properties.elem_select_default = true;
			properties.elem_del_options_select = true;
			properties.elem_add_options_val = true;
			properties.elem_onchange = true;			
			break;

		case 'my_elem_checkbox':
			properties.elem_example = true;
			properties.elem_required = true;
			properties.elem_onchange = true;
			break;

		case 'my_elem_radio':
			properties.elem_example = true;
			properties.elem_required = true;
			properties.elem_onchange = true;
			break;

		case 'my_elem_button':
			properties.elem_name = false;
			properties.elem_onclick = true;
			break;

		default:
			break;
	}
	

	for (var keyVar in properties ) {
		if (properties[keyVar]) $("#" + keyVar).parent().show();
	}

}

//Отправка JSON на сервер и сохранение в БД
function save_form(){
	var n = 0;
	$("a[href^=#step_]").not("a[href^=#step_add], a[href^=#step_delete]").each(function(){
		n++;		
		$($(this).attr('href') + " .form_elem").attr('step', n);
	});
	

	var obj_mass = new Array();
	$(".form_elem").each(function(){
		var js = $(this).attr('json');		
		var obj = JSON.parse(js);
		obj.step = $(this).attr('step');
		obj_mass.push(obj);
	});
	
	var js = JSON.stringify(obj_mass);

	$("#progressbar").show();
	$.post("index.php", {request: "save", json: js, 'form_id': getParam("form_id")}, function(data) {		
		$("#progressbar").hide();
	});
};

//Загрузка JSON с сервера и построение формы
function load_form(){
	var cook = "{}";
	
	
	

	
	
	$.ajax({
		url: "index.php",
		type : "POST",
		data : {request: "load",
				'form_id': getParam("form_id")
		},
		dataType: "text",
		success: function(data){
			
			var arr = JSON.parse(data?data:"{}");
			

			for (i = 0; i < arr.length; i++) {		
				var abs = arr[i];
				var st = abs.step;
				
				while (st > count_step_tab) {
					add_step_tab();
				}
				
				$("#step_" + st).append(get_elem_html(abs));
			}
			$( "#step_tabs" ).tabs( "select" , 0 );
			current_step_tab = "#step_1";
			
			$("#content").sortable({
				items: '.form_elem',
				stop:  function(event, ui) {}
			});
			
			$( ".datepicker" ).datepicker({
				showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true
			});
			
			$( ".elem_button" ).draggable({
				connectToSortable: "#content",				
				delay: 300,
				helper: "clone",
				addClasses: false,
				start: function (event, ui) {
					var b = new Object();
					b.type = $(this).attr('id');
					
					var html_ = get_elem_html(b);
					
					$("#tabs-1 a.elem_button").each(function(){
						if ($(this).css('position') == 'absolute') {
							
							$(this).attr('class', '');
							$(this).html($(html_).attr('sel', 'sel').addClass('ui-widget-header ui-corner-all'));
							$(this).css('width', '600px');
						}
					});
					elem_accept_hover = false;
					//$(html_).replaceAll($(this).hide());
				},
				
				stop: function (event, ui) {
					var b = new Object();
					b.type = $(this).attr('id');				
					var html_ = get_elem_html(b);
					$(".form_elem").removeClass('ui-widget-header ui-corner-all');
					$(".form_elem").removeAttr('sel');
					
					$($(html_).attr('sel', 'sel').addClass('ui-widget-header ui-corner-all')).replaceAll($("#content a.elem_button"));
					
					$(".form_elem").not("#step_tabs .form_elem").remove();
					elem_accept_hover = true;
				}				
			});
			history_add();
		}
	});
	
};

//Сохранение формы перед закрытием страницы
/*
 
 window.onbeforeunload = function(evt) {
	save_form();
    //evt = evt || window.event;
    //evt.returnValue = "Вы же ничего не сохранили!";
}
*/

//Document_Ready
$(document).ready(function(){
	
	load_form();
	
	
	jQuery(document).bind('keydown', function (evt){
		//$(".form_elem").live('change keyup keydown', function(evt){	
		//console.log(evt);
		if ((evt.keyCode == 46) && evt.shiftKey) {
			$("#delete_elem").click();
			return false;
		}
		
	});
	
	jQuery('#sideLeft').containedStickyScroll({
        closeChar: '' 
    });
		
	//Добавление jQuery UI Button к элементам
	$( ".elem_button, button, .button").button({
		icons: {
			primary: "ui-icon-play"
		}
    });
	
	//Добавление jQuery UI Tabs к элементам
	$( "#tabs" ).tabs({
		show: function(event, ui) {show_hide_elem_panel();}
	});
	
	//Добавление jQuery UI Tabs к элементам
	$( "#step_tabs" ).tabs({
		select: function(event, ui) {
			$(".form_elem").removeClass('ui-widget-header ui-corner-all');
			$(".form_elem[sel=sel]").removeAttr('sel');
			show_hide_elem_panel();
			$( "#tabs" ).tabs( "select" , 0 );
			if(ui.panel.id == "step_delete") {			   
				delete_step_tab();
				return false;
			}
			if (ui.panel.id == "step_add") {			   
			  add_step_tab();
			  return false;
			} else {
			   current_step_tab = "#" + ui.panel.id;
			}
		}
	}).find( ".ui-tabs-nav" ).sortable({
								axis: "x",
								delay: 300,
								start: function(event, ui) {
									if (ui.item.children("a").attr('href') == "#step_add") {
										//$(this).sortable( "refresh" );
									}
									//alert(ui.li.id);
									//$("a[href^=#step_add], a[href^=#step_delete]").parent().hide();
								},
								stop: function(event, ui) {
									var n = 0;
									$("a[href^=#step_]").not("a[href^=#step_add], a[href^=#step_delete]").each(function(){
										n++;
										$(this).html("<span>Шаг " + n + "</span>");
									});
									var aff = $("a[href^=#step_add], a[href^=#step_delete]").parent().parent();
									aff.append($("a[href^=#step_add], a[href^=#step_delete]").parent());
									
								}
							});
	$(".ui-tabs-nav a").css('cursor', 'pointer');
	//Сохранение элемента формы (добавление атрибута JSON к DIV`у элемента) при редактировании - для чекбоксов
	$("#tabs-2 input[type=checkbox]").live('change keyup keydown', function(){
		$("#save_elem").click();
	});

	//Сохранение элемента формы (добавление атрибута JSON к DIV`у элемента) при редактировании - нажатие клавиши в полях
	$("#tabs-2 input, #tabs-2 select, #tabs-2 textarea").live('change', function(){
		var ch = true;
		if ($(this).attr('id') == 'elem_del_options_select') ch = false;
		if ($(this).attr('id') == 'elem_add_options_val') ch = false;
		if ($(this).attr('id') == 'elem_add_options_text') ch = false;
		
		if ($(this).val() && (ch)) {
			$("#save_elem").click();
		}		
	});	
	
	//При изменении Id меняется и Name
	$("#elem_id").live('change keyup', function(){
		$("#elem_name").val('field[' + $("#elem_id").val() + ']');
	});

	//Нажатие на заголовок страницы
	$(".header").click(function(){
		//alert(1);	
		$(".form_elem").removeClass('ui-widget-header ui-corner-all');
		$(".form_elem").removeAttr('sel');
		$( "#tabs" ).tabs( "select" , 0 );
		show_hide_elem_panel();
	});	
	
	//Добавление элемента к (#content) - нажатие на кнопку элемента на панели интструментов
	$(".elem_button").click(function(){

		var obj = new Object();
		obj.type = $(this).attr("id");
		var html = get_elem_html(obj);
		
		var ddd = $(html);
		//Добавление элемента после выделенного или в конец шага
		if ($(".form_elem[sel=sel]").length > 0) {
			$(".form_elem[sel=sel]").after(ddd);
		} else {
			
			$(current_step_tab).append(ddd);
		}
		
		
		$(".form_elem").removeClass('ui-widget-header ui-corner-all');
		$(".form_elem[sel=sel]").removeAttr('sel');
		
		ddd.addClass('ui-widget-header ui-corner-all').attr('sel', 'sel');
		
		
		
		$("#content").sortable({
			items: '.form_elem',
			stop:  function(event, ui) {}
		});	
		
		$( ".datepicker" ).datepicker({
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
		
		//$("#save_elem").click();		
		history_add();
	});
	
	//фокус на элемент формы
	$(".form_elem").live('mouseover', function(){
		
		if (elem_accept_hover) $(this).addClass("ui-widget-header ui-corner-all");
		
	});
	
	//потеря фокуса с элемента формы	
	$(".form_elem").live('mouseout', function(){
		if (elem_accept_hover) {
			if ($(this).attr('sel') != 'sel') {
				$(this).removeClass("ui-widget-header ui-corner-all");
			}		
		}
	});
	
	//нажатие на элемент формы в "#content"
	$(".form_elem").live('click', function(){
		$("#save_elem").click();
		if ($(this).attr('sel') == 'sel') {
			return false;
		}
		$(".form_elem").removeClass('ui-widget-header ui-corner-all');
		$(".form_elem").removeAttr('sel');
		//$(this).addClass('form_elem_sel');
		$(this).addClass("ui-widget-header ui-corner-all");
		$(this).attr('sel', 'sel');		
		
		
		
		$( "#tabs" ).tabs( "select" , 1 );
		show_hide_elem_panel();
		
	});
	
	//кнопка "Сохранить элемент" на панели редактирования
	$("#save_elem").click(function(){
		
		var b = new Object();
		
		b.elem_title = $("#elem_title").val();
		b.elem_id = $("#elem_id").val();
		b.elem_name = $("#elem_name").val();
		b.elem_class = $("#elem_class").val();
		
		b.elem_maxlength = $("#elem_maxlength").val();
		b.elem_example = $("#elem_example").val();
		b.elem_mask = $("#elem_mask").val();
		b.elem_min = $("#elem_min").val();
		b.elem_max = $("#elem_max").val();
		b.elem_align = $("#elem_align").val();
		b.elem_h = $("#elem_h").val();
		b.elem_file_accept = $("#elem_file_accept").val();
		b.elem_file_size = $("#elem_file_size").val();
		b.elem_email = $("#elem_email").val();
		b.elem_columns = $("#elem_columns").val();
		
		if ($("#elem_digits").attr('checked') == "checked") b.elem_digits = true;
		if ($("#elem_number").attr('checked') == "checked") b.elem_number = true;
		if ($("#elem_email").attr('checked') == "checked") b.elem_email = true;
		if ($("#elem_url").attr('checked') == "checked") b.elem_url = true;
		if ($("#elem_required").attr('checked') == "checked") b.elem_required = true;
		if ($("#elem_onchange").attr('checked') == "checked") b.elem_onchange = true;
		if ($("#elem_onclick").attr('checked') == "checked") b.elem_onclick = true;
		if ($("#elem_bold").attr('checked') == "checked") b.elem_bold = true;
		if ($("#elem_italic").attr('checked') == "checked") b.elem_italic = true;
		if ($("#elem_onchange").attr('checked') == 'checked') b.elem_onchange = true;
		
		
		b.select_options = new Array();
		var i = 0;
		b.select_default = $("#elem_select_default").val();
			
		$("#elem_del_options_select option").each(function(){
			b.select_options[i] = new Object();
			b.select_options[i].val = $(this).val();
			b.select_options[i].text= $(this).text();
			i++;
		});		
		
		var for_click = $(".form_elem[sel=sel]");
		b.type = $(".form_elem[sel=sel]").attr('elem_type');
		
		var html_ = get_elem_html(b);
		
		$(html_).replaceAll($(".form_elem[sel=sel]")).click();		
		
		$( ".datepicker" ).datepicker({
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
		
		
		history_add();
		
		
	});
	
	//Удаление выбранного элемента формы
	$("#delete_elem").click(function(){		
		$(".form_elem[sel=sel]").remove();
		show_hide_elem_panel();
		history_add();
	});
	
	//Добавление <OPTION> к <SELECT>
	$("#elem_add_options").click(function(){
		$("#elem_del_options_select").append("<option value='" + $("#elem_add_options_val").val() + "'>" + $("#elem_add_options_text").val() + "</option>");
		$("#save_elem").click();
	});
	
	//Удаление <OPTION> из <SELECT>	
	$("#elem_del_options").click(function(){
		$("#elem_del_options_select :selected").remove();
		$("#save_elem").click();
		show_hide
	});
	
	//Нажатие "Сохранить форму"
	$("#save_form").click(function(){
		save_form();
	});
	
	//получение HTML кода формы от сервера
	$("#download_form").click(function(){
		
		$( "#download_dialog" ).dialog({
			resizable: false,
			title: "Загрузить форму",
			height: 700,
			width: 900,
			modal: true,
			buttons: {
				"Ok": function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		$.ajax({
			url: "index.php",
			type : "POST",
			data : {
				request: "get_form_html",
				'form_id': getParam("form_id")
			},
			dataType: "text",
			success: function(data){
				if (data != "error") {
					$( "#download_dialog" ).html("<xmp>" + data + "</xmp>");
				}
			}
		});

		
		//$( "#download_dialog" ).load("get_html.php");
	});
	
	
	
	//нажата сохранить данные формы
	$("#save_form_name").click(function(){
		
		
		$.ajax({
			url: "index.php",
			type : "POST",
			data : {
				request: "set_form_name",
				'form_name': $("#form_name").val(),
				'form_sub_project': $("#form_sub_project").val()
			},
			dataType: "text",
			success: function(data){
				if (data == "true") {
					$("#save_form_name_message").html("Данные формы успешно изменены!");
				} else {
					$("#save_form_name_message").html("Произошла ошибка!");
					setTimeout('$("#save_form_name_message").html("");', 5000);
				}
			}
		});
	});
	
	
	$("#form_back").click(function(){
		
		if (history_inc == 0) {
			$("#form_back").button( "disable" );
			return true;
		}
		$("#step_1, #step_2, #step_3, #step_4").html("");
		
		for (i = 0; i < history[history_inc - 1].length; i++) {		
			var abs = history[history_inc - 1][i];
			var st = abs.step;
			//alert(abs.step);
			while (st > count_step_tab) {
				add_step_tab();
			}
			
			$("#step_" + st).append(get_elem_html(abs));
		}
		
		history_inc--;
		if (history_inc == 0) $("#form_back").button( "disable" );
		$("#form_forward").button( "enable" );
	});
	
	$("#form_forward").click(function(){
		
		if (history_inc ==  history.length - 1) {
			$("#form_forward").button( "disable" );
			return true;
		}
		
		$("#step_1, #step_2, #step_3, #step_4").html("");
		
		for (i = 0; i < history[history_inc + 1].length; i++) {
			var abs = history[history_inc + 1][i];
			var st = abs.step;
			//alert(abs.step);
			while (st > count_step_tab) {
				add_step_tab();
			}
			
			$("#step_" + st).append(get_elem_html(abs));
		}
		
		history_inc++;
		if (history_inc ==  history.length - 1) $("#form_forward").button( "disable" );
			
		$("#form_back").button( "enable" );
	});
	
});
