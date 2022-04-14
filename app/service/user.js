const Service = require('egg').Service

class UserService extends Service { 
    async getUserInfo(params) {
        const { app } = this;
        try {
            const result = await app.mysql.select('user', { where: { userId: params.userId } })
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async getUserAddress(params) {
        const { app } = this;
        try {
            const result = await app.mysql.select('address', { where: { userId: params.userId } })
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async editUserInfo(params) {
        const { app } = this;
        try {
            const result = await app.mysql.update('user', params, { where: { userId: params.userId } })
            if (result.affectedRows === 1) {
                return { code: 200, message: '编辑用户信息成功' }
            } else {
                return { code: 500, message: '编辑用户信息失败，请稍后重试'}
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async deleteAddress(params) {
        const { app } = this;
        try {
            const result = await app.mysql.delete('address', { userId: params.userId, addressId: params.addressId })
            if (result.affectedRows === 1) {
                return { code: 200, message: '删除收货地址成功' }
            } else {
                return { code: 500, message: '删除收货地址失败，请稍后重试'}
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async addAddress(params) {
        const { app } = this;
        try {
            const result = await app.mysql.insert('address', params)
            if (result.affectedRows === 1) {
                return { code: 200, message: '添加收货地址成功' }
            } else {
                return { code: 500, message: '添加收货地址失败，请稍后重试'}
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = UserService