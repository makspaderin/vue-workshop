<template>
  <cloubi-side-panel
    :full-height="false"
    :trap-focus="true"
    :auto-hide-enabled="true"
    :auto-hide-mode="'hide-on-other'"
    :auto-hide-panel-ids="['main']"
    side-panel-id="additional-content"
    position="right"
    data-cy="side-panel-right">
    <cloubi-additional-content />
  </cloubi-side-panel>
</template>


<script>
import Vue from 'vue';

export default {
  name: 'CloubiThemeAdditionalContentPanel',

  components: {},

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, default: () => new Vue() }
  }
};
</script>

<style>
</style>
