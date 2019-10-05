// Function for getting URL variables, like $_GET[] in PHP
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    
    return false;
}

function ajaxSetList(id, name, data) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {        
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText) {
                console.log(this.responseText);
            }
        }
    };
    
    xhttp.open("POST", "/assets/ajax/setlist.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("idlist=" + id + "&name=" + name + "&data=" + data);
}

function ajaxGetList(id) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {        
        if (this.readyState == 4 && this.status == 200) {
            return JSON.parse(this.responseText);
        }
    };
    
    xhttp.open("POST", "/assets/ajax/getlist.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("idlist=" + id);
}

function loadList() {
    
}

function refreshList() {
    
}

var listId = getQueryVariable("id");
var list = {};
loadList();
