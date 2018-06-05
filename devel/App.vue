<template>
  <div>
    <theme-frame
      :event-bus="eventBus"
      :material-api="materialApi"
      :user-api="userApi"
      :playlist-api="playlistApi"
    />
  </div>
</template>

<script>

import Vue from 'vue'
import VDragged from 'v-dragged';

import ProductThemeComponents from 'cloubi2-default-product-theme-components-vue';

import CloubiThemeFrame from '../src/components/CloubiThemeFrame';

Vue.use(VDragged);
Vue.use(ProductThemeComponents);

export default {

  components: {
    'theme-frame': CloubiThemeFrame,
  },

  props: {
    materialApi: { type: Object, required: true },
    userApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
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
