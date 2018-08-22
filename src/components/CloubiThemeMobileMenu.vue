<template>
  <cloubi-dropdown
    :pointing="false"
    :floating="false"
    :event-bus="eventBus"
    label="Mobile menu"
    hint="Mobile menu"
    icon="bars"
    name="font size"
    dropdown-id="mobile-menu"
    title=""
    button-color="see-through"
    align="right"
    >
    <template>
      <div class="theme-mobile-menu">
        <cloubi-button
          :title="$translate('cloubi-default-product-theme-search')"
          :label="$translate('cloubi-default-product-theme-search')"
          color="see-through"
          icon="search"
          mode="sharp"
          @click="openSearch"
        />
        <cloubi-button
          :title="$translate('cloubi-default-product-theme-reading-aide')"
          :label="$translate('cloubi-default-product-theme-reading-aide')"
          color="see-through"
          icon="ruler"
          mode="sharp"
          @click="toggleRuler"
        />
        <cloubi-button
          :title="$translate('cloubi-default-product-theme-notes')"
          :label="$translate('cloubi-default-product-theme-notes')"
          color="see-through"
          icon="file-alt"
          mode="sharp"
          @click="openNotes"
        />
        <cloubi-button
          :title="$translate('cloubi-default-product-theme-font-size')"
          :label="$translate('cloubi-default-product-theme-font-size')"
          color="see-through"
          icon="text-height"
          mode="sharp"
          @click="openFontSize"/>
        <cloubi-button
          :title="$translate('cloubi-default-product-theme-playlist')"
          :label="$translate('cloubi-default-product-theme-playlist')"
          color="see-through"
          icon="star"
          mode="sharp"
          @click="openPlaylist"/>
      </div>
    </template>
  </cloubi-dropdown>
</template>

<script>

export default {
  name: 'CloubiThemeMobileMenu',

components: {
  },

  props: {
    eventBus: { type: Object, required: true },
    notesApi: { type: Object, required: true },
    accountApi: { type: Object, required: true },
    materialApi: { type: Object, required: true },
  },

  data: () => {
    return {
      loggedIn: false
    }
  },

  created() {
    const self = this;
    self.accountApi.isLoggedIn().then(loggedIn => {
      self.loggedIn = loggedIn;
    });
  },

  methods: {
    openSearch() {
      this.eventBus.$emit('dropdown-close', { dropdownId: 'mobile-menu' });
      this.eventBus.$emit('dropdown-open', { dropdownId: 'search' });
    },
    toggleRuler() {
      this.eventBus.$emit('dropdown-close', { dropdownId: 'mobile-menu' });
      this.eventBus.$emit('ruler-open-changed', true);
    },
    openFontSize() {
      this.eventBus.$emit('dropdown-close', { dropdownId: 'mobile-menu' });
      this.eventBus.$emit('dropdown-open', { dropdownId: 'font-size' });
    },
    openPlaylist() {
      this.eventBus.$emit('dropdown-close', { dropdownId: 'mobile-menu' });
      this.eventBus.$emit('dropdown-open', { dropdownId: 'playlist' });
    },
    openNotes() {
      this.$changeSidePanelState('notes', {
        isOpen: true
      });
    }
  }
};
</script>

<style lang="scss">

.theme-mobile-menu {
  display: flex;
  background: $cloubi-color-default;
  flex-direction: column;
}

</style>
