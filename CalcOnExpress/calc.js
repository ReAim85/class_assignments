const express = require('express');
const app = express();


// to get a and b from url with localhost:3000/multiply/a/b
// app.get('/multiply/:a/:b', function(req, res){
//     let ans = req.params.a * req.params.b;
//     res.send(`ans = ${ans}`);
// })

// to get a and b from url with localhost:3000/multiply?a=num1&b=num2
app.get('/multiply', function(req, res){
    let ans = req.query.a * req.query.b;
    res.send(`ans = ${ans}`);
})

app.get('/add', function(req, res){
    let ans = Math.floor(req.query.a) + Math.floor(req.query.b);
    res.send(`ans = ${ans}`);
})

app.get('/sub', function(req, res){
    let ans = req.query.a - req.query.b;
    res.send(`ans = ${ans}`);
})

app.get('/divide', function(req, res){
    let ans = req.query.a / req.query.b;
    res.send(`ans = ${ans}`);
})

app.listen(3000);