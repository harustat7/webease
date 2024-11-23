
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const connectDB = require('./config/db');
// const User = require("./models/User"); // Correct relative path



// const app = express();
// const PORT = 3000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('frontend')); // Serve static frontend files

// // Route for user registration
// app.post('/register', async (req, res) => {
//     const { fullName, email, password } = req.body;

//     // Validate input
//     if (!fullName || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         // Check if the email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already registered' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save user to the database
//         const newUser = new User({ fullName, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error registering user' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const path = require('path'); // Added for resolving file paths
// const connectDB = require('./config/db');
// const User = require("./models/User"); // Correct relative path

// const app = express();
// const PORT = 3000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static frontend files

// // Route to serve the main page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });

// // Route for user registration
// app.post('/register', async (req, res) => {
//     const { fullName, email, password } = req.body;

//     // Validate input
//     if (!fullName || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         // Check if the email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already registered' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save user to the database
//         const newUser = new User({ fullName, email, password: hashedPassword });
//         await newUser.save();

//         console.log(`New user registered: ${email}`);
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Error registering user' });
//     }
// });

// // Fallback route for undefined paths
// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const User = require("./models/User"); // Correct relative path

const app = express();
const PORT = 3000;
const SECRET_KEY = "your_secret_key"; // Use a secure secret key in production

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend')); // Serve static frontend files

// Middleware to verify user authentication
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token. Please log in again.' });
    }
}

// Route for user registration
app.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try{
    const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send the token as a response
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// Route to check if domain name is entered and user is authenticated
app.post('/check-launch', verifyToken, (req, res) => {
    const { domain } = req.body;

    if (!domain || domain.trim() === '') {
        return res.status(400).json({ error: 'Domain name is required.' });
    }

    res.status(200).json({ message: 'Domain and user authentication successful.' });
});

// Fallback route for undefined paths
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
