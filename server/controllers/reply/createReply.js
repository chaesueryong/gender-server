import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Reply} from "../../db/entity/Reply";
import {Board} from "../../db/entity/Board";
import {Array} from "../../util/Array";

export default async (req, res) => {
    try {
        const { board_number, reply_content, reply_depth, parent_reply_id, prev_reply_id } = req.body;
        const user = req.user_info;

        // 댓글 정보 저장
        const createdReply = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Reply)
            .values({
                reply_content,
                reply_depth,
                reply_good_list: '[]',
                reply_bad_list: '[]',
                reply_sub_list: '[]',
                reply_report_list: '[]',
                board: board_number,
                user: user.id
            })
            .execute();

        if(reply_depth > 0){
            const parentReply = await getConnection()
                .createQueryBuilder(Reply, "reply")
                .where("reply.id = :parent_reply_id", { parent_reply_id })
                .getOne();

            const updatedArray = Array.insert(JSON.parse(parentReply.reply_sub_list), prev_reply_id, createdReply.identifiers[0].id);

            await getConnection()
                .createQueryBuilder()
                .update(Reply)
                .set({
                    reply_sub_list: JSON.stringify(updatedArray),
                })
                .where("id = :parent_reply_id", { parent_reply_id })
                .execute();
        }


        res.json({
            status: 'success',
            data: {}
        })
    }catch (e) {
        console.log(e)
        res.json({
            status: 'error',
            data: e
        })
    }
}