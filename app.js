var express = require('express');
var sample = express();
var bodyParser = require('body-parser');
sample.use(bodyParser.json());
sample.listen(8081);
var mysql = require('mysql');
var customer =[];

var con = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'myproject'
});

//CONNECTION ESTABLISHED TO MYSQL

con.connect(function(err)
{
                if(err)
                {
                                return console.log('Connection failed');
                }
                else
                {
                                console.log('Connection established');
                }


// RETRIEVING ALL THE CUSTOMERS 
sample.get('/Customer' , function(req,res)
{
    console.log("The GET all called");
con.query('SELECT * from customer', function(err,rows)
{
                if(err)
                {
                                console.log(err);
                }
                res.send(JSON.stringify(rows));  
});
});

// RETRIEVING A SPECIFIC CUSTOMER 
sample.get('/Customer/:id' , function(req,res)
{
                //var id = req.params.id;
                con.query('SELECT * from customer where id = '+req.params.id , function(err,rows)
                {
                if(err)
                {
                                console.log(err)
                }
                res.send(JSON.stringify(rows));
                res.end();

});
});
                
//DELETING A CUSTOMER                 
sample.delete('/delete/:id' , function(req,res)
{
                con.query('DELETE FROM customer where id = '+ req.params.id , function(err, rows)
                {
                                if(err)
                                {
                                                console.log(err)
                                }
                                res.send(JSON.stringify(rows));
                                res.end();
                });
});
});

//INSERTING A CUSTOMER

sample.post('/insert' , function(req,res) 
{
                var customer = 
                {
                                                name : req.body.name,
                                                address : req.body.address,
                                                email : req.body.email,
                                                phone : req.body.phone
                };
                //console.log(customer);
                con.query('insert into customer set ?', customer ,  function(err , rows )
                {
                                if(err)
                                {
                                                console.log(err)
                                }
                                res.send(rows);
                                res.end(JSON.stringify(rows));
});
});

//UPDATING A CUSTOMER

sample.put('/update/:name' , function(req , res)
{
                name = req.params.name;
                phone = req.body.phone;
                address = req.body.address;
                email = req.body.email;
                console.log(customer);
                con.query('UPDATE customer set phone = ?,address=?,email=? where name = ? ' , [phone,address,email,name], function(err,rows)
                {
                if(err)
                                {
                                                console.log(err)
                                }
                                res.send(rows);
                                res.end(JSON.stringify(rows));
});
});


module.exports=sample;
/*con.end(function(err)
{
});*/

