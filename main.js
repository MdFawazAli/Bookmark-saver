const oli = document.getElementById("olist");
const button = document.getElementById("submit");

// Load saved bookmarks on page load
window.addEventListener("DOMContentLoaded", () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    oli.innerHTML = ""; // Clear existing list
    bookmarks.forEach((bookmark, index) => {
        addBookmarkToList(bookmark.name, bookmark.url, index);
    });
});

button.addEventListener("click", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const urlInput = document.getElementById("url");

    let name = nameInput.value.trim();
    let url = urlInput.value.trim();

    if (name === "" || url === "") {
        alert("Please fill in both fields.");
        return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    addBookmarkToList(name, url, bookmarks.length - 1);

    nameInput.value = "";
    urlInput.value = "";
});

// Function to create each list item with delete button
function addBookmarkToList(name, url, index) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url;
    a.textContent = name;
    a.target = "_blank";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.color = "white";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.position = "absolute"
    deleteBtn.style.right = "10px"
    deleteBtn.style.height = "25px"
    deleteBtn.style.width = "30px"

    deleteBtn.addEventListener("click", () => {
        // Remove from DOM
        li.remove();

        // Remove from localStorage
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        bookmarks.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        // Re-render to refresh index references
        renderAllBookmarks();
    });

    li.appendChild(a);
    li.appendChild(deleteBtn);
    li.style.marginTop = "10px"
    oli.appendChild(li);
}

// Re-renders all bookmarks (to fix indexes after deletion)
function renderAllBookmarks() {
    oli.innerHTML = "";
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.forEach((bookmark, index) => {
        addBookmarkToList(bookmark.name, bookmark.url, index);
    });
}
