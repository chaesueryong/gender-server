import {Jwt} from "./Jwt";
import requestIp from 'request-ip';
import {getConnection} from "typeorm";
import {User} from "../db/entity/User";

export class CustomMiddleWare {

    static async checkAccessToken(req, res, next){
        try {
            // 액세스 토큰 유무 검증
            if(req.headers.authorization){
                // 토큰 검증
                const accessToken = req.headers.authorization.split(' ')[1];
                const { user_email } = Jwt.verifyToken(accessToken);
                req.user_email = user_email;
                next();
            }else {
                throw 'no provide accessToken';
            }
        }catch (e){
            let error = {
                status: 'error'
            }

            switch (e.name){
                case 'TokenExpiredError':
                    error.data = 'expired accessToken';
                    break;
                case 'JsonWebTokenError':
                    error.data = 'jwt must be provided';
                    break;
                default:
                    error.data = 'token error';
                    break;
            }

            res.json(error);
        }
    }

    static async getClientIp(req, res, next){
        try {
            req.clientIp = requestIp.getClientIp(req);
            console.log(req.clientIp)
            next();
        }catch (e){
            let error = {
                status: 'error'
            }

            switch (e.name){
                default:
                    error.data = e;
                    break;
            }

            res.json(error);
        }
    }

    static async checkUserInfo(req, res, next){
        try {
            // 유저 정보 가져오기
            const user = await getConnection()
                .createQueryBuilder(User, "user")
                .where("user.user_email = :user_email", { user_email: req.user_email })
                .getOne();

            // 유저 정보 없는 경우
            if(user === undefined){
                throw 'user not found';
            }

            req.user_info = user;
            next();
        }catch (e){
            let error = {
                status: 'error'
            }

            switch (e.name){
                default:
                    error.data = e;
                    break;
            }

            res.json(error);
        }
    }
}