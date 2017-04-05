const TodoModel = require('./todo-model');

class TodoService
{
    static get()
    {
        return TodoModel.find();
    }

}

module.exports = TodoService;