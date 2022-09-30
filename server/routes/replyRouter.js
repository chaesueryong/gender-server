import express from "express";
import replyController from '../controllers/reply';
import {CustomMiddleWare} from "../util/CustomMiddleWare";
import boardController from "../controllers/board";

const replyRouter = express.Router();

replyRouter.post('/',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    replyController.createReply);

replyRouter.post('/evaluate',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    replyController.evaluateReply);

replyRouter.delete('/',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    replyController.deleteReply);

replyRouter.get('/', replyController.getReply);

replyRouter.put('/',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    replyController.updateReply);

export default replyRouter;