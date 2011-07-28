{extends file="main.tpl"}
	{block name="content"}
		<form method="post">			
			LOGIN: <input type="text" name="login" /> <br/>
			PASS: <input type="password" name="password" /> <br/>
			<div id="capcha">capcha<div>
			capcha: <input type="text" name="capcha" /> <br/>
			<input type="submit" value="Send" />
		</form>
		<br/><br/><br/><br/><br/>
	{/block}
{/extends}