
import Follow from "../models/follows/Follow";
/**
 * @file Declares API for Follows related data access object methods
 */

export default interface FollowDaoI {
    userFollowsAnotherUser(uid: string, uid2: string): Promise<Follow>;
    userUnfollowsAnotherUser(uid: string, uid2: string): Promise<any>;
    findAllFollowing(uid: string): Promise<Follow[]>;
    findAllFollowers(uid: string): Promise<Follow[]>;
}