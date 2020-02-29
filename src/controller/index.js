const Base = require('./base.js');

const randomString = require('random-string');
const moment = require('moment');
const bent = require('bent');
const nodeRsa = require('node-rsa');
// const pay_gateway = 'http://napi.nicepay.vip';
const pay_gateway = 'http://gapi.goodpay.top';

const pub_key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgN4wkcw71HGNs8KiyIH2
zca3DUyz0XPBwYwWeAbn21b+WFRvBqrpwGIKOvrFINT379814L2aXdicANYFWJ9w
8zbtkVdP67zx/jPgZkxQPurOl+JV3AwwCToNdQGRjNxsK98O8umlDjJf7bUtggOD
65sOl79VVkxW2DsW5dlDJJjbDMhUShep1nVev2FE/nfcDKbDuXYHe6OENKpbvjA7
OoIONzjzPmnH/gMUPGORWD8d2StdbGdPC3o6zeD0v/E2mLVTnW71r/6Lq+KSxnAY
1v/AlY6Iji97PwD8kws5YnHSgXknMyUFBXHB3S9ixb5XT9tmvAvuV/oTpWCwnxXs
EQIDAQAB
-----END PUBLIC KEY-----`;

const pri_key = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAjeuMdSSb4etjOoh7tR+cwhEBl0Avajvkpmzvrq4yacQwsSJI
IRlecIMhqQMY28GVKntOdJTG2qMUfi0PYlSioOu8UsXkNhxt5iwkrT+4Bk6H+tj3
P8zPHoUk4dZcXP2i9s2NqOUQFgmGkE1aKtGfqmIYIUzJy/Ie1IK1cx8yBC0F3i6N
koWZTzcttqcfwz19aD77uWuJPIPLoWXyzb6N31kpNritBu146RhEOCpYBZ19pOrZ
mnTZkdW4rpQHyIVnEzTlxWVUfwQH2fBDM/nfOj0ShfQN7fu18sKg15LOZFrio+uA
5xWQsGtSyv3k+HVTvdOJTmi02+2MOarLrYqF7wIDAQABAoIBAHMUK4LZuqVJD99o
yJcoGR6sV5Pj8g68nj3tW7VTf4GQGsOnvsFIJvIpAuRfpIqdwG0AK7AQ6+ZiEr31
n+HmKzE9timQWesexma8KMlrP7etekoIIQVU+CYRZMTT43VsHfbu2w23IIIeG0Vr
08+gx02L2XE3KPL9U86SZrwA8be74PuqGIs8nbpd2tBA/EyObT/xA+TuQwluyfYK
PkcQpQpil4nlHk3OgZ9fP8LsQ3a2ZsaMGZtTCzu7dlDyxPplgjhYgap6SLEpFYtU
lm7m5Y6yror8NxZKdKbtRVxvvxo6/MrcySdstuPi3ONJEtdgnnj0y1h6opoI+EKJ
85SNjMECgYEA/HTcwh36KeL9hLCcGcnHkvVSCjzFH/KpQRZT8/2JhSvY3OCUIp4X
+3I5PNzLLkKpt5/myw73RNStPWZTU841MvqNopQ7TIjHeTuYVqjZNKP9KCpzVbAm
Igzxkn0tNQAAZtMxDL2sLc+zfwIpnP3rnUwQWkZtRO+5np+9pTzUuXECgYEAj+mA
j1a60Dni+2YK9n5xaGPifZfPIwF9QyMy9pula7D9AiNsWJqfGJnF5XYxuYOf+Xuc
9OQMX0hYZ1YyyAz0LkmQhlwHUl9Nc+Ze7fFkYDg8BGHKYCZ5ARlN2edpo2cFlDX1
8nXS811NxqHxvjiz5zT7Q9rfjLAw8xrf1alihV8CgYEAgn+SIdHHH+HTNMTqXDY+
sMuY9evF5ibUsO1uxj/311v8BOkeCer48KRxy/FCIg6Zlm7UqYB59x2M06FST47X
VxvHHRRMtto5aoSQ0bMEXD6svRd8eP3OKGnSceu885mlm4Ft6G0fVKr52RxwEFP9
eFj6Vv/yueDFbaabLJAOUjECgYA9bqf6iENm7879EipL3t36eekNQ+igQNp/9l6i
9v4+YmceqpBtolOX5Mydjz7aul1n2mS+BTti0TcrpZg33Y++0phnQpG9kAE4IHcV
i54VlOvJ0xTYxpOQ7IRXKHnnzuqKwh4jSjiquoGg8TCIyxvA7tTzulMDc5Lxs98p
Dg2IcQKBgQCg0G4t/CnRWO0SBkBq3cN3pBQZirassHMKImZ388Xpp1D9StrHhwfe
2dVMeQiuVpZ2hk6Bpe2H3gCngEkEKH3lS7m9JNrYR/DBdjIgfZZFoN3xe+V9jnOS
09cOya4h315Rbp4ezRHjFSCn3lYuJFNoHv2ePG7S1qzofBk/Xr3utg==
-----END RSA PRIVATE KEY-----`;

