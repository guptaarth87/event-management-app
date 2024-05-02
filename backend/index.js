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
  price:Number,
  mealType: String,
  photographyPlan: String

});

const User = mongoose.model('User', {
    name_:String,
    username: String,
    password: String,
  });

const Bookings = mongoose.model('Bookings', {
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  }
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
    const {name_, username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
      const newUser = new User({name_, username, password });
      await newUser.save();
      res.send('Signup successful');
    } catch (err) {
      res.status(500).send('Error signing up');
    }
  });
  
  app.post('/login', async (req, res) => {
    
    const { username, password } = req.body;
    
    try {
      const user = await User.find({ username });

      if (!user) {
        return res.status(200).send('Invalid credentials');
      }
      if(user.password != password) {
        return res.status(200).send(`Invalid password: ${user.password}`);
      }
      return res.status(200).send('Login successful');
    } catch (err) {
      res.status(500).send('Error logging in');
    }
  });

// Event routes

app.delete('/deleteevent/:id', async (req, res) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).send('Event not found');
    }
    res.send('Event deleted successfully');
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).send('Error deleting event');
  }
});


app.post('/events/add', async (req, res) => {
    const { name, slotsAvailable,price,mealType,photographyPlan  } = req.body;
    try {
      const newEvent = new Event({ name, slotsAvailable,price, mealType,photographyPlan});
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
    const { eventId, name, mobileNumber,price } = req.body;
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
    
    // Save booking details to the Bookings collection
    await Bookings.create({
      eventId: eventId,
      eventName: event.name, // Assuming event name is stored in the event object
      name: name,
      price:price,
      mobileNumber: mobileNumber,
    });
    
    res.send('Booking successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error booking event');
  }
});

app.get('/getallbookings',async (req, res)=>{
  try{
    const bookings = await Bookings.find();
    res.status(200).json(bookings);
  }catch (err) {
    console.error(err);
    res.status(500).send('Error fetching booking event');
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
