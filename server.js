const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.listen(3000, () => console.log('listening at 3000'));
app.use(bodyParser.json({ type: '*/*' }));

//Serve static files//
app.use('/public', express.static(path.join(__dirname, "public")));

//Server the html file on load//
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

//client's data sent to the server//
const posts = [];

app.post('/api/posts', (req, res) => {
    console.log(req.body);
    posts.push(req.body);
    res.send({
        message: "success",
    });
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});