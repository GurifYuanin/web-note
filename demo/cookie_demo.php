<?php
	setcookie('message1', 'hello', time() + 3600);
	setcookie('message2', 'world', time() + 3600);
	for ($i = 1; isset($_COOKIE['message'.$i]); $i++) {
		echo 'php: message' . $i . ' = ' . $_COOKIE['message' . $i] . '<br>';
	}
 ?>
 <script>
 	var allCookie = document.cookie;
 	var cookieArr = allCookie.split(';');
 	var cookieString = '';
 	for (var i = 1; i <= cookieArr.length; i++) {
 		cookieString += 'javascript: ' + cookieArr[i - 1] + '<br>';
 	}
 	var div = document.createElement('div');
 	div.innerHTML = cookieString;
 	document.body.appendChild(div);
 </script>