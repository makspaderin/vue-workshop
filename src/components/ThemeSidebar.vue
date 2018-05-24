<template>
  <sidebar
    position="left" 
    :event-bus="eventBus">
    <template>
      <div class="cb-sidebar-column">
        SideBar
        <nav-level-heading
          :material-api="materialApi" />
        <material-accordion
          :material-api="materialApi" />
      </div>
    </template>
  </sidebar>
</template>

<script>

export default {

  name: 'ThemeSidebar',

  components: {
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, default: () => new Vue() }
  }

}
</script>

<style>

.cb-sidebar-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

</style>
