import Vue from 'vue';
import App from './app';
import router from './router';
import RaisedButton from './components/ui-kit/button';
import FileUploader from './components/ui-kit/file-uploader';
import Report from './components/report/report';
import Pie from './components/report/pie';
import Bars from './components/report/bars';

Vue.config.productionTip = false;

Vue.component('RaisedButton', RaisedButton);
Vue.component('FileUploader', FileUploader);
Vue.component('Report', Report);
Vue.component('Pie', Pie);
Vue.component('Bars', Bars);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
