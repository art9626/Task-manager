const ApiError = require('../exceptions/api-error');
const FriendsModel = require('../models/friends-model');
const userService = require('./user-service');

class FriendsService {
  async friends(id) {
    const friends = await FriendsModel.findOne({ user: id });
    return friends;
  }


  async add(userId, userEmail, candidateEmail) {
    if (userEmail === candidateEmail) {
      throw ApiError.BadRequest('Нельзя добавлять в друзья самого себя');
    }

    const { _id } = await userService.checkUser(candidateEmail);

    let candidateFriends = await FriendsModel.findOne({ user: _id });
    let userFriends = await FriendsModel.findOne({ user: userId });

    const arr = [candidateFriends, userFriends]
    for (let item in arr) {
      if (!arr[item]) {
        arr[item] = await FriendsModel.create({
          user: item === '0' ? _id : userId,
          friends: {
            requestsTo: [],
            addedFriends: [],
            requestsFrom: []
          }
        });
      }
    }
    [candidateFriends, userFriends] = arr;

    const isEarlyRequestedToAdd = userFriends.friends.requestsTo.find((item) => item === candidateEmail);
    if (isEarlyRequestedToAdd) {
      throw ApiError.BadRequest('Вы раньше отправляли заявку');
    }
    const isEarlyAdded = userFriends.friends.addedFriends.find((item) => item === candidateEmail);
    if (isEarlyAdded) {
      throw ApiError.BadRequest('Уже в друзьях');
    }
    const isEarlyRequestedToAccept = candidateFriends.friends.requestsTo.find((item) => item === userEmail);
    if (isEarlyRequestedToAccept) {
      throw ApiError.BadRequest('Пользователь раньше отправлял заявку вам');
    }
    candidateFriends.friends = {
      ...candidateFriends.friends,
      requestsFrom: [...candidateFriends.friends.requestsFrom, userEmail],
    }
    await candidateFriends.save();
    userFriends.friends = {
      ...userFriends.friends,
      requestsTo: [...userFriends.friends.requestsTo, candidateEmail]
    };
    await userFriends.save();

    return { message: 'success' };
  }


  async confirm(userId, userEmail, candidateEmail) {
    const { _id } = await userService.checkUser(candidateEmail);
    let userFriends = await FriendsModel.findOne({ user: userId });
    let candidateFriends = await FriendsModel.findOne({ user: _id });
    if (!candidateFriends.friends.requestsTo.find((item) => item === userEmail)) {
      throw ApiError.BadRequest('Запрос устарел');
    }
    userFriends.friends = {
      ...userFriends.friends,
      addedFriends: [...userFriends.friends.addedFriends, candidateEmail],
      requestsFrom: userFriends.friends.requestsFrom.filter((item) => item !== candidateEmail),
    };
    await userFriends.save();
    candidateFriends.friends = {
      ...candidateFriends.friends,
      addedFriends: [...candidateFriends.friends.addedFriends, userEmail],
      requestsTo: candidateFriends.friends.requestsTo.filter((item) => item !== userEmail),
    };
    await candidateFriends.save();

    return { message: 'success' };
  }


  async deny(userId, userEmail, candidateEmail) {
    const { _id } = await userService.checkUser(candidateEmail);
    let userFriends = await FriendsModel.findOne({ user: userId });
    let candidateFriends = await FriendsModel.findOne({ user: _id });
    if (!candidateFriends.friends.requestsTo.find((item) => item === userEmail)) {
      throw ApiError.BadRequest('Запрос устарел');
    }
    userFriends.friends = {
      ...userFriends.friends,
      requestsFrom: userFriends.friends.requestsFrom.filter((item) => item !== candidateEmail),
    };
    await userFriends.save();
    candidateFriends.friends = {
      ...candidateFriends.friends,
      requestsTo: candidateFriends.friends.requestsTo.filter((item) => item !== userEmail),
    };
    await candidateFriends.save();

    return { message: 'success' };
  }


  async cancel(userId, userEmail, candidateEmail) {
    const { _id } = await userService.checkUser(candidateEmail);
    let userFriends = await FriendsModel.findOne({ user: userId });
    let candidateFriends = await FriendsModel.findOne({ user: _id });
    if (!candidateFriends.friends.requestsFrom.find((item) => item === userEmail)) {
      throw ApiError.BadRequest('Запрос устарел');
    }
    userFriends.friends = {
      ...userFriends.friends,
      requestsTo: userFriends.friends.requestsTo.filter((item) => item !== candidateEmail),
    };
    await userFriends.save();
    candidateFriends.friends = {
      ...candidateFriends.friends,
      requestsFrom: candidateFriends.friends.requestsFrom.filter((item) => item !== userEmail),
    };
    await candidateFriends.save();

    return { message: 'success' };
  }


  async remove(userId, userEmail, candidateEmail) {
    const { _id } = await userService.checkUser(candidateEmail);
    let userFriends = await FriendsModel.findOne({ user: userId });
    let candidateFriends = await FriendsModel.findOne({ user: _id });
    if (!candidateFriends.friends.addedFriends.find((item) => item === userEmail)) {
      throw ApiError.BadRequest('Друг не найден');
    }
    userFriends.friends = {
      ...userFriends.friends,
      addedFriends: userFriends.friends.addedFriends.filter((item) => item !== candidateEmail),
    };
    await userFriends.save();
    candidateFriends.friends = {
      ...candidateFriends.friends,
      addedFriends: candidateFriends.friends.addedFriends.filter((item) => item !== userEmail),
    };
    await candidateFriends.save();

    return { message: 'success' };
  }
}

module.exports = new FriendsService();