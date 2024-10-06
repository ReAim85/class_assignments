const express = require('express');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');

app.use(express.json())

function readTodos() {
    try {
        const data = fs.readFileSync("todo.json", "UTF-8");
        return JSON.parse(data) || [];
    } catch(err){
        return[];
    }
}

function writeTodos(todos) {
    fs.writeFileSync("todo.json", JSON.stringify(todos, null, 2));
}

app.post('/', function(req, res){
    //code for adding a todo
    let todos = readTodos();
    todos.push({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    })
    writeTodos(todos);
    res.send(`"${req.body.title}" added successfully`)

})

app.delete('/', function(req, res) {
    //code for deleting a todo
    let id = req.body.id;
    let todos = readTodos();
    todos = todos.filter((todo)=> todo.id !== id);
    writeTodos(todos);
    res.send('completed')
    
})

app.get('/', function(req, res){
    //code for showing all todo
    let todos = readTodos();
    let cleanTodo = [];
    todos.forEach(todo => {
        cleanTodo.push({
            title: todo.title,
            description: todo.description
        })
});
res.send(cleanTodo)
    
})

app.listen(3000);