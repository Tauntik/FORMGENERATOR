//_TODO Добавить удаление шагов
//_TODO К <title> выбор Bold, Align, H1-H6
//_TODO перетаскивание элемента при добавлении

//TODO К <Date> добавить дата в прошлом/будущем
//TODO Добавить к <SELECT> возможность редактирования <OPTION>
//TODO фунцкия создать дубликат элемента
//TODO добавить HELP к элементам
//TODO названия шагов при удалении поправить
//TODO при удалении остается панель редактирования инструмента
//TODO сделать при выборе класса http://jqueryui.com/demos/autocomplete/#multiple
//TODO поправить <label> на чекбоксах панели инструментов
//TODO удаление по DELETE
//TODO при добавлении элемента сделать чтобы он выделялся, чтобы последующие элементы вставлялись после него
//TODO проверка на повторяющиеся id
//TODO сделать пример заполнения для <SELECT> <CHECKBOX>
//TODO бегующий курсор

//TODO загрузка в SELECT файла с OPTION
//TODO сделать готовые решения для масок

var elem_count = 0;
var current_step_tab = "#step_1";
var count_step_tab = 1;

function add_step_tab(){
	//var selected = $( "#step_tabs" ).tabs( "option", "selected" );
	count_step_tab++;
	//$( "#step_tabs" ).tabs( "length" )
	current_step_tab = "#step_" + count_step_tab;
	$( "#step_tabs" ).tabs( "add" , current_step_tab, "Шаг " + count_step_tab, count_step_tab - 1);
	$( "#step_tabs" ).tabs( "select" , count_step_tab - 1 );
}

