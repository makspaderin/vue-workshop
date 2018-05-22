const pages = (materialApi) => {

  return {
    namespaced: true,
    state: {
      pageOfChildPages: '-1',
      pageChildPages: [],
      currentPage: {},
      lastPage: null,
    },
    mutations: {
      $setPageChildPages(state, {pageId, pages}) {
        state.pageOfChildPages = pageId;
        state.pageChildPages = pages;
      },
      $setLastPage(state, page) {
        state.lastPage = page;
      },
      setCurrentPage(state, page) {
        state.currentPage = page;
      }
    },
    actions: {
      init({state, commit}) {
      },
      loadPageChildPages({state, commit}, pageId) {
        if (pageId !== state.pageOfChildPages) {
          return materialApi.getPageChildPages(pageId, null)
          .then(pages => {
            commit('$setPageChildPages', {pageId, pages});
          });
        } else {
          return Promise.resolve();
        }
      },
      loadLastVisitedPage({state, commit}) {
        return materialApi.getLastPage().then(lastPage => {
          commit('$setLastPage', lastPage);
        });
      }
    },
    getters: {
      lastVisitedPageId(state) {
        if (state.lastPage && state.pageChildPages.length) {
          const breadcrumb = state.lastPage.breadcrump;
          for (let i = 0; i < breadcrumb.length; i++) {
            const foundPage = state.pageChildPages.find(p => p.id === breadcrumb[i]);
            if (foundPage) {
              return foundPage.id;
            }
          }  
        }
        return null;        
      }
    }
  }
};

export default pages;