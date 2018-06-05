<template>
  <cloubi-side-panel
    side-panel-id="right-side-panel"
    position="right"
    data-cy="side-panel-right"
    :full-height="true"
    :event-bus="eventBus">
    <div class="cb-notes-top-bar">
      <div>
        <cloubi-notes-download-button 
          class="cb-download-notes-btn"
          :material-api="materialApi"
          :event-bus="eventBus"/>
      </div>
      <div>
        <cloubi-side-panel-switch 
          side-panel-id="right-side-panel"
          icon="times"
          class="cb-close-notes-btn"
          :event-bus="eventBus" />
      </div>
    </div>
    <cloubi-notes
      class="cb-notes"
      :material-api="materialApi"
      :event-bus="eventBus" />
  </cloubi-side-panel>
</template>

<script>

export default {

  name: 'CloubiThemeNotesPanel',

  components: {
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';

.cb-notes-top-bar {
  display:flex;
  justify-content: space-between;
}

.cb-notes {
  height: calc(100vh - #{$cloubi-navbar-height})
}

.cb-download-notes-btn {
  height:$cloubi-navbar-height;
  width:$cloubi-navbar-height;
}

</style>
