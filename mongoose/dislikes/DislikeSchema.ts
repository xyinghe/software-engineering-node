/**
 * @file Implements the data model to represent dislikes in the database
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @typedef DislikeSchema Data model to represent dislikes in the database
 * @property {ObjectId} tuit the tuit is disliked by the user
 * @property {ObjectId} dislikeBy the user who disliked the tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;