function delete_step_tab(){
	//var selected = $( "#step_tabs" ).tabs( "option", "selected" );
	if (count_step_tab > 1) {
		
		//$( "#step_tabs" ).tabs( "length" )
		var for_del = current_step_tab;
		$( "#step_tabs" ).tabs( "select" , 0 );
		$( "#step_tabs" ).tabs( "remove" , for_del);
		
				
		//$( "#step_tabs" ).tabs( "select" , 0 );
		count_step_tab--;
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
	if (!obj.elem_required) obj.elem_required = "";
	if (!obj.select_options) obj.select_options = new Array();

	
	
	var id = obj.elem_id;
	var name = obj.elem_name;
	var required = obj.elem_required;

	
	
	var json = JSON.stringify(obj);
	
	
	
	json = json.replace(/ /g, '&nbsp;');
	//alert(obj.title);
	switch (obj.type) {			
		case 'my_elem_title':
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
			
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_block_title_small" align="' + obj.elem_align + '" style="font-style: ' + obj.elem_italic + ';font-weight: ' + obj.elem_bold + ';">' + '<' + obj.elem_h + '>' + obj.elem_title + '<span class="form_elem_required">' + required + '</span>' + '</' + obj.elem_h + '>' + '</div></div>';
			break;

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
			
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_block_title_small" align="' + obj.elem_align + '" style="font-style: ' + obj.elem_italic + ';font-weight: ' + obj.elem_bold + ';">' + '<' + obj.elem_h + '>' + obj.elem_title + '<span class="form_elem_required">' + required + '</span>' + '</' + obj.elem_h + '>' + '</div></div>';
			break;

		case 'my_elem_hr':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_block_title">' + '<hr/>' + '</div></div>';
			break;

		case 'my_elem_text':
			var elem_50 = '';
			if (obj.elem_50) elem_50 = ' elem_50';
			return '<div elem_type="' + obj.type + '" class="form_elem' + elem_50 + '" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">' + obj.elem_title + '<span class="form_elem_required">' + required + '</span></div><input type="text" name="' + name + '" id="' + id + '"  class="" /></div>';
			break;

		case 'my_elem_textarea':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">' + obj.elem_title + '<span class="form_elem_required">' + required + '</span></div><textarea type="text" name="' + name + '" id="' + id + '"  class="" ></textarea></div>';
			break;

		case 'my_elem_file':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">' + obj.elem_title + '<span class="form_elem_required">' + required + '</span></div><input type="file" name="' + name + '" id="' + id + '"  class="" /></div>';
			break;

		case 'my_elem_date':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">' + obj.elem_title + '<span class="form_elem_required">' + required + '</span></div><input type="text" name="' + name + '" id="' + id + '"  class="datepicker" /></div>';
			break;

		case 'my_elem_select':
			var opt = '';
			
			for (var i = 0; i < obj.select_options.length; i++) {
				//alert(i);
				var sel = "";
				if (obj.select_default == obj.select_options[i].val) sel = 'selected="selected"';
				opt += '<option ' + sel + ' value="' + obj.select_options[i].val + '">' + obj.select_options[i].text + '</option>';
			}
			
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">' + obj.elem_title + '<span class="form_elem_required">' + required + '</span></div><select name="' + name + '" id="' + id + '"  class="" >' + opt + '</select></div>';
			break;

		case 'my_elem_checkbox':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">&nbsp;</div><input type="checkbox" name="' + name + '" id="my_' + elem_count + '"  class="" /><span class="form_elem_required">' + required + '</span><label for="my_' + elem_count + '">' + obj.elem_title + '</label></div>';
			break;

		case 'my_elem_radio':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">&nbsp;</div><input type="radio" name="' + name + '" id="my_' + elem_count + '"  class="" /><span class="form_elem_required">' + required + '</span><label for="my_' + elem_count + '">' + obj.elem_title + '</label></div>';
			break;

		case 'my_elem_button':
			return '<div elem_type="' + obj.type + '" class="form_elem" number="' + elem_count + '" json=' + json + '><div class="form_elem_title">&nbsp;<span class="form_elem_required">' + required + '</span></div><button id="' + id + '"  class="">' + obj.elem_title + '</button></div>';
			break;

		default:
			break;
	}
}

//Функция отображает/скрывает элементы редактирования полей формы в зависимости от типа выбранного поля
function show_hide_elem_panel() {
	
	var json = $(".form_elem[sel=sel]").attr('json');
	if (!json) {json = '{}';}
		
	var b = JSON.parse(json);
	
	
	$(".my_form_elem").hide();
	
	
	
	if (!b.type) return false;
	
	$("#elem_del_options_select").html("");
	$("#elem_select_default").html("");
	
	$(".my_form_elem input").val("");
	
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
	} else {
		$("#elem_digits").removeAttr('checked');
	}
	
	if (b.elem_number) {
		$("#elem_number").attr('checked', 'checked');
	} else {
		$("#elem_number").removeAttr('checked');
	}
	
	if (b.elem_email) {
		$("#elem_email").attr('checked', 'checked');
	} else {
		$("#elem_email").removeAttr('checked');
	}
	
	if (b.elem_url) {
		$("#elem_url").attr('checked', 'checked');
	} else {
		$("#elem_url").removeAttr('checked');
	}
	
	if (b.elem_required) {
		$("#elem_required").attr('checked', 'checked');
	} else {
		$("#elem_required").removeAttr('checked');
	}
	
	if (b.elem_onchange) {
		$("#elem_onchange").attr('checked', 'checked');
	} else {
		$("#elem_onchange").removeAttr('checked');
	}
	
	if (b.elem_onclick) {
		$("#elem_onclick").attr('checked', 'checked');
	} else {
		$("#elem_onclick").removeAttr('checked');
	}
	
	if (b.elem_bold) {
		$("#elem_bold").attr('checked', 'checked');
	} else {
		$("#elem_bold").removeAttr('checked');
	}

	if (b.elem_italic) {
		$("#elem_italic").attr('checked', 'checked');
	} else {
		$("#elem_italic").removeAttr('checked');
	}
	
	if (b.elem_50) {
		$("#elem_50").attr('checked', 'checked');
	} else {
		$("#elem_50").removeAttr('checked');
	}
	
	$("#elem_align option[value=" + b.elem_align + "]").attr('selected', 'selected');
	$("#elem_h option[value=" + b.elem_h + "]").attr('selected', 'selected');

	var properties = new Object();

	properties.elem_class = true;
	properties.elem_title = true;
	properties.elem_id = true;
	properties.elem_name = true;
	
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
	
	
	$("#elem_50").parent().show();
	for (var keyVar in properties ) {
		if (properties[keyVar]) $("#" + keyVar).parent().show();
	}

}

