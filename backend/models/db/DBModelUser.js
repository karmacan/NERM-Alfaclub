const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  pass: {type: String, required: true},
  avatar: {type: String},
  regDate: {type: Date, default: Date.now()}
});

const colName = 'users';

const DBModelUser = mongoose.model(colName, docSchema);

module.exports = DBModelUser;