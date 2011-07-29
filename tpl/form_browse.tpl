{extends file="main.tpl"}
	{block name="content"}
		{literal}
		<script type="text/javascript">
		$(document).ready(function(){
			$("#projects").change(function(){
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
		});
		{/literal}
		</script>
		Выберете проект: 
		<select id="projects">
			<option value="">не выбрано</option>
			{foreach from=$projects item=item}
				<option value="{$item.id}">{$item.name}</option>
			{/foreach}
		</select>
		<br/>
		Выберете sub_проект: 
		<select id="sub_projects">

		</select>
		<br/>
		Выберете sub_проект: 
		<select id="forms">

		</select>
		<br/>
		<button id="open_form">Открыть</button>
		
	{/block}
{/extends}