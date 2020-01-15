<?php
ini_set('display_errors','On');
error_reporting('E_ALL');
$fio = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$message = $_POST['user_message'];
$fio = htmlspecialchars($fio);
$email = htmlspecialchars($email);
$message = htmlspecialchars($message);
$fio = urldecode($fio);
$email = urldecode($email);
$message = urldecode($message);
$fio = trim($fio);
$phone = trim($phone);
$email = trim($email);
if (mail("103301@mail.ru", "Заявка с сайта", 'Оставил заявку: ' .$name.<br/> 'Его телефон: ' .$phone.<br/> 'Почта этого
пользователя: ' .$email.<b/r> 'Его сообщение: ' .$message, "From: pochta@bugaev13.tmweb.ru \r\n"))
    {     echo "Сообщение отправлено. Спасибо Вам " . $fio . ", мы скоро свяжемся с Вами.";
   	echo "<br /><br /><a href='index.html'>Вернуться на сайт.</a>";
   } else {
       echo "при отправке сообщения возникли ошибки";
   }
?>
<script>
function changeurl(){eval(self.location="index.html");}
window.setTimeout("changeurl();",6000);
</script>
