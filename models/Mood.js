const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, unique: false },
  mood: { type: Number, required: true, min: 1, max: 5 }
});

module.exports = mongoose.model('Mood', MoodSchema);
