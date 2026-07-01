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
    <h2>Dashboard Utama</h2>
    
    <div class="dashboard-grid">
        <div class="card">
            <h3>Status Sistem</h3>
            <div class="value" style="color: #2a9d8f;">AKTIF</div>
        </div>
        <div class="card">
            <h3>Kes Dikesan (Hari Ini)</h3>
            <div class="value" style="color: #d90429;">2</div>
        </div>
    </div>

    <h3>Pengesanan Terkini</h3>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Masa</th>
                    <th>ID Node/Bilik</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10:45 AM</td>
                    <td>Bilik A1</td>
                    <td><span class="badge badge-danger">Lebah</span></td>
                </tr>
                <tr>
                    <td>10:30 AM</td>
                    <td>Bilik B3</td>
                    <td><span class="badge badge-success">Anjing</span></td>
                </tr>
                <tr>
                    <td>09:15 AM</td>
                    <td>Bilik A5</td>
                    <td><span class="badge badge-warning">Monyet</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<footer>
    &copy; 2026 SARS Respiratory Project. All Rights Reserved.
</footer>
</body>
</html>
