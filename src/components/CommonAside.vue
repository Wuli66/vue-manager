<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{isCollapse? "后台" : "通用后台系统管理" }}</h3>
           <!-- index必须有！ 想见element UI 官网 -->
        <el-menu-item v-for="item in noChildren" @click="clickMenu(item)"  :key="item.name" :index="item.name">
            <!-- 放入图标 -->
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item> 
        <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item :index="subItem.path" @click="clickMenu(subItem.path)">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100vh;
}

.el-menu {
    height: 100vh;

    h3 {
        margin: 0;
        padding: 0;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        line-height: 48px;
    }
}
</style>

<script>
import Cookie from 'js-cookie';
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'CommonAside',
    data() {
        return {
            // menuData: [  //icon属性是为了对应element UI的图标组件icon
            //     {
            //         path: '/',
            //         name: 'home',
            //         label: '首页',
            //         icon: 's-home',
            //         url: 'Home/Home'
            //     },
            //     {
            //         path: '/mall',
            //         name: 'mall',
            //         label: '商品管理',
            //         icon: 'video-play',
            //         url: 'MallManage/MallManage'
            //     },
            //     {
            //         path: '/user',
            //         name: 'user',
            //         label: '用户管理',
            //         icon: 'user',
            //         url: 'UserManage/UserManage'
            //     },
            //     {
            //         label: '其他',
            //         icon: 'location',
            //         children: [
            //             {
            //                 path: '/page1',
            //                 name: 'page1',
            //                 label: '页面1',
            //                 icon: 'setting',
            //                 url: 'Other/PageOne'
            //             },
            //             {
            //                 path: '/page2',
            //                 name: 'page2',
            //                 label: '页面2',
            //                 icon: 'setting',
            //                 url: 'Other/PageTwo'
            //             }
            //         ]
            //     }
            // ]
        };
    },
    computed: {
        ...mapState('tab',['menu']),
        menuData() {
            //判断当前数据是否存在，如果缓存中没有，从当前menu中获取，否则都是cookie中
            // console.log(JSON.parse(Cookie.get('menu')));
            return JSON.parse(Cookie.get('menu')) || this.menu;
        },
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => {
                return !item.children
            })
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => {
                return item.children
            })
        },
       
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        }

    },
    methods: {
        ...mapMutations('tab',['selectMenu']),
        clickMenu(item) {
            //当页面的路由与跳转的路由不一致时才允许跳转
            if (this.$route.path != item.path && !(this.$route.path === '/home' && item.path ==='/') ){
                this.$router.push(item.path)
            }

             this.selectMenu(item);
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    }

    
}
</script>
