{extends file="main.tpl"}
	{block name="content"}
	<script type="text/javascript" src="js/admin.js"></script>
	
	<h3>Добавить пользователя к проекту</h3>
	<hr />
	<form>
		Пользователь: <select id="users">
			{$users}
		</select>
		<br />
		Проект: <select id="projects">
			{$projects}
		</select>
		<br />		
		<button id="submit" >Добавить</button><span id="message"></span>
	</form>
	
	<h3>Добавить аккаунт пользователя</h3>
	<hr />
	<form method="POST">
		<input type="hidden" name="request" value="add_user" />
		Логин: <input type="text" name="user_login" value="" /><br />
		Имя: <input type="text" name="user_name" value="" /><br />
		E-mail: <input type="text" name="user_email" value="" /><br />
		<input type="submit" id="submit_for_add" value="Создать аккаунт" /><span>{$add_user_message}</span>
	</form>
	
	<h3>Удалить аккаунт пользователя</h3>
	<hr />
	<form>
		<select id="users_for_delete">
			{$users}
		</select>
		<button id="submit_for_delete" >Удалить</button><span id="message_for_delete"></span>
	</form>
	
	{/block}
{/extends}