<?php
session_start();

// --- Антиспам: ограничение по времени между отправками ---
$timeLimit = 10; // секунд
if (isset($_SESSION['last_form_submit']) && (time() - $_SESSION['last_form_submit'] < $timeLimit)) {
  $waitTime = $timeLimit - (time() - $_SESSION['last_form_submit']);
  die("rate_limit:$waitTime");
}
$_SESSION['last_form_submit'] = time();

// --- Получение полей ---
$deliveryType = $_POST['delivery_type'] ?? '';
$quantity = $_POST['quantity-num'] ?? '';
$approximate = $_POST['approximate_price'] ?? '';

// --- Доп. данные ---
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

// --- Таблица письма ---
$message = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"></head>';
$message .= '<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">';
$message .= '<table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px #eee;">';
$message .= '<tr style="background:#f3f3f3;">
               <th style="padding:12px 8px;text-align:left;border-bottom:1px solid #e0e0e0;">Поле</th>
               <th style="padding:12px 8px;text-align:left;border-bottom:1px solid #e0e0e0;">Значение</th>
             </tr>';

$rows = [
  'Тип рассылки' => $deliveryType,
  'Количество абонентов' => $quantity,
  'Ориентировочная стоимость' => $approximate . " ₽/мес",
  'IP' => $ip,
  'User-Agent' => $ua,
  'Referer' => $referer,
];

foreach ($rows as $label => $value) {
  $message .= '<tr>
                   <td style="padding:8px 8px;border-bottom:1px solid #f0f0f0;">'
    . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
    . '</td>
                   <td style="padding:8px 8px;border-bottom:1px solid #f0f0f0;">'
    . htmlspecialchars($value, ENT_QUOTES, 'UTF-8')
    . '</td>
                 </tr>';
}
$message .= '</table></body></html>';

// --- Отправка ---
$domain = preg_replace('/[^a-z0-9\.\-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
$to = "andre.dena.919@mail.ru";
$subject = "Заявка с калькулятора — {$deliveryType}";
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@{$domain}\r\n";

echo mail($to, $subject, $message, $headers) ? "success" : "error";
