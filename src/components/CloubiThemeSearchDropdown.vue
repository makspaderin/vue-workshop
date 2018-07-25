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
    @open="open">
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
      this.$emit('open');
    }
  }
};
</script>

<style lang="scss">
.cb-search-container {
  max-height: calc(100vh - #{$cloubi-navbar-height});
}
</style>
