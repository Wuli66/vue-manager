<template>
    <div>
        <el-container>
            <el-aside width="auto" >
                <CommonAside></CommonAside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header> 
                <CommonTag></CommonTag>
                <el-main >
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import  Header  from '../components/Header.vue';
import CommonTag from '../components/CommonTag.vue';

export default {
    name:'Main',
    data(){
        return {

        }
    },
    components:{
        CommonAside, 
        Header,
        CommonTag
    }
}

</script>

<style scoped>
.el-header {
    padding: 0;
}
.el-menu {
    border-right:none
}
</style>