//Функция загрузки сохраненной формы на сервере
function save_form(){
	var cook = '';
	
	for (var i = 0; i < count_step_tab; i++) {
		$("#step_" + (i + 1) + " .form_elem").attr('step', (i + 1));
	}
	

	$(".form_elem").each(function(){
		
		
		var js = $(this).attr('json');
		
		var obj = JSON.parse(js);
		obj.step = $(this).attr('step');
		var js = JSON.stringify(obj);
		cook += js + "|||";

	});
	if (cook == '') cook = 'true';
	
	
	$("#progressbar").show();
	$.post("index.php", {save: cook}, function(data) {		
		$("#progressbar").hide();
	});


};

//Функция сохранения формы на сервере
function load_form(){
	var cook = "{}";

$.ajax({
	url: "index.php",
	type : "POST",
	data : {load: "true"},
	dataType: "text",
	success: function(data){
		
		cook = data;
		if (!cook) cook = "";
		var arr = new Array();
		arr = cook.split('|||');	

		for (i = 0; i < arr.length-1; i++) {		
			var abs = JSON.parse(arr[i]);
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
			helper: "clone",
			revert: "invalid",
			addClasses: false,
			start: function (event, ui) {
				var b = new Object();
				b.type = $(this).attr('id');
				
				var html_ = get_elem_html(b);
				
				$("#tabs-1 a.elem_button").each(function(){
					if ($(this).css('position') == 'absolute') {
						
						$(this).attr('class', '');
						$(this).html(html_);
						$(this).css('width', '400px');
					}
				});
				
				//$(html_).replaceAll($(this).hide());
			},
			
			stop: function (event, ui) {
				var b = new Object();
				b.type = $(this).attr('id');				
				var html_ = get_elem_html(b);

				
				$(html_).replaceAll($("#content a.elem_button"));
			}
			
		});
		
		
		
	}});
	
};

//Сохранение формы перед закрытием страницы
/*
 
 window.onbeforeunload = function(evt) {
	save_form();
    //evt = evt || window.event;
    //evt.returnValue = "Вы же ничего не сохранили!";
}
*/

$(document).ready(function(){
	
	load_form();
	
	jQuery('#sideLeft').containedStickyScroll({
        closeChar: '' 
    });
	
	
	//$( "#progressbar" ).progressbar();
	
	$( ".elem_button, button, .button").button({
            icons: {
                primary: "ui-icon-play"
            }
        });
	$( "#tabs" ).tabs({
	   show: function(event, ui) {show_hide_elem_panel();}
	});
	
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
	});
	
	
	
	
//Сохранение элемента формы при редактировании - для чекбоксов
	$("#tabs-2 input[type=checkbox]").live('change keyup keydown', function(){
		$("#save_elem").click();
	});

