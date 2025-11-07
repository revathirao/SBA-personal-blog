const myform = document.getElementById("blog-form");
const title = document.getElementById("blog-title");
const content = document.getElementById("blog-content");
const submitBtn = document.getElementById("submitBtn");
const div_BlogContainer = document.getElementById("blog-container");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

let arr_blogpoatList = [];
const posts = [];// global array

// Load posts from localStorage when page loads and displays them.
document.addEventListener("DOMContentLoaded", loadPost);

function loadPost() {
    //This line is retrieving the stored JSON string.

    const storedPost = localStorage.getItem("posts");
    if (storedPost) {
        //This parses the retrieved JSON string back into a Javascript array of object.
        posts = JSON.parse(storedPost);
        for (const post of posts) {
            renderPost(post); //to show the retrived items
        }

    }
}

submitBtn.addEventListener("submit", function () {
    e.preventDefault(); // prevent page refresh

    //clear previous error msg  in the span   
    titleError.textContent = "";
    contentError.textContent = "";

    //validate the input   
    if (title.value.trim() === "") {
        alert("Title cannot be empty")
        return
    } else if (content.value / trim() === "") {
        alert("content cannot be empty")
        return
    }
    // Call the reusable create postfunction
    create_EditNewPost(title.value ,content.value);
   
    // Clear form
    title.value = "";
    content.value = "";
});


function createPost(titleText, contentText) {
    //create new post
    const newPost = {
        id: Date.now(),
        title: titleText,
        content: contentText,
        timestamp: new Date().toLocaleString()
    };

    // Add to array
    posts.push(newPost);

    // Save to localStorage
    localStorage.getItem(newPost);

    // Render post
    renderPost(newPost);

}


// creating a div  with h2 and p for title and content
function renderPost(post) {
    let div = document.createElement("div");
    div.classList.add("post")
    div.innerHTML = `
        <span class="post-id">ID: ${post.id}</span>
        <span class="post-timestamp">Time: ${post.timestamp}</span>
        <h2>Title:${post.title}</h2>
        <p>Content:${post.content}</p>`;

    div_BlogContainer.appendChild(div);
}

function createEditbutton() {
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.style.marginLeft = "10px";
}

function createDeletebutton() {
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Edit";
    deleteBtn.classList.add("edit-btn");
    deleteBtn.style.marginLeft = "10px";
}

// form validation