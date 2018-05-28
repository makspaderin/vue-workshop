<template>
  <side-panel
    side-panel-id="nav"
    position="left" 
    data-cy="side-panel-nav"
    :event-bus="eventBus">
    <template>
      <div class="cb-side-panel-column">
        <chapter-turners 
          :material-api="materialApi" />
        <nav-level-heading
          :material-api="materialApi" />
        <material-accordion
          :material-api="materialApi" />
      </div>
    </template>
  </side-panel>
</template>

<script>

export default {

  name: 'ThemeSidePanel',

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
