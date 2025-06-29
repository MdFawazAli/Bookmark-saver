let oli = document.getElementById("olist");

let button = document.getElementById("submit")

button.addEventListener("click", (event) => {
    event.preventDefault();
    let nameinput = document.getElementById("name")
    let urlinput = document.getElementById("url")

    let name = nameinput.value.trim()
    let url = urlinput.value.trim()

    if (name === "" || url === "") {
        alert("Please fill in both fields.");
        return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }


    let li = document.createElement("li")
    let a = document.createElement("a")

    a.href = url
    a.textContent = name;
    a.target = "_blank";

    li.append(a);
    oli.append(li);

    nameinput.value = "";
    urlinput.value = "";
})