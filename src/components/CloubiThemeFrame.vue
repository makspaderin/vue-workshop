<template>
  <div>
    <theme-background
      :material-api="materialApi"
    />
    <div class="cb-frame">
      <theme-topbar
        :event-bus="eventBus"
        :material-api="materialApi"
        :user-api="userApi"
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
        :event-bus="eventBus"
        side-panel-id="main"
        side-panel-position="left"
        data-cy="cb-content-pos">
        <cloubi-floatbar>
          <cloubi-ruler-button
            :event-bus="eventBus"
            mode="round" />
          <cloubi-side-panel-switch
            :event-bus="eventBus"
            data-cy="side-panel-switch-notes"
            side-panel-id="notes"
            label="Open/close notes panel"
            icon="file-alt"
            mode="round" />
        </cloubi-floatbar>
        <cloubi-turners-page
          :material-api="materialApi"
          class="cb-floating-page-turners" />
        <cloubi-ruler
          :event-bus="eventBus"/>
      </cloubi-content-positioner>
    </div>
    <cloubi-content-positioner
      :event-bus="eventBus"
      side-panel-id="main"
      side-panel-position="left">
      <div class="cb-app container">
        <div
          id="content-frame"
          class="cb-container">
          <div id="content-mount"/>
        </div>
      </div>
    </cloubi-content-positioner>
    <cloubi-playlist-dialog-add-to
      v-if="addToPlaylistDialog"
      :playlist-api="playlistApi"
      :material-api="materialApi"
      @cancel="addToPlaylistDialog=false"
    />
    <cloubi-playlist-dialog-my
      v-if="myPlaylistsDialog"
      :playlist-api="playlistApi"
      :material-api="materialApi"
      @cancel="myPlaylistsDialog=false"
    />
  </div>
</template>

<script>
import CloubiThemeSidePanel from './CloubiThemePanelMain.vue';
import CloubiThemeTopbar from './CloubiThemeTopbar.vue';
import CloubiThemeBackground from './CloubiThemeBackground.vue';
import CloubiThemeBottombar from './CloubiThemeBottombar.vue';
import CloubiThemeNotesPanel from './CloubiThemePanelNotes.vue';

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
    userApi: { type: Object, required: true },
    eventBus: { type: Object, required: true },
    playlistApi: { type: Object, required: true }
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
      self.eventBus.$emit('dropdown-close', { dropdownId: 'playlist' });
      self.addToPlaylistDialog = true;
    });
    this.eventBus.$on('show-my-playlists', () => {
      console.log('show-my-playlists');
      self.eventBus.$emit('dropdown-close', { dropdownId: 'playlist' });
      self.myPlaylistsDialog = true;
    });
  }
};
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
  margin-bottom: 10px;
}

.cb-frame {
  position: fixed;
  width: 100%;
  height: 0;
  top: 0;
  left: 0;
  z-index: 1;
}

.cb-notes {
  height: calc(100vh - #{$cloubi-navbar-height});
}

@media only screen and (max-width: 760px) {
  .cb-floating-page-turners {
    display: none !important;
  }
}
</style>
