<template>
  <cloubi-navbar
    :is-transparent="isRoot && scroll <= 100"
    :colorTransitionEnabled="scroll > 0 && isRoot"
    class="cb-topbar">
    <template slot="left-content">
      <cloubi-skiplink
        :text="$translate('cloubi-default-product-theme-skip-to-main-content')"
        :title="$translate('cloubi-default-product-theme-skip-to-main-content')"
        access-key="e"
        content-id="#content"
      />
      <cloubi-menu
        v-if="!inPlaylistMode"
        :horizontal="true"
        label="menu-bar">
        <cloubi-menu-item>
          <cloubi-side-panel-switch
            :class="[{'cb-hidden': isRoot}]"
            :event-bus="eventBus"
            :hint="$translate('cloubi-default-product-theme-main-menu')"
            :label="$translate('cloubi-default-product-theme-open-close-main-side-panel')"
            side-panel-id="main"
            data-cy="side-panel-switch-main" />
        </cloubi-menu-item>
        <cloubi-menu-item>
          <cloubi-button-home
            :class="[{'cb-hidden': isRoot}]"
            :material-api="materialApi"
            color="see-through" />
        </cloubi-menu-item>
      </cloubi-menu>
    </template>
    <template slot="center-content">
      <cloubi-heading-product
        :class="['cb-topbar-product-heading', {'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="right-content">
      <cloubi-theme-topbar-menu-right
        v-if="!inPlaylistMode"
        :material-api="materialApi"
        :notes-api="notesApi"
        :search-api="searchApi"
        :event-bus="eventBus"
        :playlist-api="playlistApi"
        :account-api="accountApi"
        :gamification-api="gamificationApi"
        @openDropdown="openDropdown"/>
    </template>
  </cloubi-navbar>
</template>

<script>
import CloubiThemeTopbarMenuRight from './CloubiThemeTopbarMenuRight.vue';

export default {
  name: 'CloubiThemeTopbar',

  components: {
    'cloubi-theme-topbar-menu-right': CloubiThemeTopbarMenuRight
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, required: true },
    accountApi: { type: Object, required: true },
    notesApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    searchApi: { type: Object, required: true },
    gamificationApi: { type: Object, required: true },
    inPlaylistMode: { type: Boolean, required: true }
  },

  data() {
    return {
      isRoot: false,
      scroll: 0
    };
  },

  created() {
    const self = this;

    self.materialApi.onPageChange(self.$pageChanged);
    self.materialApi.getCurrentPage().then(page => {
      self.$pageChanged(page);
    });

    // Register dropdown pseudo-sidepanel, this exists
    // to cause other side panels to close.
    this.$getSidePanelState('dropdown');
  },

  beforeMount() {
    window.addEventListener('scroll', this.$handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.$handleScroll);
  },

  methods: {

    $handleScroll() {
      this.scroll = window.scrollY;
    },

    $pageChanged(page) {
      if (page.breadcrump.length === 1) {
        this.isRoot = true;

        // Close main side panel when in root page
        this.$changeSidePanelState('main', { isOpen: false });
      } else {
        this.isRoot = false;
      }
    },

    openDropdown() {
      // Open the dropdown pseudo-sidepanel
      this.$changeSidePanelState('dropdown', { isOpen: true });
    }
  }
};
</script>

<style lang="scss">
.cb-topbar {
  z-index: 100000;
  .cb-hidden {
    display: none;
  }

  .cb-search {
    width: 340px;
  }
}

@media only screen and (max-width: 760px) {
  .cb-topbar-product-heading {
    display: none !important;
  }
}
</style>
