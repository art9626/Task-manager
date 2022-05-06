const friendsService = require("../service/friends-service");


class FriendsController {
  async friends(req, res, next) {
    try {
      const {id} = req.user;
      const friends = await friendsService.friends(id);
      return res.json(friends);
    } catch (e) {
      next(e);
    }
  }

  async add(req, res, next) {
    try {
      const {id, email} = req.user;
      const {candidateEmail} = req.body;
      const response = await friendsService.add(id, email, candidateEmail);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async confirm(req, res, next) {
    try {
      const {id, email} = req.user;
      const {candidateEmail} = req.body;
      const response = await friendsService.confirm(id, email, candidateEmail);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deny(req, res, next) {
    try {
      const {id, email} = req.user;
      const {candidateEmail} = req.body;
      const response = await friendsService.deny(id, email, candidateEmail);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async cancel(req, res, next) {
    try {
      const {id, email} = req.user;
      const {candidateEmail} = req.body;
      const response = await friendsService.cancel(id, email, candidateEmail);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const {id, email} = req.user;
      const {candidateEmail} = req.body;
      const response = await friendsService.remove(id, email, candidateEmail);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FriendsController();