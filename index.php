<?php 
if(isset($_GET["i"])) {
    $id = $_GET["i"];
    header("Location: /list?id=" . $id);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="/assets/css/main.css">
     
    <title>Splitl.ist - The easy way to share lists for everything.</title>
</head>

<body>
    <div class="content">
        <img id="logo" src="/assets/img/logo.png" alt="Logo">
        
        <div class="divider"></div>
        
        <h1>The quick way to share lists - for everything.</h1>
        
        <div id="main-buttons">
            <a href="/new" class="button-link" id="new-list-button">Create a new list</a>
            <span>or</span>
            <a href="/open" class="button-link" id="open-list-button">Open existing list</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="row-3">
            <div>
                <img src="/assets/img/create.svg" alt="Create">
                <p>Getting started with Splitl.ist couldn't be easier. No registration required - simply click the create button above to make a list, and start typing right away. It's that simple!</p>
            </div>
            
            <div>
                <img src="/assets/img/share.svg" alt="Share">
                <p>Share your list with the click of a button. Just toss the link to your friends or family members, and you're ready to start collaborating on grocery lists, to-do lists and more.</p>
            </div>
            
            <div>
                <img src="/assets/img/devices.svg" alt="Devices">
                <p>Does your device have a web browser? Then it works with Splitl.ist. Access and edit your lists on your phone, tablet or computer. The lists will sync on all your devices in real-time.</p>
            </div>
        </div> 
    </div>
</body>
</html>