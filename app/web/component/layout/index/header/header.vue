<template>
  <header>
    <div class="container header-box">
      <a href="#" class="header-title">Kids FURNITURE</a>
      <div class="header-content">
        <ul class="header-nav">
          <li @click="activeNav('/')" :class="active == '/' ? 'active' : ''">首页</li>
          <li @click="activeNav('/goods')" :class="active == '/goods' ? 'active' : ''">商品</li>
          <li @click="activeNav('/hot')" :class="active == '/hot' ? 'active' : ''">热销</li>
          <li @click="activeNav('/new')" :class="active == '/new' ? 'active' : ''">新品</li>
          <li v-show="!tokenJudg" @click="activeNav('/login')" :class="active == '/login' ? 'active' : ''">登录</li>
          <li v-show="!tokenJudg" @click="activeNav('/register')" :class="active == '/register' ? 'active' : ''">注册</li>
        </ul>
        <!-- <div class="header-search">
          <input type="text" v-model="searchInfo" />
          <span class="iconfont icon-sousuo"></span>  
        </div> -->
        <div class="header-user">
          <ul>
            <li>
              <p v-show="tokenJudg" style="font-size: 21px;" @click="activeNav('user')" :class="active == 'user' ? 'active' : ''" class="iconfont icon-yonghuming"></p>  
            </li>
            <li>
              <p v-show="tokenJudg" @click="activeNav('shop')" :class="active == 'shop' ? 'active' : ''" class="iconfont icon-gouwuche"></p>  
            </li>
            <li>
              <p v-show="tokenJudg" @click="activeNav('like')" :class="active == 'like' ? 'active' : ''" class="iconfont icon-shoucang"></p> 
            </li>
            <li>
              <a v-show="tokenJudg" @click="quitLogin()" style="font-size: 14px; line-height: 28px;" href="javascript:void(0);">退出登录</a>
            </li>
          </ul>
        </div> 
      </div>
    </div>
  </header>
</template>

<script>

export default {
  data(){
    return{
      active:'/',
      searchInfo:'',
      tokenJudg: false,
    }
  },
  methods: {
    activeNav(value){
      this.active = value
      this.window.location.href = value
    },
    quitLogin(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      window.location.href = '/'
    }
  },
  mounted(){
    this.tokenJudg = Boolean(sessionStorage.getItem('token'))
    this.window = window
    this.active = this.window.location.pathname
  }
}
</script>

<style lang="less" scoped>
  .container {
    width: 1200px;
    margin: 0px auto;
  }
  header{
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  }
  .active{
    color: #2075ff !important;
  }
  .header-box{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 90px;
    padding: 34px 0px 34px 80px;
    .header-title{
      position: relative;
      font-size: 18px;
      font-weight: 700;
      margin-left: 20px;
    }
    .header-title::before{
      content: "";
      position: absolute;
      top: -16px;
      left: -46px;
      width: 40px;
      height: 40px;
      background: url('../../../../asset/images/header-icon.png') no-repeat center center;
      background-size: 40px;
    }
    .header-content{
      display: flex;
      .header-nav{
        display: flex;
        font-size: 16px;
        line-height: 16px;
        li{
          margin-right: 20px;
          cursor: pointer;
          font-weight: 600;
        }
      }
      input{
        box-sizing: border-box;
        padding: 0px 30px 0px 10px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 16px;
        width: 200px;
        height: 28px;
        margin-top: -6px;
      }
      .header-search{
        position: relative;
        span{
          display: inline-block;
          position: absolute;
          right: 4px;
          top: -5px;
          cursor: pointer;
          line-height: 27px;
          text-align: center;
          width: 24px;
          height: 24px;
        }
      }
      .header-user{
        ul{
          display: flex;
          li{
            margin: -4px 10px 0px;
            p{
              font-size: 24px;
              font-weight: 700;
            }
            a:hover{
              color: #2075ff;
            }
          }
        }
      }
    }
  }
</style>