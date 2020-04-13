// Function for getting URL variables, like $_GET[] in PHP
function getQueryVariable(queryVariable) {
    const query = window.location.search.substring(1);
    const variables = query.split("&");

    for (const variable of variables) {
        const pair = variable.split("=");
        if (pair[0] === queryVariable) {
            return pair[1];
        }
    }

    return false;
}

function ajaxSetList(id, name, data) {
    pendingAjaxSetRequests++;

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            pendingAjaxSetRequests--;
        }
    };

    xhttp.open("POST", "/assets/ajax/setlist.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("idlist=" + id + "&name=" + encodeURIComponent(name) + "&data=" + encodeURIComponent(data));
}

function ajaxGetList(id, lastedited, callback) {
    pendingAjaxGetRequest = true;

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };

    xhttp.open("POST", "/assets/ajax/getlist.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("idlist=" + id + "&lastedited=" + lastedited);
}

// Function for refreshing DOM to match the list object
function refreshDom() {
    // Checks if list name has changed
    const listNameEl = document.getElementById("list-name");
    if (listNameEl.innerHTML !== list.name) {
        document.title = list.name + " - Splitlist";
        listNameEl.innerHTML = list.name;
        document.getElementById("edit-name-modal-input").value = list.name;
    }

    const listArray = JSON.parse(list.data);
    const listEl = document.getElementById("list");

    // Removes items that has been deleted
    const elementsToDelete = [];
    for (const listItemEl of listEl.children) {
        let isDeletedElement = true;

        for (const listItem of listArray) {
            if (Number(listItemEl.getAttribute("data-list-id")) === listItem.id) {
                isDeletedElement = false;
                break;
            }
        }

        if (isDeletedElement) {
            elementsToDelete.push(listItemEl);
        }
    }
    for (const element of elementsToDelete) {
        element.remove();
    }

    // Refreshes current list items
    for (const listItemEl of listEl.children) {
        const listItem = listArray.find(item => item.id === Number(listItemEl.getAttribute("data-list-id")));

        const listItemTextEl = listItemEl.querySelector(".text");
        const checkboxEl = listItemEl.querySelector(".check-button img");

        if (document.activeElement !== listItemTextEl) {
            listItemTextEl.value = listItem.text;
        }

        if (listItem.checked) {
            checkboxEl.src = checkboxEl.src.replace("checkbox-unchecked.svg", "checkbox-checked.svg");
            listItemEl.classList.add("checked");
        } else {
            checkboxEl.src = checkboxEl.src.replace("checkbox-checked.svg", "checkbox-unchecked.svg");
            listItemEl.classList.remove("checked");
        }

        listItemEl.setAttribute("data-list-index", listItem.index);
    }

    // Adds new list items
    for (const listItem of listArray) {
        // If item doesn't already exist in the DOM
        if (!Array.from(listEl.children).find(el => Number(el.getAttribute("data-list-id")) === listItem.id)) {
            const listItemEl = document.getElementById("sample-list-item").cloneNode(true);
            listItemEl.removeAttribute("id");
            listItemEl.classList.remove("hidden");
            listItemEl.setAttribute("data-list-id", listItem.id);
            listItemEl.setAttribute("data-list-index", listItem.index);

            const listItemTextEl = listItemEl.querySelector(".text");
            listItemTextEl.setAttribute("value", listItem.text);
            listItemTextEl.addEventListener("input", updateListItem);
            listItemTextEl.addEventListener("focusout", refreshDom);
            listItemTextEl.addEventListener("keydown", function (e) {
                const index = Array.from(listEl.children).indexOf(listItemEl);

                // If arrow up is pressed
                if (e.keyCode === 38) {
                    if (index > 0) {
                        // Move cursor to previous item on list
                        const previousItem = listEl.children[index - 1].querySelector(".text");
                        previousItem.focus();
                    }
                }

                // If arrow down is pressed
                if (e.keyCode === 40) {
                    if (index < listEl.children.length - 1) {
                        // Move cursor to next item on list
                        const nextItem = listEl.children[index + 1].querySelector(".text");
                        nextItem.focus();
                    }
                }

                // If enter is pressed
                else if (e.keyCode === 13) {
                    if (index < listEl.children.length - 1) {
                        // Move cursor to next item on list
                        const nextItem = listEl.children[index + 1].querySelector(".text");
                        nextItem.select();
                    } else {
                        // Create a new item if the cursor is on the last item in the list
                        newListItem();
                    }
                }
            });

            const listItemCheckButton = listItemEl.querySelector(".check-button");
            if (listItem.checked) {
                const imgEl = listItemCheckButton.querySelector("img");
                imgEl.src = imgEl.src.replace("checkbox-unchecked.svg", "checkbox-checked.svg");
                listItemEl.classList.add("checked");
            }
            listItemCheckButton.addEventListener("click", toggleCheckedListItem);

            const listItemDeleteButtonEl = listItemEl.querySelector(".remove-button");
            listItemDeleteButtonEl.addEventListener("click", deleteListItem);

            listEl.appendChild(listItemEl);
        }
    }

    // Reorders list if order has changed
    if (!document.activeElement.classList.contains("text") && !isDragging) {
        const itemsArray = Array.from(listEl.children);
        const sortedItemsArray = Array.from(listEl.children).sort((a, b) => {
            return a.getAttribute("data-list-index") - b.getAttribute("data-list-index");
        });

        // Function to check if two arrays are equal
        const areEqual = function (array1, array2) {
            if (array1.length !== array2.length) {
                return false;
            }

            for (let i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }

            return true;
        };

        if (!areEqual(itemsArray, sortedItemsArray)) {
            for (const item of sortedItemsArray) {
                listEl.appendChild(item);
            }
        }
    }

    // Updates item counter
    const itemCountEl = document.getElementById("item-count-number");
    if (itemCountEl.innerHTML !== listEl.children.length && !isDragging) {
        itemCountEl.innerHTML = listEl.children.length;
    }

    // Updates the localstorage entry that stores previously opened lists
    const recentLists = JSON.parse(localStorage.getItem("recentLists")) || [];
    const listIndex = recentLists.findIndex(list => list.id === listId);
    if (listIndex >= 0) {
        recentLists[listIndex].name = list.name;
        recentLists[listIndex].time = new Date();
    } else {
        const listObject = {};
        listObject.id = listId;
        listObject.name = list.name;
        listObject.time = new Date();

        recentLists.push(listObject);
    }
    localStorage.setItem("recentLists", JSON.stringify(recentLists));
}

