import mongoose,{Schema} from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'tuits'});
export default TuitSchema;