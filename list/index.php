<?php
$db_config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../private/db_config.ini");

$conn = new mysqli($db_config["servername"], $db_config["username"], $db_config["password"], $db_config["dbname"]);

if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset('utf8');

if(isset($_GET["id"])) {
    $id = $_GET["id"];
    
    $sql = "SELECT * FROM list WHERE idlist = '$id'";
    $result = mysqli_fetch_array($conn->query($sql));
    
    $list = explode("&", $result["data"]);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="/assets/css/main.css">
     
    <title>Splitl.ist - Edit list</title>
</head>
<body>
    <div class="content">
        <h1><?php echo $result["name"]; ?></h1>
        
        <div class="list">
            <?php for($i = 0; $i < count($list); $i++) { ?>
            
            <div class="list-item">
                <button class="check-button">v</button>
                <span class="text"><?php echo $list[$i] ?></span>
                <button class="edit-button">e</button>
                <button class="remove-button">x</button>
            </div>
            
            <?php } ?>
        </div>
    </div>
    
    <script src="/assets/js/list.js"></script>
</body>
</html>