<template>
  <div
    :class="pageStyleClasses">
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
        :search-api="searchApi"
        :gamification-api="gamificationApi"
        :in-playlist-mode="inPlaylistMode"
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
        :additional-content-api="additionalContentApi"
        :material-api="materialApi"
        :playlist-api="playlistApi" />

      <theme-bottombar
        :event-bus="eventBus"
        :material-api="materialApi"
        :playlist-api="playlistApi" />
      <cloubi-content-positioner
        :event-bus="eventBus"
        side-panel-id="main"
        data-cy="cb-content-pos">
        <cloubi-floatbar
          class="theme-floatbar"
        >
          <cloubi-ruler-button
            :event-bus="eventBus"
            mode="round" />
          <cloubi-side-panel-switch
            :event-bus="eventBus"
            :label="$translate('cloubi-default-product-theme-open-close-notes-side-panel')"
            data-cy="side-panel-switch-notes"
            side-panel-id="notes"
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
      <div
        class="cb-app container">
        <div
          id="content-frame"
          class="cb-container">
          <cloubi-playlist-info
            v-if="inPlaylistMode"
            :material-api="materialApi"
            :playlist-api="playlistApi"
            class="container" />
          <div id="content-mount"/>
        </div>
      </div>
    </cloubi-content-positioner>
    <cloubi-theme-footer/>
    <cloubi-playlist-root
      :event-bus="eventBus"
      :material-api="materialApi"
      :playlist-api="playlistApi"
    />
    <cloubi-additional-content-auto-viewer
      :material-api="materialApi"
      :playlist-api="playlistApi"
      :additional-content-api="additionalContentApi" />
  </div>
</template>

<script>
import CloubiThemeSidePanel from './CloubiThemePanelMain.vue';
import CloubiThemeTopbar from './CloubiThemeTopbar.vue';
import CloubiThemeBackground from './CloubiThemeBackground.vue';
import CloubiThemeBottombar from './CloubiThemeBottombar.vue';
import CloubiThemeNotesPanel from './CloubiThemePanelNotes.vue';
import CloubiThemeAdditionalContentPanel from './CloubiThemePanelAdditionalContent.vue';
import CloubiThemeFooter from './CloubiThemeFooter.vue';

export default {
  components: {
    CloubiThemeFooter,
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
    additionalContentApi: { type: Object, required: true },

    /**
     * SearchApiWrapper instance.
     */
    searchApi: { type: Object, required: true },

    /**
     * GamificationApiWrapper instance.
     */
    gamificationApi: { type: Object, required: true }
  },

  data() {
    return {
      inPlaylistMode: false,
      pageStyleClasses: []
    };
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

    this.materialApi.getCurrentPage().then((page) => {
      this.pageStyleClasses = page.styleClasses;
    });

    this.materialApi.onPageChange(this.$updateState);
  },

  methods: {
    $updateState(page) {
      const self = this;

      this.pageStyleClasses = page.styleClasses;

      self.materialApi.getCurrentPlaylist().then(playlist => {
        if (playlist) {
          if (!self.inPlaylistMode) {
            self.inPlaylistMode = true;
            self.$closeAllSidePanels();
          }
        } else {
          self.inPlaylistMode = false;
        }
      });
    }
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

.cb-playlist {
  height: 200px;
  background-color: blue;
}

@media only screen and (max-width: 769px) {
  .cb-page-turners-container {
    display: none !important;
  }
  .theme-floatbar {
    display: none !important;
  }
}
</style>
