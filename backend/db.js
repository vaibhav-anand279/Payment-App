import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_LINK=process.env.DB_LINK

// Remember to add your MongoDB connection string
mongoose.connect(DB_LINK)





const userSchema = new mongoose.Schema({
    username: { // Corrected from 'userename'
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    }
});

// --- Account Schema ---
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// --- Models ---
const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

// --- ESM Exports ---
// Replaces module.exports
export {
    User,
    Account
};