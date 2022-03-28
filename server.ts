/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express,{Request, Response} from 'express';
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthenticationController";
import DislikeController from "./controllers/DislikeController";
import mongoose from "mongoose";
// connect to the database
mongoose.connect(`mongodb+srv://xyinghe:node123@cluster0.vu2ks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
const session = require("express-session");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
const SECRET = 'keyboard cat'
let sess = {
    secret: SECRET,
    proxy: false,
    cookie: {
        secure: false,
        sameSite: "strict"
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    app.enable("trust proxy");
    sess.proxy = true
    sess.cookie.secure = true // serve secure cookies
    sess.cookie.sameSite = "none";
}

app.use(session(sess))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authenticationController = AuthenticationController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
// AuthenticationController(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */

const PORT = 4000;
app.listen(process.env.PORT || PORT);