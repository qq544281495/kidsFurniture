<template>
  <layout title="我的收藏" description="儿童家具商城用户收藏页" keywords="儿童家具">
      <div class="like container">
        <div class="goods-box" v-show="collectList.length != 0">
          <div class="goods-item" v-for="(item,index) in collectList" :key="index">
            <img :src="item.imageList" alt="" @click="toDetails(item)">
            <p class="goods-info">
              <span>{{item.goodsTitle}}</span>
            </p>
            <p class="goods-tag">
              <span>{{item.goodsTag}}</span>
            </p>
            <el-tooltip class="item" effect="dark" content="取消收藏" placement="top">
                <div @click="changeLike(item)" class="iconfont icon-aixin like-icon"></div>
            </el-tooltip>
          </div>
        </div>
        <el-empty v-show="collectList.length == 0" image="https://s2.loli.net/2022/04/10/Hacz3FjOAhLr8lD.png" description="暂无收藏商品">
            <a class="to-goods" href="/goods">快去挑选心仪商品吧~</a>
        </el-empty>
      </div>
  </layout>
</template>

<script>
export default {
    data(){
        return{
            userId: '',
            collectList: []
        }
    },
    methods:{
        changeLike(item){
            this.$axios.post('/goods/deleteCollect',
                {
                    userId: this.userId,
                    goodsId: item.goodsId,
                    goodsLike: 0
                }
            ).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    })
                    this.getUserAllCollect()
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
        },
        getUserAllCollect(){
            this.$axios.post('/getUserAllCollect',
                {
                    userId: this.userId
                }
            ).then(res=>{
                this.collectList = res.data
            })
        },
        toDetails(value){
            const goodsId = value.goodsId
            window.location.href = `/details?goodsId=${goodsId}`
        },
    },
    mounted() {
        this.userId = sessionStorage.getItem('userId');
        this.getUserAllCollect()
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 1200px;
        margin: 0px auto;
    }
    .like{
        box-sizing: border-box;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
        margin-top: 20px;
        margin-bottom: -20px;
        padding-top: 10px;
        padding-left: 30px;
        min-height: 332px;
        .to-goods{
            font-size: 14px;
            letter-spacing: 1px;
            font-weight: 600;
            color: #CB4042;
        }
        .goods-box{
            display: flex;
            flex-wrap: wrap;
            .like-icon{
                position: absolute;
                bottom: 24px;
                right: 20px;
                font-size: 28px;
                font-weight: 700;
                color: #CB4042;
                cursor: pointer;
            }
            .goods-item{
                position: relative;
                box-sizing: border-box;
                width: 23%;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                margin: 10px 8px;
                padding: 10px;
                height: 300px;
            img{
                width: 100%;
                height: 220px;
                cursor: pointer;
            }
            .goods-info{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                margin-top: 10px;
            }
            .goods-tag{
                display: flex;
                justify-content: space-between;
                color: #808285;
                margin-top: 8px;
                .hot{
                color: rgba(208,16,76,1)
                }
                .new{
                color: rgba(27,129,62,1)
                }
            }
            }
      }
    }
</style>