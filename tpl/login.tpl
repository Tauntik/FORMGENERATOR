{extends file="main.tpl"}
	{block name="content"}
		<form action="post">			
			LOGIN: <input type="text" name="login" /> <br/>
			PASS: <input type="password" name="password" /> <br/>
			capcha: <input type="text" name="capcha" /> <br/>
			<input type="submit" value="Send" />
		</form>
		
	{/block}
{/extends}