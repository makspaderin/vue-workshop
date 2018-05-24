import setUpPublicPath from './public-path'
import './style.scss'
import Vue from 'vue'
import Vuex from 'vuex'

// import MenuPage from './components/MenuPage';
import { createStore } from './store';

import ThemeTopbar from './components/ThemeTopbar';
import ThemeFrame from './components/ThemeFrame';
import ThemeMenu from './components/ThemeMenu';

import { MaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';

Vue.use(Vuex);

import VDragged from 'v-dragged';
import ProductThemeComponents from 'cloubi2-default-product-theme-components-vue';

Vue.use(VDragged);
Vue.use(ProductThemeComponents);

setUpPublicPath.then(() => {

    Cloubi.load(['fi.cloubi.frontend/material', 'fi.cloubi.frontend/settings'], function(material, settings) {
        
        const materialApi = new MaterialApiWrapper(material);

        const store = createStore(materialApi);

        const eventBus = new Vue();

        /**
         * Register your own stores as modules here, with registerModule
         * Ex. store.registerModule('', myModule);
         */

        material.registerPageContentTypeRenderer('navigation/menu', function(page, contentId, callback) {
          
          console.log('navigation/menu render =>');

          let themeMenu = new Vue({
            store,
            render: h => h(ThemeMenu, { props: {pageId: page.id, pageTitle: page.title, materialApi} })
          });
    
          themeMenu.$mount();
    
          var content = document.getElementById(contentId);
          content.appendChild(themeMenu.$el);
    
          callback();
         
        });

        material.onPageChange((page) => {
          store.dispatch('pages/setCurrentPage', page);
        });
    
        // Wait until material is fully loaded and we know what the current page is.
        material.onMaterialReady(function() {
            if (settings.frameEnabled) {
              // If frame is enabled, show it

            /*new Vue({
              store,
              el: document.getElementById('top-content'),
              render: h => h(ThemeTopbar, {props: {materialApi:materialApi,eventBus}})
            });*/

            const contentElement = document.getElementById('content');
            
            let frame = new Vue({
              store,
              render: h => h(ThemeFrame, { props: {materialApi:materialApi,eventBus} })
            });
      
            let contentParentElement = contentElement.parentElement;

            frame.$mount();
            contentParentElement.appendChild(frame.$el);

            let contentMountElement = document.getElementById('content-mount');
            contentMountElement.parentElement.replaceChild(contentElement, contentMountElement);
                    
            // The blank navigation model does not load current page automatically,
            // in case we wanted to add some custom rendering logic to it.
            // But now we just load the current page.
            material.getCurrentPage(function(page) {
              material.changePage(page.id);
            });
          }
        });
    });

});