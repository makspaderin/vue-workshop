<template>
  <div>
    <theme-frame
      :event-bus="eventBus"
      :material-api="materialApi"
      :user-api="userApi"
      :playlist-api="playlistApi"
    />
  </div>
</template>

<script>
import CloubiThemeFrame from '../src/components/CloubiThemeFrame.vue';

export default {
  components: {
    'theme-frame': CloubiThemeFrame
  },

  props: {
    materialApi: { type: Object, required: true },
    userApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    eventBus: { type: Object, required: true }
  },

  data() {
    return {
      page: {
        id: '1',
        title: 'Foo'
      }
    };
  },

  mounted() {
    const self = this;
    this.materialApi.onPageChange(page => {
      console.log('onPageChanged:');
      console.log(page);
      self.page = page;
    });
  }
};
</script>

<style>
</style>
