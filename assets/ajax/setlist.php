<?php
if (getenv("DOCKER") == "true") {
    $host = getenv("DB_SERVER");
    $dbname = getenv("DB_NAME");
    $username = getenv("DB_USER");
    $password = getenv("DB_PASSWORD");
} else {
    $db_config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../private/db_config.ini");

    $host = $db_config["servername"];
    $dbname = $db_config["dbname"];
    $username = $db_config["username"];
    $password = $db_config["password"];
}

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
$name = $_POST["name"];
$data = $_POST["data"];

try {
    $sql = "UPDATE list SET name = ?, lastedited = NOW(6), data = ? WHERE idlist = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $data, $idlist]);
} catch (\PDOException $e) {
    echo ("Error: " . $e->getCode() . " - " . $e->getMessage());
}
?>
