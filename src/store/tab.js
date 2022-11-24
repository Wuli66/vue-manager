import Cookie from "js-cookie";

export default {
    namespaced: true,
    state: {
        isCollapse: true,
        tabList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
        }],
        menu: []
    },
    mutations: {
        collaseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        selectMenu(state, value) {
            // state.label = value;
            //判断添加的数据是不是首页
            if (value.name != 'home') {
                const index = state.tabList.findIndex((item) => {
                   item.name === value.name
                    // console.log(item);

                })
                if (index == -1) {
                    state.tabList.push(value);
                    // console.log(state.tabList);
                }
            }

        },
        //删除指定的tag数据
        closeTag(state, value) {
            const index = state.tabList.findIndex((item) => {
                return value.name === item.name
            })
            state.tabList.splice(index, 1)
        },
        //设置Menu的数据
        setMenu(state, value) {
            state.menu = value;
            //Cookie的数据必须是字符串
            Cookie.set('menu', JSON.stringify(value))
        },
        //动态注册路由
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            //组装动态路由的数据 
            const menuArry = []
            menu.forEach(item => {
                if (item.children) {
                    item.children.map(item => {
                        item.component = () => import(`../view/${item.url}`)
                        return item
                    })
                    menuArry.push(...item.children)
                }else {
                     item.component = ()=> import(`../view/${item.url}`)
                     menuArry.push(item);
                }
            });
            //路由动态添加
            menuArry.forEach(item => {
                //addRoute去官查看用法 往主路由Main中添加其他路由
                router.addRoute('Main',item)
            })
        }
    }
}