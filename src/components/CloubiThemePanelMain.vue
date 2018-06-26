<template>
  <cloubi-side-panel
    :event-bus="eventBus"
    :trap-focus="false"
    side-panel-id="main"
    position="left"
    data-cy="side-panel-main">
    <template>
      <div
        class="cb-side-panel-column"
        data-cy="side-panel-main-content">
        <cloubi-turners-chapter
          :material-api="materialApi" />
        <cloubi-heading-nav-level
          :material-api="materialApi" />
        <cloubi-material-accordion
          :material-api="materialApi" />
      </div>
    </template>
  </cloubi-side-panel>
</template>

<script>
export default {
  name: 'CloubiThemePanelMain',

  components: {},

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }
  }
};
</script>

<style>
.cb-side-panel-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
