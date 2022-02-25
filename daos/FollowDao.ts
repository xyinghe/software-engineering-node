/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} FollowDao Private single instance of UserDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts follows instance of one user follows another user into the database
     * @param {string} uid User's primary key who is following another user
     * @param {string} uid2 User's primary key who is being followed
     * @returns Promise To be notified when user is inserted into the database
     */
    userFollowsAnotherUser = async (uid: string, uid2: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: uid2});

    /**
     * Remove follows instance of one user follows another user from the database
     * @param {string} uid User's primary key who is unfollowing another user
     * @param {string} uid2 User's primary key who is being unfollowed
     * @returns Promise To be notified when user is inserted into the database
     */
    userUnfollowsAnotherUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: uid2})

    /**
     * Uses FollowModel to retrieve all follow documents of one user is following
     * from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate('userFollowed')
            .exec()

    /**
     * Uses FollowModel to retrieve all follow documents of one user is being followed
     * from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate('userFollowing')
            .exec()

}