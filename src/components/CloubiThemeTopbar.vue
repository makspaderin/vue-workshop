<template>
  <cloubi-navbar
    :is-transparent="isRoot">
    <template slot="left-content">
      <cloubi-skiplink
        text="Skip to main content"
        title="Skip to main content"
        access-key="e"
        content-id="#content"
      />
      <cloubi-menu
        :horizontal="true"
        label="menu-bar">
        <cloubi-menu-item>
          <cloubi-side-panel-switch
            :class="[{'cb-hidden': isRoot}]"
            :event-bus="eventBus"
            label="Open/Close nav sidepanel."
            side-panel-id="nav"
            data-cy="side-panel-switch-nav" />
        </cloubi-menu-item>
        <cloubi-menu-item>
          <cloubi-button-home
            :class="[{'cb-hidden': isRoot}]"
            :material-api="materialApi"
            color="see-through" />
        </cloubi-menu-item>
      </cloubi-menu>
    </template>
    <template slot="center-content">
      <cloubi-heading-product
        :class="['cb-topbar-product-heading', {'cb-hidden': isRoot}]"
        :material-api="materialApi" />
    </template>
    <template slot="right-content">
      <cloubi-menu
        :horizontal="true"
        label="menu-bar">

        <cloubi-menu-item>
          <cloubi-dropdown
            label="Open/close user details"
            align="center"
            name="user"
            icon="user"
            button-color="see-through">
            <cloubi-user
              :user-api="userApi" />
          </cloubi-dropdown>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-ruler-button
            :event-bus="eventBus"
            closed-color="see-through"/>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-notes-counter
            :material-api="materialApi">
            <cloubi-side-panel-switch
              :event-bus="eventBus"
              color="see-through"
              label="Open/close notes panel."
              data-cy="notes-side-panel-switch"
              side-panel-id="right-side-panel"
              icon="file-alt"
              name="notes" />
          </cloubi-notes-counter>
        </cloubi-menu-item>

        <cloubi-menu-item>
          <cloubi-dropdown
            :pointing="false"
            :floating="false"
            :event-bus="eventBus"
            label="Open/close font size selector"
            name="font size"
            dropdown-id="font-size"
            title="A"
            button-color="see-through"
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
            label="Open/close playlist"
            data-cy="open-playlist-editor-button"
            name="playlist"
            dropdown-id="playlist"
            icon="star"
            button-color="see-through"
            align="right">
            <template>
              <cloubi-playlist-editor
                :material-api="materialApi"
                :playlist-api="playlistApi"
                :event-bus="eventBus"
                data-cy="playlist-editor"
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

  components: {},

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type: Object, required: true },
    userApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }
  },

  data() {
    return {
      isRoot: false
    };
  },

  created() {
    const self = this;

    self.materialApi.onPageChange(self.$pageChanged);
    self.materialApi.getCurrentPage().then(page => {
      self.$pageChanged(page);
    });
  },

  methods: {
    $pageChanged(page) {
      if (page.breadcrump.length === 1) {
        this.isRoot = true;
        this.eventBus.$emit('side-panel-open-changed', {
          isOpen: false,
          sidePanelId: 'nav'
        });
      } else {
        this.isRoot = false;
      }
    }
  }
};
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
