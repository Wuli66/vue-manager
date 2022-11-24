<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" @click="collaseMenu"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" style="color:#fff">
                <el-breadcrumb-item v-for="item in menu" :to="{ path: item.path}" :key="item.label" >
                    {{item.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img src="../assets/images/user.png" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>
<script>
import Cookie from 'js-cookie';
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'Header',
    data() {
        return {

        }
    },
    computed:{
        ...mapState('tab',['menu'])
    },
    methods: {
        ...mapMutations('tab', ['collaseMenu']),
       
        handleClick(command) {
            if(command === 'cancel') {
                Cookie.remove('token')
                Cookie.remove('menu')
                //跳转至登陆页面
                this.$router.push({name:'login'});
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px
    }
}
/deep/ .el-breadcrumb__item {
    .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
            color: #666
        }
        a {
            color: #666
        }
    }
    &:last-child {
        .el-breadcrumb__inner {
            color: #fff;
        }
    }
}

.text {
    color: #fff;
    padding-left: 20px;
    font-weight: 200;
}





.user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>