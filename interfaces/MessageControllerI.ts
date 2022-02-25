import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendsMessage(req: Request, res: Response): void;
    findAllSentMessage(req: Request, res: Response): void;
    findAllReceivedMessage(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
};