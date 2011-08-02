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
		if ($("#sub_projects").val() && $("#new_form_name").val()) {
			window.location.href = "?page=form_create&new_form_name=" + $("#new_form_name").val() + "&id_sub_project=" + $("#sub_projects").val();
		} else {
			alert("Выберите раздел для формы!");
		}
	});
	
});