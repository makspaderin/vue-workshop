<template>
  <div class="cb-menu-page">    
    <h1>{{ pageTitle }}</h1>
    <main-menu-grid 
      :pages="pageChildPages" 
      :last-visited-page="lastVisitedPageId"
      @click-page="onChangePage"/>  
  </div>
</template>

<script>

import MainMenuGrid from 'cloubi2-default-product-theme-components-vue/src/components/MainMenuPage/MainMenuGrid'
import { Actions } from '../store/types';
import { mapGetters, mapState } from 'vuex';

export default {

  name: "MenuPage",

  components: {
    'main-menu-grid': MainMenuGrid
  },

  props: {
    pageId: { type: String, required: true },
    pageTitle: { type: String, default: 'Default Title' }
  },
  
  created: function() {
    this.$store.dispatch(Actions.LOAD_PAGE_CHILD_PAGES, this.pageId).then(() => {
      console.log('load last page');
      this.$store.dispatch(Actions.LOAD_LAST_VISITED_PAGE).then(() => {
        console.log('loaded..');
      });
    })
  },

  computed: {
    ...mapGetters('pages', [
      'lastVisitedPageId'
    ]),
    ...mapState('pages', [
      'pageChildPages'      
    ])    
  },
  
  methods: {
    onChangePage: function(pageID) {
      this.materialApi.changePage(pageID);
    }
  }

}

</script>

<style lang="scss">

.cb-menu-page {

  flex-direction: column;
  display: flex;
  border: solid;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }

}

</style>
