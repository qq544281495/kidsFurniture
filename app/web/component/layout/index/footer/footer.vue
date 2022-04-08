<template>
  <footer>
      <div class="footer-content">
        <div class="title"><span style="font-family: Georgia; margin-left: 100px;">Kids FURNITURE</span>打造中国儿童家具</div>
        <p class="right">愿理想翱翔</p>
        <p class="left">愿现实启航</p>
      </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    footer{
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding-top: 50px;
        width: 100%;
        height: 260px;
        background: url('../../../../asset/images/foot-banner.png') no-repeat center center;
        background-size: 100% 100%;
        color: #fff;
        .footer-content{
            width: 600px;
        }
        .title{
            font-size: 24px;
            letter-spacing: 3px;
        }
        .right,.left{
            font-size: 18px;
        }
        .right{
            display: flex;
            justify-content: right;
            margin-top: 40px;
            margin-bottom: 20px;
        }
        .left{
            margin-left: 40px;
        }
    }
</style>