<?php
session_start(); // Включаем сессии

// Ограничение времени между отправками (в секундах)
$timeLimit = 10; // 30 секунд

// Проверяем, когда была последняя отправка
if (
  isset($_SESSION['last_form_submit']) &&
  (time() - $_SESSION['last_form_submit'] < $timeLimit)
) {
  $waitTime = $timeLimit - (time() - $_SESSION['last_form_submit']);
  die("rate_limit:$waitTime"); // Сообщение о лимите
}

// Обновляем время последней отправки
$_SESSION['last_form_submit'] = time();

// Получаем все поля
$data = $_POST;
$errors = [];

// Проверка обязательных полей (кроме comment)
foreach ($data as $key => $value) {
  if ($key === 'comment')
    continue; // комментарий не обязателен

  if (is_array($value))
    $value = implode(', ', $value);
  if (trim($value) === '') {
    $errors[] = "Поле '$key' обязательно для заполнения.";
  }
}

// Проверка имени
if (isset($data['name']) && !preg_match("/^[-' a-zA-Zа-яА-ЯёЁ]+$/u", $data['name'])) {
  $errors[] = "Имя может содержать только буквы, пробел, - и '";
}

// Проверка телефона
if (isset($data['phone'])) {
  $digits = preg_replace('/\D/', '', $data['phone']);
  if (strlen($digits) !== 11) {
    $errors[] = "Телефон должен содержать 11 цифр.";
  }
}

if ($errors) {
  echo "validation_error:" . implode(' ', $errors);
  exit;
}

// Массив для красивых названий полей
$field_names = [
  'name' => 'Имя',
  'phone' => 'Телефон',
  'comment' => 'Комментарий',
];

// Формируем HTML-письмо
$message = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"></head>';
$message .= '<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">';
$message .= '<table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px #eee;">';
$message .= '<tr style="background:#f3f3f3;"><th style="padding:12px 8px;text-align:left;border-bottom:1px solid #e0e0e0;">Поле</th><th style="padding:12px 8px;text-align:left;border-bottom:1px solid #e0e0e0;">Значение</th></tr>';
foreach ($data as $key => $value) {
  if (is_array($value))
    $value = implode(', ', $value);
  $label = isset($field_names[$key]) ? $field_names[$key] : $key;
  $message .= '<tr><td style="padding:8px 8px;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($label) . '</td><td style="padding:8px 8px;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($value) . '</td></tr>';
}
$message .= '</table>';
$message .= '</body></html>';

$to = "andre.dena.919@mail.ru";
$subject = "Заявка с сайта";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: noreply@" . $_SERVER['SERVER_NAME'] . "\r\n";
$success = mail($to, $subject, $message, $headers);

if ($success) {
  echo "success";
  exit;
} else {
  echo "error";
}
?>