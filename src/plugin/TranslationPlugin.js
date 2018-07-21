import { CloubiTranslations } from 'cloubi2-default-product-theme-components-vue';

const install = (Vue, options) => {
  Vue.prototype.$translate = (key, params) => {
    // something logic ...
    console.log(params);
    return CloubiTranslations.translate(key, params);
  };
};

export default install;
