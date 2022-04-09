<template>
  <layout title="商品" description="儿童家具商城商品列表" keywords="儿童家具">
    <div class="goods container">
      <div class="goods-category">
        <div class="category-title">品类<span>Category</span></div>
        <div class="category-content">
          <ul>
            <li :class="categoryIndex == 0 ? 'active' : ''" @click="categoryIndex = 0">所有</li>
            <li :class="categoryIndex == 1 ? 'active' : ''" @click="categoryIndex = 1">儿童床</li>
            <li :class="categoryIndex == 2 ? 'active' : ''" @click="categoryIndex = 2">儿童书桌</li>
            <li :class="categoryIndex == 3 ? 'active' : ''" @click="categoryIndex = 3">儿童灯具</li>
            <li :class="categoryIndex == 4 ? 'active' : ''" @click="categoryIndex = 4">儿童饰品</li>
            <li :class="categoryIndex == 5 ? 'active' : ''" @click="categoryIndex = 5">儿童椅</li>
            <li :class="categoryIndex == 6 ? 'active' : ''" @click="categoryIndex = 6">儿童沙发</li>
            <li :class="categoryIndex == 7 ? 'active' : ''" @click="categoryIndex = 7">儿童柜</li>
          </ul>
        </div>
      </div>
      <div class="goods-show">
        <div class="goods-box">
          <div class="goods-item" v-for="(item,index) in goodsList" :key="index" @click="toDetails(item)">
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
        <div style="text-align: center;">
          <el-pagination
            v-show="total != 0"
            layout="prev, pager, next"
            :total="total"
            :page-size="8"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  data(){
    return{
      total: 0,
      categoryIndex: 0,
      goodsList:[],
      page: 1,
    }
  },
  watch:{
    categoryIndex:{
      handler(){
        this.page = 1
        this.getGoodsList()
      }
    }
  },
  mounted() {
    this.window = window;
    this.getUrlParams()
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      this.$axios.get('/goods/getGoodsList',
      {
        params: {
          category: this.categoryIndex,
          page: this.page
        }
      })
      .then(res=>{
        if(res.status == 200){
          this.goodsList = []
          this.goodsList = res.data.list
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange(value){
      this.page = value
      this.getGoodsList()
    },
    toDetails(value){
      const goodsId = value.goodsId
      window.location.href = `/details?goodsId=${goodsId}`
    },
    getUrlParams(){
      if(window.location.search){
        let url = decodeURIComponent(window.location.search).substr(1).split('&')
        let kidsIndex = new Object();
        url.forEach(function(item){
            kidsIndex[item.split('=')[0]] = item.split('=')[1]; 
        })
        this.categoryIndex = kidsIndex.categoryIndex
      }
    },
  },
}
</script>

<style lang="less" scoped>
  .container{
    width: 1200px;
    margin: 0px auto;
  }
  .goods{
    display: flex;
    margin-top: 40px;
    .goods-category{
      box-sizing: border-box;
      width: 16%;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
      border-radius: 2px 0px 0px 2px;
      .category-title{
        box-sizing: border-box;
        padding: 10px;
        font-size: 18px;
        letter-spacing: 2px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        span{
          font-family: Georgia;
        }
      }
      .category-content{
        box-sizing: border-box;
        ul{
          padding-top: 10px;
          li{
            padding: 4px 20px;
            cursor: pointer;
            color: #808285;
            font-size: 14px;
            margin-bottom: 4px;
          }
          .active{
            color: #fff;
            background: #c2b59b;
          }
        }
      }
    }
    .goods-show{
      width: 84%;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
      border-radius: 0px 2px 2px 0px;
      padding: 10px 0px 10px 10px;
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