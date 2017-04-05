const Router = require('co-router');
const router = Router();
const todos = require('./todos-controller');

router.get('/', todos.getTodos);
// router.post('/',todos.addTodo);

module.exports = router;
