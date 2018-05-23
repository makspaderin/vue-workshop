<template>
  <navbar
    :event-bus="eventBus"
    :material-api="materialApi">
    <template slot="right-content">
      Topbar...
      <ruler-button 
        :event-bus="eventBus"/>
    </template>
  </navbar>
</template>

<script>

export default {

  name: 'ThemeTopbar',

  components: {
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, required: true }
  }

}
</script>

<style>

</style>
