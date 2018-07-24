<template>
  <cloubi-navbar
    :is-transparent="isRoot"
    class="cb-topbar">
    <template slot="left-content">
      <cloubi-skiplink
        text="Skip to main content"
        title="Skip to main content"
        access-key="e"
        content-id="#content"
      />
      <cloubi-menu
        :horizontal="true"
        label="menu-bar">
        <cloubi-menu-item>
          <cloubi-side-panel-switch
            :class="[{'cb-hidden': isRoot}]"
            :event-bus="eventBus"
            hint="Main menu"
            label="Open/Close main sidepanel."
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
      <cloubi-menu
        :horizontal="true"
        label="menu-bar">
        <cloubi-menu-item>
          <cloubi-theme-search-dropdown
            :event-bus="eventBus"
            :search-api="searchApi"
            :material-api="materialApi" />
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-user-dropdown
            :account-api="accountApi"
            align="right"
            name="user" />
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-ruler-button
            :event-bus="eventBus"
            closed-color="see-through"/>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-notes-counter
            :notes-api="notesApi"
            :material-api="materialApi">
            <cloubi-side-panel-switch
              color="see-through"
              label="Open/close notes panel."
              hint="Notes"
              data-cy="side-panel-switch-notes"
              side-panel-id="notes"
              icon="file-alt"
              name="notes" />
          </cloubi-notes-counter>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-side-panel-switch
            color="see-through"
            hint="Additional content"
            label="Open/close additional content panel."
            data-cy="side-panel-switch-notes"
            side-panel-id="additional-content"
            icon="paperclip"
            name="notes"
          />
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-dropdown
            :pointing="false"
            :floating="false"
            :event-bus="eventBus"
            icon="text-height"
            label="Open/close font size selector"
            name="font size"
            dropdown-id="font-size"
            title=""
            button-color="see-through"
            align="right"
            hint="Font size">
            <template>
              <cloubi-font-size-editor
                :material-api="materialApi"
                :event-bus="eventBus"
              />
            </template>
          </cloubi-dropdown>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-dropdown
            :pointing="false"
            :floating="false"
            :event-bus="eventBus"
            :icon-outline="true"
            label="Open/close playlist"
            data-cy="open-playlist-editor-button"
            name="playlist"
            dropdown-id="playlist"
            icon="star"
            button-color="see-through"
            hint="Playlist"
            align="right">
            <template>
              <cloubi-playlist-editor
                :material-api="materialApi"
                :playlist-api="playlistApi"
                :event-bus="eventBus"
                data-cy="playlist-editor"
              />
            </template>
          </cloubi-dropdown>
        </cloubi-menu-item>
      </cloubi-menu>
    </template>
  </cloubi-navbar>
</template>

<script>
import CloubiThemeSearchDropdown from './CloubiThemeSearchDropdown.vue';

export default {
  name: 'CloubiThemeTopbar',

  components: {
    'cloubi-theme-search-dropdown': CloubiThemeSearchDropdown
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, required: true },
    accountApi: { type: Object, required: true },
    notesApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    searchApi: { type: Object, required: true }
  },

  data() {
    return {
      isRoot: false
    };
  },

  created() {
    const self = this;

    self.materialApi.onPageChange(self.$pageChanged);
    self.materialApi.getCurrentPage().then(page => {
      self.$pageChanged(page);
    });
  },

  methods: {
    $pageChanged(page) {
      if (page.breadcrump.length === 1) {
        this.isRoot = true;

        // Close main side panel when in root page
        this.$changeSidePanelState('main', { isOpen: false });
      } else {
        this.isRoot = false;
      }
    }
  }
};
</script>

<style lang="scss">

.cb-topbar {
  z-index: 1500;
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
