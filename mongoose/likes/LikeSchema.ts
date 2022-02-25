/**
 * @file Implements the data model to represent likes in the database
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef LikeSchema Data model to represent likes in the database
 * @property {ObjectId} tuit the tuit is liked by the user
 * @property {ObjectId} likeBy the user who liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;