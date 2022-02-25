/**
 * @file Implements the data model to represent bookmark in the database
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef BookmarkSchema Data model to represent bookmark in the database
 * @property {ObjectId} tuit the tuit which is being bookmarked
 * @property {ObjectId} bookmarkedBy the user who is bookmarked a tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: "bookmarks"})

export default BookmarkSchema