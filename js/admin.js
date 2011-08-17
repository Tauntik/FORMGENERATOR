//Document_Ready
$(document).ready(function(){
	
	$("#users").change(function(){
		$("#message").html("");
		//Проверка, существует ли привязка пользователя к группе
		$.ajax({
			url: "index.php",
			type : "POST",
			data : {
				request: "get_user_in_project",
				'id_user': $("#users").val(),
				'id_project': $("#projects").val()
			},
			dataType: "text",
			success: function(data){
				if (data == "true") {
					$("#submit").html("Удалить");
					$("#message").html("Пользователь уже есть в выбранном проекте!");
				} else if (data == "false"){
					$("#submit").html("Добавить");
					$("#message").html("Пользователя нет в выбранном проекте!");
				} else {
					$("#message").html("Произошла ошибка при отправке!");
				}
			}
		});
	});
	
	$("#projects").change(function(){
		$("#users").change();
	});
	
	//нажата кнопка привязки/отвязки пользователя от проекта
	$("#submit").click(function(){
		$.ajax({
			url: "index.php",
			type : "POST",
			data : {
				request: "set_user_in_project",
				'id_user': $("#users").val(),
				'id_project': $("#projects").val()
			},
			dataType: "text",
			success: function(data){
				$("#users").change();
				//$("#message").html(data);				
			}
		});
		return false;
	});
	
	//удаление аккаунта пользователя
	$("#submit_for_delete").click(function(){
		$.ajax({
			url: "index.php",
			type : "POST",
			data : {
				request: "delete_user",
				'id_user': $("#users_for_delete").val()				
			},
			dataType: "text",
			success: function(data){
				if (data == "deleted") {
					$("#message_for_delete").html("Аккаунт удален!");
					$("#users_for_delete option:selected").remove();
				} else {
					$("#message_for_delete").html("Ошибка при удалении!");
				}
				
			}
		});
		return false;
	});
	
	
});
