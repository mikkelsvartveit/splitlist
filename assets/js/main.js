function openList() {
    var id = prompt("Input your list ID:");
    window.location = "/list/?id=" + id;
}

document.getElementById("open-list-button").addEventListener("click", openList);