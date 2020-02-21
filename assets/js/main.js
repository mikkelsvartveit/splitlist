function timeFormat(date) {
    var nowDate = new Date();
    if(date.toDateString() == nowDate.toDateString()) {
        return "Today " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0, 0);

        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setSeconds(0, 0);
        
        var daysAgo = (nowDate.getTime() - date.getTime()) / (1000*60*60*24);
        
        if(daysAgo == 1) {
            return "Yesterday";
        } else if(daysAgo < 7) {
            return daysAgo + " days ago";
        } else {
            var weeksAgo = Math.floor(daysAgo / 7);
            if(weeksAgo == 1) {
                return weeksAgo + " week ago";
            } else {
                return weeksAgo + " weeks ago";
            }
        }
    }
}

function removeRecentList() {
    var id = this.parentElement.getAttribute("data-list-id");
    var recentLists = JSON.parse(localStorage.getItem("recentLists"));
    
    var indexToRemove = recentLists.findIndex(list => list.id == id);
    recentLists.splice(indexToRemove, 1);
    localStorage.setItem("recentLists", JSON.stringify(recentLists));
    
    loadRecentLists();
}

function openList() {
    var id = prompt("Input your list ID:");
    if(id) {
        window.location = "/list/?id=" + id;
    }
}

function loadRecentLists() {
    var recentLists = JSON.parse(localStorage.getItem("recentLists"));
    
    if(recentLists && recentLists.length > 0) {
        recentLists.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));

        var listEl = document.getElementById("recent-lists");
        while(listEl.firstChild) {
            listEl.removeChild(listEl.firstChild);
        }

        for(var i = 0; i < recentLists.length; i++) {
            var listItemEl = document.getElementById("sample-list").cloneNode(true);
            listItemEl.removeAttribute("id");
            listItemEl.classList.remove("hidden");
            listItemEl.setAttribute("data-list-id", recentLists[i].id);
            listItemEl.querySelector("a").setAttribute("href", "list/?id=" + recentLists[i].id);

            listItemEl.querySelector(".list-name").innerHTML = recentLists[i].name;
            listItemEl.querySelector(".list-last-edited").innerHTML = timeFormat(new Date(recentLists[i].time));

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

document.getElementById("open-list-button").addEventListener("click", openList);