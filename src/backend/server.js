const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB connection (replace 'your-mongodb-uri' with your MongoDB connection string)
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

// Define your Mongoose schema and model for user data
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Add your login logic here, e.g., check the database for the user
  User.findOne({ email, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
