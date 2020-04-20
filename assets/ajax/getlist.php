<?php
$db_config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../private/db_config.ini");

$host = $db_config["servername"];
$dbname = $db_config["dbname"];
$username = $db_config["username"];
$password = $db_config["password"];
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$idlist = $_POST["idlist"];
$lastedited = $_POST["lastedited"];

try {
    $sql = "SELECT * FROM list WHERE idlist = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idlist]);
    $row = $stmt->fetch();

    if ($row["lastedited"] != $lastedited) {
        echo json_encode($row);
    } else {
        echo false;
    }
} catch (\PDOException $e) {
    echo ("Error: " . $e->getCode() . " - " . $e->getMessage());
}
?>