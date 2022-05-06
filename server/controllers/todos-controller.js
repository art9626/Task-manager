const todoService = require("../service/todo-service");


class TodosController {
  async todos(req, res, next) {
    try {
      const {id} = req.user;
      const todos = await todoService.getTodos(id);
      return res.json(todos);
    } catch (e) {
      next(e);
    }
  }


  async create(req, res, next) {
    try {
      const {id} = req.user;
      const {todo} = req.body;
      const createdTodo = await todoService.createTodo(id, todo);
      return res.json(createdTodo);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.user;
      const {todoId} = req.body;
      const response = await todoService.deleteTodo(todoId, id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async complete(req, res, next) {
    try {
      const {id} = req.user;
      const {todoId} = req.body;
      const response = await todoService.completeTodo(todoId, id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const {id} = req.user;
      const {todoId, title, text} = req.body;
      const response = await todoService.editTodo(id, todoId, title, text);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodosController();