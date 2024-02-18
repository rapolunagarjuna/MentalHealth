require('dotenv').config();
const mongoose = require('mongoose');
const userController = require('./controllers/UserController');
const journalController = require('./controllers/JournalController');
const moodController = require('./controllers/MoodController');

const express = require('express');
const app = express();
const port = 3000;
const mongoDB = 'mongodb+srv://nagarjuna:test1234@mentalhealth.vd8drp5.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());


mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("We're connected to the database!");
});

app.post('/users', userController.createUser);
app.post('/users/authenticate', userController.authenticateUser);

app.post('/journals', journalController.createJournalEntry);
app.get('/users/:userId/journals', journalController.getAllJournalEntriesForUser);
app.get('/journals/:entryId', journalController.getJournalEntryById);

router.post('/moods', moodController.logMood);
router.get('/users/:userId/moods', moodController.getMoodLogsByUser);


app.get('/', (req, res) => {

  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
