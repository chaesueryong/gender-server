require("dotenv").config()

import jwt from 'jsonwebtoken';

export class Jwt {
    // 회원가입 토큰 시간
    static joinExpireTime = '60m';
    // 액세스 토큰 시간
    static accessTokenExpireTime = '100s';
    // 리프래시 토큰 시간
    static refreshTokenExpireTime = '200s';

    static secretKey = process.env.JWT_SECRET_KEY;

    static generateToken (obj = {}, type){
        if(obj.constructor !== Object){
            throw '객체로 전달바람';
        }

        let time;
        switch (type){
            case 'join':
                time = this.joinExpireTime;
                break;
            case 'accessToken':
                time = this.accessTokenExpireTime;
                break;
            case 'refreshToken':
                time = this.refreshTokenExpireTime;
                break;
            default:
                throw '타입을 확인바람'
        }

        return jwt.sign(obj, this.secretKey, {
            expiresIn: time
        })
    }

    static verifyToken (token) {
        return jwt.verify(token, this.secretKey);
    }

    static decodeToken (token) {
        return jwt.decode(token, this.secretKey);
    }
}