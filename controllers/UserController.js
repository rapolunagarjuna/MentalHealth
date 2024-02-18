// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Assuming you're hashing passwords

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });

      newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err }));
    }
  });
};

exports.authenticateUser = (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: "Authentication failed" });
        }
  
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Authentication failed" });
          }
          if (result) {
            return res.status(200).json({ 
              data: user,
              message: "Authentication successful" });
          }
          res.status(401).json({ message: "Authentication failed" });
        });
      })
      .catch(err => res.status(400).json({ error: err }));
};
  
