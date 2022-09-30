import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import requestIp from 'request-ip';
require("dotenv").config()

import DbConnection from './db/DbConnection';
import {S3} from './util/S3';
import moment from "moment";
require('moment-timezone');
import Router from './routes/index';
import {CustomMiddleWare} from "./util/CustomMiddleWare";

export default class Server{
    static port = 8000;
    static server = express();
    static whitelist = ["http://localhost:8080", "https://gender.com"];

    static start() {
        (async () => {
            moment.tz.setDefault(process.env.TIME_ZONE);

            await DbConnection.main();
            await S3.main();
            await Server.main();
        })();
    };

    static main() {
        this.use();
        this.listen();
    }

    static use() {
        this.server.use(helmet());
        this.server.use(cors({
            origin: this.whitelist,
            credentials: true,
        }));
        this.server.use(cookieParser());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));

        morgan.token('date', (req, res, tz) => {
            return moment().tz(tz).format('YYYY-MM-DD HH:mm:ss');
        })
        morgan.format('myformat', `:date[${process.env.TIME_ZONE}] | :method | :url | :response-time ms`);

        this.server.use(morgan('myformat', {}));

        this.server.use(CustomMiddleWare.getClientIp);

        this.server.use('/', Router);
    }

    static listen() {
        this.server.listen(this.port, '0.0.0.0',() => {
            console.log(`connect server =>> ${ moment().format("YYYY-MM-DD HH:mm:ss") }`);
        });
    }
}