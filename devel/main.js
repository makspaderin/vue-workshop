import Vue from 'vue';

import CloubiProductThemeComponents, {
  MaterialApiWrapper,
  PlaylistApiWrapper,
  UserApiWrapper,
  translations,
  CloubiTranslations
} from 'cloubi2-default-product-theme-components-vue';

import App from './App.vue';
import Content from './Content.vue';

import materialApi from './api/MaterialApi';
import userApi from './api/UserApi';

import TranslationPlugin from '../src//plugin/TranslationPlugin';
import CloubiThemeMenu from '../src/components/CloubiThemeMenu.vue';

CloubiTranslations.registerTranslations(translations);

const materialApiWrapper = new MaterialApiWrapper(materialApi);
const playlistApiWrapper = new PlaylistApiWrapper();
const userApiWrapper = new UserApiWrapper(userApi);

Vue.use(TranslationPlugin);
Vue.use(CloubiProductThemeComponents);

const eventBus = new Vue();

const app = () =>
  new Vue({
    el: '#app',
    render: h =>
      h(App, {
        props: {
          materialApi: materialApiWrapper,
          playlistApi: playlistApiWrapper,
          userApi: userApiWrapper,
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

    contentMountElement.appendChild(contentDiv);
  }
});

materialApi.changePage('1');