function loadList() {
    ajaxGetList(listId, list.lastedited, function (responseText) {
        pendingAjaxGetRequest = false;

        try {
            if (responseText !== "null") {
                list = JSON.parse(responseText);

                const listIdEl = document.getElementById("list-id-id");
                listIdEl.innerHTML = listId.toUpperCase();

                refreshDom();

                document.getElementById("loading").classList.add("hidden");
                document.getElementById("list-content").classList.remove("hidden");
            } else {
                clearInterval(autoReload);

                document.getElementById("no-list-id").innerHTML = listId.toUpperCase();
                document.getElementById("loading").classList.add("hidden");
                document.getElementById("no-list-error").classList.remove("hidden");
            }
        } catch (err) {
            clearInterval(autoReload);
            console.error(responseText);
        }
    });
}

function pullList() {
    // Checks that no AJAX requests are currently pending
    if (!pendingAjaxGetRequest && pendingAjaxSetRequests === 0) {
        ajaxGetList(listId, list.lastedited, function (responseText) {
            pendingAjaxGetRequest = false;

            if (pendingAjaxSetRequests === 0 && responseText) {
                list = JSON.parse(responseText);
                refreshDom();
            }
        });
    }
}

function pushList() {
    ajaxSetList(listId, list.name, list.data);
}

