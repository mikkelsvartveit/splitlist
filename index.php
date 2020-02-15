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

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
    <link rel="manifest" href="/assets/favicons/site.webmanifest">
    <link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#34ae91">
    <link rel="shortcut icon" href="/assets/favicons/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Splitl.ist">
    <meta name="application-name" content="Splitl.ist">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <title>Splitl.ist - The quick way to share lists for anything.</title>
</head>

<body>
    <div class="content">
        <img id="logo" src="/assets/img/logo.png" alt="Logo">

        <div class="divider"></div>

        <h1>The quick way to share lists for anything.</h1>

        <div id="main-buttons">
            <a href="/new" class="button-link" id="new-list-button">Create a new list</a>
            <span>or</span>
            <a href="#" class="button-link" id="open-list-button">Open existing list</a>
        </div>
        
        <div id="recent-lists-section" class="">
            <h2>Recently opened lists</h2>
            <div id="recent-lists">
                <div id="sample-list">
                    <a href="/list?id=0">
                        <span class="list-name">Untitled list</span>
                        <span class="list-last-edited">3 minutes ago</span>
                    </a>
                    
                    <button class="icon-button remove-button" tabindex="-1">
                        <img src="/assets/icons/remove.svg" alt="Remove">
                    </button>
                </div>
            </div>
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

    <script src="/assets/js/main.js"></script>
</body>

</html>