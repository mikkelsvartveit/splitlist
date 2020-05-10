<?php
if (isset($_GET["i"])) {
    $id = $_GET["i"];
    header("Location: /list?id=" . $id);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Splitlist - The quick way to share lists for anything</title>

    <meta charset="UTF-8">
    <meta name="description" content="Create, share and collaborate on to-do lists, shopping lists and more. No registration required!">
    <meta name="keywords" content="list,share,collaborate,easy,easily,quick,quickly">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

    <link rel="stylesheet" href="/assets/css/style.css">

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

    <script src="/assets/js/theme.js"></script>
</head>

<body>
    <nav>
        <div class="nav-content">
            <div class="nav-left">
                <a href="/">
                    <img id="nav-logo" src="/assets/img/light-mode/logo.png" alt="Splitlist">
                </a>
            </div>

            <div class="nav-right">
                <button id="nav-open-list-button" class="button"><img src="/assets/icons/light-mode/open.svg" alt="Open">Open</button>
                <button id="nav-new-list-button" class="button button-teal"><img src="/assets/icons/always-light/add.svg" alt="New">New</button>
                <img id="dark-mode-button" src="/assets/icons/light-mode/dark-mode.svg" alt="Toggle dark mode">
            </div>
        </div>
    </nav>

    <div class="content">
        <h1>The quick way to share lists for anything.</h1>

        <div id="main-buttons" class="button-group">
            <button class="button button-teal" id="new-list-button">Create a new list</button>
            <span>or</span>
            <button class="button" id="open-list-button">Open existing list</button>
        </div>

        <div id="recent-lists-section" class="hidden">
            <h3>Recently opened lists</h3>
            <div id="recent-lists">

            </div>
        </div>

        <div class="divider"></div>

        <img id="front-image" src="/assets/img/light-mode/list.png" alt="Splitlist on laptop and phone">

        <div class="row-3">
            <div>
                <img src="/assets/img/create.svg" alt="Create">
                <p class="feature">Getting started with Splitlist couldn't be easier. No registration required - simply click the create button above to make a list, and start typing right away. It's that simple!</p>
            </div>

            <div>
                <img src="/assets/img/share.svg" alt="Share">
                <p class="feature">Share your list with the click of a button. Just toss the link to your friends or family members, and you're ready to start collaborating on grocery lists, to-do lists and more.</p>
            </div>

            <div>
                <img src="/assets/img/devices.svg" alt="Devices">
                <p class="feature">Does your device have a web browser? Then it works with Splitlist. Access and edit your lists on your phone, tablet or computer. The lists will sync on all your devices in real-time.</p>
            </div>
        </div>
    </div>

    <div id="open-list-modal" class="modal modal-hidden">
        <div class="modal-content">
            <h2>Open list</h2>
            <p>Input ID or paste link to open list:</p>
            <input type="text" id="open-list-modal-input" placeholder="List ID or link">
            <div class="modal-buttons">
                <div>
                    <button class="button close-modal">Cancel</button>
                </div>

                <div>
                    <button id="open-list-modal-open-button" class="button button-teal">Open</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Hidden sample element for recent lists -->
    <div id="sample-list" class="hidden">
        <a href="/list?id=0">
            <span class="list-name"></span>
            <span class="list-last-edited"></span>
        </a>

        <button class="icon-button remove-button" tabindex="-1">
            <img src="/assets/icons/light-mode/remove.svg" alt="Remove">
        </button>
    </div>

    <script src="/assets/js/all.js"></script>
    <script src="/assets/js/index.js"></script>
</body>

</html>