function newListItem() {
    const listArray = JSON.parse(list.data);
    const newItem = {};

    newItem.id = 0;
    for (const listItem of listArray) {
        if (listItem.id >= newItem.id) {
            newItem.id = listItem.id + 1;
        }
    }

    newItem.text = "";
    newItem.index = listArray.length;
    newItem.checked = false;

    listArray.push(newItem);
    list.data = JSON.stringify(listArray);

    refreshDom();
    pushList();

    // Sets focus to the newly created list item
    const addedElement = listEl.querySelector("[data-list-id='" + newItem.id + "']");
    addedElement.querySelector(".text").focus();
}

function updateListItem() {
    const itemId = Number(this.parentElement.getAttribute("data-list-id"));
    const newText = this.value;

    const listArray = JSON.parse(list.data);
    const listItem = listArray.find(item => item.id === itemId);

    listItem.text = newText;
    list.data = JSON.stringify(listArray);

    pushList();
}

function deleteListItem() {
    const itemId = Number(this.parentElement.getAttribute("data-list-id"));

    // Creates new array without the item that should be deleted
    const listArray = JSON.parse(list.data);
    const newListArray = listArray.filter(listItem => listItem.id !== itemId);
    list.data = JSON.stringify(newListArray);

    refreshDom();
    pushList();
}

function toggleCheckedListItem() {
    const itemId = Number(this.parentElement.getAttribute("data-list-id"));

    const listArray = JSON.parse(list.data);
    const listItem = listArray.find(item => item.id === itemId);

    listItem.checked = !listItem.checked;
    list.data = JSON.stringify(listArray);

    refreshDom();
    pushList();
}

function updateListOrder() {
    isDragging = false;
    const listEl = document.getElementById("list");
    const listArray = JSON.parse(list.data);

    let index = 0;
    for (const listItemEl of listEl.children) {
        listItemEl.setAttribute("data-list-index", index);

        const listItem = listArray.find(item => item.id === Number(listItemEl.getAttribute("data-list-id")));
        listItem.index = index++;
    }

    list.data = JSON.stringify(listArray);
    pushList();
}

function editListName() {
    const name = document.getElementById("edit-name-modal-input").value;

    if (name) {
        list.name = name;

        refreshDom();
        pushList();
    }

    showModal("edit-name-modal", false);
}

function shareList() {
    const clipboardEl = document.getElementById("clipboard-placeholder");
    const url = window.location.hostname + "/?i=" + listId;

    // Copies the variable "url" to clipboard
    clipboardEl.innerHTML = url;
    clipboardEl.style.display = "block";
    clipboardEl.select();
    document.execCommand("copy");
    clipboardEl.style.display = "none";

    showSnackbar("link-copied-snackbar");
}

// Initializing SortableJS
let isDragging = false;
const listEl = document.getElementById("list");
Sortable.create(listEl, {
    delay: 0,
    delayOnTouchOnly: true,
    touchStartThreshold: 4,
    animation: 150,
    handle: ".drag-handle",
    ghostClass: "sortable-ghost",

    onStart: function () {
        isDragging = true;
    },
    onEnd: updateListOrder
});

// Tracks whether an AJAX get request is waiting for response
let pendingAjaxGetRequest = false;
// Tracks how many AJAX set requests are waiting for response
let pendingAjaxSetRequests = 0;

const listId = getQueryVariable("id");
let list = {};

// Loads list once on page load
loadList();

// Checks for changes in database every second
const autoReload = window.setInterval(pullList, 1000);


// EVENT LISTENERS:

document.getElementById("list-name").addEventListener("click", () => showModal("edit-name-modal", true));

document.getElementById("edit-name-button").addEventListener("click", () => showModal("edit-name-modal", true));

document.getElementById("share-list-button").addEventListener("click", shareList);

document.getElementById("new-item-button").addEventListener("click", newListItem);

document.getElementById("edit-name-modal-rename-button").addEventListener("click", editListName);

document.getElementById("edit-name-modal-input").addEventListener("keypress", function (e) {
    // Runs function if enter is pressed
    if (e.keyCode === 13) {
        editListName();
    }
});