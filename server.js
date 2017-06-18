var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));

var config = {
    user: 'ankit158',
    database: 'ankit158',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password:db-ankit158-48045
};

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter', function(req,res) {
    counter = counter+1;
    res.send(counter.toString());
});
var articles={
    'article-one':{
       title:"article-one-ankit158" ,
       heading:"article-one",
       date:"10 june 2017",
       content:`<p>
                 This is article one.Behold your breathe.
                </p>
                <p>
                That's doing nice.
                </p>`    
       
                  },
    'article-two':{ 
       title:"article-two-ankit158" ,
       heading:"article-two",
       date:"11 june 2017",
       content:`<p>
                 This is article two.Behold your breathe.
                </p>
                <p>
                That's doing nice.
                </p>`  
                  }
};

function createtemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmltemplate = `
    <html>
    <head>
        <title>
        ${title}
        </title>
    </head>
    <body>
        <div>
            <a href="/">HOME</a>
        </div>
        <hr>
        <h3>
        ${heading}  
        </h3>
        <div>
        ${date}
        </div>
        <div>
        ${content}
        </div>
    </body>
    </html>`;
    return htmltemplate;

}

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a request
    pool.query('SELECT * FROM test ',function(err,result){
        if(err){
        res.status(500).send(err.toString());
        }
        else
        {res.send(JSON.stringify(result));
        }
        
    
    }); 
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/:articleName', function (req,res) { 
    var articleName = req.params.articleName;
    res.send(createtemplate(articles[articleName]));
}); 
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});  


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
