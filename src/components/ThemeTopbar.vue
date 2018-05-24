<template>
  <navbar
    :is-transparent="isRoot">
    <template slot="left-content">
      <sidebar-switch 
        :event-bus="eventBus" />
      <home-button
        :material-api="materialApi" />
    </template>
    <template slot="center-content">
      <product-heading
        :material-api="materialApi" />
    </template>
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
  },

  data: function(){
    return {
      isRoot: false
    }
  },
  
  created: function() {
    const self = this;

    self.materialApi.onPageChange(self.$pageChanged);
    self.materialApi.getCurrentPage().then((page) => {
      self.$pageChanged(page);
    });
  },

  methods: {
    $pageChanged: function(page) {
      if(page.breadcrump.length === 1){
        this.isRoot = true;
      }
      else {
        this.isRoot = false;
      }
    }
  }

}
</script>

<style>

</style>
