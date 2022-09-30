import express from 'express';
import glob from 'glob';
import morgan from 'morgan';

import DbConnection from './db/DbConnection';

export default class Server{
    static port = 8000;
    static server = express();
    static app = {};

    static start() {
        (async () => {
            await DbConnection.main();
            await Server.main();
        })();
    };

    static async main() {
        try {
            this.use();
            await this.route();
            this.listen();
        }catch (e){
            console.error(e);
        }
    }

    static use() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(morgan('common', {}));
    }

    static async route() {
        this.app.list = await this.filePathList();

        this.server.get('/*', async (req, res) => {
            await this.router(req, res, 'get');
        });

        this.server.post('/*', async (req, res) => {
            await this.router(req, res, 'post');
        });
    }

    static filePathList () {
        return new Promise((resolve, reject) => {
            glob("server/controllers/**/*.js", (error, files) => {
                if(error){
                    reject(error);
                    return;
                }

                resolve(files);
            });
        });
    }

    static async router(req, res, type) {
        this.app.router = req.params['0'];

        if (this.app.router === 'api') {
            this.app.router = 'main';
        }

        this.app.result = {};

        if (this.app.list.includes('server/controllers/' + this.app.router + '.js')) {
            this.app.api = require('./controllers/' + this.app.router);
            this.app.result.status = 'success';
        } else {
            this.app.api = require ('./controllers/404');
            this.app.result.status = 'error';
        }

        switch (type) {
            case 'get':
                this.app.result.data = await this.app.api.get(req);
                break;
            case 'post':
                this.app.result.data = await this.app.api.post(req);
                break;
            default:
                break;
        }

        await res.json(this.app.result);
    }

    static listen() {
        this.server.listen(this.port, () => {
            console.log('connect server');
        });
    }
}