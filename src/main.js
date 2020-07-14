import Vue from 'vue'
import './plugins/axios'
import App from './layouts/App.vue'
import router from './router'
import filter from './plugins/filter'
import {store} from './store'
import helper from './plugins/helper'
import mixins from './mixin'
import VeeValidate from 'vee-validate';
import lineClamp from 'vue-line-clamp'
import VueHead from 'vue-head'
if( ! document.body.dataset.hasOwnProperty('debug') || document.body.dataset.debug === 'false' ){
  console = console || {};
  console.log = function(){};
}
Vue.use(VueHead)
Vue.use(helper)
Vue.config.productionTip = false
Vue.mixin( mixins )
Vue.use(lineClamp, {
  importCss:true
})
Vue.use(VeeValidate,{
  locale : 'vi'
});


new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
