<template>
  <div>
    <theme-background/>
    <div class="cb-frame">
      <theme-topbar 
        :event-bus="eventBus"
        :material-api="materialApi"
      />
      <theme-sidepanel
        :event-bus="eventBus"
        :material-api="materialApi"
      />
      <sidepanel
        sidepanel-id="right-sidepanel"
        position="right"
        :event-bus="eventBus" />
      <content-positioner 
        sidepanel-id="nav"
        sidepanel-position="left"
        :event-bus="eventBus">
        <page-turners
          :material-api="materialApi" />
        <ruler 
          :event-bus="eventBus"/>
      </content-positioner>
    </div>
    <content-positioner
      sidepanel-id="nav"
      sidepanel-position="left"
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

import ThemeSidepanel from './ThemeSidepanel';
import ThemeTopbar from './ThemeTopbar';
import ThemeBackground from './ThemeBackground';

export default {

  components: {
    'theme-sidepanel': ThemeSidepanel,
    'theme-topbar': ThemeTopbar,
    'theme-background': ThemeBackground
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  }

}
</script>

<style>

.cb-app {
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
