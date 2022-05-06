const submitButton = document.getElementById('submitButton');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const contentInput = document.getElementById('contentInput');
const blogContainer = document.getElementById('blogsContainer');

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
    titleInput.value = '';
    authorInput.value = '';
    contentInput.value = '';
    const result = await response.json();
    console.log(result);

    fetchAllPosts();
});


