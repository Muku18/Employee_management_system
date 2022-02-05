const express = require('express') ; 
const app = express() ; 
const port = process.env.PORT || 5000;
const exphbs = require('express-handlebars'); // frontened
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config(); 




//middleware

app.use(bodyParser.urlencoded({extended:false}));



app.use(bodyParser.json())





//static files
app.use(express.static(__dirname + '/public'))


//templating engine

app.engine('hbs', exphbs.engine( {
    helpers: {
    ifEquals: function(a, b, options) {
        if (a === b) {
          return options.fn(this);
        }
      
        return options.inverse(this);
      },
    ifnEquals : function (a, b, options) {
        if (a != b)
         { return options.fn(this); }
        return options.inverse(this);
    }

},
    extname: '.hbs' }
));

app.set('view engine','hbs');

//database connection

const pool = mysql.createPool({
connectionLimit : 100,
host : process.env.DB_HOST,
user : process.env.DB_USER,
password : process.env.DB_PASS,
database : process.env.DB_NAME
});

pool.getConnection((err,connection) => {
    if(err){
        console.log("error in database connection");
    }
    console.log("hey!!!")
    console.log("connected to database as id " + connection.threadId);
})

const routes = require('./server/routes/user');
app.use('/',routes);

const routes1 = require('./server/routes/work');
app.use('/employee',routes1);






app.get("/public", (req, res) => {
    res.render("public");
});

app.get('',(req,res) => {
    res.render('home');
})




app.listen(port,(err) => {
    if(err){
        console.log("Error in connection");
    }
    else{
        console.log(`server is listening on port ${port}`);
    }
});