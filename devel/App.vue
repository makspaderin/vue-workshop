<template>
  <div>
    <theme-topbar
      :event-bus="eventBus"
      :material-api="materialApi"     
    />
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

Vue.use(VDragged);
Vue.use(ProductThemeComponents);

export default {

  components: {
    'theme-topbar': ThemeTopbar,
    'theme-frame': ThemeFrame
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  }

}
</script>

<style>

.cb-app {
  background:#ededf0;
  margin-top: 100px;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid;
  z-index: 100;
}

.cb-container {
  margin: 10px;
  border: solid;
}

.cb-frame {
  position:fixed;
  width:100%;
  height:0;
  top:0;
  left:0;
  z-index: 1;
}
</style>
