import Vue from 'vue';
import Router from 'vue-router';
import Upload from '@/components/upload';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Upload Project',
      component: Upload,
    },
    {
      path: '/login',
      name: 'Login',
      component: null,
    },
  ],
});
