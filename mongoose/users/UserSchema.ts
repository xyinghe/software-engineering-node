/**
 * @file Implements the data model to represent users in the database
 */
import mongoose from "mongoose";
/**
 * @typedef UserSchema Data model to represent users in the database
 * @property {string} username User's username
 * @property {string} password User's password
 * @property {string} firstName User's first name
 * @property {string} lastName User's last name
 * @property {string} email User's email
 * @property {string} profilePhoto User's profile photo
 * @property {string} headerImage Profile's headerImage
 * @property {string} accountType User's account type
 * @property {string} maritalStatus User's marital status
 * @property {string} biography User's biography
 * @property {Date} dateOfBirth User's date of birth
 * @property {Date} joined User's joined date
 * @property {LocationSchema} location User's location
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;