const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  pass: {type: String, required: true},
  avatar: {type: String},
  regDate: {type: Date, default: Date.now()}
});

const modelName = 'user';

module.exports = User = mongoose.model(modelName, modelSchema);