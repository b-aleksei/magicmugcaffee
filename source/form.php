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
mail("103301@mail.ru", "Заявка с сайта", "Оставил заявку: $name \r\n Его телефон: $phone \r\n Почта этого пользователя:
$email \r\n Его сообщение: $message", "From: info@magicmugcafe.com \r\n")
?>
