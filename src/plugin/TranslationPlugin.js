import { CloubiTranslations } from 'cloubi2-default-product-theme-components-vue';

const install = function (Vue, options) {

  Vue.prototype.$translate = function (key) {
    // something logic ...
    return CloubiTranslations.translate(key);
  };

};

export default install;