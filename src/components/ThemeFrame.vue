<template>
  <div>
    <div class="cb-frame">
      <theme-topbar 
        :event-bus="eventBus"
        :material-api="materialApi"
      />
      <theme-sidebar
        :event-bus="eventBus"
        :material-api="materialApi"
      />
      <content-positioner 
        sidebar-position="left"
        :event-bus="eventBus">
        <ruler 
          :event-bus="eventBus"/>
      </content-positioner>
    </div>
    <content-positioner
      sidebar-position="left"
      :event-bus="eventBus">
      <div class="cb-app container">
        <div class="cb-container" id="content-frame">
          <div id="content-mount"></div>
        </div>
      </div>
    </content-positioner>
  </div>
</template>

<script>

import ThemeSidebar from './ThemeSidebar';
import ThemeTopbar from './ThemeTopbar';

export default {

  components: {
    'theme-sidebar': ThemeSidebar,
    'theme-topbar': ThemeTopbar
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
  z-index: 100;
}

.cb-container {
  margin: 10px;
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
