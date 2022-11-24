import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import './api/mock'
import { mapMutations } from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router:router,
  store:store,
  methods:{
    ...mapMutations('tab',['addMenu'])
  },
  render: h => h(App),
  created() {
    this.addMenu(router);
  }
}).$mount('#app')
