<template>
  <sidepanel
    sidepanel-id="nav"
    position="left" 
    :event-bus="eventBus">
    <template>
      <div class="cb-sidepanel-column">
        <chapter-turners 
          :material-api="materialApi" />
        <nav-level-heading
          :material-api="materialApi" />
        <material-accordion
          :material-api="materialApi" />
      </div>
    </template>
  </sidepanel>
</template>

<script>

export default {

  name: 'ThemeSidepanel',

  components: {
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  },



}
</script>

<style>

.cb-sidepanel-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

</style>
