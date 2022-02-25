/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} BookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Inserts bookmark instance from a user into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Removes bookmark instance from a user into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});


    /**
     * Uses BookmarkModel to retrieve all tuits bookmarked by a user
     * from bookmarks collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate('bookmarkedTuit')
            .exec();

    /**
     * Uses BookmarkModel to retrieve all users who bookmarked one tuit
     * from bookmarks collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit: tid})
            .populate('bookmarkedBy')
            .exec();


}