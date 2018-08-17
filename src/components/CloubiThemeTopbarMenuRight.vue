<template>
  <span>
    <cloubi-menu
      :horizontal="true"
      class="theme-right-menu-bar"
      label="menu-bar">
      <cloubi-menu-item>
        <cloubi-theme-search-dropdown
          :event-bus="eventBus"
          :search-api="searchApi"
          :material-api="materialApi"
          @open="openDropdown" />
      </cloubi-menu-item>

      <cloubi-menu-item>
        <cloubi-user-dropdown
          :account-api="accountApi"
          :event-bus="eventBus"
          align="right"
          name="user"
          @open="openDropdown" />
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
            :label="$translate('cloubi-default-product-theme-open-close-notes-side-panel')"
            :hint="$translate('cloubi-default-product-theme-notes')"
            color="see-through"
            data-cy="side-panel-switch-notes"
            side-panel-id="notes"
            icon="file-alt"
            name="notes" />
        </cloubi-notes-counter>
      </cloubi-menu-item>

      <cloubi-menu-item>
        <cloubi-side-panel-switch
          :hint="$translate('cloubi-default-product-theme-additional-content')"
          :label="$translate('cloubi-default-product-theme-open-close-additional-content-side-panel')"
          color="see-through"
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
          :label="$translate('cloubi-default-product-theme-open-close-font-size')"
          :hint="$translate('cloubi-default-product-theme-font-size')"
          icon="text-height"
          name="font size"
          dropdown-id="font-size"
          title=""
          button-color="see-through"
          align="right"
          @open="openDropdown">
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
          :label="$translate('cloubi-default-product-theme-open-close-playlist')"
          :hint="$translate('cloubi-default-product-theme-playlist')"
          data-cy="open-playlist-editor-button"
          name="playlist"
          dropdown-id="playlist"
          icon="star"
          button-color="see-through"
          align="right"
          @open="openDropdown">
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

      <cloubi-menu-item>
        <cloubi-theme-gamification-dropdown
          :event-bus="eventBus"
          :gamification-api="gamificationApi"
        />
      </cloubi-menu-item>

    </cloubi-menu>

    <cloubi-menu
      class="theme-right-menu-dropdown"
    >
      <cloubi-menu-item>
        <cloubi-theme-mobile-menu
          :account-api="accountApi"
          :notes-api="notesApi"
          :material-api="materialApi"
          :event-bus="eventBus"
        />
      </cloubi-menu-item>
    </cloubi-menu>
  </span>

</template>

<script>
import CloubiThemeSearchDropdown from './CloubiThemeSearchDropdown.vue';
import CloubiThemeGamificationDropdown from './CloubiThemeGamificationDropdown.vue';
import CloubiThemeMobileMenu from './CloubiThemeMobileMenu.vue';

export default {
  name: 'CloubiThemeTopbarMenuRight',
  components: {
    'cloubi-theme-search-dropdown': CloubiThemeSearchDropdown,
    CloubiThemeGamificationDropdown,
    CloubiThemeMobileMenu
  },

  props: {
    eventBus: { type: Object, required: true },
    materialApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    searchApi: { type: Object, required: true },
    notesApi: { type: Object, required: true },
    accountApi: { type: Object, required: true },
    gamificationApi: { type: Object, required: true }
  },

  methods: {
    openDropdown() {
      this.$emit('openDropdown');
    }
  }
};
</script>

<style lang="scss">

@media only screen and (max-width: 700px) {

  .theme-right-menu-bar {

    .cb-dropdown-button {
      display: none;
    }

    .cb-side-panel-switch {
      display: none;
    }

    .cb-ruler-button {
      display: none;
    }

  }

}

@media only screen and (min-width: 700px) {
  .theme-right-menu-dropdown {
    display: none !important;
  }
}

</style>
