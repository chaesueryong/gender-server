import {Bcrypt} from "../../util/Bcrypt";
import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {UserStatus} from "../../db/entity/UserStatus";

export default async (req, res) => {
    try {
        const { user_email, user_id, user_password, user_repassword, user_nickname, user_gender } = req.body;

        ///// 비밀번호 확인 검증
        
        // 유저 정보 가져오기
        const user = await getConnection()
            .createQueryBuilder(User, "user")
            .where("user.user_email = :user_email", { user_email })
            .orWhere("user.user_id = :user_id", { user_id })
            .orWhere("user.user_nickname = :user_nickname", { user_nickname })
            .getOne();

        // 유저 없는 경우
        if(user === undefined){
            // 비밀번호 암호화
            const hash = await Bcrypt.encryptedPassword(user_password);

            // 유저 정보 저장
            const user = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                        user_email,
                        user_id,
                        user_password: hash,
                        user_nickname,
                        user_gender
                })
                .execute();

            // 유저 상태 저장
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(UserStatus)
                .values({
                    user: user.identifiers[0].id,
                })
                .execute();

            res.json({
                status: 'success',
                data: {}
            })
        }else {
            if(user.user_email === user_email){
                throw '입력하신 이메일 주소는 사용중입니다';
            }
            if(user.user_id === user_id){
                throw '입력하신 아이디는 사용중입니다';
            }
            if(user.user_nickname === user_nickname){
                throw '입력하신 닉네임는 사용중입니다';
            }
            
            throw '확인 바람';
        }
    }catch (e) {
        res.json({
            status: 'error',
            data: e
        })
    }
}