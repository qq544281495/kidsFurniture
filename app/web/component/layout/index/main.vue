<template>
   <div class='main'>
     <LayoutHeader></LayoutHeader>
     <LayoutContent>
       <div slot='content'><slot name='main'></slot></div>
     </LayoutContent>
     <LayoutFooter class="footer"></LayoutFooter>
   </div>
</template>

<script type='babel'>
  import  'asset/css/common.less'
  import 'asset/fonts/iconfont.css'
  import LayoutHeader from './header/header';
  import LayoutContent from './content/content';
  import LayoutFooter from './footer/footer';
  export default {
    components: {
      LayoutHeader,
      LayoutContent,
      LayoutFooter
    }
  };
</script>

<style lang="less" scoped>
  .main{
    min-width: 1200px;
  }
  .footer{
    margin-top: 40px;
  }
</style>