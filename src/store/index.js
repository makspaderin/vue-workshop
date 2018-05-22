import Vuex from 'vuex'

import PagesModule from './modules/pages';
import SettingsModule from './modules/settings';

export const createStore = (materialApi, translate) => {

  const store = new Vuex.Store({
    modules: {
      pages: PagesModule(materialApi),      
      settings: SettingsModule(materialApi)
    }
  });

  store.dispatch('pages/init');
  store.dispatch('settings/init');

  return store;

};

