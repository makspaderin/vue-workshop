import Vue from 'vue';

/* eslint-disable-next-line */
import VueAxe from 'vue-axe';

import CloubiProductThemeComponents, {
  MaterialApiWrapper,
  PlaylistApiWrapper,
  AccountApiWrapper,
  NotesApiWrapper,
  SearchApiWrapper,
  translations,
  CloubiTranslations,
  PageTurners,
  MaterialApi as materialApi,
  AccountApi as accountApi,
  NotesApi as notesApi,
  PlaylistApi as playlistApi,
  SearchApi as searchApi
} from 'cloubi2-default-product-theme-components-vue';

import App from './App.vue';
import Content from './Content.vue';

import TranslationPlugin from '../src//plugin/TranslationPlugin';
import CloubiThemeMenu from '../src/components/CloubiThemeMenu.vue';

CloubiTranslations.registerTranslations(translations);

const materialApiWrapper = new MaterialApiWrapper(materialApi);
const playlistApiWrapper = new PlaylistApiWrapper(playlistApi);
const accountApiWrapper = new AccountApiWrapper(accountApi);
const notesApiWrapper = new NotesApiWrapper(notesApi);
const searchApiWrapper = new SearchApiWrapper(searchApi);

Vue.use(TranslationPlugin);
Vue.use(CloubiProductThemeComponents);

/* Enable vue-axe by uncommenting the following lines */
/* Vue.use(VueAxe, {
  config: {
    rules: []
  }
}); */

const eventBus = new Vue();

const app = () =>
  new Vue({
    el: '#app',
    render: h =>
      h(App, {
        props: {
          materialApi: materialApiWrapper,
          playlistApi: playlistApiWrapper,
          notesApi: notesApiWrapper,
          accountApi: accountApiWrapper,
          searchApi: searchApiWrapper,
          eventBus
        }
      })
  });

app();

// mount some content...

let contentDiv = null;
let themeMenu = null;

materialApiWrapper.onPageChange(page => {
  if (themeMenu) {
    themeMenu.$el.remove();
    themeMenu = null;
  }

  if (contentDiv) {
    contentDiv.remove();
    contentDiv = null;
  }

  if (/* page.contentType === 'navigation/menu' */ page.navigation) {
    const contentMountElement = document.getElementById('content-frame');

    themeMenu = new Vue({
      render: h =>
        h(CloubiThemeMenu, {
          props: {
            pageId: page.id,
            pageTitle: page.title,
            materialApi: materialApiWrapper
          }
        })
    });

    themeMenu.$mount();

    contentMountElement.appendChild(themeMenu.$el);
  } else {
    const contentMountElement = document.getElementById('content-mount');

    const dummyContent = new Vue({
      render: h => h(Content, { props: { header: page.title } })
    });

    dummyContent.$mount();

    contentDiv = dummyContent.$el;
    contentDiv.setAttribute('role', 'main');
    contentMountElement.appendChild(contentDiv);

    const contentStart = document.getElementById('content-start');

    const pageTurners = new Vue({
      render: h =>
        h(PageTurners, {
          props: {
            materialApi: materialApiWrapper,
            sidePanelId: 'main'
          }
        })
    });

    pageTurners.$mount();

    contentStart.appendChild(pageTurners.$el);
  }
});

materialApi.changePage('1');
