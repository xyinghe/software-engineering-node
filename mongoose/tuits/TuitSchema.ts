/**
 * @file Implements the data model to represent tuits in the database
 */
import mongoose,{Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";
/**
 * @typedef TuitSchema Data model to represent tuits in the database
 * @property {string} tuit Content of the tuit
 * @property {Date} postedOn tuit posted time
 * @property {ObjectId} postedBy the user who posts the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: "tuits"});
export default TuitSchema;