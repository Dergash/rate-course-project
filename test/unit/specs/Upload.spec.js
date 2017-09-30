import Vue from 'vue';
import Upload from '@/components/Upload';

describe('Upload.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Upload);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.upload h1').textContent)
      .to.equal('Upload your project');
  });
});
