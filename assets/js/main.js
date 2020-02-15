function openList() {
    var id = prompt("Input your list ID:");
    window.location = "/list/?id=" + id;
}

function loadRecentLists() {
    
}

document.getElementById("open-list-button").addEventListener("click", openList);