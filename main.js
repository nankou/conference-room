import Vue from 'vue'
import App from './App'
// Vue.prototype.myReqeust = './util/api.js'; 


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
