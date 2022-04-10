<template>
    <layout title="登录" description="儿童家具商城用户登录" keywords="儿童家具">
        <div id="login">
            <div class="box">
                <div class="title">登录</div>
                <div style="text-align: center; margin: 10px 0px; font-size: 14px;" class="change">
                    <span @click="judg = 1" :class="judg == 1 ? 'active' : ''">手机号登录</span>
                    <b style="margin: 0px 10px;">|</b>
                    <span @click="judg = 2" :class="judg == 2 ? 'active' : ''">邮箱登录</span>
                </div>
                <el-form v-show="judg == 1" :rules="rules" ref="phoneForm" :model="loginForm" label-width="60px" :hide-required-asterisk="true">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="loginForm.phone" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" size="small" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left: 80px;" type="primary" size="small" @click="onSubmit('phoneForm')">立即登录</el-button>
                    </el-form-item>
                    <el-form-item class="register">
                        <p style="margin-left: 56px;">还没账号？<a href="#">立即注册</a></p>
                    </el-form-item>
                </el-form>
                <el-form v-show="judg == 2" :rules="rules" ref="emailForm" :model="loginForm" label-width="60px" :hide-required-asterisk="true">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginForm.email" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" size="small" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left: 80px;" type="primary" size="small" @click="onSubmit('emailForm')">立即登录</el-button>
                    </el-form-item>
                    <el-form-item class="register">
                        <p style="margin-left: 56px;">还没账号？<a href="#">立即注册</a></p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </layout>
</template>

<script>
export default {
    data(){
        return{
            judg: 1,
            loginForm:{
                phone:'',
                email:'',
                password:''
            },
            rules: {
                phone:[{ required: true, message: '请输入手机号', trigger: 'blur' },],
                email:[{ required: true, message: '请输入邮箱', trigger: 'blur' },],
                password:[{ required: true, message: '请输入密码', trigger: 'blur' },],
            }
        }
    },
    watch:{
        judg:{
            handler(value){
                this.loginForm.phone = ''
                this.loginForm.email = ''
                this.loginForm.password = ''
            }
        }
    },
    methods:{
        onSubmit(value){
            this.$refs[value].validate((valid)=>{
                if (valid) {
                    this.$axios.post('/loginVerify',
                    {
                        judg: this.judg,
                        phone: this.loginForm.phone,
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                    },
                    ).then(res=>{
                        console.log(res);
                        if(res.data.code == 200){
                            this.$message({
                                message: res.data.message,
                                type: "success",
                            })
                            const userId = res.data.result[0].userId;
                            sessionStorage.setItem("token", res.data.token);
                            sessionStorage.setItem("userId", userId);
                            window.location.href = '/'
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })
                } else {
                    console.log('错误');
                    return false;
                }
            })
        }
    }
}
</script>


<style scoped>
    /deep/.el-form-item{
        margin-bottom: 14px;
    }
    /deep/.el-form-item__label{
        color: #000;
        font-size: 16px;
    }
    #login{
        position: relative;
        margin-bottom: -40px;
        height: 630px;
        background: url('../../asset/images/loginBanner.jpg') no-repeat center center;
        background-size: 100%;
    }
    .change span{
        cursor: pointer;
    }
    .active{
        color: rgb(66, 0, 238)
    }
    .title{
        width: 100%;
        margin: 0px auto;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 10px;
    }
    .box{
        position: absolute;
        top: 20%;
        left: 100px;
        box-sizing: border-box;
        padding: 20px;
        width: 400px;
        height: 300px;
        margin-left: 100px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 6px rgba(254, 203, 202,1);
    }
    .container {
        box-sizing: border-box;
        padding-top: 100px;
        width: 1224px;
        margin: 0 auto
    }
</style>