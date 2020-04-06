// Open/close a modal by passing element ID and true/false
function showModal(modalId, show) {
    if (show) {
        document.getElementById(modalId).classList.remove("modal-hidden");
    } else {
        document.getElementById(modalId).classList.add("modal-hidden");
    }
}

function newList() {
    window.location = "/new";
}

function openList() {
    var id = document.getElementById("open-list-modal-input").value;

    if (id) {
        window.location = "/list/?id=" + id;
    }
}


// EVENT LISTENERS:

document.getElementById("nav-new-list-button").addEventListener("click", newList);

document.getElementById("nav-open-list-button").addEventListener("click", function () {
    showModal("open-list-modal", true);
    document.getElementById("open-list-modal").classList.remove("modal-hidden");
});

document.getElementById("open-list-modal-open-button").addEventListener("click", openList);
document.getElementById("open-list-modal-input").addEventListener("keypress", function (e) {
    // Runs function if enter is pressed
    if (e.keyCode == 13) {
        openList();
    }
});

// Code for closing any modal
var modals = document.getElementsByClassName("modal");
for (var i = 0; i < modals.length; i++) {
    // Close when clicking outside modal
    modals[i].addEventListener("click", function () {
        if (event.target.classList.contains("modal")) {
            showModal(this.id, false);
        }
    });

    // Close when clicking button
    var closeButton = modals[i].getElementsByClassName("close-modal")[0];
    closeButton.addEventListener("click", function () {
        showModal(this.parentElement.parentElement.parentElement.parentElement.id, false);
    });
}