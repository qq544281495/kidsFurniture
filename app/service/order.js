const { not } = require('ip');

const Service = require('egg').Service

class OrderCategoryService extends Service { 
    async getShopGoods(params) {
        const { app } = this;
        let result = []
        try {
            for (const item of params.goodsList) {
                const goodsInfo = await app.mysql.select('goods', { where: { goodsId: item.goodsId } })
                result.push({
                    goodsNum: item.goodsNum,
                    ...goodsInfo[0]
                })
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async getDefaultAddress(params) {
        const { app } = this;
        try {
            const result = await app.mysql.select('address', { where: { userId: params.userId, addressJudg: params.addressJudg } })
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async buyGoods(params) {
        const { app } = this;
        try {
            // console.log(params, 99999999999999);
            let goodsIdArr = JSON.parse(params.goodsInfo)
            console.log(goodsIdArr);
            const result = await app.mysql.insert('order', params)
            if (result.affectedRows === 1) {
                for (const item of goodsIdArr) {
                    await app.mysql.delete('shop', { userId: params.userId, goodsId: item.goodsId })
                }
                return { code: 200, message: '购买成功' }
            } else {
                return { code: 500, message: '购买失败请重新尝试' }
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async getUserOrder(params) {
        const { app } = this;
        try {
            const result = await app.mysql.select('order', { where: { userId: params.userId } })
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async setEvaluate(params) {
        const { app } = this;
        try {
            const judg = await app.mysql.select('evaluate', { where: { userId: params.userId, goodsId: params.goodsId } })
            if (judg.length) {
                return { code: 500, message: '该商品已评价'}
            } else {
                const result = await app.mysql.insert('evaluate', params)
                if (result.affectedRows === 1) { 
                    return { code: 200, message: '评价成功'}
                }
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = OrderCategoryService