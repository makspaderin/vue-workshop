import setUpPublicPath from './public-path'
import './style.scss'
import Vue from 'vue'

import { MaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';
import Placeholder from './components/Placeholder';

setUpPublicPath.then(() => {

    Cloubi.load(['fi.cloubi.frontend/material', 'fi.cloubi.frontend/settings'], function(material, settings) {
        
        const materialApi = new MaterialApiWrapper(material);

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