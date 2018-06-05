<template>
  <div>
    <theme-background/>
    <div class="cb-frame">
      <theme-topbar 
        :event-bus="eventBus"
        :material-api="materialApi"
        :playlist-api="playlistApi"
      />
      <theme-side-panel
        :event-bus="eventBus"
        :material-api="materialApi"/>

      <theme-notes-panel
        :event-bus="eventBus"
        :material-api="materialApi" />

      <theme-bottombar
        :event-bus="eventBus"
        :material-api="materialApi" />
      <cloubi-content-positioner 
        side-panel-id="nav"
        side-panel-position="left"
        data-cy="cb-content-pos"
        :event-bus="eventBus">
        <cloubi-floatbar>
          <cloubi-ruler-button 
            mode="round"
            :event-bus="eventBus" />
          <cloubi-side-panel-switch 
            data-cy="side-panel-switch-right"
            side-panel-id="right-side-panel"
            icon="file-alt"
            mode="round"
            :event-bus="eventBus" />
        </cloubi-floatbar>
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
    <cloubi-add-to-playlist-dialog
      v-if="addToPlaylistDialog"      
      :playlist-api="playlistApi"
      :material-api="materialApi"
      @cancel="addToPlaylistDialog=false"
    />  
    <cloubi-my-playlists-dialog
      v-if="myPlaylistsDialog"
      :playlist-api="playlistApi"
      :material-api="materialApi"
      @cancel="myPlaylistsDialog=false"
    />
  </div>
</template>

<script>

import CloubiThemeSidePanel from './CloubiThemeSidePanel';
import CloubiThemeTopbar from './CloubiThemeTopbar';
import CloubiThemeBackground from './CloubiThemeBackground';
import CloubiThemeBottombar from './CloubiThemeBottombar';
import CloubiThemeNotesPanel from './CloubiThemeNotesPanel';

export default {

  components: {
    'theme-side-panel': CloubiThemeSidePanel,
    'theme-topbar': CloubiThemeTopbar,
    'theme-background': CloubiThemeBackground,
    'theme-bottombar': CloubiThemeBottombar,
    'theme-notes-panel': CloubiThemeNotesPanel
  },

  props: {
    materialApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }    
  },

  data() {
    return {
      addToPlaylistDialog: false,
      myPlaylistsDialog: false
    };
  },

  created() {
    const self = this;
    this.eventBus.$on('add-to-playlist', () => {
      console.log('add-to-playlist');
      self.eventBus.$emit('dropdown-close', {dropdownId: 'playlist'});
      self.addToPlaylistDialog = true;
    });
    this.eventBus.$on('show-my-playlists', () => {
      console.log('show-my-playlists');
      self.eventBus.$emit('dropdown-close', {dropdownId: 'playlist'});
      self.myPlaylistsDialog = true;
    });
  }

}
</script>

<style lang="scss">
@import '../_variables.scss';

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

.cb-notes {
  height: calc(100vh - #{$cloubi-navbar-height})
}

@media only screen and (max-width: 760px) {

  .cb-floating-page-turners {
    display: none !important;
  }

}
</style>
