import Bookmark from "../models/bookmarks/Bookmark";
/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {

    userBookmarksTuit(uid: string, tid:string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid:string): Promise<any>;
    findAllTuitsBookmarkedByUser(tid: string): Promise<Bookmark[]>;
    findAllUsersBookmarkedTuit(uid: string):Promise<Bookmark[]>;
    // findAllBookmarks(): Promise<Bookmark[]>;
}