<template>
  <cloubi-side-panel
    side-panel-id="nav"
    position="left" 
    data-cy="side-panel-nav"
    :event-bus="eventBus">
    <template>
      <div class="cb-side-panel-column">
        <cloubi-chapter-turners 
          :material-api="materialApi" />
        <cloubi-nav-level-heading
          :material-api="materialApi" />
        <cloubi-material-accordion
          :material-api="materialApi" />
      </div>
    </template>
  </cloubi-side-panel>
</template>

<script>

export default {

  name: 'CloubiThemeSidePanel',

  components: {
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  },
}
</script>

<style>

.cb-side-panel-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

</style>
