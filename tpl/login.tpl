{extends file="main.tpl"}
	{block name="content"}
		<form method="post">			
			LOGIN: <input type="text" name="login" /> <br/>
			PASS: <input type="password" name="password" /> <br/>
            <div id="capcha"> <img src='include/captcha.php' border=1 id="capcha-image">&nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0);" onclick="document.getElementById('capcha-image').src='include/captcha.php?rid=' + Math.random();"><img alt="Refresh" border="0" width="40px" height="40px" src="images/refresh.png" /></a> <div>
			capcha: <input type="text" name="capcha" /> <br/>
			<input type="submit" value="Send" />
		</form>
		<br/><br/><br/><br/><br/>
	{/block}
{/extends}