<template>
  <navbar
    :is-light="true"
    class="cb-bottombar">
    <template slot="left-content">
      <page-turner
        :material-api="materialApi"
        turner-direction="previous" />
    </template>
    <template slot="center-content">
    </template>
    <template slot="right-content">
      <page-turner
        :material-api="materialApi"
        turner-direction="next" />
    </template>
  </navbar>
</template>

<script>

export default {

  name: 'ThemeBottombar',

  components: {
  },

  props: {
    materialApi: { type: Object, required: true },
    eventBus: { type:Object, required: true }
  },

  data: function(){
    return {

    }
  },
  
  created: function() {
  },

  methods: {
  }

}
</script>

<style>

.cb-bottombar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

@media only screen and (min-width: 761px) {

  .cb-bottombar {
    display: none;
  }

}

</style>
