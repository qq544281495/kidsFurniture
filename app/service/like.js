const { not } = require('ip');

const Service = require('egg').Service

class LikeCategoryService extends Service { 
    async getUserAllCollect(params) {
        const { app } = this;
        let result = []
        try {
            const allGoodsId = await app.mysql.select('collect', { where: { userId: params.userId,goodsLike: 1 } })
            for (const item of allGoodsId) {
                result.push(await app.mysql.get('goods',{goodsId: item.goodsId}))
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = LikeCategoryService