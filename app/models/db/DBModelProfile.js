const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  // Referencing another schema
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

  location: {type: String},
  languages: [{title: {type: String}}],

  webLinks: {
    github: {type: String},
    facebook: {type: String},
    instagram: {type: String}
  },

  profession: {type: String, required: true},
  expLvl: {type: String, required: true},
  skills: {type: [String], required: true},

  jobExp: [{
    company: {type: String, required: true},
    position: {type: [String], required: true},
    from: {type: Date, required: true},
    to: {type: Date},
    current: {type: Boolean, default: false},
    desc: {type: String}
  }],
  
  education: [{
    place: {type: String, required: true},
    majoringIn: {type: String},
    from: {type: Date, required: true},
    to: {type: Date},
    current: {type: Boolean, default: false}
  }]
});

const colName = 'profiles';

const DBModelProfile = mongoose.model(colName, docSchema);

module.exports = DBModelProfile;