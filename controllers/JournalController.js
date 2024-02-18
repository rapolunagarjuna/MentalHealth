const Journal = require('../models/Journal');
const User = require('../models/User');

exports.createJournalEntry = (req, res) => {
  const { userId, title, entry } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        const newJournalEntry = new Journal({
            user: userId,
            title: title,
            entry: entry
        });
    
        return newJournalEntry.save();
      }
    })
    .then(journal => res.status(201).json(journal))
    .catch(err => res.status(400).json({ error: err }));
};

exports.getAllJournalEntriesForUser = (req, res) => {
    const { userId } = req.params;
  
    Journal.find({ user: userId })
      .then(journals => res.status(200).json(journals))
      .catch(err => res.status(400).json({ error: err }));
  };
  
exports.getJournalEntryById = (req, res) => {
  const { entryId } = req.params;

  Journal.findById(entryId)
    .populate('user', 'name email')
    .then(journal => {
      if (!journal) {
        return res.status(404).json({ message: 'Journal entry not found' });
      }
      res.status(200).json(journal);
    })
    .catch(err => res.status(400).json({ error: err }));
};
  