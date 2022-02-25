/**
 * @file Implements the data model to represent tuits in the database
 */
import mongoose,{Schema} from "mongoose";

/**
 * @typedef TuitSchema Data model to represent tuits in the database
 * @property {string} tuit Content of the tuit
 * @property {Date} postedOn tuit posted time
 * @property {ObjectId} postedBy the user who posts the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'tuits'});
export default TuitSchema;