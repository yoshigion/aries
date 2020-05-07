import Vue from 'vue'
import Buefy from 'buefy' // 追記
import App from './App.vue'
import router from './router'
import 'buefy/dist/buefy.css' // 追記

import Amplify, * as AmplifyModules from 'aws-amplify' // 追記
import { AmplifyPlugin } from 'aws-amplify-vue' // 追記
import aws_exports from './aws-exports' // 追記
Amplify.configure(aws_exports) // 追記

Vue.use(AmplifyPlugin, AmplifyModules) // 追記
Vue.use(Buefy) // 追記

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
