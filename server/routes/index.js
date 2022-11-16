import express from "express";
import userRouter from "./userRouter";
import boardRouter from "./boardRouter";
import replyRouter from "./replyRouter";
import authRouter from './authRouter';

const router = express.Router();

router.get('/', (req, res) => {
    res.json('hello');
});

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/reply', replyRouter);

export default router;