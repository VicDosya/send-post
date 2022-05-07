const submitButton = document.getElementById('submitButton');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const contentInput = document.getElementById('contentInput');
const blogContainer = document.getElementById('blogsContainer');
const errorMessage = document.getElementById('errorMessage');

const fetchAllPosts = async () => {
    const response = await fetch('/api/posts');
    const result = await response.json();
    blogContainer.innerText = '';
    result.forEach((post) => {
        const blogPostContainer = document.createElement('div');
        blogPostContainer.setAttribute("id", "blogPostContainer");

        const blogPostTitle = document.createElement('h1');
        blogPostTitle.setAttribute("id", "blogPostTitle");

        const blogPostAuthor = document.createElement('p');
        blogPostAuthor.setAttribute("id", "blogPostAuthor");

        const blogPostContent = document.createElement('p');
        blogPostContent.setAttribute("id", "blogPostContent");

        blogPostContainer.append(blogPostTitle, blogPostAuthor, blogPostContent);
        blogContainer.appendChild(blogPostContainer);

        blogPostTitle.innerText = post.title;
        blogPostAuthor.innerText = post.author;
        blogPostContent.innerText = post.content;
    });
    console.log(result);
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '';
};

fetchAllPosts();

submitButton.addEventListener('click', async () => {

    submitButton.disabled = true;
    submitButton.style.backgroundColor = "gray";

    const response = await fetch('/api/posts', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInput.value,
            author: authorInput.value,
            content: contentInput.value
        }),

    });
    const result = await response.json();

    //deal with form inputs on error or success + CSS input styling and error messages
    if (result.message == "error_all") {
        NoClearForm();
        errorMessage.innerText = "❗ Error on all the inputs.";
        titleInput.style.border = "1px solid #fc3d03";
        authorInput.style.border = "1px solid #fc3d03";
        contentInput.style.border = "1px solid #fc3d03";

    } else if (result.message == "error_title") {
        errorMessage.innerText = "❗ Title must have English alphabet, numbers and 3-100 characters.";
        titleInput.style.border = "1px solid #fc3d03";
        authorInput.style.border = "";
        contentInput.style.border = "";

    } else if (result.message == "error_author") {
        errorMessage.innerText = "❗ Author must have English alphabet only and 3-15 characters.";
        titleInput.style.border = "";
        authorInput.style.border = "1px solid #fc3d03";
        contentInput.style.border = "";

    } else if (result.message == "error_content") {
        errorMessage.innerText = "❗ Content can have all characters, symbols, numbers and 3-3,000 characters.";
        titleInput.style.border = "";
        authorInput.style.border = "";
        contentInput.style.border = "1px solid #fc3d03";

    } else if (result.message == "error_title_author") {
        errorMessage.innerText = "❗ Invalid Title and Author input.";
        titleInput.style.border = "1px solid #fc3d03";
        authorInput.style.border = "1px solid #fc3d03";
        contentInput.style.border = "";

    } else if (result.message == "error_title_content") {
        errorMessage.innerText = "❗ Invalid Title and Content input.";
        titleInput.style.border = "1px solid #fc3d03";
        authorInput.style.border = "";
        contentInput.style.border = "1px solid #fc3d03";

    } else if (result.message == "error_author_content") {
        errorMessage.innerText = "❗ Invalid Author and Content input.";
        titleInput.style.border = "";
        authorInput.style.border = "1px solid #fc3d03";
        contentInput.style.border = "1px solid #fc3d03";

    } else {
        ClearForm();
        errorMessage.innerText = "";
        titleInput.style.border = "";
        authorInput.style.border = "";
        contentInput.style.border = "";
    }
    console.log(result);

    fetchAllPosts();
});

//clear form functionality//
const NoClearForm = function () {
    titleInput.value;
    authorInput.value;
    contentInput.value;
};
const ClearForm = function () {
    titleInput.value = '';
    authorInput.value = '';
    contentInput.value = '';
};

