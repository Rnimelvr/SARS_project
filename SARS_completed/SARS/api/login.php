<?php
session_start();
header("Content-Type: application/json");
include("../config/database.php");

$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if ($username === '' || $password === '') {
    echo json_encode([
        "status"  => "failed",
        "message" => "Username dan password diperlukan"
    ]);
    exit();
}

$sql = "SELECT id, username, full_name, role FROM admin WHERE username = ? AND password = ? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ss", $username, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {
    $admin = mysqli_fetch_assoc($result);

    // Simpan session supaya endpoint lain (getStatus, getHistory, dll) tahu user dah login
    $_SESSION['user']     = $admin['username'];
    $_SESSION['admin_id'] = $admin['id'];

    echo json_encode([
        "status" => "success",
        "data"   => [
            "id"        => $admin['id'],
            "username"  => $admin['username'],
            "full_name" => $admin['full_name'],
            "role"      => $admin['role']
        ]
    ]);
} else {
    echo json_encode([
        "status"  => "failed",
        "message" => "Username atau password salah"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
