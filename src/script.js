import setUpPublicPath from './public-path';
import './style.scss';

import Vue from 'vue';
// #TODO: here we register default translations from component library,
// this should not be here in the production code.
// These are used by registered TranslationPlugin
import {
  translations,
  CloubiTranslations
} from 'cloubi2-default-product-theme-components-vue';

import CloubiProductThemeComponents from 'cloubi2-default-product-theme-components-vue';

import { MaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';
import { PlaylistApiWrapper } from 'cloubi2-default-product-theme-components-vue';
import { UserApiWrapper } from 'cloubi2-default-product-theme-components-vue';

import CloubiThemeFrame from './components/CloubiThemeFrame';
import CloubiThemeMenu from './components/CloubiThemeMenu';
import TranslationPlugin from './plugin/TranslationPlugin';

import { default as userApiDev } from '../devel/api/UserApi.js';

CloubiTranslations.registerTranslations(translations); // TODO: REMOVE THIS FOR REAL ENVIRONMENT

Vue.use(TranslationPlugin);
Vue.use(CloubiProductThemeComponents);

setUpPublicPath.then(() => {
  Cloubi.load(
    ['fi.cloubi.frontend/material', 'fi.cloubi.frontend/settings'],
    (material, settings) => {
      const materialApi = new MaterialApiWrapper(material);
      const playlistApi = new PlaylistApiWrapper(); // TODO: supply playlist api
      const userApi = new UserApiWrapper(userApiDev); // TODO: supply user api

      const eventBus = new Vue();

      /**
       * Register your own stores as modules here, with registerModule
       * Ex. store.registerModule('', myModule);
       */

      material.registerPageContentTypeRenderer(
        'navigation/menu',
        (page, contentId, callback) => {
          console.log('navigation/menu render =>');

          const themeMenu = new Vue({
            render: h =>
              h(CloubiThemeMenu, {
                props: { pageId: page.id, pageTitle: page.title, materialApi }
              })
          });

          themeMenu.$mount();

          const content = document.getElementById(contentId);
          content.appendChild(themeMenu.$el);

          callback();
        }
      );

      material.onPageChange(page => {
        console.log('script.js onPageChange =>');
        console.log(page);

        window.scrollTo(0, 0);
      });

      // Wait until material is fully loaded and we know what the current page is.
      material.onMaterialReady(() => {
        if (settings.frameEnabled) {
          // If frame is enabled, show it

          /* new Vue({
              store,
              el: document.getElementById('top-content'),
              render: h => h(ThemeTopbar, {props: {materialApi:materialApi,eventBus}})
            }); */

          const contentElement = document.getElementById('content');

          const frame = new Vue({
            render: h =>
              h(CloubiThemeFrame, {
                props: { materialApi, eventBus, playlistApi, userApi }
              })
          });

          const contentParentElement = contentElement.parentElement;

          frame.$mount();
          contentParentElement.appendChild(frame.$el);

          const contentMountElement = document.getElementById('content-mount');
          contentMountElement.parentElement.replaceChild(
            contentElement,
            contentMountElement
          );

          // The blank navigation model does not load current page automatically,
          // in case we wanted to add some custom rendering logic to it.
          // But now we just load the current page.
          material.getCurrentPage(page => {
            material.changePage(page.id);
          });
        }
      });
    }
  );
});
