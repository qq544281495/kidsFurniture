<template>
  <layout title="商品详情" description="儿童家具商城商品详情页" keywords="儿童家具">
      <div class="detail container">
          <div class="detail-img">
              <img :src="goodsDetail.imageList" alt="">
          </div>
          <div class="detail-info">
              <p class="info-title">{{goodsDetail.goodsTitle}}</p>
              <p class="info-tag">{{goodsDetail.goodsTag}}</p>
              <p class="info-price">￥<span>{{goodsDetail.goodsPrice}}</span></p>
              <p class="item-title">材质：<span class="info-item">{{goodsDetail.goodsInfo.texture}}</span></p>
              <p class="item-title">颜色：<span class="info-item">{{goodsDetail.goodsInfo.color}}</span></p>
              <p class="item-title">规格：<span class="info-item">{{goodsDetail.goodsInfo.specification}}</span></p>
              <p class="info-num">
                  <span>数量：</span>
                  <el-input-number size="small" v-model="buyNum" :min="1" :max="99" label="购买数量"></el-input-number>
              </p>
              <p style="margin-bottom: 16px;">
                  <span :class="goodsDetail.goodsStatus == '热销' ? 'status-hot' : 'status-new'">{{goodsDetail.goodsStatus}}</span>
                  <span class="info-stock">销量：{{goodsDetail.goodsStock}}</span>
              </p>
              <div style="display: flex;">
                  <div style="font-size: 14px;">喜爱商品：</div>
                  <div @click="changeLike" style="font-size: 22px; font-weight: 700; cursor: pointer;" :class="like ? 'active-like' : ''" class="iconfont icon-aixin"></div>
              </div>
              <div style="margin-top: 20px;">
                   <el-button @click="addShopCart" type="warning" style="width: 200px;">加入购物车</el-button>
                   <el-button type="danger" style="width: 200px;" @click="buyGoods">立即购买</el-button>
              </div>
          </div>
      </div>
      <div class="related container">
          <ul>
              <li :class="navIndex == 1 ? 'nav-active' : ''" @click="navIndex = 1">商品概述</li>
              <li :class="navIndex == 2 ? 'nav-active' : ''" @click="navIndex = 2">相关商品</li>
              <li :class="navIndex == 3 ? 'nav-active' : ''" @click="navIndex = 3">商品评论</li>
          </ul>
          <div class="goods-related" v-show="navIndex == 1">
              <div class="info-item">
                  <p>
                      <span class="item-title">名称：</span>
                      <span class="item-text">{{goodsDetail.goodsTitle}}</span>
                  </p>
                  <p>
                      <span class="item-title">特点：</span>
                      <span class="item-text">{{goodsDetail.goodsTag}}</span>
                  </p>
                  <p>
                      <span class="item-title">状态：</span>
                      <span class="item-text">{{goodsDetail.goodsStatus}}</span>
                  </p>
              </div>
              <div class="info-item">
                  <p>
                      <span class="item-title">材质：</span>
                      <span class="item-text">{{goodsDetail.goodsInfo.texture}}</span>
                  </p>
                  <p>
                      <span class="item-title">规格：</span>
                      <span class="item-text">{{goodsDetail.goodsInfo.specification}}</span>
                  </p>
                  <p>
                      <span class="item-title">颜色：</span>
                      <span class="item-text">{{goodsDetail.goodsInfo.color}}</span>
                  </p>
              </div>
          </div>
          <div class="related-list" v-show="navIndex == 2">
              <div class="goods-box">
                    <div class="goods-item" v-for="(item,index) in relatedGoods" :key="index" @click="toDetails(item)">
                    <img :src="item.imageList" alt="">
                    <p class="goods-info">
                        <span>{{item.goodsTitle}}</span>
                        <span style="color: red;">￥ {{(item.goodsPrice).toFixed(2)}}</span>
                    </p>
                    <p class="goods-tag">
                        <span>{{item.goodsTag}}</span>
                        <span :class="item.goodsStatus == '热销' ? 'hot' : 'new'">{{item.goodsStatus}}</span>
                    </p>
                    </div>
                </div>
          </div>
          <div v-show="navIndex == 3">
              <el-empty v-show="evaluateList.length == 0" image="https://s2.loli.net/2022/04/10/Hacz3FjOAhLr8lD.png" description="暂无评论"></el-empty>
              <div v-for="item of evaluateList" :key="item.evaluateId" class="evaluate-item">
                  <div class="evaluate-title">
                      <span>用户ID：{{item.userId}}</span>
                      <span>评价时间：{{item.date}}</span>
                  </div>
                  <div class="evaluate-info">
                      {{item.evaluateInfo}}
                  </div>
              </div>
          </div>
      </div>
  </layout>
</template>

