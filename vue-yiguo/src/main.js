import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import request from './utils/request';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
