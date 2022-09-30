import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Reply} from "../../db/entity/Reply";

export default async (req, res) => {
    try {
        const { reply_number, reply_content } = req.body;
        const user = req.user_info;
        
        // 내껀지 판별

        await getConnection()
            .createQueryBuilder()
            .update(Reply)
            .set({
                reply_content,
            })
            .where("id = :reply_number", { reply_number })
            .execute();

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