const collectiveTodosService = require("../service/collective-todos-service");


class CollectiveTodosController {
  async create(req, res, next) {
    try {
      const {email} = req.user;
      const {text, title, subscribers} = req.body;
      const createdCollectiveTodo = await collectiveTodosService.createCollectiveTodo(email, text, title, subscribers);
      return res.json(createdCollectiveTodo);
    } catch (e) {
      next(e);
    }
  }

  async complete(req, res, next) {
    try {
      const {email} = req.user;
      const {todoId} = req.body;
      const complete = await collectiveTodosService.completeCollectiveTodo(email, todoId);
      return res.json(complete);
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const {email} = req.user;
      const {todoId, text, title, subscribers} = req.body;
      const editedCollectiveTodo = await collectiveTodosService.editCollectiveTodo(email, todoId, { text, title, subscribers });
      return res.json(editedCollectiveTodo);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const {email} = req.user;
      const {todoId} = req.body;
      const response = await collectiveTodosService.deleteCollectiveTodo(email, todoId);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const {email} = req.user;
      const collectiveTodos = await collectiveTodosService.getCollectiveTodos(email);
      return res.json(collectiveTodos);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CollectiveTodosController();