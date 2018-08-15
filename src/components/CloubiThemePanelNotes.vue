<template>
  <cloubi-side-panel
    :full-height="true"
    :trap-focus="true"
    :auto-hide-enabled="true"
    :auto-hide-mode="'hide-on-other'"
    :auto-hide-panel-ids="['main']"
    side-panel-id="notes"
    position="right"
    data-cy="side-panel-notes">
    <template slot-scope="slotProps">
    <div
      class="cb-notes-top-bar"
      data-cy="side-panel-notes-content">
      <div>
        <cloubi-notes-download-button
          :notes-api="notesApi"
          :material-api="materialApi"
          :event-bus="eventBus"
          class="cb-download-notes-btn"/>
      </div>
      <div>
        <cloubi-side-panel-switch
          :event-bus="eventBus"
          :label="$translate('cloubi-default-product-theme-close-notes-panel')"
          side-panel-id="notes"
          icon="times"
          class="cb-close-notes-btn" />
      </div>
    </div>
    <cloubi-notes
      :notes-api="notesApi"
      :material-api="materialApi"
      :event-bus="eventBus"
      :on-initialised-callback="slotProps.onInitialised"
      class="cb-notes" />
    </template>
  </cloubi-side-panel>
</template>

<script>
export default {
  name: 'CloubiThemePanelNotes',

  components: {},

  props: {
    /**
     * NotesApiWrapper instance
     */
    notesApi: { type: Object, required: true },
    /**
     * MaterialApiWrapper instance
     */
    materialApi: { type: Object, required: true },
    /**
     * Event Bus instance.
     */
    eventBus: { type: Object, required: true }
  }
};
</script>

<style lang="scss">
// @import '../_variables.scss';

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
