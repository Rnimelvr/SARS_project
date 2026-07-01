<?php
session_start();
header("Content-Type: application/json");
include("../config/database.php");

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Sila login dahulu"]);
    exit();
}

$username = $_SESSION['user'];

$sql  = "SELECT id, username, full_name, role, created_at FROM admin WHERE username = ? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {
    $profile = mysqli_fetch_assoc($result);
    echo json_encode([
        "status" => "success",
        "data"   => [
            "id"         => $profile['id'],
            "username"   => $profile['username'],
            "full_name"  => $profile['full_name'],
            "role"       => $profile['role'],
            "created_at" => $profile['created_at']
        ]
    ]);
} else {
    echo json_encode([
        "status"  => "failed",
        "message" => "Profil tidak dijumpai"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
