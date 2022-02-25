import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    userFollowsAnotherUser = async (uid: string, uid2: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: uid2});

    userUnfollowsAnotherUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: uid2})

    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate('userFollowed')
            .exec()

    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate('userFollowing')
            .exec()

    findAllFollow = async (): Promise<Follow[]> =>
        FollowModel.find()
            .populate('userFollowing', {username: 1})
            .populate('userFollowed', {username: 1})
            .exec()
}