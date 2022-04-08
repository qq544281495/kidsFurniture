import Layout from 'component/layout/index';
import plugin from 'framework/plugin';
import Element from 'element-ui';

export default function(Vue) {
  Vue.use(plugin);
  Vue.component(Layout.name, Layout);
  Vue.use(Element);
}