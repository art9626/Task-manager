const {Schema, model} = require('mongoose');

const FriendsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  friends: { type: Object },
})

module.exports = model('Friends', FriendsSchema);