const uuid = require('uuid');
const ApiError = require('../exceptions/api-error');
const todoModel = require('../models/todo-model');

class TodoServise {
  async createTodo(userId, todo) {
    const currentTodos = await todoModel.findOne({ user: userId });
    const newTodo = { _id: uuid.v4(), subscribers: [], ...todo };
    if (currentTodos) {
      currentTodos.todos = [newTodo, ...currentTodos.todos];
      await currentTodos.save();
      return newTodo
    }
    await todoModel.create({ user: userId, todos: [newTodo] });
    return newTodo;
  }


  async getTodos(userId) {
    return await todoModel.find({ user: userId });
  }


  async deleteTodo(todoId, userId) {
    const currentTodos = await todoModel.findOne({ user: userId });
    if (!currentTodos.todos.find((item) => item._id === todoId)) {
      throw ApiError.BadRequest('Что то пошло не так...');
    }
    currentTodos.todos = currentTodos.todos.filter((item) => item._id !== todoId);
    await currentTodos.save();
    return { message: 'success' }
  }


  async completeTodo(todoId, userId) {
    const currentTodos = await todoModel.findOne({ user: userId });
    if (!currentTodos.todos.find((item) => item._id === todoId)) {
      throw ApiError.BadRequest('Что то пошло не так...');
    }
    currentTodos.todos = currentTodos.todos.map((item) => {
      if (todoId === item._id) {
        return {
          ...item,
          complete: !item.complete,
        };
      }
      return item;
    });
    return await currentTodos.save();
  }


  async editTodo(userId, todoId, title, text) {
    const currentTodos = await todoModel.findOne({ user: userId });
    if (!currentTodos.todos.find((item) => item._id === todoId)) {
      throw ApiError.BadRequest('Что то пошло не так...');
    }
    currentTodos.todos = currentTodos.todos.map((item) => {
      if (item._id === todoId) {
        return {
          ...item,
          title,
          text,
        }
      }
      return item;
    });
    await currentTodos.save();
    return { message: 'success' }
  }
}

module.exports = new TodoServise();