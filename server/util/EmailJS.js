import axios from "axios";

export class EmailJS {
    static user_id = process.env.EMAIL_JS_USER_ID;
    static service_id = process.env.EMAIL_JS_SERVICE_ID;
    static accessToken = process.env.EMAIL_JS_ACCESS_TOKEN;

    static template_test_id = process.env.EMAIL_JS_TEMPLATE_TEST_ID;
    static template_certification_id = process.env.EMAIL_JS_TEMPLATE_CERTIFICATION_ID;

    static emailjs_url = 'https://api.emailjs.com/api/v1.0/email';

    static async sendEmailTest(){
        try {
            await axios({
                url: `${this.emailjs_url}/send`,
                method: 'post',
                data: JSON.stringify({
                    user_id: this.user_id,
                    service_id: this.service_id,
                    template_id: this.template_test_id,
                    accessToken: this.accessToken,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }catch (e){
            console.error(e);
            throw e;
        }
    }

    static async sendCertificationEmail(email, joinVerifyId){
        try {
            await axios({
                url: `${this.emailjs_url}/send`,
                method: 'post',
                data: JSON.stringify({
                    user_id: this.user_id,
                    service_id: this.service_id,
                    template_id: this.template_certification_id,
                    accessToken: this.accessToken,
                    template_params: {
                        email: email,
                        joinVerifyId: joinVerifyId
                    }
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }catch (e){
            console.error(e);
            throw e;
        }
    }
}