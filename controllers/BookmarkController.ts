import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/api/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get('/api/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersBookmarkedTuit);
            // app.get('/api/bookmarks', BookmarkController.bookmarkController.findAllBookmarks);
        }
        return BookmarkController.bookmarkController;
    }

    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark: Bookmark) => res.json(bookmark));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    findAllUsersBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersBookmarkedTuit(req.params.tid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    // findAllBookmarks = (req: Request, res: Response) =>
    //     BookmarkController.bookmarkDao.findAllBookmarks()
    //         .then((bookmarks: Bookmark[]) => res.json(bookmarks));
}