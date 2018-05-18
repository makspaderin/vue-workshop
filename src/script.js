import setUpPublicPath from './public-path'
import './style.scss'
import Vue from 'vue'

import Placeholder from './components/Placeholder.vue'

setUpPublicPath.then(() => {

    Cloubi.load(['fi.cloubi.frontend/material', 'fi.cloubi.frontend/settings'], function(material, settings) {

        // Wait until material is fully loaded and we know what the current page is.
        material.onMaterialReady(function() {
            if (settings.frameEnabled) {
                // If frame is enabled, show it 
               
            }

            // The blank navigation model does not load current page automatically,
            // in case we wanted to add some custom rendering logic to it.
            // But now we just load the current page.
            material.getCurrentPage(function(page) {
                material.changePage(page.id);
            });
        });
    });

});