import {createConnection, getConnection } from 'typeorm';
require('dotenv').config();

export default class DbConnection {
    static isDbConnect = false;

    static async main() {
        await DbConnection.connection();
        await DbConnection.setDefault();
    }

    static async setDefault() {

    }

    static async connection() {
        try {
            await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: process.env.DB_PS,
                database: "gender",
                timezone: process.env.TIME_ZONE,
                synchronize: true,
                entities: [__dirname + '/entity/*.js']
            });

            DbConnection.isDbConnect = true;

            console.log('connect database');
        }catch (e) {
            console.error(e);
        }
    }
}