<template>
  <div
    :class="['cb-navbar', {'cb-see-through': isRoot}]">
    <div class="cb-left-items">
      <slot name="left-content">
        <sidebar-switch />
        <home-button 
          :material-api="materialApi" />
      </slot>
    </div>
    <div
      class="cb-right-items">
      <slot name="right-content" />
    </div>
    <div 
      class="cb-center-items">
      <slot name="center-content">
        <product-heading
          :material-api="materialApi" />
      </slot>
    </div>
  </div>
</template>

<script>

import HomeButton from '../HomeButton'
import ProductHeading from './ProductHeading'

export default {
  name: 'Navbar',

  components: {
    'home-button': HomeButton,
    'product-heading': ProductHeading
  },

  props: {
    materialApi: { type: Object, required: true  }
  },

  data: function() {
    return {
      isRoot: false
    }
  },

  computed: {
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

<style lang="scss">
@import '../../_variables.scss';

.cb-navbar {
  background-color: $cloubi-color-bg-tertiary-transp;
  color: $cloubi-color-text-secondary;
  height: $cloubi-navbar-height; /* Locks top bar height, maybe should be defined by children? */
  width: 100%;
  text-align: center;
  position: relative;

  &.cb-see-through {
    background-color: #00000000;
  }

  .cb-left-items {
    position: absolute;
    height: inherit;
    display: flex;
  }

  .cb-center-items {
    display: inline-block;
    height: inherit;
    margin: 0 auto;
  }

  .cb-right-items {
    position: absolute;
    height: inherit;
    right: 0;
    display: flex;
  }
}

</style>
