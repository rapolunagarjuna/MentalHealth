const Mood = require('../models/Mood');
const User = require('../models/User'); // Assuming you have a User model

exports.logMood = (req, res) => {
  const { userId, date, mood } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });

      const newMoodLog = new Mood({ user: userId, date, mood });
      return newMoodLog.save();
    })
    .then(moodLog => res.status(201).json(moodLog))
    .catch(err => res.status(400).json({ error: err }));
};

exports.getMoodLogsByUser = (req, res) => {
  const { userId } = req.params;

  Mood.find({ user: userId })
    .then(moodLogs => res.status(200).json(moodLogs))
    .catch(err => res.status(400).json({ error: err }));
};
