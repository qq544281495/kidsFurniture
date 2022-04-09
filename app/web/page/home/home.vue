<template>
  <layout title="首页" description="Kids FURNITURE打造中国儿童家具" keywords="儿童家具">
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="600px" style="width: 100%">
      <el-carousel-item v-for="item in carouselList" :key="item.carouselId">
        <img :src="item.carouselUrl" alt="" style="width: 100%; height: 600px;">
      </el-carousel-item>
    </el-carousel>
    <!-- 商品设计介绍 -->
    <div class="design container">
      <div class="design-sex">
        <div @click="sexIndex = 1" :class="sexIndex == 1 ? 'sex-active' : ''" class="boy" style="border-right: 1px solid #69b379;">男孩</div>
        <div @click="sexIndex = 2" :class="sexIndex == 2 ? 'sex-active' : ''" class="girl" style="border-left: 1px solid #69b379;">女孩</div>
      </div>
      <div class="design-goods" v-show="sexIndex == 1">
        <div class="design-item">
          <div class="design-content-left">
            <div class="contetn">
              <p class="title">PRINCESS OF IRELAND</p>
              <p style="font-size: 16px; text-align: right; margin: 10px 0px;">——英伦学院</p>
              <p class="text">结合人性化的设计思想和崇尚自然的风格，强调简洁、明晰的线条，充分满足结构力学和人体工学要求。流行元素与英式的传统搭配，呈现出优雅学院气质。</p>
            </div>
          </div>
          <div class="design-img">
            <img src="../../asset/images/design-boy1.jpg" alt="">
          </div>
        </div>
        <div class="design-item">
          <div class="design-img">
            <img src="../../asset/images/design-boy2.jpg" alt="">
          </div>
          <div class="design-content-right">
            <div class="contetn">
              <p class="title">COOL SWEET HEART</p>
              <p style="font-size: 16px; text-align: right; margin: 10px 0px;">——酷潮甜心</p>
              <p style="text-align: center;">动感、有趣、活力的玩酷精神<br/>正是酷潮甜心系列带来的潮酷世界,<br/>就要不乏趣味的黑白!</p>
            </div>
          </div>
        </div>
        <div class="design-item">
          <div class="design-content-left">
            <div class="contetn">
              <p class="title" style="text-align: right; margin-right: 80px;">COOL BOY</p>
              <p style="font-size: 16px; text-align: right; margin: 10px 0px;">——酷酷少年</p>
              <p class="text">结合人性化的设计思想和崇尚自然的风格，强调简洁、明晰的线条，充分满足结构力学和人体工学要求，给孩子创造一个安全环保的居家成长环境，陪伴孩子健康成长。</p>
            </div>
          </div>
          <div class="design-img">
            <img src="../../asset/images/design-boy3.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="design-goods" v-show="sexIndex == 2">
        <div class="design-item">
          <div class="design-content-left">
            <div class="contetn">
              <p class="title">PRINCESS OF ELOWER LANGUAGE</p>
              <p style="font-size: 16px; text-align: right; margin: 10px 0px;">——花语公主</p>
              <p class="text" style="text-align: center;">优雅柔美的曲线勾勒出花瓣的模样,<br/>白配薰衣草紫色软包让整个空间都弥漫着话语的芬芳,<br/>每个女孩都是父母的公主,芬芳花香伴随每位公主甜蜜的成长。</p>
            </div>
          </div>
          <div class="design-img">
            <img src="../../asset/images/design-girl1.jpg" alt="">
          </div>
        </div>
        <div class="design-item">
          <div class="design-img">
            <img src="../../asset/images/design-girl2.jpg" alt="">
          </div>
          <div class="design-content-right">
            <div class="contetn">
              <p class="title">PRINCESS AURORA STYLE</p>
              <p style="font-size: 16px; text-align: right; margin: 10px 0px;">——爱洛公主风格</p>
              <p style="text-align: center;">爱洛公主从小在森林里长大。富有爱心的她喜欢与小动物作伴玩耍。你是否也像爱洛公主一样，充满爱心！</p>
            </div>
          </div>
        </div>
        <div class="design-item">
          <div class="design-content-left">
            <div class="contetn">
              <p class="title" style="text-align: right; margin-right: 80px;">BALLERINA</p>
              <p style="font-size: 16px; text-align: right; margin: 10px 0px;">——芭蕾女孩</p>
              <p class="text">芭蕾舞的绝妙就是用脚尖旋转人生，而不跌倒。<br/>飘动的领结丝带仿佛诉说着“ 你是我心里最重要的人 ”。</p>
            </div>
          </div>
          <div class="design-img">
            <img src="../../asset/images/design-girl3.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 首页商品类目展示 -->
    <div class="category category-right container">
      <div class="category-main">
        <img src="../../asset/images/kids1.jpg" alt="">
      </div>
      <div class="category-goods">
        <div v-for="(item,index) in childScot" :key="index" class="goods-item">
          <img :src="item.imageList" alt="">
        </div>
      </div>
    </div>
    <div class="category category-left container">
      <div class="category-goods">
        <div v-for="(item,index) in ChildDesk" :key="index" class="goods-item">
          <img :src="item.imageList" alt="">
        </div>
      </div>
      <div class="category-main">
        <img src="../../asset/images/kids2.jpg" style="box-shadow: 0px 0px 1px #000;" alt="">
      </div>
    </div>
    <div class="category category-right container">
      <div class="category-main">
        <img src="../../asset/images/kids3.jpg" alt="">
      </div>
      <div class="category-goods">
        <div v-for="(item,index) in ChildLamp" :key="index" class="goods-item">
          <img :src="item.imageList" alt="">
        </div>
      </div>
    </div>
    <div class="category category-left container">
      <div class="category-goods">
        <div v-for="(item,index) in ChildOrnament" :key="index" class="goods-item">
          <img :src="item.imageList" alt="">
        </div>
      </div>
      <div class="category-main">
        <img src="../../asset/images/kids4.jpg" style="box-shadow: 0px 0px 1px #000;" alt="">
      </div>
    </div>
  </layout>
