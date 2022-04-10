<template>
    <layout title="注册" description="儿童家具商城用户注册" keywords="儿童家具">
        <div id="login">
            <div class="box">
                <div class="title" style="margin-bottom: 20px;">注册</div>
                <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px" :hide-required-asterisk="true">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="loginForm.phone" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginForm.email" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" size="small" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="affirmPassword">
                        <el-input v-model="loginForm.affirmPassword" size="small" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left: 80px;" type="primary" size="small" @click="onSubmit">立即注册</el-button>
                    </el-form-item>
                    <el-form-item class="register">
                        <p style="margin-left: 56px;">已有账号？<a href="#">立即登录</a></p>
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
                affirmPassword:[{ required: true, message: '请再次输入密码', trigger: 'blur' },],
            }
        }
    },
    methods:{
        onSubmit(){
             this.$refs['loginForm'].validate((valid)=>{
                 if (valid) {
                        this.$axios.post(
                            '/addUserInfo',
                            {
                                phone: this.loginForm.phone,
                                email: this.loginForm.email,
                                password: this.loginForm.password
                            }
                        ).then(res=>{
                            console.log(res);
                            if(res.data.code == 200){
                                this.$message({
                                    message: res.data.message,
                                    type: "success",
                                })
                                window.location.href = '/login'
                            }else{
                                this.$message({
                                    message: res.data.message,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
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
        background: url('../../asset/images/register-banner.jpg') no-repeat center center;
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
        box-sizing: border-box;
        top: 20%;
        right: 100px;
        padding: 20px;
        width: 400px;
        height: 370px;
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