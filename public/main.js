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
        const blogPostTitle = document.createElement('h1');
        const blogPostAuthor = document.createElement('p');
        const blogPostContent = document.createElement('p');
        blogPostContainer.append(blogPostTitle, blogPostAuthor, blogPostContent);
        blogContainer.appendChild(blogPostContainer);

        blogPostTitle.innerText = post.title;
        blogPostAuthor.innerText = post.author;
        blogPostContent.innerText = post.content;
    });
    console.log(result);
};

fetchAllPosts();

submitButton.addEventListener('click', async () => {
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
    console.log(result);

    fetchAllPosts();
});


