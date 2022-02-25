import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
import Follow from "../models/follows/Follow";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post('/api/users/:uid/follows/:uid2', FollowController.followController.userFollowsAnotherUser);
            app.delete('/api/users/:uid/unfollows/:uid2', FollowController.followController.userUnfollowsAnotherUser);
            app.get('/api/users/:uid/following', FollowController.followController.findAllFollowing);
            app.get('/api/users/:uid/follower', FollowController.followController.findAllFollowers);
            app.get('/api/follows', FollowController.followController.findAllFollow);
        }
        return FollowController.followController;
    }

    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid2)
            .then((follow: Follow) => res.json(follow));

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid2)
            .then(status => res.send(status));

    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then((followings: Follow[]) => res.json(followings))

    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then((followers: Follow[]) => res.json(followers));

    findAllFollow = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollow()
            .then((follows: Follow[]) => res.json(follows));
}