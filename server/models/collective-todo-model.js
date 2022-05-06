const {Schema, model} = require('mongoose');

const CollectiveTodoSchema = new Schema({
  author: { type: String },
  complete: { type: Boolean },
  title: { type: String }, 
  text: { type: String },
  subscribers: { type: Array },
})

module.exports = model('CollectiveTodo', CollectiveTodoSchema);