/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follow relationship between two users,
 * as in a user follows another user
 * @property {User} userFollowed UserB if UserA follows UserB
 * @property {User} userFollowing UserA if UserA follows UserB
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
}