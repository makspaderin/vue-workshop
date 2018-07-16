<template>
  <div>
    <theme-background
      :material-api="materialApi"
    />
    <div class="cb-frame">
      <theme-topbar
        :event-bus="eventBus"
        :notes-api="notesApi"
        :material-api="materialApi"
        :account-api="accountApi"
        :playlist-api="playlistApi"
      />

      <theme-side-panel
        :event-bus="eventBus"
        :material-api="materialApi"/>

      <theme-notes-panel
        :event-bus="eventBus"
        :notes-api="notesApi"
        :material-api="materialApi" />

      <theme-additional-content-panel
        :event-bus="eventBus"
        :additional-content-api="additionalContentApi" />

      <theme-bottombar
        :event-bus="eventBus"
        :material-api="materialApi" />
      <cloubi-content-positioner
        :event-bus="eventBus"
        side-panel-id="main"
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
        <cloubi-ruler
          :event-bus="eventBus"/>
      </cloubi-content-positioner>
    </div>
    <cloubi-content-positioner
      :event-bus="eventBus"
      side-panel-id="main">
      <div class="cb-app container">
        <div
          id="content-frame"
          class="cb-container">
          <div id="content-mount"/>
        </div>
      </div>
    </cloubi-content-positioner>
    <cloubi-playlist-root
      :event-bus="eventBus"
      :material-api="materialApi"
      :playlist-api="playlistApi"
    />
  </div>
</template>

<script>
import CloubiThemeSidePanel from './CloubiThemePanelMain.vue';
import CloubiThemeTopbar from './CloubiThemeTopbar.vue';
import CloubiThemeBackground from './CloubiThemeBackground.vue';
import CloubiThemeBottombar from './CloubiThemeBottombar.vue';
import CloubiThemeNotesPanel from './CloubiThemePanelNotes.vue';
import CloubiThemeAdditionalContentPanel from './CloubiThemePanelAdditionalContent.vue';

export default {
  components: {
    'theme-side-panel': CloubiThemeSidePanel,
    'theme-topbar': CloubiThemeTopbar,
    'theme-background': CloubiThemeBackground,
    'theme-bottombar': CloubiThemeBottombar,
    'theme-notes-panel': CloubiThemeNotesPanel,
    'theme-additional-content-panel': CloubiThemeAdditionalContentPanel
  },

  props: {
    /**
     * MaterialApiWrapper instance
     */
    materialApi: { type: Object, required: true },
    /**
     * AccountApiWrapper instance
     */
    accountApi: { type: Object, required: true },
    /**
     * Event Bus instance
     */
    eventBus: { type: Object, required: true },
    /**
     * PlaylistApiWrapper instance.
     */
    playlistApi: { type: Object, required: true },
    /**
     * NotesApiWrapper instance.
     */
    notesApi: { type: Object, required: true },

    /**
     * AdditionalContentApiWrapper instance.
     */
    additionalContentApi: { type: Object, required: true }
  },

  data() {
    return {};
  },

  created() {
    const self = this;
    this.eventBus.$on('add-to-playlist', () => {
      // we need to excplictly emit dropdown close here, since we wan't
      // to playlist editor dropdown when user has selected an action from it.
      self.eventBus.$emit('dropdown-close', { dropdownId: 'playlist' });
    });
    this.eventBus.$on('show-my-playlists', () => {
      // we need to excplictly emit dropdown close here, since we wan't
      // to playlist editor dropdown when user has selected an action from it.
      self.eventBus.$emit('dropdown-close', { dropdownId: 'playlist' });
    });
  }
};
</script>

<style lang="scss">
// @import '../_variables.scss';

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
  z-index: 100;
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
