import {Jwt} from "../../util/Jwt";

export default async (req, res) => {
    try {
        const { obj, type } = req.body;

        const token = Jwt.generateToken(obj, type);

        res.json({
            status: 'success',
            data: {
                token
            }
        })
    }catch (e) {
        res.json({
            status: 'error',
            data: e
        })
    }
}