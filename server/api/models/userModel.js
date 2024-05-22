// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   register_date: {
//     type: Date,
//     default: Date.now
//   }
// }, { collection: 'user' });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  password: String,
  // You can add more fields here as neededd
});

module.exports = mongoose.model('User', UserSchema);
