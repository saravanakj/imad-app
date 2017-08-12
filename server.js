var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
    title: 'Article One',
    heading: 'Article One',
    content: `
                <p>
                    This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.
                </p>
                <p>
                    This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.This is the Article one content. This is the Article one content.
                </p>
    `
};

var createTemplate = function(data){
    var template = `
    <html>
        <head>
            <title>${data.title}</title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>|<a href="/article-one">One</a>|<a href="/article-two">Two</a>|<a href="/article-three">Three</a>
                </div>
                <hr />
                <div>
                    <h1>${data.heading}</h1>
                </div>
                <div>
                    ${data.content}
                </div>
            </div>
        </body>
    </html>
    `;
    return template;
    
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
