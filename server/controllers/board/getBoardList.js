import {getConnection} from "typeorm";
import {Board} from "../../db/entity/Board";

export default async (req, res) => {
    try {
        const { page } = req.query;

        const lastBoard = await getConnection()
            .createQueryBuilder(Board, "board")
            .orderBy("board.id", "DESC")
            .limit(1)
            .getOne();

        // 총 페이지수
        const totalPage = Math.ceil(lastBoard.id / 25);
        // 렌더링 될 페이지
        let renderPage = Number(page);

        if(renderPage <= 0){
            renderPage = 1;
        }

        if(renderPage > totalPage) {
            renderPage = totalPage;
        }

        let startPage = null;
        let endPage = null;

        if (renderPage % 10 === 0) {
            startPage = renderPage - 10 + 1;
            endPage = renderPage > totalPage
                ? totalPage
                : renderPage;
        }else {
            startPage = renderPage - renderPage % 10 + 1;
            endPage = renderPage - renderPage % 10 + 10 > totalPage
                ? totalPage
                : renderPage - renderPage % 10 + 10;
        }

        const boardList = await getConnection()
            .createQueryBuilder(Board, "board")
            .leftJoinAndSelect('board.user', 'board_user')
            .orderBy("board.id", "DESC")
            .skip((renderPage - 1) * 25)
            .take(25)
            .select(['board', 'board_user.user_nickname'])
            .getMany();

        res.json({
            status: 'success',
            data: {
                boardList: boardList,
                renderPage: renderPage,
                startPage: startPage,
                endPage: endPage,
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