const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.listen(25565, () => console.log('listening at 25565'));
app.use(bodyParser.json({ type: '*/*' }));

//Serve static files//
app.use('/public', express.static(path.join(__dirname, "public")));

//Server the html file on load//
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

//client's data sent to the server//
const posts = [];

//validation patterns
const validPatterns = {
    title: /^[a-z\d ]{3,100}$/i,
    author: /^[a-z ]{3,15}$/i,
    content: /^[a-z\d \W]{3,3000}$/i
};

app.post('/api/posts', (req, res) => {

    const validTitle = validPatterns.title.test(req.body.title);
    const validAuthor = validPatterns.author.test(req.body.author);
    const validContent = validPatterns.content.test(req.body.content);

    //validation system + for CSS styling//
    if (validTitle && validAuthor && validContent) {
        console.log(req.body);
        posts.push(req.body);
        res.send({
            message: "success",
        });
    } else if (!validTitle && !validAuthor && !validContent) {
        res.send({
            message: "error_all",
        });
    } else if (!validTitle && validAuthor && validContent) {
        res.send({
            message: "error_title",
        });
    } else if (validTitle && !validAuthor && validContent) {
        res.send({
            message: "error_author",
        });
    } else if (validTitle && validAuthor && !validContent) {
        res.send({
            message: "error_content",
        });
    } else if (!validTitle && !validAuthor && validContent){
        res.send({
            message: "error_title_author",
        });
    } else if(!validTitle && validAuthor && !validContent){
        res.send({
            message: "error_title_content",
        });
    } else if(validTitle && !validAuthor && !validContent){
        res.send({
            message: "error_author_content",
        });
    }
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});