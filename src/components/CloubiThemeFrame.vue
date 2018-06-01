<template>
  <div>
    <theme-background/>
    <div class="cb-frame">
      <theme-topbar 
        :event-bus="eventBus"
        :material-api="materialApi"
      />
      <theme-side-panel
        :event-bus="eventBus"
        :material-api="materialApi"
      />
      <cloubi-side-panel
        side-panel-id="right-side-panel"
        position="right"
        data-cy="side-panel-right"
        :full-height="true"
        :event-bus="eventBus">
        <cloubi-notes
          :material-api="materialApi" />
      </cloubi-side-panel>
      <theme-bottombar
        :event-bus="eventBus"
        :material-api="materialApi" />
      <cloubi-content-positioner 
        side-panel-id="nav"
        side-panel-position="left"
        :event-bus="eventBus">
        <cloubi-page-turners
          class="cb-floating-page-turners"
          :material-api="materialApi" />
        <cloubi-ruler 
          :event-bus="eventBus"/>
      </cloubi-content-positioner>
    </div>
    <cloubi-content-positioner
      side-panel-id="nav"
      side-panel-position="left"
      :event-bus="eventBus">
      <div class="cb-app container">
        <div class="cb-container" id="content-frame">
          <div id="content-mount"></div>
        </div>
      </div>
    </cloubi-content-positioner>
  </div>
</template>

<script>

import CloubiThemeSidePanel from './CloubiThemeSidePanel';
import CloubiThemeTopbar from './CloubiThemeTopbar';
import CloubiThemeBackground from './CloubiThemeBackground';
import CloubiThemeBottombar from './CloubiThemeBottombar';

export default {

  components: {
    'theme-side-panel': CloubiThemeSidePanel,
    'theme-topbar': CloubiThemeTopbar,
    'theme-background': CloubiThemeBackground,
    'theme-bottombar': CloubiThemeBottombar
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  }

}
</script>

<style lang="scss">

.cb-app {
  margin-top: 50px;
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

@media only screen and (max-width: 760px) {

  .cb-floating-page-turners {
    display: none !important;
  }

}
</style>
