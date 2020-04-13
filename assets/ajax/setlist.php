<?php
$db_config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../private/db_config.ini");

$conn = new mysqli($db_config["servername"], $db_config["username"], $db_config["password"], $db_config["dbname"]);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset('utf8');

$idlist = $conn->real_escape_string($_POST["idlist"]);
$name = $conn->real_escape_string($_POST["name"]);
$data = $conn->real_escape_string($_POST["data"]);

$sql = "UPDATE list SET name = '$name', lastedited = NOW(6), data = '$data' WHERE idlist = '$idlist'";
$conn->query($sql);

if ($conn->error) {
    echo ("Error: $conn->errno - $conn->error");
}
?>