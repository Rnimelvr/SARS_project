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
        </ul>
    </nav>
    <div class="user-info">
        <span>Halo, <?php echo $_SESSION['user']; ?></span>
        <a href="logout.php" class="btn-logout">Logout</a>
    </div>
</header>

<div class="container">
    <h2>Maklumat Projek SARS</h2>
    <div class="card" style="line-height: 1.6;">
        <p style="margin-bottom: 15px;"><strong>Nama Projek:</strong> Sistem Animal Repellent System (SARS) </p>
        <p style="margin-bottom: 15px;"><strong>Objektif:</strong> Membangunkan Smart Animal Repellent System (SARS) yang mampu mengesan kehadiran monyet, anjing dan lebah menggunakan teknologi AI serta menghantar maklumat pengesanan ke laman web untuk pemantauan secara masa nyata (real-time). </p>
        <p style="margin-bottom: 15px;"><strong>Ciri-ciri Utama:</strong></p>
        <ul style="margin-left: 20px; margin-bottom: 15px; color: #ffbc00;">
            <li>Paparan Real-Time bacaan sensor penapisan.</li>
            <li>Simpanan sejarah log kes untuk rujukan (History).</li>
            <li>Analisis data secara visual (Statistics).</li>
        </ul>
        <p><strong>Dibangunkan Oleh:</strong> KV5 Vattors </p>
    </div>
</div>

<footer>
    &copy; 2026 SARS Respiratory Project. All Rights Reserved.
</footer>
</body>
</html> 
