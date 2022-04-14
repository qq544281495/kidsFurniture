<template>
  <layout title="确认订单" description="儿童家具商城确认订单" keywords="儿童家具">
      <div class="order container">
          <p class="order-title">确定订单</p>
          <div class="order-address">
            <div class="address-title">
                收货信息
            </div>
            <div class="address-info">
                <p>姓名：{{ addressInfo.userName }}</p>
                <p>手机号：{{ addressInfo.userPhone }}</p>
                <p>收货地址：{{ addressInfo.userAddress }}</p>
            </div>
          </div>
          <div class="add-address" style="margin-top: 10px;">
              <a style="font-size: 14px;" href="javascript:void(0);" @click="dialogAddress = true">选择收货地址</a>
          </div>
          <el-table
            ref="shopTable"
            :data="orderList"
            tooltip-effect="dark"
            style="width: 100%"
            height="380px">
            <el-table-column label="商品信息" width="400px">
                <template slot-scope="scope">
                    <div class="goods-item">
                        <img :src="scope.row.imageList" alt=""> 
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
          </el-table>
        <div class="shop-count">
            <div class="count-box">
                <span style="font-size: 16px;">总计：</span>
                <span style="font-size: 20px; font-weight: 600; color: #CB4042; margin-right: 20px;">{{orderPrice.toFixed(2)}}</span>
                <el-button type="danger" style="width: 140px; letter-spacing: 10px;" @click="buyGoods">下单</el-button>
            </div>
        </div>
      </div>
      <el-dialog
        title="查看用户收货地址"
        :visible.sync="dialogAddress"
        width="600px"
      >
        <div style="margin-top: -20px; margin-bottom: -20px;">
            <el-table :data="userAddress" style="width: 100%" @current-change="handleSelectChange">
                <el-table-column label="选择" width="55" align="center" fixed="left">
                    <template slot-scope="scope">
                        <el-radio v-model="addressInfo" :label="scope.row"><i /></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="收货人姓名"></el-table-column>
                <el-table-column prop="userPhone" label="收货人手机号"></el-table-column>
                <el-table-column prop="userAddress" min-width="160px" label="收货地址"></el-table-column>
            </el-table>
        </div>
      </el-dialog>
  </layout>
</template>

<script>
export default {
    data(){
        return{
            dialogAddress: false,
            userAddress: [],
            userId: '',
            shopGoods: '',
            goodsList: [],
            orderList: [],
            orderPrice: 0,
            addressInfo: ''
        }
    },
    methods:{
        handleSelectChange(value){
            console.log(value);
        },
        getUrlParams(){
            if(window.location.search){
                let url = decodeURIComponent(window.location.search).substr(1).split('&')
                this.goodsList = JSON.parse(url[0].split('=')[1])
            }
        },
        getGoodsInfo(){
            this.$axios.post('/getShopGoods',{goodsList: this.goodsList}).then(res=>{
                this.orderList = res.data
                for(const item of this.orderList){
                    const price = item.goodsNum * item.goodsPrice
                    this.orderPrice += price
                }
            })
        },
        getDefaultAddress(){
            this.$axios.post('/getDefaultAddress',{
                userId: this.userId,
                addressJudg: 1
            }).then(res=>{
                this.addressInfo = res.data[0]
            })
        },
        getUserAddress(){
            this.$axios.get('/getUserAddress',{
                params: { userId: this.userId}
            }).then(res=>{
                this.userAddress = res.data
                console.log(this.userAddress);
            })
        },
        buyGoods(){
            this.$axios.post('/buyGoods',{
                userId: this.userId,
                addressInfo: JSON.stringify(this.addressInfo),
                goodsInfo: JSON.stringify(this.orderList),
                orderPrice: this.orderPrice,
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success',
                    })
                    setTimeout(()=>{
                        window.location.href = '/userOrder'
                    },1000)
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error',
                    })
                }
            })
        }
    },
    mounted() {
        this.userId = sessionStorage.getItem('userId');
        this.getUrlParams()
        this.getGoodsInfo()
        this.getDefaultAddress()
        this.getUserAddress()
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 1200px;
        margin: 20px auto -20px;
    }
    .order{
        height: 600px;
        box-sizing: border-box;
        padding: 20px 20px 10px 20px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
        .order-title{
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 2px;
        }
        .order-address{
            margin-top: 20px;
            padding: 10px;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
            .address-title{
                font-size: 18px;
                margin-bottom: 10px;
            }
            .address-info{
                display: flex;
                box-sizing: border-box;
                padding: 0px 10px;
                width: 60%;
                justify-content: space-between;
                font-size: 14px;
            }
        }
        .add-address{
            a{
                color: rgb(96, 213, 137);
            }
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
        .shop-count{
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>