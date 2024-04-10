const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
// MongoDB connection
mongoose.connect('mongodb+srv://arth1234samepass:arth1234@cluster0.pdgx6ns.mongodb.net/EventManagement?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// MongoDB Schema
const Event = mongoose.model('Event', {
  name: String,
  slotsAvailable: Number,
});

const User = mongoose.model('User', {
    username: String,
    password: String,
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

// Authentication routes
app.get('/',async (req,res)=>{
    return res.status(200).send('app running fine');
})
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
      const newUser = new User({ username, password });
      await newUser.save();
      res.send('Signup successful');
    } catch (err) {
      res.status(500).send('Error signing up');
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).send('Invalid credentials');
      }
      res.send('Login successful');
    } catch (err) {
      res.status(500).send('Error logging in');
    }
  });

// Event routes
app.post('/events/add', async (req, res) => {
    const { name, slotsAvailable } = req.body;
    try {
      const newEvent = new Event({ name, slotsAvailable });
      await newEvent.save();
      res.send('Event added successfully');
    } catch (err) {
      res.status(500).send('Error adding event');
    }
  });
  
  // Get all Events route
  app.get('/events/all', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (err) {
      res.status(500).send('Error fetching events');
    }
  });

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

app.post('/events/book', async (req, res) => {
  try {
    const { eventId, name, mobileNumber } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    if (event.slotsAvailable <= 0) {
      return res.status(400).send('No slots available');
    }
    // Update slots and save booking details
    event.slotsAvailable -= 1;
    await event.save();
    res.send('Booking successful');
  } catch (err) {
    res.status(500).send('Error booking event');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
