var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');
app.use(morgan('combined'));
app.use(bodyParser.json());

var config = {
    user: 'ankit158',
    database: 'ankit158',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: 'db-ankit158-48045'
};

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});
app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err,result){
        if(err) {
            res.status(500).send(err.toString());
        }else {
            if(result.rows.length===0) {
                rse.send(403).send('username/password is invalid');
            }else {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);
                if(hashedPassword === dbString) {
                    res.send('credentials correct');
                }else{
                    res.send(403).send('username/password is invalid');
                }
            }
        }
    });
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this is some random string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else
        {res.send('user successfully created:' + username);
        }
        
    });
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
    //make a select request
    //return a response with the result
    pool.query('SELECT * FROM test ',function(err,result){
        if(err){
        res.status(500).send(err.toString());
        }
        else
        {res.send(JSON.stringify(result.rows));
        }
        
    
    }); 
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/articles/:articleName', function (req,res) {
    
    pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());}
        else{
            if(result.rows.length===0){
            res.status(404).send('row not found');}
            else{
            var articleData = result.rows[0];
            res.send(createtemplate(articleData));
            }
        }    
        });
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
