import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";

export default async (req, res) => {
    try {
        const user_email = req.user_email;

        // 유저 정보 가져오기
        const user = await getConnection()
            .createQueryBuilder(User, "user")
            .leftJoinAndSelect('user.userStatus', 'userStatus')
            .where("user.user_email = :user_email", { user_email })
            .select([
                'user.user_email',
                'user.user_id',
                'user.user_nickname',
                'user.user_profile',
                'user.user_gender'])
            .addSelect([
                'userStatus.user_status_level',
                'userStatus.user_status_point',
                'userStatus.user_status_suspension',
                'userStatus.user_status_withdrawal'])
            .getOne();

        if(user === undefined){
            throw '없는 유저 아이디';
        }else {
            res.json({
                status: 'success',
                data: {
                    userInfo: user
                }
            })
        }

    }catch (e) {
        console.log(e)
        res.json({
            status: 'error',
            data: e
        })
    }
}