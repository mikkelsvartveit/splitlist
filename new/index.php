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

// Function for generating a random ID
function generateId() {
    $characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    $id = "";

    for ($i = 0; $i < 6; $i++) {
        $id .= $characters[random_int(0, strlen($characters) - 1)];
    }

    return $id;
}

// Generates a new ID and checks that it hasn't already been used in the database 
$sql = "SELECT idlist FROM list WHERE idlist = ?";
$stmt = $pdo->prepare($sql);
do {
    $id = generateId();
    $stmt->execute([$id]);
    $row = $stmt->fetch();
} while ($row);

$name = "Unnamed list";
$data = '[{"id":0,"text":"Item 1","index":1,"checked":false}]';

try {
    $sql = "INSERT INTO list (idlist, name, lastedited, data) VALUES(?, ?, NOW(), ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id, $name, $data]);

    // Redirects to the newly created list
    $url = "/list/?id=$id";
    header("Location: $url");
} catch (\PDOException $e) {
    echo ("Error: " . $e->getCode() . " - " . $e->getMessage());
}
?>