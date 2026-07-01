<?php
session_start();
header("Content-Type: application/json");
include("../config/database.php");

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Sila login dahulu"]);
    exit();
}

// Sokong filter pilihan: ?animal_type=Lebah  dan/atau  ?date=2026-06-26
$animalType = isset($_GET['animal_type']) ? trim($_GET['animal_type']) : '';
$date       = isset($_GET['date']) ? trim($_GET['date']) : '';

$sql    = "SELECT animal_type, location, status, detected_at FROM detections WHERE 1=1";
$types  = "";
$params = [];

if ($animalType !== '') {
    $sql      .= " AND animal_type = ?";
    $types    .= "s";
    $params[] = $animalType;
}

if ($date !== '') {
    $sql      .= " AND DATE(detected_at) = ?";
    $types    .= "s";
    $params[] = $date;
}

$sql .= " ORDER BY detected_at DESC";

$stmt = mysqli_prepare($conn, $sql);
if ($types !== "") {
    mysqli_stmt_bind_param($stmt, $types, ...$params);
}
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$history = [];
while ($row = mysqli_fetch_assoc($result)) {
    $history[] = [
        "date"        => date("d/m/Y", strtotime($row['detected_at'])),
        "time"        => date("h:i A", strtotime($row['detected_at'])),
        "location"    => $row['location'],
        "animal_type" => $row['animal_type'],
        "status"      => $row['status']
    ];
}

echo json_encode([
    "status" => "success",
    "total"  => count($history),
    "data"   => $history
]);

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
