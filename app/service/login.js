const Service = require('egg').Service

class loginService extends Service {
    async loginVerify(params) {
        const { app } = this;
        try {
            let result = ''
            let token = ''
            if (params.judg == 1) {
                token = app.jwt.sign({ phone: params.phone },app.config.jwt.secret,{expiresIn: '1h'});
                result = await app.mysql.select('user',{where: {phone: params.phone, password: params.password} })
            }
            if (params.judg == 2) {
                token = app.jwt.sign({ email: params.email },app.config.jwt.secret,{expiresIn: '1h'});
                result = await app.mysql.select('user',{where: {email: params.email, password: params.password} })
            }
            if (result) {
                return { code: 200, result, token, message: '登录成功'}
            } else {
                return { code: 500, message: '请重新校验登录信息'}
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = loginService