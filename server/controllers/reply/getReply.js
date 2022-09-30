import {getConnection} from "typeorm";
import {Board} from "../../db/entity/Board";

export default async (req, res) => {
    try {
        const { board_number } = req.query;

        const board = await getConnection()
            .createQueryBuilder(Board, "board")
            .leftJoinAndSelect('board.replies', 'reply')
            .leftJoinAndSelect('reply.user', 'user_reply')
            .leftJoinAndSelect('user_reply.userStatus', 'userStatus')
            .where("board.id = :board_number", { board_number })
            .select([
                'board'
            ])
            .addSelect([
                'reply'
            ])
            .addSelect([
                'user_reply.user_email',
                'user_reply.user_id',
                'user_reply.user_nickname',
                'user_reply.user_profile',
                'user_reply.user_gender'
            ])
            .addSelect([
                'userStatus.user_status_level',
                'userStatus.user_status_point',
                'userStatus.user_status_suspension',
                'userStatus.user_status_withdrawal'
            ])
            .getOne();

        res.json({
            status: 'success',
            data: {
                replyList: board.replies.map(reply => {
                    return {
                        ...reply,
                        reply_good_list: JSON.parse(reply.reply_good_list),
                        reply_bad_list: JSON.parse(reply.reply_bad_list),
                        reply_report_list: JSON.parse(reply.reply_report_list === '' ? '[]' : reply.reply_report_list),
                        reply_sub_list: JSON.parse(reply.reply_sub_list)
                    }
                })
            }
        })
    }catch (e) {
        console.log(e)
        res.json({
            status: 'error',
            data: e
        })
    }
}