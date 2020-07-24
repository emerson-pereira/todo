const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, 'secret', { expiresIn: '6h' });
};

module.exports = mongoose.model('User', UserSchema);
