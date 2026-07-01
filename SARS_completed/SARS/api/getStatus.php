<?php
session_start();
header("Content-Type: application/json");
include("../config/database.php");

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Sila login dahulu"]);
    exit();
}

// Jumlah kes dikesan hari ini
$sqlToday = "SELECT COUNT(*) AS total FROM detections WHERE DATE(detected_at) = CURDATE()";
$resToday = mysqli_query($conn, $sqlToday);
$totalToday = mysqli_fetch_assoc($resToday)['total'];

// 5 pengesanan terkini (untuk paparan dashboard)
$sqlRecent = "SELECT animal_type, location, status, detected_at
              FROM detections
              ORDER BY detected_at DESC
              LIMIT 5";
$resRecent = mysqli_query($conn, $sqlRecent);

$recent = [];
while ($row = mysqli_fetch_assoc($resRecent)) {
    $recent[] = [
        "time"        => date("h:i A", strtotime($row['detected_at'])),
        "location"    => $row['location'],
        "animal_type" => $row['animal_type'],
        "status"      => $row['status']
    ];
}

echo json_encode([
    "status" => "success",
    "data"   => [
        "system_status"     => "AKTIF",
        "cases_today"       => (int) $totalToday,
        "recent_detections" => $recent
    ]
]);

mysqli_close($conn);
?>
