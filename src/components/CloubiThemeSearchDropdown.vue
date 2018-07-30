<template>
  <cloubi-dropdown
    :pointing="false"
    :floating="false"
    :event-bus="eventBus"
    :label="$translate('cloubi-default-product-theme-open-close-search')"
    :hint="$translate('cloubi-default-product-theme-search')"
    icon="search"
    name="font size"
    dropdown-id="search"
    title=""
    button-color="see-through"
    align="window-width"
    data-cy="search-panel-button"
    @open="open"
    @close="close">
    <cloubi-search
      :search-api="searchApi"
      :material-api="materialApi"
      class="cb-search-container" />
  </cloubi-dropdown>
</template>

<script>
export default {
  name: 'CloubiThemeSearchDropdown',

  props: {
    searchApi: {
      type: Object,
      required: true
    },

    materialApi: {
      type: Object,
      required: true
    },

    eventBus: {
      type: Object,
      required: true
    }
  },

  methods: {
    open() {
      document.documentElement.classList.add('cb-prevent-scroll');
      this.$emit('open');
    },

    close() {
      document.documentElement.classList.remove('cb-prevent-scroll');
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
.cb-prevent-scroll {
  overflow: hidden;
}

.cb-search-container {
  max-height: calc(100vh - #{$cloubi-navbar-height});
}
</style>
