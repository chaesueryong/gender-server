import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Board} from "../../db/entity/Board";
import {Array} from "../../util/Array";
import {Reply} from "../../db/entity/Reply";

export default async (req, res) => {
    try {
        const { reply_number, evaluateType } = req.body;
        const user = req.user_info;

        const reply = await getConnection()
            .createQueryBuilder(Reply, "reply")
            .where("reply.id = :reply_number", { reply_number })
            .getOne();

        switch (evaluateType) {
            case 'good':
                const updatedGoodList = Array.update(JSON.parse(reply.reply_good_list), user.id);

                await getConnection()
                    .createQueryBuilder()
                    .update(Reply)
                    .set({
                        reply_good_list: JSON.stringify(updatedGoodList)
                    })
                    .where("id = :reply_number", { reply_number })
                    .execute();
                break;
            case 'bad':
                const updatedBadList = Array.update(JSON.parse(reply.reply_bad_list), user.id);

                await getConnection()
                    .createQueryBuilder()
                    .update(Reply)
                    .set({
                        reply_bad_list: JSON.stringify(updatedBadList)
                    })
                    .where("id = :reply_number", { reply_number })
                    .execute();
                break;
            case 'report':
                const updatedReportList = Array.update(JSON.parse(reply.reply_report_list), user.id);

                await getConnection()
                    .createQueryBuilder()
                    .update(Board)
                    .set({
                        reply_report_list: JSON.stringify(updatedReportList),
                        reply_report_count: updatedReportList.length
                    })
                    .where("id = :reply_number", { reply_number })
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