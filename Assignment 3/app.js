var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pool = require('pg');

var pool = new pool.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port:3000,
});


//Router for index and users

//General operations are kept under indexRouter, handling all paths pertaining to general operations
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
//anything under "/" should be redirected to the indexRouter - index.js
app.use('/', indexRouter);



//Grabbing the data that user inputs and put into database
app.post('/create_new', function(req,res,next){
  var data = req.body;
  var data_array = [data.width, data.length, data.colour, data.unique_name, data.power];
  //console.log(req.body);
  
  pool.query(`INSERT INTO rectangles (width, length, colour, name, power) VALUES ($1, $2, $3, $4, $5)`, data_array, function(err,result){
    if(err){
      console.log("Error:Insert went wrong");
      console.log(err);
    }
    else{
      console.log(result);
    }
    res.redirect('/create');
  })



});

//responding to delete
app.delete('/delete_rectangle:id', function(req,res,next){
  //write query here
  console.log(req.params.id);
  pool.query(`DELETE FROM rectangles WHERE id = $1`, [req.params.id], function(err, result){
    if (err){
      console.log("Error:Delete went wrong.");
      console.log(err);
    }
    else{
      console.log(result);
    }
  })
  res.sendStatus(200);
});

app.post("/edit_rectangle/:id", function(req,res,next){
  //console.log(req.params.id);
  //console.log(typeof(req.params.id));
  var data = req.body;
  var new_values = [data.width, data.length, data.colour, data.unique_name, data.power, req.params.id];
  pool.query(`UPDATE rectangles SET width = $1, length = $2, colour = $3, name = $4, power = $5 WHERE id = $6`,
   new_values, function(err, result){
     if(err){
       console.log("Error: Update went wrong");
       console.log(err);
     }
     else{
       console.log(result);
     }
     res.redirect('/delete');
   })
  
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
/*
// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
