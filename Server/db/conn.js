const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/LoginAuth')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// User schema
const userSchema = mongoose.Schema({
    googleId: String,
    name: String,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
