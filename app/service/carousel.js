const Service = require('egg').Service

class carouselService extends Service {
    async getCarousel() {
        const { app } = this;
        // 一定要抛出异常，避免数据库等错误出现
        try {
            const result = await app.mysql.select('carousel', { limit: 4, offset: 0 })
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = carouselService