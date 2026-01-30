import express from 'express';
import User from '../models/auth.js';
import { protect } from '../middleware/authenticate.js';
import jwt from 'jsonwebtoken';

const router = express.Router();


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


const isAllowedEmailDomain = (email) => {
    const allowedDomains = ['gmail.com', 'yahoo.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return allowedDomains.includes(domain);
};

//password should be atleast 8 characters long and containing one uppercase letter
const isStrongPassword = (password) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: 'Please fill in all fields',
                fields: {
                    username: !username ? 'Username is required' : undefined,
                    email: !email ? 'Email is required' : undefined,
                    password: !password ? 'Password is required' : undefined
                }
            });
        }

        
        if (username.trim().length < 5) {
            return res.status(400).json({ 
                message: 'Username must be at least 3 characters long' 
            });
        }

        
        if (!isValidEmail(email)) {
            return res.status(400).json({ 
                message: 'Please enter a valid email address' 
            });
        }

        
        if (!isAllowedEmailDomain(email)) {
            return res.status(400).json({ 
                message: 'Email must be from gmail.com or yahoo.com' 
            });
        }

        
        if (!isStrongPassword(password)) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
            });
        }


        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ 
                message: 'A user with this email already exists' 
            });
        }

        
        const usernameExists = await User.findOne({ 
            username: { $regex: new RegExp(`^${username}$`, 'i') } 
        });
        if (usernameExists) {
            return res.status(400).json({ 
                message: 'This username is already taken' 
            });
        }

        
        const user = new User({
            username: username.trim(),
            email: email.toLowerCase(),
            password
        });

        await user.save();

        
        const token = generateToken(user._id);

    
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        });

    } catch (err) {
        console.error('Error registering user:', err);
        
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation error',
                details: Object.values(err.errors).map(e => e.message)
            });
        }

        return res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Please provide both email and password' 
            });
        }

        
        if (!isValidEmail(email)) {
            return res.status(400).json({ 
                message: 'Please enter a valid email address' 
            });
        }

        
        const user = await User.findOne({ email: email.toLowerCase() });

        
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        
        const token = generateToken(user._id);


        res.status(200).json({
            message: `Welcome back, ${user.username}!`,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
});


router.get('/me', protect, async (req, res) => {
    try {
        
        if (!req.user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }


        res.status(200).json({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            createdAt: req.user.createdAt
        });

    } catch (err) {
        console.error('Error fetching user profile:', err);
        return res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
});

export default router;