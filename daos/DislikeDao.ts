/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike"

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} DislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all users who disliked one tuit from dislikes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses DislikeModel to retrieve all tuits disliked by one user from dislikes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts dislike instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid  Tuit's primary key
     * @returns Promise To be notified when user is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Removes dislike instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid  Tuit's primary key
     * @returns Promise To be notified when user is inserted into the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Find if a user dislikes a tuit
     * @param {string} uid User's primary key
     * @param {string} tid  Tuit's primary key
     * @returns Promise To be notified when the user dislikes the tuit
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Count how many dislikes a tuit has
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when count is retrieved from that database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}
