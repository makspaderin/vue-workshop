<template>
  <cloubi-side-panel
    :full-height="false"
    :trap-focus="true"
    :auto-hide-enabled="true"
    :auto-hide-mode="'hide-on-other'"
    :auto-hide-panel-ids="['main']"
    side-panel-id="additional-content"
    position="right"
    data-cy="side-panel-additional-content">
    <template slot-scope="slotProps">
      <cloubi-additional-content
        :playlist-api="playlistApi"
        :material-api="materialApi"
        :additional-content-api="additionalContentApi"
        :on-initialised-callback="slotProps.onInitialised"/>
    </template>
  </cloubi-side-panel>
</template>


<script>
import Vue from 'vue';

export default {
  name: 'CloubiThemeAdditionalContentPanel',

  components: {},

  props: {
    playlistApi: { type: Object, required: true },
    materialApi: { type: Object, required: true },
    additionalContentApi: { type: Object, required: true },
    eventBus: { type: Object, default: () => new Vue() }
  }
};
</script>

<style>
</style>
