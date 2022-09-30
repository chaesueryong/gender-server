import express from "express";
import authController from "../controllers/auth";

const authRouter = express.Router();

authRouter.post('/generatetoken', authController.generateToken);
authRouter.post('/joinemail', authController.sendJoinEmail);
authRouter.post('/refreshtoken',  authController.checkReFreshToken)
authRouter.post('/verifytoken',  authController.verifyToken)

export default authRouter;