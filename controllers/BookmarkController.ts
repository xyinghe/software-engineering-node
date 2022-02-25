/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record user unbookmarks a tuit
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to retrive all the tuits bookmarked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrive all users bookmarked a tuit
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/api/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get('/api/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }

    /**
     * Inserts bookmark instance to record that a user bookmarks a tuit
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid representing the user is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response from client, including the
     * body formatted as JSON containing the new bookmarks that was inserted in
     * the database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark: Bookmark) => res.json(bookmark));

    /**
     * Removes bookmark instance from the records that a user unbookmarks a tuit
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid representing the user is unbookmarking the tuit
     * and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersBookmarkedTuit(req.params.tid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

}