/* eslint-disable no-param-reassign */

import { CloubiTranslations } from 'cloubi2-default-product-theme-components-vue';

const install = Vue => {
  Vue.prototype.$translate = (key, params) =>
    // something logic ...
    CloubiTranslations.translate(key, params);
};

export default install;
