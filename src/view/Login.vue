<template>
    <el-form ref="form" label-width="70px" class="login-container" :model="form" :rules="rules" :inline="true">
        <h3 class="login-title">系统登陆</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="login-submit" @click="submit">登陆</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Cookie from 'js-cookie' // npm i js-cookie@3.0.1
import { getMenu } from '../api'
import { mapMutations } from "vuex";
export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ]
            }
        }
    },
    methods: {
        ...mapMutations('tab',['setMenu','addMenu']),
        //登陆时间
        submit() {
            // //后端返回token信息
            // const token = Mock.Random.guid();
            // //一般token存在cookie中
            // Cookie.set('token',token)

            //1.校验通过 form表单
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data:data }) => {
                        console.log(data);
                        if (data.code === 20000) {
                            const token = data.data.token;
                            Cookie.set('token', token); 


                            //获取菜单的数据存入store中
                            this.setMenu(data.data.menu) ;
                            this.addMenu(this.$router);
                            this.$router.push({ name: 'home' });
                        }else {
                            this.$message.error('出错了' + data.data.message)
                        }
                    })
                }
            })
            //跳转首页
        }
    }
}
</script>
<style lang="less" scoped>
.login-container {

    width: 350px;
    border: 1px solid, #eaeaea;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    box-sizing: border-box;

    .login-title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-input {
        width: 198px;
    }

    .login-submit {
        margin-left: 105px;
        margin-top: 10px;
    }

}
</style>