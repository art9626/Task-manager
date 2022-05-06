const ApiError = require("../exceptions/api-error");
const collectiveTodoModel = require("../models/collective-todo-model");

class CollectiveTodosServise {
  async createCollectiveTodo(userEmail, text, title, subscribers) {
    const newCollectiveTodo = await collectiveTodoModel.create(
      {
        author: userEmail,
        complete: false,
        title,
        text,
        subscribers: subscribers.map((item) => ({ email: item, complete: false })),
      }
    );
    return newCollectiveTodo;
  }
  

  async getCollectiveTodos(userEmail) {
    const createdCollectiveTodos = await collectiveTodoModel.find({ author: userEmail });
    let subscribedCollectiveTodos = await collectiveTodoModel.find();
    if (!createdCollectiveTodos && subscribedCollectiveTodos) {
      throw ApiError.BadRequest('Ошибка поиска');
    }
    subscribedCollectiveTodos = subscribedCollectiveTodos.filter((item) => item.subscribers.some((item) => item.email === userEmail));
    return { created: createdCollectiveTodos, subscribed: subscribedCollectiveTodos };
  }


  async completeCollectiveTodo(userEmail, todoId) {
    const collectiveTodo = await collectiveTodoModel.findById(todoId)
    if (!collectiveTodo) {
      throw ApiError.BadRequest('Задача не найдена');
    }

    if (collectiveTodo.author === userEmail) {
      collectiveTodo.complete = !collectiveTodo.complete;
      return await collectiveTodo.save();
    } else {
      if (collectiveTodo.complete) {
        throw ApiError.BadRequest('Задача ранее была завершена ее владельцем');
      } else {
        collectiveTodo.subscribers = collectiveTodo.subscribers.map((item) => {
          if (item.email === userEmail) {
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        })

        return await collectiveTodo.save();
      }
    }
  }


  async editCollectiveTodo(userEmail, todoId, data) {
    const collectiveTodo = await collectiveTodoModel.findById(todoId);
    if (!collectiveTodo) {
      throw ApiError.BadRequest('Задача не найдена');
    }
    if (collectiveTodo.author !== userEmail) {
      throw ApiError.BadRequest('Вы не являетесь владельцем этой задачи');
    }

    collectiveTodo.text = data.text;
    collectiveTodo.title = data.title;

    
    const newSubscribers = data.subscribers.map((subscriber) => {
      const index = collectiveTodo.subscribers.findIndex((item) => item.email === subscriber);
      if (index >= 0) {
        return collectiveTodo.subscribers[index];
      } else {
        return { email: subscriber, complete: false }
      }
    })

    collectiveTodo.subscribers = newSubscribers;

    return await collectiveTodo.save();
  }


  async deleteCollectiveTodo(userEmail, todoId) {
    const collectiveTodo = await collectiveTodoModel.findById(todoId);

    if (!collectiveTodo) {
      throw ApiError.BadRequest('Задача не найдена');
    }
    if (collectiveTodo.author !== userEmail) {
      throw ApiError.BadRequest('Вы не являетесь владельцем этой задачи');
    }

    await collectiveTodoModel.deleteOne({ _id: todoId });

    return {message: 'success'};
  }
}

module.exports = new CollectiveTodosServise();