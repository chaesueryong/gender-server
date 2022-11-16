import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Jwt} from "../../util/Jwt";

export default async (req, res) => {
    try {
        // 리프레시 토큰 유무 검증
        if(req.cookies.refreshToken === undefined){
            throw '리프레시 토큰 없음'
        }

        // 리프레시 토큰
        const user_refreshToken = req.cookies.refreshToken;
        // 토큰 유효 검증
        Jwt.verifyToken(user_refreshToken);

        // 유저 데이터 검색
        const user = await getConnection()
            .createQueryBuilder(User, "user")
            .where("user.user_refreshToken = :user_refreshToken", { user_refreshToken })
            .getOne();

        // 유저 없음
        if(user === undefined){
            // 리프레시 쿠키 삭제
            res.clearCookie('refreshToken');

            throw '없는 유저입니다'
        }else {
            // 엑세스 토큰 발급
            const accessToken = Jwt.generateToken({
                user_email: user.user_email
            }, 'accessToken');

            // 유저 데이터 전송
            res.json({
                status: 'success',
                data: {
                    user_accessToken: accessToken
                }
            })
        }
    }catch (e) {
        let data;

        switch (e.name){
            case "TokenExpiredError":
                // 리프레시 쿠키 삭제
                res.clearCookie('refreshToken');
                data = '만료 되었습니다';
                break;
            default:
                data = '다시 진행주셔야 합니다';
                break;
        }

        res.json({
            status: 'error',
            data: data
        });
    }
}