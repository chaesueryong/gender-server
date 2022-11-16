import express from "express";
import userController from '../controllers/user';
import {CustomMiddleWare} from "../util/CustomMiddleWare";

const userRouter = express.Router();

userRouter.post('/join', userController.join);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);

userRouter.get('/', CustomMiddleWare.checkAccessToken, userController.userInfo);

export default userRouter;