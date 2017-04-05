'use strict';
const TodosService = require('./todos-services');

class TodosController{

  static getTodos(req, res, next) {

    const todosPromise = TodosService.get();


    todosPromise.then(function (todos) {
        res.json(todos)
    });

  }
  // static addTodo(req, res, next){
  //     todos.push({label: req.label, id: this.todos.length + 1});
  //     res.json(todos);
  // }

}

module.exports = TodosController;
