<template>
    <div class="tabs">
        <!-- 如何确定点了哪个页面？----》 判断当前路由名称是否与该标签名称一样   -->
        <el-tag v-for="(item, index) in menu " 
        @click="changeMenu(item)"
        @close="handleClose(item,index)"
        :key="item.path" 
        :effect="$route.name === item.name ? 'dark':'plain'" 
        :closable="item.name !== 'home' "
        size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

    export default {
        name:'CommonTag',
        computed:{
            ...mapState('tab',['menu'])
        },
        mounted(){
            // console.log(this.$route.name);
        },
        methods:{
            ...mapMutations('tab',['closeTag']),
            changeMenu(item){
                this.$router.push({name:item.name})
            },
            //点击tag删除的功能
            handleClose(item, index){
                this.closeTag(item);
                const length = this.menu.length ;
                //删除之后的跳转逻辑
                if(item.name !== this.$route.name) {
                    return 
                }
                //表示删除的是最后一项
                if (index === length) {
                    this.$router.push({
                        name:this.menu[index-1].name
                    })
                }else {
                    //如果删除中间位置
                        this.$router.push({
                            name:this.menu[index].name
                        })
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .tabs {
        padding: 20px;
        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>