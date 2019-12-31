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