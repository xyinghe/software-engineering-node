import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});


    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate('bookmarkedTuit')
            .exec();

    findAllUsersBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit: tid})
            .populate('bookmarkedBy')
            .exec();


    // findAllBookmarks = async (): Promise<Bookmark[]> =>
    //     BookmarkModel.find()
    //         .populate('bookmarkedBy', {username: 1})
    //         .populate('tuit')
    //         .exec();
}