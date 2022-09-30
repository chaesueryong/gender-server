import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Board} from "../../db/entity/Board";
import {Reply} from "../../db/entity/Reply";

export default async (req, res) => {
    try {
        const { reply_number } = req.body;
        const user = req.user_info;

        // 내껀지 판별
        await getConnection()
            .createQueryBuilder()
            .update(Reply)
            .set({
                reply_status: false
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