import setUpPublicPath from './public-path'
import './style.scss'
import Vue from 'vue'
import Vuex from 'vuex'

import Placeholder from './components/Placeholder';
import MenuPage from './components/MenuPage';
import { createStore } from './store';

import MaterialApiWrapper from './util/MaterialApiWrapper';

import { MaterialApiWrapper as ComponentMaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';

Vue.use(Vuex);

setUpPublicPath.then(() => {

    Cloubi.load(['fi.cloubi.frontend/material', 'fi.cloubi.frontend/settings'], function(material, settings) {
        
        const materialApi = new MaterialApiWrapper(material);

        const componentMaterialApi = new ComponentMaterialApiWrapper(material);

        const store = createStore(materialApi);

        material.registerPageContentTypeRenderer('navigation/menu', function(page, contentId, callback) {
          
          console.log('navigation/menu render =>');

          let mainMenu = new Vue({
            store,
            render: h => h(MenuPage, { props: {pageId: page.id, pageTitle: page.title} })
          });
    
          mainMenu.$mount();
    
          var content = document.getElementById(contentId);
          content.appendChild(mainMenu.$el);
    
          callback();
         
        });

        material.onPageChange((page) => {
          store.dispatch('pages/setCurrentPage', page);
        });
    
        // Wait until material is fully loaded and we know what the current page is.
        material.onMaterialReady(function() {
            if (settings.frameEnabled) {
              // If frame is enabled, show it

            new Vue({
              store,
              el: document.getElementById('top-content'),
              render: h => h(Placeholder, {props: {materialApi:componentMaterialApi}})
            });

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