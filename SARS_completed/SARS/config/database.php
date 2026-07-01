<?php

$host = "localhost";
$user = "root";
$pass = "";
$db   = "SARS_DB";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die(json_encode([
        "status"  => "error",
        "message" => "Connection Failed: " . mysqli_connect_error()
    ]));
}

mysqli_set_charset($conn, "utf8mb4");

?>
