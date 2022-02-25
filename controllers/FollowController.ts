/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
import Follow from "../models/follows/Follow";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li> POST /api/users/:uid/follows/:uid2 to record user follows another user
 *     </li>
 *     <li> DELETE /api/users/:uid/follows/:uid2 to record user unfollows another user
 *     </li>
 *     <li> GET /api/users/:uid/following to retrieve a user's following list
 *     </li>
 *     <li> GET /api/users/:uid/follower to retrieve a user's follower list
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post('/api/users/:uid/follows/:uid2', FollowController.followController.userFollowsAnotherUser);
            app.delete('/api/users/:uid/follows/:uid2', FollowController.followController.userUnfollowsAnotherUser);
            app.get('/api/users/:uid/following', FollowController.followController.findAllFollowing);
            app.get('/api/users/:uid/follower', FollowController.followController.findAllFollowers);
        }
        return FollowController.followController;
    }

    /**
     * Inserts follow instance to record that a user follows another user
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid2 representing the user that is following
     * another user and the another user is being followed by the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid2)
            .then((follow: Follow) => res.json(follow));

    /**
     * Removes follow instance to record that a user unfollows another user
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid2 representing the user that is unfollowing
     * another user and the another user is being unfollowed by the user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves a user's following list fromm the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then((followings: Follow[]) => res.json(followings))

    /**
     * Retrieves a user's follower list fromm the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then((followers: Follow[]) => res.json(followers));


}