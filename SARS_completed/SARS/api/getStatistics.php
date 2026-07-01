<?php
session_start();
header("Content-Type: application/json");
include("../config/database.php");

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Sila login dahulu"]);
    exit();
}

// Jumlah kes keseluruhan
$sqlTotal = "SELECT COUNT(*) AS total FROM detections";
$totalCases = mysqli_fetch_assoc(mysqli_query($conn, $sqlTotal))['total'];

// Pecahan mengikut jenis haiwan
$sqlBreakdown = "SELECT animal_type, COUNT(*) AS total
                 FROM detections
                 GROUP BY animal_type";
$resBreakdown = mysqli_query($conn, $sqlBreakdown);
$breakdown = [];
while ($row = mysqli_fetch_assoc($resBreakdown)) {
    $breakdown[$row['animal_type']] = (int) $row['total'];
}

// Trend 7 hari lepas (untuk graf mingguan)
$sqlTrend = "SELECT DATE(detected_at) AS day, COUNT(*) AS total
             FROM detections
             WHERE detected_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
             GROUP BY DATE(detected_at)
             ORDER BY day ASC";
$resTrend = mysqli_query($conn, $sqlTrend);
$trend = [];
while ($row = mysqli_fetch_assoc($resTrend)) {
    $trend[] = [
        "date"  => date("d/m", strtotime($row['day'])),
        "total" => (int) $row['total']
    ];
}

// Tahap amaran harian: berdasarkan jumlah kes hari ini
$sqlToday = "SELECT COUNT(*) AS total FROM detections WHERE DATE(detected_at) = CURDATE()";
$casesToday = (int) mysqli_fetch_assoc(mysqli_query($conn, $sqlToday))['total'];

if ($casesToday >= 5) {
    $alertLevel = "Bahaya";
} elseif ($casesToday >= 2) {
    $alertLevel = "Sederhana";
} else {
    $alertLevel = "Selamat";
}

echo json_encode([
    "status" => "success",
    "data"   => [
        "total_cases"  => (int) $totalCases,
        "alert_level"  => $alertLevel,
        "breakdown"    => $breakdown,
        "weekly_trend" => $trend
    ]
]);

mysqli_close($conn);
?>
