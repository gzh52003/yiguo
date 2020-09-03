import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import common from './common'

Vue.use(Vuex)

const store = new Vue.Store({
    //  store 模板化
    module: {
        cart,
        common,
    }
})

export default store