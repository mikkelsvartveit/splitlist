function timeFormat(date) {
    let nowDate = new Date();
    if (date.toDateString() === nowDate.toDateString()) {
        return "Today " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0, 0);

        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setSeconds(0, 0);

        let daysAgo = (nowDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

        if (daysAgo === 1) {
            return "Yesterday";
        } else if (daysAgo < 7) {
            return daysAgo + " days ago";
        } else {
            const weeksAgo = Math.floor(daysAgo / 7);
            if (weeksAgo === 1) {
                return weeksAgo + " week ago";
            } else {
                return weeksAgo + " weeks ago";
            }
        }
    }
}

function removeRecentList() {
    const id = this.parentElement.getAttribute("data-list-id");
    const recentLists = JSON.parse(localStorage.getItem("recentLists"));

    // Creates new array without removed list
    const newRecentLists = recentLists.filter(list => list.id !== id);
    localStorage.setItem("recentLists", JSON.stringify(newRecentLists));

    loadRecentLists();
}

function loadRecentLists() {
    const recentLists = JSON.parse(localStorage.getItem("recentLists"));

    if (recentLists && recentLists.length > 0) {
        recentLists.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));

        const listEl = document.getElementById("recent-lists");
        while (listEl.firstChild) {
            listEl.removeChild(listEl.firstChild);
        }

        for (const list of recentLists) {
            const listItemEl = document.getElementById("sample-list").cloneNode(true);
            listItemEl.removeAttribute("id");
            listItemEl.classList.remove("hidden");
            listItemEl.setAttribute("data-list-id", list.id);
            listItemEl.querySelector("a").setAttribute("href", "list/?id=" + list.id);

            listItemEl.querySelector(".list-name").innerHTML = list.name;
            listItemEl.querySelector(".list-last-edited").innerHTML = timeFormat(new Date(list.time));

            listItemEl.querySelector(".remove-button").addEventListener("click", removeRecentList);

            listEl.appendChild(listItemEl);
        }

        // Removes the "hidden" class to show the section
        document.getElementById("recent-lists-section").classList.remove("hidden");
    } else {
        // Adds the "hidden" class to hide the section
        document.getElementById("recent-lists-section").classList.add("hidden");
    }
}

loadRecentLists();


// EVENT LISTENERS:

document.getElementById("new-list-button").addEventListener("click", newList);

document.getElementById("open-list-button").addEventListener("click", function () {
    showModal("open-list-modal", true);
});