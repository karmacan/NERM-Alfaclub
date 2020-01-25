const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'users'},
  userName: {type: String},
  avatar: { type: String },
  text: {type: String, required: true},
  date: {type: Date, default: Date.now()},
  likes: [
    {user: {type: Schema.Types.ObjectId, ref: 'users'}}
  ],
  comments: [{
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    userName: {type: String},
    text: {type: String, required: true},
    avatar: {type: String},
    date: {type: Date, default: Date.now()}
  }]
});

const colName = 'posts';

const DBModelSchema = mongoose.model(colName, docSchema);

module.exports = DBModelSchema;