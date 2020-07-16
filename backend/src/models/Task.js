const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  name: String,
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
