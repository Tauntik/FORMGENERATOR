{extends file="main.tpl"}
	{block name="content"}
		{literal}
		<script type="text/javascript">
		$(document).ready(function(){
			$("#projects").change(function(){
				if (!$(this).val()) return false;
				$.ajax({
					url: "index.php",
					type : "POST",
					data : {
						request: "get_sub_projects",
						'id_project': $(this).val()
					},
					dataType: "text",
					success: function(data){
						$("#sub_projects").html(data);
						$("#forms").html("");
					}
				});
			});
			
			$("#sub_projects").change(function(){
				if (!$(this).val()) return false;
				$.ajax({
					url: "index.php",
					type : "POST",
					data : {
						request: "get_forms",
						'id_sub_project': $(this).val()
					},
					dataType: "text",
					success: function(data){
						$("#forms").html(data);
					}
				});
			});
			
			$("#open_form").click(function(){
				if ($("#forms").val()) {
					window.location.href = "?page=form_edit&form_id=" + $("#forms").val();
				} else {
					alert("Выберите форму для открытия!");
				}
			});
			
			$("#new_form").click(function(){
				if ($("#forms").val() && $("#new_form_name").val()) {
					window.location.href = "?page=form_create&new_form_name=" + $("#new_form_name").val() + "&id_sub_project=" + $("#sub_projects").val();
				} else {
					alert("Выберите форму для открытия!");
				}
			});
			
		});
		{/literal}
		</script>
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