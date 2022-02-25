/**
 * @file Implements the data model to represent follows in the database
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef FollowSchema Data model to represent follows in the database. Say UserA follows UserB.
 * @property {ObjectId} userFollowed UserB. The user who is being followed.
 * @property {ObjectId} userFollowing UserA. The user who is following the other user.
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    userFollowing: {type: Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: "follows"})

export default FollowSchema