//Сохранение элемента формы при редактировании - нажатие клавиши в полях
	$("#tabs-2 input, #tabs-2 select, #tabs-2 textarea").live('change keyup', function(){
		var ch = true;
		if ($(this).attr('id') == 'elem_del_options_select') ch = false;
		if ($(this).attr('id') == 'elem_add_options_val') ch = false;
		if ($(this).attr('id') == 'elem_add_options_text') ch = false;
		
		if ($(this).val() && (ch)) {
			$("#save_elem").click();
		}		
	});
	
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
		if ($(".form_elem[sel=sel]").length > 0) {
			$(".form_elem[sel=sel]").after(html);
		} else {
			
			
			
			$(current_step_tab).append(html);
		}
		$(".form_elem").removeClass('ui-widget-header ui-corner-all');
		$(".form_elem[sel=sel]").removeAttr('sel');
		
		$("#content").sortable({
				items: '.form_elem',
				stop:  function(event, ui) {}
			});
		
		$("#save_elem").click();
		
		
		$( ".datepicker" ).datepicker({
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
		
	});
	
		

//фокус на элемент формы
	$(".form_elem").live('mouseover', function(){
		$(this).addClass("ui-widget-header ui-corner-all");
	});
	
//потеря фокуса с элемента формы	
	$(".form_elem").live('mouseout', function(){
		if ($(this).attr('sel') != 'sel') {
			$(this).removeClass("ui-widget-header ui-corner-all");
		}		
	});
	
//нажатие на элемент формы в "#content"
	$(".form_elem").live('click', function(){
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
	
		
		if ($("#elem_digits").attr('checked') == "checked") b.elem_digits = true;
		if ($("#elem_number").attr('checked') == "checked") b.elem_number = true;
		if ($("#elem_email").attr('checked') == "checked") b.elem_email = true;
		if ($("#elem_url").attr('checked') == "checked") b.elem_url = true;
		if ($("#elem_required").attr('checked') == "checked") b.elem_required = "*";
		if ($("#elem_onchange").attr('checked') == "checked") b.elem_onchange = true;
		if ($("#elem_onclick").attr('checked') == "checked") b.elem_onclick = true;
		if ($("#elem_bold").attr('checked') == "checked") b.elem_bold = true;
		if ($("#elem_italic").attr('checked') == "checked") b.elem_italic = true;
		
		
		
		b.select_options = new Array();
		var i = 0;
		b.select_default = $("#elem_select_default").val();
			
		$("#elem_del_options_select option").each(function(){
			b.select_options[i] = new Object();
			b.select_options[i].val = $(this).val();
			b.select_options[i].text= $(this).text();
			i++;
		});
		
		if ($("#elem_onchange").attr('checked') == 'checked') {
			b.elem_onchange = true;
		} else {
			b.elem_onchange = false;
		}
		
		if ($("#elem_50").attr('checked') == 'checked') {
			b.elem_50 = true;
		} else {
			b.elem_50 = false;
		}
		
		//$(".form_elem[sel=sel]").hide();
		var for_click = $(".form_elem[sel=sel]");
		b.type = $(".form_elem[sel=sel]").attr('elem_type');

		
		var html_ = get_elem_html(b);
		
		//$("#content").append(html_);
		//html_ = html_.replace('T', 'e');
		//alert(html_);
		//$(".form_elem[sel=sel]").remove();
		//$("#content").append(html_);
		$(html_).replaceAll($(".form_elem[sel=sel]")).click();
		
		
		$( ".datepicker" ).datepicker({
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
		

	});
	
	
	
//Удаление выбранного элемента формы
	$("#delete_elem").click(function(){		
		$(".form_elem[sel=sel]").remove();		
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
	});
	
//Нажатие "Сохранить форму"
	$("#save_form").click(function(){
		save_form();
	});
	
	$("#download_form").click(function(){
		
		$( "#download_dialog" ).dialog({
			resizable: false,
			title: "Загрузить форму",
			height: 700,
			width: 900,
			modal: true,
			buttons: {
				"Delete all items": function() {
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		$.ajax({
	url: "get_html.php",
	type : "GET",
	dataType: "text",
	success: function(data){
		$( "#download_dialog" ).html("<xmp>" + data + "</xmp>");
	}
	});
		
		//$( "#download_dialog" ).load("get_html.php");
	});
	
});
