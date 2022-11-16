import {Bcrypt} from "../../util/Bcrypt";
import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Jwt} from "../../util/Jwt";

export default async (req, res) => {
    try {
        // 아이디, 패스워드
        const { user_id, user_password } = req.body;

        // 유저 정보 가져오기
        const user = await getConnection()
            .createQueryBuilder(User, "user")
            .where("user.user_id = :user_id", { user_id })
            .getOne();

        // 유저 정보 없는 경우
        if(user === undefined){
            throw '아이디 또는 비밀번호 오류입니다';
        }else {
            // 유저 비밀번호 비교
            const match = await Bcrypt.comparePassword(user_password, user.user_password);

            // 비밀번호 일치
            if(match){
                // 엑세스 토큰 발행
                const accessToken = Jwt.generateToken({
                    user_email: user.user_email
                }, 'accessToken');

                // 리프레시 토큰 발행
                const refreshToken = Jwt.generateToken({}, 'refreshToken');

                // 쿠키 설정
                const cookieConfig = {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 30, // 30days
                    secure: process.env.NODE_ENV === 'production'
                    };

                // 쿠키에 리프레시 토큰 저장
                res.cookie('refreshToken', refreshToken, cookieConfig);

                // 리프레시 토큰 사용자 디비에 저장
                await getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        user_refreshToken: refreshToken
                    })
                    .where("user_id = :user_id", { user_id })
                    .execute();

                res.json({
                    status: 'success',
                    data: {
                        user_accessToken: accessToken
                    }
                })
            }else {
                throw '아이디 또는 비밀번호 오류입니다';
            }
        }
    }catch (e) {
        res.json({
            status: 'error',
            data: e
        })
    }
}