<template>
  <div class="cb-theme-background">
    <div 
      v-if="isRoot" 
      class="cb-theme-background-container">
      <div class="bg-image"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CloubiThemeBackground',

  props: {
    materialApi: { type: Object, required: true }
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
      } else {
        this.isRoot = false;
      }
    }
  }
};
</script>

<style lang="scss">
.cb-theme-background {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 340px;

  &-container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    background: linear-gradient(180deg, #f79000, #f72677);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 30s ease infinite;
    -moz-animation: AnimationName 30s ease infinite;
    animation: AnimationName 30s ease infinite;

    @-webkit-keyframes AnimationName {
      0% {
        background-position: 51% 0%;
      }
      50% {
        background-position: 50% 100%;
      }
      100% {
        background-position: 51% 0%;
      }
    }

    @-moz-keyframes AnimationName {
      0% {
        background-position: 51% 0%;
      }
      50% {
        background-position: 50% 100%;
      }
      100% {
        background-position: 51% 0%;
      }
    }

    @keyframes AnimationName {
      0% {
        background-position: 51% 0%;
      }
      50% {
        background-position: 50% 100%;
      }
      100% {
        background-position: 51% 0%;
      }
    }

    .bg-image {
      width: 100%;
      height: 100%;
      background-image: url('../img/frontpage_header_pattern.png');
      background-repeat: repeat-x;
      background-position: top center;
      background-attachment: fixed;
    }
  }
}
</style>
