<template>
  <MaterialAccordion
  :materialApi="materialApi"/>
</template>

<script>
import MaterialAccordion from 'cloubi2-default-product-theme-components-vue/src/components/MaterialAccordion'

export default {

  name: "Placeholder",
  
  components: { MaterialAccordion },

  props: {
    materialApi: { type: Object, required: true  }
  },

  created: function(){
  }
}
</script>

<style>
</style>
