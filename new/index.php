<?php
$db_config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../private/db_config.ini");

$conn = new mysqli($db_config["servername"], $db_config["username"], $db_config["password"], $db_config["dbname"]);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset('utf8mb4');

// Function for generating a random ID
function generateId() {
    $characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    $id = "";

    for ($i = 0; $i < 4; $i++) {
        $id .= $characters[mt_rand(0, strlen($characters) - 1)];
    }

    return $id;
}

// Generates a new ID and checks that it hasn't already been used in the database 
do {
    $id = generateId();
    $result = $conn->query("SELECT idlist FROM list WHERE idlist = '$id'");
} while ($result->num_rows > 0);

$name = "Unnamed list";
$data = '[{"id":0,"text":"Item 1","index":1,"checked":false}]';

$sql = "INSERT INTO list (idlist, name, lastedited, data) VALUES('$id', '$name', NOW(), '$data')";
$conn->query($sql);

if ($conn->error) {
    echo ("Error: $conn->errno - $conn->error");
} else {
    // Redirects to the newly created list
    $url = "/list/?id=$id";
    echo "<script>window.location = '$url'</script>";
}
?>