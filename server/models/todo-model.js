const {Schema, model} = require('mongoose');

const TodoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  todos: { type: Array },
})

module.exports = model('Todo', TodoSchema);