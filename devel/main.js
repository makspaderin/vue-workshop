import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

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

// materialApiWrapper.onPageChange(page => {

//   if (page.contentType !== 'navigation/menu') {

//     let contentMountElement = document.getElementById('content-mount');

//     let contentDiv = document.createElement("div");
//     let contentText = document.createTextNode("new replacement element.");
//     contentDiv.appendChild(contentText);
    
//     contentMountElement.parentElement.replaceChild(contentDiv, contentMountElement);
            
//   }

// });


// set default page
materialApi.getCurrentPage(function(page) {
  materialApi.changePage(page.id);
});

