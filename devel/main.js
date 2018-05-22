import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

import MaterialApi from './api/MaterialApi';
import { createStore } from '../src/store';
import MaterialApiWrapper from '../src/util/MaterialApiWrapper';

import { MaterialApiWrapper as ComponentMaterialApiWrapper } from 'cloubi2-default-product-theme-components-vue';

Vue.use(Vuex);

console.log(ComponentMaterialApiWrapper);

const store = createStore(new MaterialApiWrapper(MaterialApi));

new Vue({
    el: '#app',
    store,
    render: h => h(App, {props: {materialApi:new ComponentMaterialApiWrapper(MaterialApi)}})
});

