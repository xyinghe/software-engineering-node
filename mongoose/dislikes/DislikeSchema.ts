/**
 * @file Implements the data model to represent likes in the database
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @typedef DislikeSchema Data model to represent likes in the database
 * @property {ObjectId} tuit the tuit is liked by the user
 * @property {ObjectId} likeBy the user who liked the tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;