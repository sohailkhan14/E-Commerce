//const mongoose = require('mongoose');
//mongoose.connect = ('mongodb://127.0.0.1:27017/Dashboard');

const mongoose = require('mongoose');

const DB_URI  = 'mongodb://localhost:27017/Dashboard'; // Replace with your URI

mongoose.connect(DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
}).then( () => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error ('MongoDB connection error:', err.message);
});

//mongoose.set('bufferCommands', false); // optional: Disable buffering