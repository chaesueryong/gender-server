import {Jwt} from "../../util/Jwt";

export default async (req, res) => {
    try {
        const { token } = req.body;

        const { user_email } = Jwt.verifyToken(token);

        res.json({
            status: 'success',
            data: {
                user_email
            }
        })
    }catch (e) {
        let data;

        switch (e.name){
            case "TokenExpiredError":
                data = '만료 되었습니다';
                break;
            default:
                data = '다시 진행주셔야 합니다';
                break;
        }

        res.json({
            status: 'error',
            data: data
        });
    }
}