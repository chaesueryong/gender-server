import express from "express";
import boardController from '../controllers/board';
import {CustomMiddleWare} from "../util/CustomMiddleWare";

const boardRouter = express.Router();

boardRouter.post('/',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    boardController.createBoard);

boardRouter.post('/evaluate',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    boardController.evaluateBoard);

boardRouter.delete('/',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    boardController.deleteBoard);

boardRouter.get('/', boardController.getBoard);
boardRouter.get('/list', boardController.getBoardList);

boardRouter.put('/',
    CustomMiddleWare.checkAccessToken,
    CustomMiddleWare.checkUserInfo,
    boardController.updateBoard);

export default boardRouter;