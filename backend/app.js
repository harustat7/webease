// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/webease', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// const userSchema = new mongoose.Schema({
//     fullName: String,
//     email: { type: String, unique: true },
//     password: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/register', async (req, res) => {
//     const { fullName, email, password } = req.body;

//     if (!fullName || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: 'Email already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ fullName, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'Account created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.use(express.static(path.join(__dirname, '../frontend/public')));


// const domainSchema = new mongoose.Schema({
//     domain: {
//         type: String,
//         required: true,
//         unique: true, // Ensures the domain is unique
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now, // Automatically set the creation date
//     },
// });

// const Domain = mongoose.model('Domain', domainSchema);

// module.exports = Domain;

 // app.use(express.json()); 


// app.post('/launch', async (req, res) => {
//     const { domain } = req.body;

//     if (!domain) {
//         return res.status(400).json({ message: 'Domain name is required.' });
//     }

//     try {
//         const existingDomain = await Domain.findOne({ domain });
//         if (existingDomain) {
//             return res.status(409).json({ message: 'Domain name already exists.' });
//         }

//         const newDomain = new Domain({ domain });
//         await newDomain.save();

//         res.status(201).json({ message: 'Domain saved successfully.' });
//     } catch (error) {
//         console.error('Error saving domain:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });


// // app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// // });

// // for saving the save changes 
// const saveRoute = require('./route/save');

// app.use(express.json());
// app.use('/save', saveRoute);


// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
// // app.listen(3000, () => {
// //     console.log('Server running on http://localhost:3001');
// // });
// // Start your Express server
// // app.listen(3000, () => {
// //   console.log('Server running on port 3000');
// // });

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); 

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/webease', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use(express.static(path.join(__dirname, '../frontend/public')));

app.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/launch', async (req, res) => {
    const { domain } = req.body;

    if (!domain) {
        return res.status(400).json({ message: 'Domain name is required.' });
    }

    try {
        const existingDomain = await Domain.findOne({ domain });
        if (existingDomain) {
            return res.status(409).json({ message: 'Domain name already exists.' });
        }

        const newDomain = new Domain({ domain });
        await newDomain.save();

        res.status(201).json({ message: 'Domain saved successfully.' });
    } catch (error) {
        console.error('Error saving domain:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/save-template', (req, res) => {
    const { content, imageSources } = req.body;

    if (!content) {
        return res.status(400).json({ success: false, message: 'No content received.' });
    }

    const saveDir = path.join(__dirname, '../saved_templates');

    if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
    }

    const filePath = path.join(saveDir, 'index.html');

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error saving template:', err);
            return res.status(500).json({ success: false, message: 'Failed to save template.' });
        }

        console.log('Template saved successfully to', filePath);
        res.status(200).json({ success: true, message: 'Template saved successfully!' });
    });
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});