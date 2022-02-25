import {Request, Response} from "express";

/**
 * @file Declares RESTful Web service API for bookmarks resource
 */
export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findAllUsersBookmarkedTuit(req: Request, res: Response):void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response):void;

}