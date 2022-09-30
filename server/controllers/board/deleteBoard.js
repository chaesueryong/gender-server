import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Board} from "../../db/entity/Board";

export default async (req, res) => {
    try {
        const { board_number } = req.body;
        const user = req.user_info;
        // 내껀지 판별

        await getConnection()
            .createQueryBuilder()
            .update(Board)
            .set({
                board_status: false
            })
            .where("id = :board_number", { board_number })
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