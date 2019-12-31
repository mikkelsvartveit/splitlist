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
     
    <title>Splitl.ist - Edit list</title>
</head>
<body>
    <div class="content">
        <a href="/"><img id="logo" src="/assets/img/logo.png" alt="Logo"></a>
        
        <div class="divider"></div>
        
        <h1 id="list-name"></h1>
        <button style="display: block; margin: 20px auto;" onclick="editListName();">Edit list name</button>
        
        <div class="list" id="list">
            
        </div>
        
        <button style="display: block; margin: 20px auto;" onclick="newListItem();">New item</button>
    </div>
    
    <div id="sample-list-item" class="list-item hidden">
        <!-- <button class="check-button">v</button> -->
        <input type="text" class="text" value=""></span>
        <button class="remove-button" tabindex="-1">x</button>
    </div>
    
    <script src="/assets/js/list.js"></script>
</body>
</html>