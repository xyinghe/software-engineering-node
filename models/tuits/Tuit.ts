import User from "../users/User";
import Stats from "./Stats";
import mongoose from "mongoose";

export default interface Tuit {
    _id?: mongoose.Schema.Types.ObjectId,
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: string,
    youtube?: string,
    avatarLogo?: string,
    imageOverlay?: string,
    stats: Stats
};


