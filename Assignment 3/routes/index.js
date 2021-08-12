var express = require('express');
var router = express.Router();
var pool = require('pg');
const { response } = require('../app');

var pool = new pool.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 3000,

});



/* GET home page. */
router.get('/', function(req, res, next) {
  //index.ejs
 pool.query(`CREATE TABLE IF NOT EXISTS rectangles (id serial primary key, width float, length float, colour varchar(20), name varchar(20), power float)`, function(err, result){
   if (err){
     console.log(err);
     console.log("Was not able to create table");
   }
   pool.query(`SELECT * FROM rectangles`, function(err, result){
    if(err){
      console.log("Was not able to retrieve data from the database.");
      console.log(err);
    }
    else{
      //'result' is an object
      console.log(result.rowCount==0);
      if (result.rowCount==0){
        res.render('index2');
      }
      else{
        var results = {'result': (result.rows[0].id)? result.rows: [] }
        //look for a file in the views folder called delete.ejs
        res.render('index', results);
      }   
      
    }
  })
 })
});



router.get('/delete',function(req,res,next){
  //Grabbing all rectangles in the database
  pool.query(`SELECT * FROM rectangles`, function(err, result){
    if(err){
      console.log("Was not able to retrieve data from the database.");
      console.log(err);
    }
    else{
      //'result' is an object
      var results = {'result': (result.rows[0].id)? result.rows: [] }
   
    //look for a file in the views folder called delete.ejs
      res.render('delete', results);
      console.log(results);
    }
  })
});


//go to create page

router.get('/create', function(req,res,next){
  //create.ejs
  pool.query(`SELECT COUNT(*) FROM rectangles`,function(err,result){
    if (err){
      console.log("Error:Cannot count total number of records.");
      console.log(err);
    }
    else{
      var results = {'result': (result.rows[0])? result.rows: [] }
      console.log(results);
      res.render('create', {total: results});
    }
  })
  
  
});


router.get('/edit:id', function(req, res, next) {
  //edit.ejs
  pool.query(`SELECT * FROM rectangles WHERE id = $1`, [req.params.id], function(err,result){
    if (err){
      console.log("Error: Was not able to retrieve information from database.");
      console.log(err);
    }
    else{
      var results = {'result': (result.rows[0].id)? result.rows: [] }
      //console.log(results);
      res.render('edit', { title: 'Please edit the desired attributes, the old values are shown in gray for your reference.', data: results});
    }
  })
});


router.get('/stat:id', function(req,res, next){
  //stat.ejs
  pool.query(`SELECT * FROM rectangles WHERE id = $1`, [req.params.id], function(err, result){
    if (err){
      console.log("Error: was not able to retrieve desired rectangle attributes.");
      console.log(err);
    }
    else{
      var results = {'result': (result.rows[0].id)? result.rows: []}
      res.render('stat', {title: 'These are the attributes', data:results});
    }
  })
})





//router.get('/test') if we have localhost:3000/test will get me to this location
module.exports = router;
