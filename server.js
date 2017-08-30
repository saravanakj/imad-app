var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'saravanakj',
    database: 'saravanakj',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
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
    },
    'article-two': {
                    title: 'Article Two',
                    heading: 'Article Two',
                    content: `
                        <p>
                            This is the second Article 
                        </p>
                    `
    },
    'article-three': {
                    title: 'Article Three',
                    heading: 'Article Three',
                    content: `
                        <p>
                            This is the third Article 
                        </p>
                    `
    }
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
                    <h3>${data.date.toDateString()}</h3>
                </div>
                <div>
                    ${data.content}
                </div>
            </div>
        </body>
    </html>
    `;
    return template;
    
};

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    pool.query('SELECT * from "user"', function(err, result){
       if(err){
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});


var names=[];
app.get('/subname', function(req, res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  //res.send(createTemplate(articles[articleName]));
  
  pool.query(`SELECT * FROM article WHERE title = '${articleName}'`, function(err, result){
       if(err){
           res.status(500).send(err.toString());
       } else {
           if(result.rows.length === 0) {
               res.status(404).send('Article not found');
           } else {
            res.send(createTemplate(result.rows[0]));
           }
       }
  });
});

/*
app.get('/article-one', function (req, res) {
  res.send(createTemplate(articles.articleOne));
});
*/
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
