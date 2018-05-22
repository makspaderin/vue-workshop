
const settings = (materialApi) => {
  return {
    namespaced: true,
    state: {
      fontSize: '1',
    },
    mutations: {
      $setFontSize(state, size) {
        state.fontSize = size;
      }  
    },
    actions: {
      init({state, commit}) {

      },
      setFontSize({state, commit}, size) {
        materialApi.setFontSize(size, () => {
          commit('$setFontSize', size);
        });        
      }
    },
    getters: {

    }
  }
}

export default settings;