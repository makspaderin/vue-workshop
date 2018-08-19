<template>
  <main
    id="content"
    role="main"
    class="cb-theme-menu">
    <h1 data-cy="main-menu-title">{{ pageTitle }}</h1>
    <cloubi-main-menu-grid
      :pages="pageChildPages"
      :last-visited-page="lastVisitedPageId"
      @click-page="onChangePage">
      <!-- <template slot="items" slot-scope="slotProps">
        <cloubi-button
          :title="slotProps.page.title"
          :color="buttonColor(slotProps.index)"
          class="alt-menu-item"
          mode="sharp"
          size="large"
          @click="onChangePage(slotProps.page.id)"
        />
      </template> -->
    </cloubi-main-menu-grid>
  </main>
</template>

<script>
export default {
  name: 'CloubiThemeMenu',

  props: {
    pageId: { type: String, required: true },
    pageTitle: { type: String, default: 'Default Title' },
    materialApi: { type: Object, required: true }
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

    this.materialApi.onPageChange(() => {
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
        for (let i = 0; i < breadcrumb.length; i += 1) {
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
    },

    buttonColor(index) {
      const colors = ['default','primary','success','warning'];
      return colors[index % colors.length];
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
    margin-top: 60px;
    margin-bottom: 60px;
    font-size: 5rem;
  }
}
</style>
