import {Request, Response} from "express";
/**
 * @file Declares RESTful Web service API for follows resource
 */
export default interface FollowControllerI {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findAllFollowing(req: Request, res: Response): void;
    findAllFollowers(req: Request, res: Response): void;
}