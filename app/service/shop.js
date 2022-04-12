const Service = require('egg').Service

class shopService extends Service {
    // 添加购物车商品
    async addShopCart(params) {
        const { app } = this;
        try {
            // 查询该商品是否存在用户购物车
            const goodsItem = await app.mysql.select('shop', { where: { userId: params.userId, goodsId: params.goodsId } })
            if (goodsItem.length) {
                // 用户购物存在该商品则添加数量
                params.goodsNum += goodsItem[0].goodsNum
                const result = await this.app.mysql.update('shop', params, { where: { userId: params.userId, goodsId: params.goodsId } })
                if (result.affectedRows === 1) {
                    return { code: 200, message: '加入购物车成功' }
                }
            } else {
                // 用户购物车不存在该商品添加数据
                const result = await app.mysql.insert('shop', params)
                if (result.affectedRows === 1) {
                    return { code: 200, message: '加入购物车成功' }
                }
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
    // 获取用户购物车商品
    async getUserShop(params) {
        const { app } = this;
        try {
            let result = []
            const shopInfo = await app.mysql.select('shop', { where: { userId: params.userId } })
            for (const item of shopInfo) {
                const goodsNum = item.goodsNum
                const goodsItem = await app.mysql.select('goods', { where: { goodsId: item.goodsId } })
                result.push({
                    goodsNum,
                    ...goodsItem[0],
                })
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    // 修改购物车商品数量
    async changeShopNum(params) {
        const { app } = this;
        try {
            const result = await app.mysql.update('shop', params, { where: { goodsId: params.goodsId, userId: params.userId } });
            if (result.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
    // 删除购物车商品
    async deleteShop(params) {
        const { app } = this;
        try {
            const result = await app.mysql.delete('shop', { userId: params.userId, goodsId: params.goodsId })
            if (result.affectedRows === 1) {
                return { code: 200, message: '删除成功'}
            } else {
                return { code: 500, message: '删除失败'}
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = shopService