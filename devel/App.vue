<template>
  <div>
    <theme-frame
      :event-bus="eventBus"
      :material-api="materialApi"
      :account-api="accountApi"
      :playlist-api="playlistApi"
      :notes-api="notesApi"
      :search-api="searchApi"
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
    accountApi: { type: Object, required: true },
    playlistApi: { type: Object, required: true },
    notesApi: { type: Object, required: true },
    eventBus: { type: Object, required: true },
    searchApi: { type: Object, required: true }
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
      self.page = page;
    });
  }
};
</script>

<style>
</style>
