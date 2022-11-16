import bcrypt from 'bcrypt';

export class Bcrypt {
    static saltRounds = 10;

    static async encryptedPassword(myPlaintextPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(this.saltRounds, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                    if(err){
                        reject(err);
                    }
                    resolve(hash);
                });
            });
        })
    }

    static async comparePassword(myPlaintextPassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
                if(err){
                    reject(err);
                }
                resolve(result);
            });
        })
    }
}