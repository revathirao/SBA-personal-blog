const myform = document.getElementById("blog-form");
const title = document.getElementById("blog-title");
const content = document.getElementById("blog-content");
const submitBtn = document.getElementById("submitBtn");
const div_BlogContainer = document.getElementById("blog-container");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const message = document.getElementById("message");
let editingPostId = null

let posts = [];// global array

// Load posts from localStorage when page loads and displays them.
document.addEventListener("DOMContentLoaded", loadPost);

function loadPost() {
    //This line is retrieving the stored JSON string.

    const storedPost = localStorage.getItem("posts");
    if (storedPost) {
        //This parses the retrieved JSON string back into a Javascript array of object.
        let parsed = JSON.parse(storedPost);
        // Ensure it’s an array
        posts = Array.isArray(parsed) ? parsed : [];
    }
    renderPosts(); //to show the retrived items
}

// Separate function for live validation
function validateInput(input, errorSpan, fieldName) {
   if (!input.value.trim()) {   // manual check instead of validity
        errorSpan.textContent = `${fieldName} cannot be empty`;
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

//both create and edit
myform.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page refresh

        const titleValue = title.value.trim();
    const contentValue = content.value.trim();

     // Validate fields
    const isTitleValid = validateInput(title, titleError, "Title");
    const isContentValid = validateInput(content, contentError, "Content");

    // Stop submission if any field is invalid
    if (!isTitleValid || !isContentValid) {
        return;
    } 

    // // //validate the input   
    // if (title.value.trim() === "") {
    //     titleError.textContent = ("Title cannot be empty")
    //     titleError.style.color = "red";
    //     title.focus(); // puts cursor in the problematic field
    //     return
    // } else if (content.value.trim() === "") {
    //     contentError.textContent = ("content cannot be empty")
    //     contentError.style.color = "red";
    //     title.focus(); // puts cursor in the problematic field
    //     return
    // }

    // Edit existing post
    if (submitBtn.textContent === "Update" && editingPostId !== null) {
        // Editing existing post

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === editingPostId) {
                // Update the post’s title and content with new values
                posts[i].title = titleValue;
                posts[i].content = contentValue;
                // Exit the loop since we found and updated the post
                break;
            }
        }

        // Change button text back to "Submit" (normal mode)
        submitBtn.textContent = "Submit";
      
        // Clear the editingPostId variable (no longer editing)
        editingPostId = null;
    } else {
        //adding a new post
        create_NewPost(title.value, content.value);
    }

     //Resave to loaca storage
        localStorage.setItem("posts", JSON.stringify(posts));
    
    // Renderpost
    renderPosts();

      //success message
    message.textContent = submitBtn.textContent === "Update" ? 
        "Post updated successfully!" : "Post added successfully!";
    message.style.opacity = "1";

    // Fade out message after 3 seconds
    setTimeout(() => message.style.opacity = "0", 3000);
  
    // Clear form
    myform.reset();

});


function create_NewPost(titleText, contentText) {
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
    localStorage.setItem("posts", JSON.stringify(posts));

    // Render post
    renderPosts();
}


// creating a div  with h2 and p for title and content
function renderPosts() {
    div_BlogContainer.replaceChildren();
    const fragment = document.createDocumentFragment();
    // div_BlogContainer = "";

    if (posts.length === 0) {
        let div = document.createElement("div");
        div.textContent = "Blog list is empty"
        fragment.appendChild(div)
    } else {
        for (let i = 0; i < posts.length; i++) {

            let div = document.createElement("div");
            div.classList.add("post")
            div.innerHTML = `
                <h2>Title: ${posts[i].title}</h2>
                <p>Content: ${posts[i].content}</p>
                <span class="post-id">ID: ${posts[i].id}</span>
                <span class="post-timestamp">Time: ${posts[i].timestamp}</span>
            `;

            // Button container to keep both buttons aligned below
            const btnContainer = document.createElement("div");
            btnContainer.classList.add("button-container");
            btnContainer.appendChild(Editbutton(posts[i]));
            btnContainer.appendChild(createDeletebutton(posts[i]));

            div.appendChild(btnContainer)

            // // //append Edit button to div
            // div.appendChild(Editbutton(posts[i]));

            // //append Remove button to div
            // div.appendChild(createDeletebutton(posts[i]));


            fragment.appendChild(div)

        } //for loop
    }  //else loop   

    div_BlogContainer.appendChild(fragment);

}

function createDeletebutton(post) {
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.style.marginLeft = "10px";

    // data attribute that stores the post’s unique id.
    // Attaches a data-id attribute with the post’s ID to know which post this button belongs to later
    deleteBtn.setAttribute("data-id", post.id)
    deleteBtn.style.marginLeft = "10px";
    return deleteBtn
}


function Editbutton(post) {
    //Create a button element
    let editBtn = document.createElement("button");

    // Set text to "Edit"
    editBtn.textContent = "Edit";

    // Add a class to store post.id (so we know which post to edit)
    editBtn.classList.add("edit-btn");

    editBtn.style.marginLeft = "10px";

    // Add a data attribute to store post.id to know which post to edit)
    editBtn.setAttribute("data-id", post.id)
    return editBtn
}

// Event delegation for delete and edit
div_BlogContainer.addEventListener("click", function (e) {
    const target = e.target;

    //delete

    if (target.classList.contains("delete-btn")) {
        // If it's a delete button, perform the deletion logic
        //get the dataid so postId holds the exact ID of the post that button belonged to
        let postId = e.target.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this post?")) {
            // Remove the post from the array
            posts = posts.filter(p => p.id !== Number(postId));
        }
        // filter loops through all posts and keeps only the ones whose ID does not match the one being deleted.

        // Update localStorage
        localStorage.setItem("posts", JSON.stringify(posts));

        // Refresh the displayed list
        renderPosts();
    }
    //Edit

    else if (e.target.classList.contains("edit-btn")) {
        // Get the postId from button's data attribute
        let postId = Number(e.target.getAttribute("data-id"));
        // Find the post object in posts array that matches postId
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === Number(postId)) {

                //Populate the form fields with existing data
                title.value = posts[i].title; //set the value for title
                content.value = posts[i].content;

                // Cange submit button to  update
                submitBtn.textContent = "Update"

                //  Store the id of the post being edited  in a global variable)
                editingPostId = postId;
                break;
            }
        } //for loop
    } //if statement
});


