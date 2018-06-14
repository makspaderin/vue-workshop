<template>
  <div 
    id="content" 
    class="cb-theme-menu">    
    <h1 data-cy="main-menu-title">{{ pageTitle }}</h1>
    <cloubi-main-menu-grid 
      :pages="pageChildPages" 
      :last-visited-page="lastVisitedPageId"
      @click-page="onChangePage"/>  
  </div>
</template>

<script>
export default {
  name: 'CloubiThemeMenu',

  props: {
    pageId: { type: String, required: true },
    pageTitle: { type: String, default: 'Default Title' },
    materialApi: { type: Object, require: true }
  },

  data() {
    return {
      pageChildPages: [],
      lastVisitedPageId: null,
      title: window.document.title
    };
  },

  created() {
    this.$loadPageChildPages().then(this.resolveLastPage);

    this.materialApi.onPageChange(page => {
      this.$resolveLastPage();
    });
  },

  methods: {
    $loadPageChildPages() {
      const self = this;
      return this.materialApi
        .getPageChildPages(this.pageId, null)
        .then(pages => {
          self.pageChildPages = pages;
        });
    },

    $resolveLastPage() {
      const self = this;
      return this.materialApi.getLastPage().then(lastPage => {
        const breadcrumb = lastPage.breadcrump;
        for (let i = 0; i < breadcrumb.length; i++) {
          const foundPage = self.pageChildPages.find(
            p => p.id === breadcrumb[i]
          );
          if (foundPage) {
            self.lastVisitedPageId = foundPage.id;
          }
        }
      });
    },

    onChangePage(pageID) {
      this.materialApi.changePage(pageID);
    }
  }
};
</script>

<style lang="scss">
.cb-theme-menu {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
}
</style>