</template>

<script type="babel">
  export default {
    data(){
      return{
        sexIndex: 1,
        carouselList: [], //轮播图
        childScot: [], //儿童床
        ChildDesk: [], //儿童书桌
        ChildLamp: [], //儿童灯具
        ChildOrnament: [],
        categoryList: ['childScot','ChildDesk','ChildLamp','ChildOrnament']
      }
    },
    methods: {
      // 获取轮播图
      getCarousel(){
        this.$axios.get('/home/getCarousel').then(res=>{
          if(res.status == 200){
            this.carouselList = res.data
          }
        })
      },
      // 获取首页商品分类展示
      getHomeCategory(){
        for(let index = 0; index < this.categoryList.length; index++){
          const categoryIndex = index + 1;
          const categoryName = this.categoryList[index]
          this.$axios.get('/home/getHomeCategory',{params:{category:categoryIndex}}).then(res=>{
            if(res.status == 200){
              this[categoryName] = res.data
            }
          })
        }
      }
    },
    created(){
      this.getCarousel()
      this.getHomeCategory()
    }
  }
</script>

<style lang="less" scoped>
  .container{
    width: 1200px;
    margin: 0px auto;
    padding-bottom: 20px;
  }
  .design{
    .design-sex{
      display: flex;
      margin: 40px auto 0px;
      width: 180px;
      height: 40px;
      .boy,.girl{
        cursor: pointer;
        box-sizing: border-box;
        flex: 1;
        height: 40px;
        text-align: center;
        line-height: 41px;
        font-size: 16px;
        color: #666;
      }
      .boy{
        border-radius: 4px 0px 0px 4px;
        border-top: 2px solid #69b379;
        border-bottom: 2px solid #69b379;
        border-left: 2px solid #69b379;
      }
      .girl{
        border-radius: 0px 4px 4px 0px;
        border-top: 2px solid #69b379;
        border-bottom: 2px solid #69b379;
        border-right: 2px solid #69b379;
      }
      .sex-active{
        background: #69b379;
        color: #fff;
      }
    }
    .design-goods{
      box-sizing: border-box;
      padding: 20px 0px;
      width: 100%;
      .design-item{
        display: flex;
        .design-img{
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .design-content-right{
          justify-content: center;
          margin-right: 100px;
        }
        .design-content-left{
          justify-content: right;
        }
        .design-content-right,.design-content-left{
          flex: 1;
          display: flex;
          align-items: center;
          color: #b8846d;
          .contetn{
            width: 300px;
            .title{
              font-size: 18px;
              font-weight: 600;
              font-family: Georgia;
              letter-spacing: 1px;
            }
            .text{
              margin-left: -30%;
              width: 140%;
              letter-spacing: 2px;
            }
          }
        }
      }
    }
  }
  .category-left{
    box-shadow: 0px 0px 2px rgb(79, 207, 199);
  }
  .category-right{
    box-shadow: 0px 0px 2px rgba(254, 140, 128, 1);
  }
  .category{
    display: flex;
    box-sizing: 20px;
    padding: 10px;
    height: 360px;
    margin-bottom: 20px;
    .category-main{
      flex: 1;
      border-radius: 8px 0px 0px 8px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
    .category-goods{
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .goods-item{
        box-sizing: border-box;
        width: 50%;
        height: 50%;
        padding: 4px;
        img{
          border-radius: 4px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>

