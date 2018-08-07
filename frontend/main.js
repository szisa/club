import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import store from './store';
import './theme/index.less';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = Util.ajaxUrl;
Vue.prototype.$axios = axios;

Vue.use(VueRouter);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data: {
    },
    beforeMount() {
    },
    methods: {
    },
    computed: {
    },
    mounted () {
        this.$store.dispatch('checklogin', (rsp, err) => { });
    }
});