module.exports = class extends Base {
    indexAction() {
        const num = randomString({
            length: 4,
            numeric: true,
            letters: false,
            special: false
        });

        const order_no = 'D' + moment().format('YYYYMMDDHHmmss') + num;
        // this.asign({order_no: order_no, hi: 'hello'});
        this.assign('order_no', order_no);
        return this.display('index/index');
    }

    async sendOrderAction() {

        if (!this.isPost) {
            return this.json({code: -1, msg: '非法请求'});
        }

        let post_data = this.post();

        console.log(post_data)


        //订单数据
        let order_data = {
            'mid': 20006,
            'oid': post_data['order_no'],
            'applytime': moment().format('YYYY-MM-DD HH:mm:ss'),
            'paycode': post_data['paycode'],
            'cburl': 'http://' + this.ctx.hostname + '/i/c',
            'amount': parseFloat(post_data['amount']),
        }


        //rsa签名 已经是base64格式了
        let c_sign = getSign(order_data);


        order_data.sign = c_sign;
        order_data.pname = 'tkj-demo';
        order_data.nturl = 'http://' + this.ctx.hostname + '/i/r'

        // console.log(order_data);
        //发送订单:
        let post = bent(pay_gateway, 'POST', 'json', 200);
        let result = await post('/i/i', order_data)

        // console.log(result);

        if (result !== undefined && result['code'] === '00') {
           let url = result["pay_url"];

            if (url.length > 0) {
                this.redirect(url);
            } else {
                return this.json({code: 0, msg: '订单失败!' + result.msg})
            }

        } else {
            return this.json({code: 0, msg: '订单失败!' + result.msg})

        }
    }

    callBackAction() {
        let data = this.post();

        let sign_data = {
            'memberid': data.memberid,
            'orderid': data.orderid,
            'transaction_id': data.transaction_id,
            'amount': data.amount,
            'datetime': data.datetime,
            'returncode': data.returncode,

        }

        let sign_str = getSignStr(sign_data);
        let sign = data.sign;

        let key = new nodeRsa(pub_key);

        let vs = key.verify(sign_str, sign, 'utf8', 'base64')

        if (vs) {
            return this.body='ok';
        }

        return this.body='fail';
    }

    helloAction() {

        return this.body = 'hello';
    }

    testAction() {
        return this.body = 'test';
    }
};

function getSignStr(data) {
    let keylist = [];
    for (let k in data) {
        keylist.push(k);
    }

    console.log(keylist);
    keylist = keylist.sort();
    console.log(keylist);

    let str_data = '';
    for (let i = 0; i < keylist.length; i++) {

        if (i === keylist.length - 1) {
            str_data += keylist[i] + "=" + data[keylist[i]];
        } else {
            str_data += keylist[i] + "=" + data[keylist[i]] + '&';
        }

    }

    return str_data;
}

function getSign(data) {

    let str_data = getSignStr(data);

    let key = new nodeRsa(pri_key);
    let sign = key.sign(str_data, 'base64', 'utf8')

    console.log(sign);

    return sign;


}

