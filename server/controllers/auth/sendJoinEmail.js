import {Jwt} from "../../util/Jwt";
import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {EmailJS} from "../../util/EmailJS";

export default async (req, res) => {
    try {
        const { token } = req.body;

        const { user_email } = Jwt.verifyToken(token);

        const user = await getConnection()
            .createQueryBuilder(User, "user")
            .where("user.user_email = :user_email", { user_email })
            .getOne();

        if(user !== undefined) {
            throw '입력하신 이메일 주소는 이미 사용중입니다';
        }

        await EmailJS.sendCertificationEmail(user_email, token);

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