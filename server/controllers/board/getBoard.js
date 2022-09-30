import {getConnection} from "typeorm";
import {Board} from "../../db/entity/Board";

export default async (req, res) => {
    try {
        const { board_number } = req.query;

        await getConnection()
            .createQueryBuilder()
            .update(Board)
            .set({
                board_view_count: () => "board_view_count + 1"
            })
            .where("id = :board_number", { board_number })
            .execute();

        const board = await getConnection()
            .createQueryBuilder(Board, "board")
            .leftJoinAndSelect('board.user', 'board_user')
            .leftJoinAndSelect('board_user.userStatus', 'userStatus')
            .where("board.id = :board_number", { board_number })
            .select([
                'board'
            ])
            .addSelect([
                'board_user.user_email',
                'board_user.user_id',
                'board_user.user_nickname',
                'board_user.user_profile',
                'board_user.user_gender'
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
                board: {
                    ...board,
                    board_good_list: JSON.parse(board.board_good_list),
                    board_bad_list: JSON.parse(board.board_bad_list),
                    board_report_list: JSON.parse(board.board_report_list),
                }
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