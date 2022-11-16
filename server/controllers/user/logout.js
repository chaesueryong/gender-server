import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";

export default async (req, res) => {
    try {
        const user_email = req.user_email;

        // 유저 정보 업데이트
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                user_refreshToken: '',
            })
            .where("user_email = :user_email", { user_email })
            .execute();

        res.clearCookie('refreshToken');

        res.json({
            status: 'success',
            data: {}
        })
    }catch (e) {
        res.json({
            status: 'error',
            data: e
        })
    }
}