<script>
export default {
    data(){
        return{
            userId:'',
            loginJude: false,
            navIndex: 1,
            like: false,
            buyNum: 1,
            search: 0,
            goodsDetail: {
                goodsInfo: {}
            },
            relatedGoods: [],
            evaluateList: []
        }
    },
    methods: {
        buyGoods(){
            let goodsInfo = [{
                goodsId: this.search,
                goodsNum: this.buyNum
            }]
            goodsInfo = JSON.stringify(goodsInfo)
            window.location.href = `/order?goodsId=${goodsInfo}`
        },
        getGoodsDetails(){
            this.$axios.get('/goods/getGoodsDetails',{params: {goodsId:this.search}}).then(res=>{
                if(res.status == 200){
                    this.goodsDetail = res.data
                    const infoArray = this.goodsDetail.goodsInfo.split(',')
                    this.goodsDetail.goodsInfo = {
                        texture: infoArray[0],
                        color: infoArray[1],
                        specification: infoArray[2],
                    }
                    this.goodsDetail.goodsPrice = (this.goodsDetail.goodsPrice).toFixed(2)
                }
            })
        },
        getRelatedGoods(){
            this.$axios.get('/goods/getRelatedGoods',{params: {goodsId:this.search}}).then(res=>{
                if(res.status == 200){
                    this.relatedGoods = res.data
                }
            })
        },
        getUrlParams(){
            let url = decodeURIComponent(window.location.search).substr(1).split('&')
            let searchIndex = new Object();
            url.forEach(function(item){
                searchIndex[item.split('=')[0]] = item.split('=')[1]; 
            })
            this.search = searchIndex.goodsId
        },
        changeLike(){
            if(this.loginJude){
                if(this.like){
                    // 若该商品用户已收藏则取消收藏
                    this.like = false
                    this.$axios.post('/goods/deleteCollect',
                        {
                            userId: this.userId,
                            goodsId: this.goodsDetail.goodsId,
                            goodsLike: Number(this.like)
                        }
                    ).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            })
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })
                }else{
                    // 若该商品用户未收藏则加入收藏
                    this.like = true
                    this.$axios.post('/goods/addCollect',
                        {
                            userId: this.userId,
                            goodsId: this.goodsDetail.goodsId,
                            goodsLike: Number(this.like)
                        }
                    ).then(res=>{
                        console.log(res,'收藏');
                        if(res.data.code == 200){
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })
                }
            }else{
                this.$message({
                    message: '请登录后操作',
                    type: 'warning'
                })
                setTimeout(()=>{
                    window.location.href = '/login'
                },500)
            }
        },
        toDetails(value){
            const goodsId = value.goodsId
            window.location.href = `/details?goodsId=${goodsId}`
        },
        addShopCart(){
            if(this.loginJude){
                this.$axios.post('/addShopCart', {
                    userId: this.userId,
                    goodsId: this.goodsDetail.goodsId,
                    goodsNum: this.buyNum
                }).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        })
                    }
                })
            }else{
                this.$message({
                    message: '请登录后操作',
                    type: 'warning',
                })
                setTimeout(()=>{
                    window.location.href = '/login'
                },500)
            }
        },
        getCollectStatus(){
            this.$axios.post('/goods/getCollectStatus',
                {
                    userId: this.userId,
                    goodsId: this.search
                }
            ).then(res=>{
                this.like = res.data.collect
            })
        },
        getEvaluate(){
            this.$axios.get('/goods/getEvaluate',{
                params: {goodsId: this.search}
            }).then(res=>{
                this.evaluateList = res.data
                console.log(this.evaluateList);
            })
        }
    },
    mounted(){
        this.window = window;
        this.getUrlParams()
        this.getGoodsDetails()
        this.getRelatedGoods()
        if(sessionStorage.getItem('userId')){
            this.loginJude = true;
            this.userId = sessionStorage.getItem('userId')
        }
        this.getCollectStatus()
        this.getEvaluate()
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 1200px;
        margin: 20px auto;
    }
    .detail{
        display: flex;
        height: 665px;
        .detail-img{
            width: 50%;
            box-sizing: border-box;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
            padding: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .detail-info{
            width: 50%;
            box-sizing: border-box;
            padding: 20px 60px;
            .info-title{
                font-size: 20px;
                letter-spacing: 1px;
                margin-bottom: 20px;
            }
            .info-tag{
                font-size: 14px;
                color: rgba(128, 130, 133, 1);
                margin-bottom: 16px;
            }
            .info-price{
                font-size: 14px;
                margin-bottom: 16px;
                color: #CB4042;
                span{
                    margin-left: 2px;
                    font-size: 20px;
                }
            }
            .status-new{
                display: inline-block;
                border: 1px solid rgba(27,129,62,1);
                color: rgba(27,129,62,1);
                padding: 2px 10px;
            }
            .status-hot{
                display: inline-block;
                border: 1px solid rgba(208,16,76,1);
                color: rgba(208,16,76,1);
                padding: 2px 10px;
            }
            .info-stock{
                font-size: 14px;
                margin-left: 20px;
                color: rgba(203, 27, 69, 1);
            }
            .item-title{
                font-size: 14px;
                margin-bottom: 20px;
                .info-item{
                    font-size: 12px;
                    padding: 4px 10px;
                    border: 1px solid rgba(128, 130, 133, 1);
                    cursor: pointer;
                }
            }
            .info-num{
                margin-bottom: 16px;
                font-size: 14px;
            }
            .active-like{
                color: #CB4042;
            }
        }
    }
    .related{
        box-sizing: border-box;
        padding: 10px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
        ul{
            display: flex;
            font-size: 14px;
            li{
                padding: 10px 14px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                cursor: pointer;
            }
            .nav-active{
                color: #2075ff;
                border: 1px solid #2075ff;
            }
        }
        .goods-related{
            box-sizing: border-box;
            padding: 20px 10px 10px;
            .info-item{
                display: flex;
                height: 50px;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                p{
                    display: flex;
                    align-items: center;
                    flex: 1;
                    box-sizing: border-box;
                    padding-left: 20px;
                    .item-title{
                        font-size: 14px;
                        font-weight: 700;
                    }
                    .item-text{
                        font-size: 14px;
                        letter-spacing: 1px;
                    }
                }
            }
        }
        .evaluate-item{
            box-sizing: border-box;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
            padding: 10px;
            margin: 10px 0px;
            font-size: 14px;
            .evaluate-title{
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            .evaluate-info{
                width: 50%;
            }
        }
        .related-list{
            .goods-box{
                display: flex;
                flex-wrap: wrap;
                .goods-item{
                    cursor: pointer;
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
    }
</style>