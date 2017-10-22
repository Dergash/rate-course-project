import Vue from 'vue';
import App from './app';
import router from './router';
import RaisedButton from './components/ui-kit/button';
import FileUploader from './components/ui-kit/file-uploader';

Vue.config.productionTip = false;

Vue.component('RaisedButton', RaisedButton);
Vue.component('FileUploader', FileUploader);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
