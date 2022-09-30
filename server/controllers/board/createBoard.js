import {getConnection} from "typeorm";
import {User} from "../../db/entity/User";
import {Board} from "../../db/entity/Board";
import {S3} from "../../util/S3";
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
    try {
        const { board_type, board_title, board_contents } = req.body;
        const user = req.user_info;

        //유저 정보 저장
        const createdResult = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Board)
            .values({
                board_type,
                board_title,
                board_contents_url: '',
                board_good_list: '[]',
                board_bad_list: '[]',
                board_report_list: '[]',
                user: user.id
            })
            .execute();

        const uuid = uuidv4();

        await S3.upload(
            `board/${createdResult.identifiers[0].id}/${uuid}.html`,
            board_contents,
            'html'
        );

        await getConnection()
            .createQueryBuilder()
            .update(Board)
            .set({
                board_contents_url: `https://bucket.k-gender.com/${'development'}/board/${createdResult.identifiers[0].id}/${uuid}.html`,
            })
            .where("id = :board_number", { board_number: createdResult.identifiers[0].id })
            .execute();

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