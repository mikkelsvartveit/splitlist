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
    
    return "0000";
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

function ajaxGetList(id, callback) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {        
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    
    xhttp.open("POST", "/assets/ajax/getlist.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("idlist=" + id);
}

function addItemToList(id, text, index) {
    var listArray = JSON.parse(list.data);
    var listEl = document.getElementById("list");
    
    var listItemEl = document.getElementById("sample-list-item").cloneNode(true);
    listItemEl.removeAttribute("id");
    listItemEl.classList.remove("hidden");
    listItemEl.setAttribute("data-list-id", id);
    listItemEl.setAttribute("data-list-index", index);

    var listItemTextEl = listItemEl.querySelector(".text");
    listItemTextEl.setAttribute("value", text);
    listItemTextEl.addEventListener("input", updateListItem);
    
    var listItemDeleteButtonEl = listItemEl.querySelector(".remove-button");
    listItemDeleteButtonEl.addEventListener("click", deleteListItem);

    listEl.appendChild(listItemEl);
    return listItemEl;
}

function loadList() {
    ajaxGetList(listId, function(responseText) {
        // Checks if list has changed
        if(!(list.name == responseText.name && list.data == responseText.data)) {
            list = responseText;
            
            var listNameEl = document.getElementById("list-name");
            listNameEl.innerHTML = list.name;

            var listArray = JSON.parse(list.data);
            listArray.sort(function(a, b) {
                return a.index - b.index;
            });
                        
            for(var i = 0; i < listArray.length; i++) {
                addItemToList(listArray[i].id, listArray[i].text, listArray[i].index);
            }
            
            console.log("List loaded!");
        }
    });
}

function reloadList() {
    ajaxGetList(listId, function(responseText) {
        // Checks if list has changed
        if(!(list.name == responseText.name && list.data == responseText.data)) {
            list = responseText;
            console.log("List has been modified, applying changes...");
        }
        
        var listArray = JSON.parse(list.data);
        var listNameEl = document.getElementById("list-name");
        var listEl = document.getElementById("list");

        if(listNameEl.innerHTML != list.name) {
            listNameEl.innerHTML = list.name;
        }

        // Deletes items that has been removed from database
        var elementsToDelete = [];
        for(var i = 0; i < listEl.children.length; i++) {
            var isDeletedElement = true;

            for(var j = 0; j < listArray.length; j++) {          
                if(listEl.children[i].getAttribute("data-list-id") == listArray[j].id) {
                    isDeletedElement = false;
                    break;
                }
            }

            if(isDeletedElement) {
                elementsToDelete.push(listEl.children[i]);
            }
        }
        for(var i = 0; i < elementsToDelete.length; i++) {
            console.log("Deleted element found, removing it from list...");
            elementsToDelete[i].parentNode.removeChild(elementsToDelete[i]);
        }

        // Refreshes current items and adds potenital new ones
        for(var i = 0; i < listArray.length; i++) {
            var isNewElement = true;

            for(var j = 0; j < listEl.children.length; j++) {          
                if(listEl.children[j].getAttribute("data-list-id") == listArray[i].id) {
                    var listItemTextEl = listEl.children[j].querySelector(".text");

                    if(document.activeElement != listItemTextEl) {
                        listItemTextEl.value = listArray[i].text;
                    }

                    listEl.children[j].setAttribute("data-list-index", listArray[i].index);
                    
                    isNewElement = false;
                    break;
                }
            }

            if(isNewElement) {
                console.log("New element found, adding it to list...");
                addItemToList(listArray[i].id, listArray[i].text);
            }
        }
        
        // Reorders list if order has changed
        if(!document.activeElement.classList.contains("text") && !isDragging) {
            var itemsArray = Array.from(listEl.children);
            var sortedItemsArray = Array.from(listEl.children).sort(function(a, b) {
                return a.getAttribute("data-list-index") - b.getAttribute("data-list-index");
            });

            function areEqual(arr1, arr2) {
                if(arr1.length !== arr2.length) {
                    return false;
                }

                for(var i = 0; i < arr1.length; i++) {
                    if(arr1[i] !== arr2[i]) {
                        return false;
                    }
                }

                return true;
            }

            if(!areEqual(itemsArray, sortedItemsArray)) {
                for(var i = 0; i < sortedItemsArray.length; i++) {
                    listEl.appendChild(sortedItemsArray[i]);
                }
            }
        }
    });
}

function updateList() {
    ajaxSetList(listId, list.name, list.data);
}

function newListItem() {
    var listArray = JSON.parse(list.data);
    var newId = 0;
    
    for(var i = 0; i < listArray.length; i++) {
        if(listArray[i].id >= newId) {
            newId = listArray[i].id + 1;
        }
    }
        
    var newElement = new Object;
    newElement.id = newId;
    newElement.text = "";
    newElement.index = listArray.length;
    
    var addedElement = addItemToList(newElement.id, newElement.text);
    addedElement.querySelector(".text").focus();
    
    listArray.push(newElement);
    list.data = JSON.stringify(listArray);
    updateList();
}

function deleteListItem() {
    var itemId = this.parentElement.getAttribute("data-list-id");
    
    var listArray = JSON.parse(list.data);
    for(var i = 0; i < listArray.length; i++) {
        if(listArray[i].id == itemId) {
            var listEl = document.getElementById("list");
            listEl.children[i].parentNode.removeChild(listEl.children[i]);
            
            listArray.splice(i, 1);
            list.data = JSON.stringify(listArray);
            updateList();
            break;
        }
    }
}

function updateListItem() {
    var itemId = this.parentElement.getAttribute("data-list-id");
    var newText = this.value;
    
    var listArray = JSON.parse(list.data);
    for(var i = 0; i < listArray.length; i++) {
        if(listArray[i].id == itemId) {
            listArray[i].text = newText;
            list.data = JSON.stringify(listArray);
            updateList();
            break;
        }
    }
}

function updateListOrder() {
    isDragging = false;
    var listEl = document.getElementById("list");
    var listArray = JSON.parse(list.data);
    
    for(var i = 0; i < listEl.children.length; i++) {
        listEl.children[i].setAttribute("data-list-index", i);
        
        for(var j = 0; j < listArray.length; j++) {
            if(listArray[j].id == listEl.children[i].getAttribute("data-list-id")) {
                listArray[j].index = i;
            }
        }
    }
    
    list.data = JSON.stringify(listArray);
    updateList();
}

function editListName() {
    var name = prompt("Enter your new list name:", list.name);
    
    if(name) {
        var listNameEl =  document.getElementById("list-name");
        listNameEl.innerHTML = name;

        list.name = name;
        updateList();
    }
}

// Initializing SortableJS
var isDragging = false;
var listEl = document.getElementById("list");
var sortable = Sortable.create(listEl, {
    delay: 0,
    delayOnTouchOnly: true,
    touchStartThreshold: 4,
    animation: 150,
    handle: ".drag-handle",
    ghostClass: "sortable-ghost",
    
    onStart: function() {
        isDragging = true;
    },
    onEnd: updateListOrder
});

var listId = getQueryVariable("id");
var list = {};
loadList();
window.setInterval(reloadList, 1000);
