<?php
// installer.php
if (file_exists('config.php')) {
    die('نصب قبلاً انجام شده است. برای ادامه، config.php را حذف کنید.');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db_host = trim($_POST['db_host']);
    $db_name = trim($_POST['db_name']);
    $db_user = trim($_POST['db_user']);
    $db_pass = trim($_POST['db_pass']);
    $admin_user = trim($_POST['admin_user']);
    $admin_pass = trim($_POST['admin_pass']);
    $openai_key = trim($_POST['openai_key']);

    if (!$db_host || !$db_name || !$db_user || !$admin_user || !$admin_pass || !$openai_key) {
        $error = 'لطفاً همه فیلدها را پر کنید.';
    } else {
        try {
            $pdo = new PDO("mysql:host=$db_host", $db_user, $db_pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
            // ایجاد دیتابیس اگر وجود ندارد
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci");
            $pdo->exec("USE `$db_name`");

            // ایجاد جدول users
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role ENUM('admin','owner','customer') NOT NULL DEFAULT 'customer',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
            ");

            // ایجاد جدول ai_requests
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS ai_requests (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NULL,
                    prompt TEXT NOT NULL,
                    response TEXT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
            ");

            // ایجاد جدول cafes (کافه‌ها)
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS cafes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address TEXT,
                    instagram VARCHAR(255),
                    phone VARCHAR(50),
                    work_hours VARCHAR(100),
                    logo VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
            ");

            // ایجاد جدول categories (دسته‌بندی منو)
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    cafe_id INT NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    image VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (cafe_id) REFERENCES cafes(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
            ");

            // ایجاد جدول menu_items (آیتم‌های منو)
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS menu_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    category_id INT NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    price DECIMAL(10,2) NOT NULL,
                    image VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
            ");

            // ایجاد جدول orders (سفارش‌ها)
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS orders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NULL,
                    cafe_id INT NOT NULL,
                    items TEXT NOT NULL, -- JSON array of items
                    total_price DECIMAL(10,2) NOT NULL,
                    status ENUM('pending','completed','cancelled') DEFAULT 'pending',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
                    FOREIGN KEY (cafe_id) REFERENCES cafes(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
            ");

            // ایجاد فایل config.php
            $configContent = "<?php
return [
    'db' => [
        'host' => '$db_host',
        'name' => '$db_name',
        'user' => '$db_user',
        'pass' => '$db_pass',
    ],
    'openai_api_key' => '$openai_key',
];";
            file_put_contents('config.php', $configContent);

            // اضافه کردن ادمین اصلی
            $hash = password_hash($admin_pass, PASSWORD_DEFAULT);
            $pdo->exec("USE `$db_name`");
            $stmt = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'admin')");
            $stmt->execute([$admin_user, $hash]);

            header('Location: index.php');
            exit;

        } catch (PDOException $e) {
            $error = "خطا در اتصال یا ایجاد دیتابیس: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <title>نصب سیستم منوی دیجیتال کافه</title>
    <style>
        body { background-color: #121212; color: #eee; font-family: Vazirmatn, sans-serif; }
        form { max-width: 400px; margin: 50px auto; padding: 20px; background: #222; border-radius: 8px; }
        label { display: block; margin-bottom: 6px; }
        input[type=text], input[type=password] {
            width: 100%; padding: 10px; margin-bottom: 15px;
            border: none; border-radius: 4px; background: #333; color: #eee;
        }
        input[type=submit] {
            width: 100%; padding: 12px; background: #3b82f6; border: none;
            border-radius: 4px; color: white; font-weight: bold; cursor: pointer;
        }
        .error { color: #f87171; margin-bottom: 10px; }
    </style>
</head>
<body>
    <form method="post">
        <h2>نصب سیستم منوی دیجیتال کافه</h2>
        <?php if ($error): ?>
            <div class="error"><?=htmlspecialchars($error)?></div>
        <?php endif; ?>
        <label>آدرس دیتابیس (Host):</label>
        <input type="text" name="db_host" required value="<?=htmlspecialchars($_POST['db_host'] ?? '')?>" />
        <label>نام دیتابیس:</label>
        <input type="text" name="db_name" required value="<?=htmlspecialchars($_POST['db_name'] ?? '')?>" />
        <label>نام کاربری دیتابیس:</label>
        <input type="text" name="db_user" required value="<?=htmlspecialchars($_POST['db_user'] ?? '')?>" />
        <label>رمز عبور دیتابیس:</label>
        <input type="password" name="db_pass" />
        <label>نام کاربری مدیر اصلی:</label>
        <input type="text" name="admin_user" required value="<?=htmlspecialchars($_POST['admin_user'] ?? '')?>" />
        <label>رمز عبور مدیر اصلی:</label>
        <input type="password" name="admin_pass" required />
        <label>کلید API OpenAI:</label>
        <input type="text" name="openai_key" required value="<?=htmlspecialchars($_POST['openai_key'] ?? '')?>" />
        <input type="submit" value="نصب و راه‌اندازی" />
    </form>
</body>
</html>
