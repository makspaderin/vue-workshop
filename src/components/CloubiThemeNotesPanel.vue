<template>
  <cloubi-side-panel
    :full-height="true"
    :event-bus="eventBus"
    :trap-focus="true"
    side-panel-id="right-side-panel"
    position="right"
    data-cy="side-panel-right">
    <div class="cb-notes-top-bar">
      <div>
        <cloubi-notes-download-button
          :material-api="materialApi"
          :event-bus="eventBus"
          class="cb-download-notes-btn"/>
      </div>
      <div>
        <cloubi-side-panel-switch
          :event-bus="eventBus"
          :initial-open="true"
          label="Close notes panel"
          side-panel-id="right-side-panel"
          icon="times"
          class="cb-close-notes-btn" />
      </div>
    </div>
    <cloubi-notes
      :material-api="materialApi"
      :event-bus="eventBus"
      class="cb-notes" />
  </cloubi-side-panel>
</template>

<script>
export default {
  name: 'CloubiThemeNotesPanel',

  components: {},

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }
  }
};
</script>

<style lang="scss">
@import '../_variables.scss';

.cb-notes-top-bar {
  display: flex;
  justify-content: space-between;
}

.cb-notes {
  height: calc(100vh - #{$cloubi-navbar-height});
}

.cb-download-notes-btn {
  height: $cloubi-navbar-height;
  width: $cloubi-navbar-height;
}
</style>
