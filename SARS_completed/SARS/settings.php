<?php
session_start();
// Dummy check untuk simulation login
if(!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SARS Detection & Control System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header>
    <div class="logo-section">
        <h1>SARS SYSTEM</h1>
        <span>Respiratory Monitoring & Control</span>
    </div>
    <nav>
        <ul>
            <li><a href="index.php" class="<?php echo $current_page == 'index.php' ? 'active' : ''; ?>">Dashboard</a></li>
            <li><a href="history.php" class="<?php echo $current_page == 'history.php' ? 'active' : ''; ?>">History</a></li>
            <li><a href="statistics.php" class="<?php echo $current_page == 'statistics.php' ? 'active' : ''; ?>">Statistics</a></li>
            <li><a href="about.php" class="<?php echo $current_page == 'about.php' ? 'active' : ''; ?>">About</a></li>
            <li><a href="Settings.php" class="<?php echo $current_page == 'about.php' ? 'active' : ''; ?>">Settings</a></li>
        </ul>
    </nav>
    <div class="user-info">
        <span>Halo, <?php echo $_SESSION['user']; ?></span>
        <a href="logout.php" class="btn-logout">Logout</a>
    </div>
</header>
<div></div>