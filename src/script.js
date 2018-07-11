import Vue from 'vue';

import CloubiProductThemeComponents, {
  translations,
  CloubiTranslations,
  MaterialApiWrapper,
  PlaylistApiWrapper,
  AccountApiWrapper,
  NotesApiWrapper,
  PageTurners,
  // TODO: remove these dummies:
  PlaylistApi as playlistApiDev
} from 'cloubi2-default-product-theme-components-vue';

import setUpPublicPath from './public-path';
import './style.scss';

import CloubiThemeFrame from './components/CloubiThemeFrame.vue';
import CloubiThemeMenu from './components/CloubiThemeMenu.vue';
import TranslationPlugin from './plugin/TranslationPlugin';

CloubiTranslations.registerTranslations(translations); // TODO: REMOVE THIS FOR REAL ENVIRONMENT

Vue.use(TranslationPlugin);
Vue.use(CloubiProductThemeComponents);

setUpPublicPath.then(() => {
  /* eslint-disable no-undef */
  Cloubi.load(
    [
      'fi.cloubi.frontend/material',
      'fi.cloubi.frontend/settings',
      'fi.cloubi.frontend/account',
      'fi.cloubi.frontend/notes'
    ],
    (material, settings, account, notes) => {
      const materialApi = new MaterialApiWrapper(material);
      const accountApi = new AccountApiWrapper(account);
      const notesApi = new NotesApiWrapper(notes);
      const playlistApi = new PlaylistApiWrapper(playlistApiDev); // TODO: supply real playlist api

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

        let contentStart = document.querySelector('.cb-content-begin');

        if (contentStart === null) {
          contentStart = document.getElementById('content');
        }

        const pageTurners = new Vue({
          render: h =>
            h(PageTurners, {
              props: {
                materialApi,
                sidePanelId: 'main',
                sidePanelPosition: 'left',
                anchorElementSelector: '.cb-content-begin',
                eventBus
              }
            })
        });

        pageTurners.$mount();

        contentStart.appendChild(pageTurners.$el);
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
                props: {
                  materialApi,
                  eventBus,
                  playlistApi,
                  accountApi,
                  notesApi
                }
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
