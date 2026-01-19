<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Configuration
$to = "kamal@oranostrans.com, rmi.search@gmail.com";
$from_email = "contact@oranostrans.com"; // Must be an email from your Hostinger domain
$subject = "Nouvelle Demande de Devis - ORANOS TRANS";

// Extract data
$departure = $_POST['departure'] ?? 'N/A';
$arrival = $_POST['arrival'] ?? 'N/A';
$nature = $_POST['nature'] ?? 'N/A';
$weight = $_POST['weight'] ?? 'N/A';
$dimensions = $_POST['dimensions'] ?? 'N/A';
$palettes = $_POST['palettes'] ?? 'N/A';
$transportType = $_POST['transportType'] ?? 'N/A';
$truckType = $_POST['truckType'] ?? 'N/A';
$trailerType = $_POST['trailerType'] ?? 'N/A';
$name = $_POST['name'] ?? 'N/A';
$email = $_POST['email'] ?? 'N/A';
$phone = $_POST['phone'] ?? 'N/A';
$company = $_POST['company'] ?? 'N/A';

// Boundary for multipart
$boundary = md5(time());

// Headers
$headers = "From: ORANOS TRANS <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Email Body
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";

$body = "
<div style='font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
    <h2 style='color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;'>Nouvelle Demande de Devis</h2>
    
    <h3 style='color: #444;'>1. Cargaison</h3>
    <p><strong>Départ :</strong> $departure</p>
    <p><strong>Arrivée :</strong> $arrival</p>
    <p><strong>Nature :</strong> $nature</p>
    <p><strong>Poids :</strong> $weight</p>
    <p><strong>Dimensions :</strong> $dimensions</p>
    <p><strong>Nb Palettes :</strong> $palettes</p>

    <h3 style='color: #444;'>2. Transport</h3>
    <p><strong>Type :</strong> $transportType</p>
    <p><strong>Camion :</strong> $truckType</p>
    <p><strong>Remorque :</strong> $trailerType</p>

    <h3 style='color: #444;'>3. Contact Client</h3>
    <p><strong>Nom :</strong> $name</p>
    <p><strong>Email :</strong> <a href='mailto:$email'>$email</a></p>
    <p><strong>Téléphone :</strong> $phone</p>
    <p><strong>Société :</strong> $company</p>

    <p style='margin-top: 30px; font-size: 12px; color: #888;'>Ce message a été envoyé depuis le formulaire de devis d'ORANOS TRANS.</p>
</div>
";

$message .= $body . "\r\n\r\n";

// Handle File Attachments
if (!empty($_FILES['files'])) {
    foreach ($_FILES['files']['tmp_name'] as $index => $tmp_name) {
        if (!empty($tmp_name)) {
            $file_name = $_FILES['files']['name'][$index];
            $file_size = $_FILES['files']['size'][$index];
            $file_type = $_FILES['files']['type'][$index];
            $content = file_get_contents($tmp_name);
            $content = chunk_split(base64_encode($content));

            $message .= "--$boundary\r\n";
            $message .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
            $message .= "Content-Description: $file_name\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$file_name\"; size=$file_size;\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $message .= $content . "\r\n\r\n";
        }
    }
}

$message .= "--$boundary--";

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email. Check Hostinger mail configuration."]);
}
?>
