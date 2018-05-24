import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import ThemeMenu from '../src/components/ThemeMenu';

import MaterialApi from './api/MaterialApi';
import { createStore } from '../src/store';

import { MaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';
import materialApi from './api/MaterialApi';

Vue.use(Vuex);

const materialApiWrapper = new MaterialApiWrapper(MaterialApi);

const store = createStore(materialApiWrapper);

const app = new Vue({
    el: '#app',
    store,
    render: h => h(App, {props: {materialApi:materialApiWrapper}})
});

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

  if (page.contentType === 'navigation/menu') {

    let contentMountElement = document.getElementById('content-frame');   

    themeMenu = new Vue({
      store,
      render: h => h(ThemeMenu, { props: {pageId: page.id, pageTitle: page.title, materialApi: materialApiWrapper} })
    });

    themeMenu.$mount();

    contentMountElement.appendChild(themeMenu.$el);
            
  } else {  

    let contentMountElement = document.getElementById('content-frame');   

    contentDiv = document.createElement("div");
    let contentText = document.createTextNode("new replacement element.");
    contentDiv.appendChild(contentText);  
    
    contentMountElement.appendChild(contentDiv);
    
  }

});


// set default page
materialApi.getCurrentPage(function(page) {
  materialApi.changePage(page.id);
});

