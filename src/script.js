import setUpPublicPath from './public-path'
import './style.scss'
import Vue from 'vue'

import { MaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';
import MainMenuPage from 'cloubi2-default-product-theme-components-vue/src/components/MainMenuPage'

import Placeholder from './components/Placeholder';

setUpPublicPath.then(() => {

    Cloubi.load(['fi.cloubi.frontend/material', 'fi.cloubi.frontend/settings'], function(material, settings) {
        
        const materialApi = new MaterialApiWrapper(material);

        material.registerPageContentTypeRenderer('navigation/menu', function(page, contentId, callback) {
          
          console.log('navigation/menu render =>');

          let mainMenu = new Vue({
            render: h => h(MainMenuPage, { props: {pageId: page.id, pageTitle: page.title, materialApi} })
          });
    
          mainMenu.$mount();
    
          var content = document.getElementById(contentId);
          content.appendChild(mainMenu.$el);
    
          callback();
         
        });
    
        // Wait until material is fully loaded and we know what the current page is.
        material.onMaterialReady(function() {
            if (settings.frameEnabled) {
              // If frame is enabled, show it

            new Vue({
              el: document.getElementById('top-content'),
              render: h => h(Placeholder, {props: {materialApi:materialApi}})
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