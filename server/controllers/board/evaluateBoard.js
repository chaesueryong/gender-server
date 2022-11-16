import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Board} from "../../db/entity/Board";
import {Array} from "../../util/Array";

export default async (req, res) => {
    try {
        const { board_number, evaluateType } = req.body;
        const user = req.user_info;

        const board = await getConnection()
            .createQueryBuilder(Board, "board")
            .where("board.id = :board_number", { board_number })
            .getOne();


        switch (evaluateType) {
            case 'good':
                const updatedGoodList = Array.update(JSON.parse(board.board_good_list), user.id);

                await getConnection()
                    .createQueryBuilder()
                    .update(Board)
                    .set({
                        board_good_list: JSON.stringify(updatedGoodList),
                        board_good_count: updatedGoodList.length,
                    })
                    .where("id = :board_number", { board_number })
                    .execute();
                break;
            case 'bad':
                const updatedBadList = Array.update(JSON.parse(board.board_bad_list), user.id);

                await getConnection()
                    .createQueryBuilder()
                    .update(Board)
                    .set({
                        board_bad_list: JSON.stringify(updatedBadList),
                        board_bad_count: updatedBadList.length,
                    })
                    .where("id = :board_number", { board_number })
                    .execute();
                break;
            case 'report':
                const updatedReportList = Array.update(JSON.parse(board.board_report_list), user.id);

                await getConnection()
                    .createQueryBuilder()
                    .update(Board)
                    .set({
                        board_report_list: JSON.stringify(updatedReportList),
                        board_report_count: updatedReportList.length
                    })
                    .where("id = :board_number", { board_number })
                    .execute();
                break;
            default:
                throw 'check type';
        }

        res.json({
            status: 'success',
            data: {}
        })
    }catch (e) {
        res.json({
            status: 'error',
            data: e.message
        })
    }
}