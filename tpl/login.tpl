{extends file="main.tpl"}
	{block name="content"}
		<div align="right" style="width: 56%;">
			<form method="post">			
				LOGIN: <input type="text" name="login" tabindex="1" /> <br/>
				PASS: <input type="password" name="password" tabindex="2" /> <br/>
				 <img src='include/captcha.php' border=1 id="capcha-image">&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" onclick="document.getElementById('capcha-image').src='include/captcha.php?rid=' + Math.random();"><img alt="Refresh" border="0" width="40px" height="40px" src="images/refresh.png" /></a> <br />
				capcha: <input type="text" name="capcha" value="{$capcha}" tabindex="3" /> <br/>
				<input type="submit" value="Send" tabindex="4" />
			</form>
			<div style="color: #ff0000">{$error_message}</div>
		</div>
	{/block}
{/extends}