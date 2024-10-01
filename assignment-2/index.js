const { program } = require("commander");
const fs = require('fs');

program
.name('Todo')
.description('CLI for some JavaScript fs library')
.version('0.1.0')
.description('Lets you add a todo, del a todo and mark todo as done')
.argument('[Task]', 'Task to manuplate in todo.json')
.option('-at,--add-todo', 'adds your task in todo.json')
.option('-dt,--del-todo', 'deletes your task in todo.json')
.option('-md,--complete', 'marks your todo as complete')
.option('--show', 'display all todos')

program.parse()

const option = program.opts();
const task = program.args[0];

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

function addTodo() {
    if (!task) {
        console.log("Please provide a task to add.");
        return;
      }
    const todos = readTodos();
    todos.push({task, complete: false});
    writeTodos(todos);
    console.log(`Task Added: ${task}`)
}


function deleteTodo() {
    if (!task) {
        console.log("Please provide a task to delete.");
        return;
      }
let todos= readTodos();
todos = todos.filter((todo)=> todo.task !== task);
writeTodos(todos);
console.log(`Task deleted: ${task}`);
}

function completeTodo(task) {
    if (!task) {
        console.log("Please provide a task to mark as complete.");
        return;
      }
    const todos = readTodos();
    const todo = todos.find((todo) => todo.task === task);
    if (todo) {
      todo.complete = true;
      writeTodos(todos);
      console.log(`Task marked as complete: ${task}`);
    } else {
      console.log(`Task not found: ${task}`);
    }
  }

function showTodos() {
    const todos = readTodos();
    if (todos.length === 0){
        console.log(`No task Found`)
    }else{
        todos.forEach((todo, index) => {
            console.log(`${index+1}. ${todo.task}[${todo.complete? "✓":" "}]`)
        });
    }
}

if (option.addTodo) {
    addTodo(task);
  } else if (option.delTodo) {
    deleteTodo(task);
  } else if (option.complete) {
    completeTodo(task);
  } else if (option.show) {
    showTodos();
  } else {
    console.log("Please provide a valid option.");
  }