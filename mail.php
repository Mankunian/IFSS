<?php

$recepient = "info@ifss.kz";
$sitename = "International Fizmat Summer School";

$f_name = trim($_POST["f_name"]);
$l_name = trim($_POST["l_name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$address = trim($_POST["address"]);
$city = trim($_POST["city"]);
$message = "Имя: $f_name \nФамилия: $l_name \nE-mail: $email \nТелефон: $phone \nАдрес: $address \nГород: $city";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");