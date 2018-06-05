<template>
  <cloubi-navbar
    :is-transparent="isRoot">
    <template slot="left-content">
      <cloubi-side-panel-switch 
        side-panel-id="nav"
        data-cy="side-panel-switch-nav"
        :class="[{'cb-hidden': isRoot}]"
        :event-bus="eventBus" />
      <cloubi-home-button
        :class="[{'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="center-content">
      <cloubi-product-heading
        :class="['cb-topbar-product-heading', {'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="right-content">
      <cloubi-dropdown
      align="right"
      :icon="file-alt">
        <div class="jeb" />
      </cloubi-dropdown>
      <cloubi-ruler-button 
        :event-bus="eventBus"/>
      <cloubi-side-panel-switch 
        data-cy="side-panel-switch-right"
        side-panel-id="right-side-panel"
        icon="file-alt"
        :event-bus="eventBus" />
      <cloubi-dropdown 
        :pointing="false" 
        :floating="false"
        :event-bus="eventBus"
        dropdown-id="2"
        title="A"
        align="right">
        <template>
          <cloubi-font-size-dropdown
            :material-api="materialApi"
            :event-bus="eventBus"
          />
        </template>
      </cloubi-dropdown>
    </template>
  </cloubi-navbar>
</template>

<script>

export default {

  name: 'CloubiThemeTopbar',

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
        this.eventBus.$emit('side-panel-open-changed', {isOpen: false, sidePanelId: "nav"});
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
.jeb {
  height: 500px;
  width: 200px;
}
@media only screen and (max-width: 760px) {

  .cb-topbar-product-heading {
    display: none !important;
  }

}

</style>
