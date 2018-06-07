<template>
  <cloubi-navbar
    :is-transparent="isRoot">
    <template slot="left-content">
      <cloubi-skiplink
        text="Skip to main content"
        contentId="#content"
      />
      <cloubi-menu :horizontal="true">
        <cloubi-menu-item>
          <cloubi-side-panel-switch 
            side-panel-id="nav"
            data-cy="side-panel-switch-nav"
            :class="[{'cb-hidden': isRoot}]"
            :event-bus="eventBus" />
        </cloubi-menu-item>
        <cloubi-menu-item>
          <cloubi-home-button
            :class="[{'cb-hidden': isRoot}]"
            :material-api="materialApi" />
        </cloubi-menu-item>
      </cloubi-menu>
    </template>
    <template slot="center-content">
      <cloubi-product-heading
        :class="['cb-topbar-product-heading', {'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="right-content">
      <cloubi-menu :horizontal="true">

        <cloubi-menu-item>
          <cloubi-dropdown
          align="center"
          name="user"
          icon="user">
            <cloubi-user 
              :user-api="userApi" />
          </cloubi-dropdown>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-ruler-button 
            :event-bus="eventBus"/>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-notes-counter 
            :material-api="materialApi">  
            <cloubi-side-panel-switch 
              data-cy="side-panel-switch-right"
              side-panel-id="right-side-panel"
              icon="file-alt"
              name="notes"
              :event-bus="eventBus" />
          </cloubi-notes-counter>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-dropdown 
            :pointing="false" 
            :floating="false"
            :event-bus="eventBus"
            name="font size"
            dropdown-id="font-size"
            title="A"
            align="right">
            <template>
              <cloubi-font-size-dropdown
                :material-api="materialApi"
                :event-bus="eventBus"
              />
            </template>
          </cloubi-dropdown>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-dropdown 
            :pointing="false" 
            :floating="false"
            :event-bus="eventBus"
            :icon-outline="true"
            name="playlist"
            dropdown-id="playlist"
            icon="star"
            align="right">
            <template>
              <cloubi-playlist-dropdown
                :material-api="materialApi"
                :playlist-api="playlistApi"
                :event-bus="eventBus"
              />
            </template>        
          </cloubi-dropdown>
        </cloubi-menu-item>
      </cloubi-menu>
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
    eventBus: { type: Object, required: true },
    userApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
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

@media only screen and (max-width: 760px) {

  .cb-topbar-product-heading {
    display: none !important;
  }

}

</style>
