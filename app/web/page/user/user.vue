<template>
  <layout title="用户中心" description="儿童家具商城用户中心" keywords="儿童家具">
      <div class="user container">
          <div class="user-title">用户中心</div>
          <div class="user-info">
              <img :src="userInfo.userAvatar" alt="">
              <div class="show-info">
                  <p class="show-item">用户名：{{userInfo.username}}</p>
                  <p class="show-item">手机号：{{userInfo.phone}}</p>
                  <p class="show-item">邮箱：{{userInfo.email}}</p>
                  <p class="show-item">姓名：{{userInfo.name}}</p>
                  <p class="show-item">身份证：{{userInfo.identityNo}}</p>
                  <p class="show-item"></p>
                  <a class="show-item" href="JavaScript:void(0)" @click="setUserInfo">编辑用户信息</a>
                  <a class="show-item" href="JavaScript:void(0)" @click="dialogAddress = true">查看用户收货地址</a>
                  <a class="show-item" href="JavaScript:void(0)" @click="dialogAddInfo = true">添加修改收货地址</a>
              </div>
          </div>
      </div>
      <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogUser"
        width="400px"
      >
        <div style="margin-top: -20px; margin-bottom: -20px;">
            <el-form ref="form" :model="edit" label-width="60px">
                <el-form-item label="用户名">
                     <el-input v-model="edit.username" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                     <el-input v-model="edit.phone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                     <el-input v-model="edit.email" size="small"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                     <el-input v-model="edit.name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                     <el-input v-model="edit.identityNo" size="small"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="editUserInfo">确 定</el-button>
            <el-button size="mini" @click="dialogUser = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="查看用户收货地址"
        :visible.sync="dialogAddress"
        width="600px"
      >
        <div style="margin-top: -20px; margin-bottom: -20px;">
            <el-table :data="userAddress" style="width: 100%">
                <el-table-column prop="userName" label="收货人姓名"></el-table-column>
                <el-table-column prop="userPhone" label="收货人手机号"></el-table-column>
                <el-table-column prop="userAddress" min-width="160px" label="收货地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <a @click="deleteAddress(scope.row)" style="color: #CB4042;" href="JavaScript:void(0)">删除</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      </el-dialog>
      <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogAddInfo"
        width="400px"
      >
        <div style="margin-top: -20px; margin-bottom: -20px;">
            <el-form ref="form" :model="addInfo" label-width="100px">
                <el-form-item label="收货人姓名">
                     <el-input v-model="addInfo.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="收货人手机号">
                     <el-input v-model="addInfo.userPhone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                     <el-input v-model="addInfo.userAddress" size="small"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -10px; margin-bottom: -30px;" label="默认地址">
                     <el-switch v-model="addInfo.addressJudg"></el-switch>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="addAddress">确 定</el-button>
            <el-button size="mini" @click="dialogAddInfo = false">取 消</el-button>
        </span>
      </el-dialog>
  </layout>
</template>

<script>
export default {
    data(){
        return{
            dialogUser: false,
            dialogAddress: false,
            dialogAddInfo: false,
            userId: '',
            userInfo: {},
            edit: {},
            userAddress: [],
            addInfo: {
                userName: '',
                userPhone: '',
                userAddress: '',
                addressJudg: false
            },
        }
    },
    watch:{
        dialogAddInfo:{
            handler(value){
                if(!value){
                    this.$set(this.addInfo,'userName','')
                    this.$set(this.addInfo,'userPhone','')
                    this.$set(this.addInfo,'userAddress','')
                    this.$set(this.addInfo,'addressJudg',false)
                }
            }
        }
    },
    methods:{
        addAddress(){
            let info = this.addInfo
            info.addressJudg = info.addressJudg ? 1 : 0
            this.$axios.post('/addAddress',{
                userId: this.userId,
                ...info
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    this.getUserAddress()
                    this.dialogAddInfo = false
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
        },
        deleteAddress(value){
            this.$axios.post('/deleteAddress',{
                addressId: value.addressId,
                userId: value.userId
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    this.getUserAddress()
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
        },
        editUserInfo(){
            this.$axios.post('/editUserInfo',{
                ...this.edit
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    this.getUserInfo()
                    this.dialogUser = false
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
        },
        setUserInfo(){
            this.dialogUser = true;
        },
        getUserInfo(){
            this.$axios.get('/getUserInfo',{
                params: { userId: this.userId}
            }).then(res=>{
                this.userInfo = {
                    ...res.data[0]
                }
                this.edit = {
                    ...res.data[0]
                }
            })
        },
        getUserAddress(){
            this.$axios.get('/getUserAddress',{
                params: { userId: this.userId}
            }).then(res=>{
                this.userAddress = res.data
                console.log(this.userAddress);
            })
        }
    },
    mounted() {
        this.userId = sessionStorage.getItem('userId');
        this.getUserInfo()
        this.getUserAddress()
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 1200px;
        margin: 20px auto -20px;
    }
    .user{
        box-sizing: border-box;
        padding: 10px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
        height: 331px;
        .user-title{
            padding: 10px;
            font-size: 18px;
            font-weight: 600;
        }
        .user-info{
            display: flex;
            margin: 10px;
            img{
                width: 100px;
                height: 100px;
                border: 2px solid rgba(164, 89, 23,1);
                border-radius: 50%;
            }
            .show-info{
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                padding: 10px;
                flex: 1;
                margin: 0px 30px;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                .show-item{
                    width: 33%;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                a{
                    color: #CB4042;
                }
            }
        }
    }
</style>