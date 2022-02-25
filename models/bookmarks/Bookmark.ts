/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarks the tuit
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
}