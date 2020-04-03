<?php
if (isset($_GET["i"])) {
    $id = $_GET["i"];
    header("Location: /list?id=" . $id);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="Create, share and collaborate on to-do lists, shopping lists and more. No registration required!">
    <meta name="keywords" content="list,share,collaborate,easy,easily,quick,quickly">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

    <link rel="stylesheet" href="/assets/css/main.css">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
    <link rel="manifest" href="/assets/favicons/site.webmanifest">
    <link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#34ae91">
    <link rel="shortcut icon" href="/assets/favicons/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Splitlist">
    <meta name="application-name" content="Splitlist">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <title>Splitlist - The quick way to share lists for anything.</title>
</head>

<body>
    <nav>
        <div class="nav-content">
            <div class="nav-left">
                <a href="/">
                    <img id="nav-logo" src="/assets/img/logo.png" alt="Splitlist">
                </a>
            </div>

            <div class="nav-right">
                <button id="nav-open-list-button" class="button"><img src="/assets/icons/open.svg" alt="Open">Open</button>
                <button id="nav-new-list-button" class="button button-teal"><img src="/assets/icons/add-light.svg" alt="New">New</button>
            </div>
        </div>
    </nav>

    <div class="content">
        <h1>The quick way to share lists for anything.</h1>

        <div id="main-buttons">
            <button class="button button-teal" id="new-list-button">Create a new list</button>
            <span>or</span>
            <button class="button" id="open-list-button">Open existing list</button>
        </div>

        <div id="recent-lists-section" class="hidden">
            <h2>Recently opened lists</h2>
            <div id="recent-lists">

            </div>
        </div>

        <div class="divider"></div>

        <div class="row-3">
            <div>
                <img src="/assets/img/create.svg" alt="Create">
                <p>Getting started with Splitlist couldn't be easier. No registration required - simply click the create button above to make a list, and start typing right away. It's that simple!</p>
            </div>

            <div>
                <img src="/assets/img/share.svg" alt="Share">
                <p>Share your list with the click of a button. Just toss the link to your friends or family members, and you're ready to start collaborating on grocery lists, to-do lists and more.</p>
            </div>

            <div>
                <img src="/assets/img/devices.svg" alt="Devices">
                <p>Does your device have a web browser? Then it works with Splitlist. Access and edit your lists on your phone, tablet or computer. The lists will sync on all your devices in real-time.</p>
            </div>
        </div>
    </div>

    <!-- Hidden sample element for recent lists -->
    <div id="sample-list" class="hidden">
        <a href="/list?id=0">
            <span class="list-name">Untitled list</span>
            <span class="list-last-edited">3 minutes ago</span>
        </a>

        <button class="icon-button remove-button" tabindex="-1">
            <img src="/assets/icons/remove.svg" alt="Remove">
        </button>
    </div>

    <script src="/assets/js/main.js"></script>
</body>

</html>