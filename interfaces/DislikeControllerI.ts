import {Request, Response} from "express";
/**
 * @file Declares RESTful Web service API for likes resource
 */
export default interface DisikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
};