const myform = document.getElementById("blog-form");
const title = document.getElementById("blog-title");
const content = document.getElementById("blog-content");
const submitBtn = document.getElementById("submitBtn");
const div_BlogContainer = document.getElementById("blog-container");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const containerError = document.getElementById("containerError");


let posts = [];// global array

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

myform.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page refresh

    //clear previous error msg  in the span   
    titleError.textContent = "";
    contentError.textContent = "";

    //validate the input   
    if (title.value.trim() === "") {
        titleError.textContent = ("Title cannot be empty")
        return
    } else if (content.value.trim() === "") {
        contentError.textContent = ("content cannot be empty")
        return
    }
    // Call the reusable create postfunction
    create_EditNewPost(title.value, content.value);

    // Clear form
    title.value = "";
    content.value = "";
});


function create_EditNewPost(titleText, contentText) {
    //create new post
    const newPost = {
        id: Date.now(),
        title: titleText,
        content: contentText,
        timestamp: new Date().toLocaleString()
    };

    // Add to array
    posts.push(newPost);

    // Save to localStorage requires 2 arguments
    localStorage.setItem("posts", JSON.stringify(newPost));

    // Render post
    renderPost();
}


// creating a div  with h2 and p for title and content
function renderPost() {
    div_BlogContainer.replaceChildren();
    const fragment= document.createDocumentFragment();
    // div_BlogContainer = "";

    if (posts.length=== 0) {
        let div = document.createElement("div");
        div.textContent = "Blog list is empty"
        fragment.appendChild(div)
    } else {
        for (let i = 0; i < posts.length; i++) {

            let div = document.createElement("div");
            div.classList.add("post")
            div.innerHTML = `

            <span class="post-id">ID: ${posts[i].id}</span>
            <span class="post-timestamp">Time: ${posts[i].timestamp}</span>
            <h2>Title: ${posts[i].title}</h2>
            <p>Content: ${posts[i].content}</p>
            `;
            
            // //append Remove button to div
            // div.appendChild(Deletebutton());

            // //append Edit button to div
            // div.appendChild(Editbutton());

            fragment.appendChild(div)
        
        } //for loop
    }  //else loop   
    
    div_BlogContainer.appendChild(fragment);

}
function Editbutton() {
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.style.marginLeft = "10px";
}

function Deletebutton() {
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Edit";
    deleteBtn.classList.add("edit-btn");
    deleteBtn.style.marginLeft = "10px";
}

// form validation