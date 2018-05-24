<template>
  <div>
    <theme-frame
      :event-bus="eventBus"
      :material-api="materialApi"
    />
  </div>
</template>

<script>

import Vue from 'vue'
import VDragged from 'v-dragged';

import ProductThemeComponents from 'cloubi2-default-product-theme-components-vue';

import ThemeTopbar from '../src/components/ThemeTopbar';
import ThemeFrame from '../src/components/ThemeFrame';
import ThemeMenu from '../src/components/ThemeMenu';

Vue.use(VDragged);
Vue.use(ProductThemeComponents);

export default {

  components: {
    'theme-topbar': ThemeTopbar,
    'theme-frame': ThemeFrame,
    'theme-menu': ThemeMenu
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  },

  data: function() {
    return {
      page: {
        id: '1',
        title: 'Foo'
      }
    };
  },

  mounted: function() {
    const self = this;
    this.materialApi.onPageChange((page) => {
      console.log('onPageChanged:');
      console.log(page);
      self.page = page;
    });
  }

}
</script>

<style>

</style>
