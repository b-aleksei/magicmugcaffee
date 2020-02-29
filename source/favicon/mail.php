<?php
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$message = $_POST['user_message'];
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$message = htmlspecialchars($message);
$name = urldecode($name);
$email = urldecode($email);
$message = urldecode($message);
$name = trim($name);
$phone = trim($phone);
$email = trim($email);
if (mail("magicmugcafe@gmail.com", "Заявка с сайта", "Оставил заявку: $name \r\n Его телефон: $phone \r\n Почта этого пользователя: $email \r\n Его сообщение: $message", "From: info@magicmugcafe.com \r\n"))
    {     echo "$name Your message has been successfully sent";
   	echo "<br /><br /><a href='index.html'>Вернуться на сайт.</a>";
   } else {
       echo "при отправке сообщения возникли ошибки";
       echo "<br /><br /><a href='index.html'>comeback to the site</a>";
   }
?>
