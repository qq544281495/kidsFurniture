<template>
   <layout title="用户订单" description="儿童家具商城确认订单" keywords="儿童家具">
      <div class="userOrder container">
         <div class="order-item" v-for="item of userOrderList" :key="item.orderId">
            <div class="order-title">
               <span class="order-number">订单编号：{{item.orderId}}</span>
               <span class="order-date">下单时间：{{item.date}}</span>
            </div>
            <div class="order-address">
               <p>收货信息</p>
               <p>姓名：{{item.addressInfo.userName}}</p>
               <p>手机号：{{item.addressInfo.userPhone}}</p>
               <p>收货地址：{{item.addressInfo.userAddress}}</p>
            </div>
            <div class="order-info">
               <el-table
                  ref="shopTable"
                  :data="item.goodsInfo"
                  tooltip-effect="dark"
                  style="width: 100%">
                  <el-table-column label="商品信息" width="400px">
                     <template slot-scope="scope">
                        <div class="goods-item">
                              <img style="cursor: pointer;" :src="scope.row.imageList" alt="" @click="toDetails(scope.row.goodsId)"> 
                              <div class="goods-info">
                                 <p style="color: #000;">{{scope.row.goodsTitle}}</p>
                                 <p style="font-size: 12px; color: #999;">{{scope.row.goodsTag}}</p>
                                 <el-tag size="mini" :type="scope.row.goodsStatus == '热销' ? 'danger' : 'success'">{{scope.row.goodsStatus}}</el-tag>
                              </div>
                        </div>
                     </template>
                  </el-table-column>
                  <el-table-column
                     label="商品单价（元）"
                  >
                     <template slot-scope="scope">
                        <p>￥ {{(scope.row.goodsPrice).toFixed(2)}}</p>
                     </template>
                  </el-table-column>
                  <el-table-column
                     label="数量"
                     prop="goodsNum"
                  >
                  </el-table-column>
                  <el-table-column
                     label="金额（元）"
                  >
                     <template slot-scope="scope">
                        <p>￥ {{(scope.row.goodsPrice * scope.row.goodsNum).toFixed(2)}}</p>
                     </template>
                  </el-table-column>
                  <el-table-column
                    label="评价"
                >
                    <template slot-scope="scope">
                        <a class="goods-delete" href="JavaScript:void(0)" @click="evaluateGoods(scope.row.goodsId)">评价商品</a>
                    </template>
                </el-table-column>
               </el-table>
               <div class="shop-count">
                  <div class="count-box">
                     <span style="font-size: 16px;">总计：</span>
                     <span style="font-size: 20px; font-weight: 600; color: #CB4042; margin-right: 20px;">{{(item.orderPrice).toFixed(2)}} 元</span>
                  </div>
               </div>
            </div>
         </div>
         <el-empty v-show="userOrderList.length == 0" image="https://s2.loli.net/2022/04/10/Hacz3FjOAhLr8lD.png" description="暂无订单">
            <a class="to-goods" href="/goods">快去挑选心仪商品吧~</a>
        </el-empty>
      </div>
      <el-dialog
         title="商品评价"
         :visible.sync="dialogEvaluate"
         width="400px">
         <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="evaluateInfo"
            style="margin-top: -20px; margin-bottom: -20px;"
            :autosize="{ minRows: 2, maxRows: 4}"
            >
         </el-input>
         <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="setEvaluate">确 定</el-button>
            <el-button size="mini" @click="dialogEvaluate = false">取 消</el-button>
         </span>
      </el-dialog>
   </layout>
</template>

<script>
export default {
   data(){
      return{
         userId: '',
         userOrderList: [],
         dialogEvaluate: false,
         evaluateInfo: '',
         evaluateId: ''
      }
   },
   watch:{
      dialogEvaluate:{
         handler(value){
            if(!value){
               this.evaluateId = ''
               this.evaluateInfo = ''
            }
         }
      }
   },
   methods:{
      toDetails(value){
        const goodsId = value
        window.location.href = `/details?goodsId=${goodsId}`
      },
      setEvaluate(){
         this.$axios.post('/setEvaluate',{
            userId: this.userId,
            goodsId: this.evaluateId,
            evaluateInfo: this.evaluateInfo,
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
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
            this.dialogEvaluate = false
         })
      },
      evaluateGoods(value){
         this.evaluateId = value
         this.dialogEvaluate = true;
      },
      getUserOrder(){
         this.$axios.post('/getUserOrder',{
            userId: this.userId
         }).then(res=>{
            for(const item of res.data){
               item.addressInfo = JSON.parse(item.addressInfo)
               item.goodsInfo = JSON.parse(item.goodsInfo)
            }
            this.userOrderList = res.data
            console.log(this.userOrderList);
         })
      }
   },
   mounted(){
      this.userId = sessionStorage.getItem('userId');
      this.getUserOrder()
   }
}
</script>

<style lang="less" scoped>
   /deep/.el-textarea__inner{
         resize: none;
   }
   .container{
      width: 1200px;
      margin: 20px auto -20px;
   }
   .userOrder{
      box-sizing: border-box;
      padding: 20px 20px 10px 20px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
      .to-goods{
         font-size: 14px;
         letter-spacing: 1px;
         font-weight: 600;
         color: #CB4042;
      }
      .order-item{
         margin: 0px auto 10px;
         box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
         .order-title{
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 10px;
            .order-number{
               font-size: 16px;
            }
            .order-date{
               font-size: 14px;
            }
         }
         .order-address{
            display: flex;
            box-sizing: border-box;
            padding: 0px 10px;
            p{
               margin: 10px 40px 10px 0px;
               font-size: 16px;
            }
         }
         .shop-count{
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
         }
         .goods-delete:hover{
            color: #CB4042;
        }
         .goods-item{
            display: flex;
            img{
                width: 160px;
                height: 80px;
            }
            .goods-info{
                box-sizing: border-box;
                padding: 10px;
            }
         }
      }
   }
</style>