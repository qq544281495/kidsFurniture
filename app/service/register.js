const Service = require('egg').Service

class registerService extends Service {
    async addUserInfo(params) {
        const { app } = this;
        try {
            const verifyPhone = await app.mysql.get('user', { phone: params.phone })
            const verifyEmail = await app.mysql.get('user', { email: params.email })
            if (!verifyPhone && !verifyEmail) {
                const result = await app.mysql.insert('user', params)
                if (result.affectedRows === 1) {
                    return { code: 200, message: '注册成功' }
                }
            } else {
                return { code: 500, message: '该手机号或邮箱已注册' }
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = registerService