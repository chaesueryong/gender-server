require("dotenv").config()
import AWS from 'aws-sdk';

export class S3 {
    static s3 = new AWS.S3({
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
        region: "ap-northeast-2"
    });

    static BUCKET_NAME = 'bucket.k-gender.com';
    static defaultPath = process.env.NODE_ENV === 'production' ? 'production' : 'development';

    static main() {
        return new Promise((resolve, reject) => {
            this.s3.listBuckets((err, data) => {
                if(err){
                    reject(err);
                }else {
                    for(let i = 0; i < data.Buckets.length; i++){
                        if(data.Buckets[i].Name === this.BUCKET_NAME){
                            console.log("bucket name :", data.Buckets[i].Name);
                            resolve(data.Buckets);
                            return;
                        }
                    }
                    
                    reject('버킷 없음');
                }
            })
        })
    }

    static upload (filePath, content, type) {
        return new Promise((resolve, reject) => {
            this.s3.upload({
                Bucket: this.BUCKET_NAME,
                Key: `${this.defaultPath}/${filePath}`,
                Body: content,
                ContentType: type
            }, (err, data) => {
                if(err){
                    reject(err);
                }else {
                    resolve(data);
                }
            })
        })
    }

    static download (filePath) {
        return new Promise((resolve, reject) => {
            this.s3.getObject({
                Bucket: this.BUCKET_NAME,
                Key: `${this.defaultPath}/${filePath}`
            }, (err, data) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(data.Body.toString());
                }
            })
        })
    }

}