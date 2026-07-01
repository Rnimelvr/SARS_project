<?php
session_start();
if(isset($_POST['login'])) {
    // Saja buat login ringkas tanpa database untuk mudahkan test
    $_SESSION['user'] = $_POST['username'];
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - SARS System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="login-body">

<div class="login-box">
    <h2>SARS SYSTEM LOGIN</h2>
    <form action="" method="POST">
        <div class="input-group">
            <label>Username</label>
            <input type="text" name="username" required placeholder="Masukkan nama anda">
        </div>
        <div class="input-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="******">
        </div>
        <div class="input-forget">
            <label>Remember Me</label>
            <input type="checkbox" name="Rememberme" id="Rememberme" required>
        </div><br>
        <button type="submit" name="login" class="btn-login">MASUK SYSTEM</button>
    </form>
</div>

</body>
</html>
