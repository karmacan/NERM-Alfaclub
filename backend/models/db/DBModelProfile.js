const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  // Referencing another schema (by collection name)
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

  // Required
  profession: {type: String, required: true},
  expLvl: {type: String, required: true},
  skills: {type: [String], required: true},

  // Location and languages
  bio: {type: String},

  // ??? [{type: String}] vs {type: [String]} vs [String]

  webLinks: {
    github: {type: String},
    linkedin: {type: String},
    facebook: {type: String}
  },

  education: [{
    place: {type: String, required: true},
    majoringIn: {type: String, required: true},
    degree: {type: String},
    from: {type: Date, required: true},
    to: {type: Date},
    current: {type: Boolean, default: false}
  }],

  jobExp: [{
    company: {type: String, required: true},
    position: {type: String, required: true},
    desc: {type: String},
    from: {type: Date, required: true},
    to: {type: Date},
    current: {type: Boolean, default: false}
  }]
});

const colName = 'profiles';

const DBModelProfile = mongoose.model(colName, docSchema);

module.exports = DBModelProfile;