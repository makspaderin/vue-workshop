<template>
  <div class="cb-app">
    <div class="cb-frame">
      <navbar
        :material-api="materialApi"/>
      <sidebar 
        :material-api="materialApi" />
    </div>
    <content-positioner>
      <div class="container">
        <div class="cb-app container">
          <div class="cb-container">
            <menu-page 
              page-title="Welcome"
              page-id="1"/>
          </div>
        </div>
      </div>
    </content-positioner>
  </div>
</template>

<script>

import MenuPage from '../src/components/MenuPage';
import Placeholder from '../src/components/Placeholder';

export default {

  components: {
    'menu-page': MenuPage,
    'place-holder': Placeholder    
  },

  props: {
    materialApi: { type: Object, required: true }
  }

}

</script>

<style scoped>

.cb-app {
  background:#ededf0;
  margin-top: 100px;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid;
  z-index: 100;
}

.cb-container {
  margin: 10px;
  border: solid;
}

.cb-frame {
  position:fixed;
  width:100%;
  height:0;
  top:0;
  left:0;
  z-index: 1;
}

</style>
