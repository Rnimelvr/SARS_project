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
    <h2>Statistik Analisis SARS</h2>
    <p>Data grafik ringkas dan ringkasan angka mingguan.</p>

    <div class="dashboard-grid" style="margin-top: 20px;">
        <div class="card">
            <h3>Jumlah Kes</h3>
            <div class="value">1,420</div>
        </div>
        <div class="card">
            <h3>Tahap Amaran Harian</h3>
            <div class="value" style="color: #d90429;">Bahaya</div>
        </div>
    </div>

    <div class="graph-container" style="margin-top: 20px; text-align: center; padding: 40px;">
        <h3 style="margin-bottom: 20px;">Graf Trend Mingguan (Simulasi CSS)</h3>
        <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 400px; background: #0b132b; padding: 10px; border-radius: 4px;">
            <div style="width: 40px; height: 30%; background: #ffbc00; text-align: center; color: #0b132b; font-weight: bold;">Isnin</div>
            <div style="width: 40px; height: 50%; background: #ffbc00; text-align: center; color: #0b132b; font-weight: bold;">Sel</div>
            <div style="width: 40px; height: 85%; background: #d90429; text-align: center; color: white; font-weight: bold;">Rab</div>
            <div style="width: 40px; height: 40%; background: #ffbc00; text-align: center; color: #0b132b; font-weight: bold;">Kha</div>
            <div style="width: 40px; height: 20%; background: #2a9d8f; text-align: center; color: white; font-weight: bold;">Jum</div>
        </div>
    </div>
</div>
<footer>
    &copy; 2026 SARS Respiratory Project. All Rights Reserved.
</footer>
</body>
</html>
