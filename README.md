           Blog Post Manager*

### Project Description

The Blog Post Manager is a lightweight web application built with HTML, CSS, and JavaScript that allows users to create, edit, and delete blog posts directly from the browser.  
All data is stored locally using the browser’s *Local Storage*, ensuring posts remain available even after refreshing or closing the page.  
The app focuses on clean functionality, form validation, and an intuitive editing experience.

Features

Add New Post – Create blog entries with a title and content.
Edit Existing Post – Update posts dynamically; form switches to "Update" mode.
Delete Post – Remove unwanted posts instantly.
Local Storage Persistence – Keeps posts even after reloading or closing the page.
Inline Validation – Displays friendly error messages when fields are empty.
Dynamic Feedback – Shows success messages (e.g., “Post updated successfully”) instead of alerts.
Event Delegation – Handles all post interactions efficiently via one parent listener.

Development Approach

The project was developed step by step — starting from a simple form submission, then expanding to dynamic rendering, editing, and deletion.
A key design goal was maintaining clarity and efficiency while handling form states and localStorage updates.

How to Use

Add a Post:

Enter a title and content in the form fields.
Click Submit to create a new post.

Edit a Post:

Click the Edit button below any post.
The post’s title and content will appear in the form.
Update the text and click Update.

Delete a Post:
Click the Delete button next to a post to remove it.

Storage:
Posts are automatically saved in your browser’s local storage.

Refreshing or closing the tab won’t delete them.

Challenges Faced & How They Were Overcome

Challenge 1	
Multiple submit event listeners causing duplicate actions
Solution
Merged them into a single unified listener handling both Add and Update actions

Challenge 2
Maintaining edit state
Solution
Used a global variable editingPostId to track which post is currently being edited

Challenge 3
Overuse of alert messages
Solution
Replaced alerts with inline error messages and temporary success notifications


Challenge 4
Data persistence between sessions
Solution
Implemented localStorage using JSON.stringify and JSON.parse

Challenge 5 
Clearing validation errors
Solutions
Added input event listeners to remove error text dynamically when the user types

Known Issues / Future Enhancements

Posts are not sorted (currently displayed in creation order).
No confirmation dialog before deleting a post.
No search or filter feature yet.
Styling is minimal — UI could be improved with frameworks like Bootstrap