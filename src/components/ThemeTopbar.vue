<template>
  <navbar
    :is-transparent="isRoot">
    <template slot="left-content">
      <sidebar-switch 
        :class="[{'cb-hidden': isRoot}]"
        :event-bus="eventBus" />
      <home-button
        :class="[{'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="center-content">
      <product-heading
        :class="[{'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="right-content">
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
        this.eventBus.$emit('sidebar-open-changed', false);
      }
      else {
        this.isRoot = false;
      }
    }
  }

}
</script>

<style>

.cb-hidden {
  display: none;
}

</style>
