{extends file="main.tpl"}
	{block name="content"}
		<script type="text/javascript" src="js/form_browse.js"></script>

		Выберите проект: 
		<select id="projects">
			<option value="">не выбрано</option>
			{foreach from=$projects item=item}
				<option value="{$item.id}">{$item.name}</option>
			{/foreach}
		</select>
		<br/>
		Выберите sub_проект: 
		<select id="sub_projects">

		</select>
		<br/>
		Выберите форму: 
		<select id="forms">

		</select>
		<br/>
		<button id="open_form">Открыть</button><br/>
		<input type="text" id="new_form_name" />
		<button id="new_form">New</button>
	{/block}
{/extends}