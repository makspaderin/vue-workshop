<template>
  <cloubi-navbar
    :is-light="true"
    class="cb-bottombar">
    <template slot="left-content">
      <cloubi-turner-page
        :material-api="materialApi"
        :playlist-api="playlistApi"
        turner-direction="previous" />
    </template>
    <template slot="center-content"/>
    <template slot="right-content">
      <cloubi-turner-page
        :material-api="materialApi"
        :playlist-api="playlistApi"
        turner-direction="next" />
    </template>
  </cloubi-navbar>
</template>

<script>
export default {
  name: 'CloubiThemeBottombar',

  components: {},

  props: {
    materialApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }
  },

  data() {
    return {};
  },

  created() {},

  methods: {}
};
</script>

<style>
.cb-bottombar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 10000;
}

@media only screen and (min-width: 769px) {
  .cb-bottombar {
    display: none;
  }
}
</style>
