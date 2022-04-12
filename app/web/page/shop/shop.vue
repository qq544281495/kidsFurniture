<template>
  <layout title="购物车" description="儿童家具商城用户购物车" keywords="儿童家具">
      <div class="shop container">
          <div class="shop-box" v-show="shopList.length != 0">
            <el-table
                ref="shopTable"
                :data="shopList"
                tooltip-effect="dark"
                style="width: 100%"
                height="520px"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
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
                >
                    <template slot-scope="scope">
                         <el-input-number @change="changeGoodsNum(scope.row)" size="small" v-model="scope.row.goodsNum" :min="1" :max="99" label="商品数量"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                    label="金额（元）"
                >
                    <template slot-scope="scope">
                        <p>￥ {{(scope.row.goodsPrice * scope.row.goodsNum).toFixed(2)}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <a class="goods-delete" href="JavaScript:void(0)" @click="deleteShop(scope.row)">删除商品</a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="shop-count">
                <div class="count-box">
                    <span style="font-size: 16px;">总计：</span>
                    <span style="font-size: 20px; font-weight: 600; color: #CB4042; margin-right: 20px;">{{selectGoodsPrice.toFixed(2)}}</span>
                    <el-button :disabled="selectGoods.length == 0" type="danger" style="width: 140px; letter-spacing: 10px;" @click="verifyOrder">结算</el-button>
                </div>
            </div>
          </div>
          <el-empty style="height: calc(100vh - 130px)" v-show="shopList.length == 0" image="https://s2.loli.net/2022/04/10/Hacz3FjOAhLr8lD.png" description="购物车暂无商品">
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
            shopList: [],
            selectGoods: [],
            selectGoodsPrice: 0
        }
    },
    methods:{
        verifyOrder(){
            let goodsInfo = []
            for(const item of this.selectGoods){
                goodsInfo.push({
                    goodsId: item.goodsId,
                    goodsNum: item.goodsNum
                })
            }
            goodsInfo = JSON.stringify(goodsInfo)
            window.location.href = `/order?goodsId=${goodsInfo}`
        },
        getUserShop(){
            this.$axios.post('/getUserShop',{
                userId: this.userId
            }).then(res=>{
                this.shopList = res.data
            })
        },
        handleSelectionChange(value){
            this.selectGoods = value
            this.selectGoodsPrice = 0
            for(const item of this.selectGoods){
                this.selectGoodsPrice += (item.goodsPrice * item.goodsNum)
            }
        },
        changeGoodsNum(value){
            this.$axios.post('/changeShopNum',{
                userId: this.userId,
                goodsId: value.goodsId,
                goodsNum: value.goodsNum
            }).then(res=>{
                this.selectGoodsPrice = 0
                for(const item of this.selectGoods){
                    this.selectGoodsPrice += (item.goodsPrice * item.goodsNum)
                }
            })
        },
        deleteShop(value){
            this.$axios.post('/deleteShop',{
                userId: this.userId,
                goodsId: value.goodsId
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    this.getUserShop()
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
        }
    },
    mounted() {
        this.userId = sessionStorage.getItem('userId');
        this.getUserShop()
    }
}
</script>

<style lang="less" scoped>
    .container {
        width: 1200px;
        margin: 20px auto -20px;
    }
    .shop{
        .to-goods{
            font-size: 14px;
            letter-spacing: 1px;
            font-weight: 600;
            color: #CB4042;
        }
        .shop-box{
            box-sizing: border-box;
            padding: 20px 20px 10px 20px;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
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
        .goods-delete:hover{
            color: #CB4042;
        }
        .shop-count{
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>