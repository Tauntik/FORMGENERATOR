{extends file="main.tpl"}
	{block name="content"}
	
	<div id="container">
			<div id="content">
				<div id="step_tabs">
					<ul>
						<li><a href="#step_1">Шаг 1</a></li>
						<li><a href="#step_add">+</a></li>
						<li><a href="#step_delete">-</a></li>

					</ul>
					<div id="step_1">

					</div>
					<div id="step_add">
						+
					</div>
					<div id="step_delete">
						-
					</div>
				</div>
			</div><!-- #content-->
		</div><!-- #container-->

		<div class="sidebar" id="sideLeft">
			<div id="tabs">
				<ul>
					<li><a href="#tabs-1">Элементы</a></li>
					<li><a href="#tabs-2">Редактирование</a></li>
					<li><a href="#tabs-3">Форма</a></li>
				</ul>
				<div id="tabs-1">
					<div align="center">						
						<a href="#" id="my_elem_title_small" class="elem_button">Заголовок</a>
						<a href="#" id="my_elem_hr" class="elem_button">HR</a>

						<a href="#" id="my_elem_text" class="elem_button">Text</a>
						<a href="#" id="my_elem_textarea" class="elem_button">Textarea</a>
						<a href="#" id="my_elem_file" class="elem_button">File</a>
						<a href="#" id="my_elem_select" class="elem_button">Select</a>
						<a href="#" id="my_elem_date" class="elem_button">Date</a>

						<a href="#" id="my_elem_checkbox" class="elem_button">Checkbox</a>
						<a href="#" id="my_elem_radio" class="elem_button">Radio</a>			
						<a href="#" id="my_elem_button" class="elem_button">Button</a>
					</div>
				</div>
				<div id="tabs-2">
					
					<div class="my_form_elem">
						<div class="my_form_elem_title">Title: </div>
						<input type="text" id="elem_title" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Name: </div>
						<input type="text" id="elem_name" value="field[name]" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Id: </div>
						<input type="text" id="elem_id" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Class: </div>
						<input type="text" id="elem_class" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Maxlength: </div>
						<input type="text" id="elem_maxlength" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Example: </div>
						<input type="text" id="elem_example" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Mask: </div>
						<input type="text" id="elem_mask" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Digits: </div>
						<input type="checkbox" id="elem_digits" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Min: </div>
						<input type="text" id="elem_min" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Max: </div>
						<input type="text" id="elem_max" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Number: </div>
						<input type="checkbox" id="elem_number" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Email: </div>
						<input type="checkbox" id="elem_email" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Url: </div>
						<input type="checkbox" id="elem_url" />
					</div>
					<!--
					<div class="my_form_elem">
						<div class="my_form_elem_title">EqualTO: </div>
						<input type="text" id="elem_equalto" value="" />
					</div>
					-->
					<div class="my_form_elem">
						<div class="my_form_elem_title"><label for="elem_required">Required: </label></div>
						<input type="checkbox" id="elem_required" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Onchange: </div>
						<input type="checkbox" id="elem_onchange" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Onclick: </div>
						<input type="checkbox" id="elem_onclick" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title"><label for="elem_bold">Bold: </label></div>
						<input type="checkbox" id="elem_bold" />
					</div>
					
					<div class="my_form_elem">
						<div class="my_form_elem_title"><label for="elem_bold">Italic: </label></div>
						<input type="checkbox" id="elem_italic" />
					</div>
					
					<div class="my_form_elem">
						<div class="my_form_elem_title">Align: </div>
						<select id="elem_align">
							<option value="left">left</option>
							<option value="center">center</option>
							<option value="right">right</option>
						</select>
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">H1-H6: </div>
						<select id="elem_h">
							<option value="span">span</option>
							<option value="h1">h1</option>
							<option value="h2">h2</option>
							<option value="h3">h3</option>
							<option value="h4">h4</option>
							<option value="h5">h5</option>
							<option value="h6">h6</option>
						</select>
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">File_accept: </div>
						<input type="text" id="elem_file_accept" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">File_size: </div>
						<input type="text" id="elem_file_size" value="" />
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Select_default: </div>
						<select id="elem_select_default">

						</select>
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Del_options: </div>
						<select id="elem_del_options_select" multiple>

						</select>
						<button id="elem_del_options">Удалить option</button>
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title">Add_options: </div>
						v: <input type="text" id="elem_add_options_val" value=""  style="width: 20%;"/>
						&nbsp;t: <input type="text" id="elem_add_options_text" value="" style="width: 20%;"/>
						<button id="elem_add_options">Добавить option</button>
					</div>

					<div class="my_form_elem">
						<div class="my_form_elem_title"><label for="elem_50">50%: </label></div>
						<input type="checkbox" id="elem_50" />
					</div>


					<br/>

					<button id="save_elem">Сохранить</button>
					<button id="delete_elem">Удалить</button>
					
					<div id="save_panel"></div>
				</div>
				<div id="tabs-3">
					<div id="progressbar"></div>
					<button id="save_form">Сохранить</button>
					<button id="download_form">Загрузить</button>
					<div id="download_dialog" style="display: none;"></div>
					<a href="get_html.php" target="blank" class="button">View</a>
				</div>
				<br/>
			</div>
		</div><!-- .sidebar#sideLeft -->
	{/block}
{/extends}