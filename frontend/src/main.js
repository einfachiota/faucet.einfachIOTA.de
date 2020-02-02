
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { i18n } from './plugins/i18n';

import IotaPayment from 'vue-iota-payment';

Vue.use(IotaPayment, { store, url: process.env.VUE_APP_URL, path: '/iotapay' });

Vue.config.productionTip = false;

Vue.use(ElementUI);


new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app');