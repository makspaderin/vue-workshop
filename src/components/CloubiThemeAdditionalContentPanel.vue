<template>
  <cloubi-side-panel
    :full-height="true"
    :event-bus="eventBus"
    :trap-focus="true"
    side-panel-id="additional-content-panel"
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
