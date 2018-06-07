import Vue from 'vue';
import App from './App.vue';
import Content from './Content.vue';
import VDragged from 'v-dragged';

import MaterialApi from './api/MaterialApi';
import UserApi from './api/UserApi';

import { MaterialApiWrapper, PlaylistApiWrapper, UserApiWrapper } from 'cloubi2-default-product-theme-components-vue';
import CloubiProductThemeComponents from 'cloubi2-default-product-theme-components-vue';
import materialApi from './api/MaterialApi';
import userApi from './api/UserApi';

import TranslationPlugin from '../src//plugin/TranslationPlugin';
import CloubiThemeMenu from '../src/components/CloubiThemeMenu';

import { translations, CloubiTranslations } from 'cloubi2-default-product-theme-components-vue';
CloubiTranslations.registerTranslations(translations);


const materialApiWrapper = new MaterialApiWrapper(materialApi);
const playlistApiWrapper = new PlaylistApiWrapper();
const userApiWrapper = new UserApiWrapper(userApi);

Vue.use(VDragged);
Vue.use(TranslationPlugin);
Vue.use(CloubiProductThemeComponents);

const app = new Vue({
    el: '#app',
    render: h => h(App, 
      {
        props: {
          materialApi: materialApiWrapper, 
          playlistApi: playlistApiWrapper,
          userApi: userApiWrapper
        }
      }
    )
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

  if (/*page.contentType === 'navigation/menu'*/page.navigation) {

    let contentMountElement = document.getElementById('content-frame');   

    themeMenu = new Vue({
      render: h => h(CloubiThemeMenu, { props: {pageId: page.id, pageTitle: page.title, materialApi: materialApiWrapper} })
    });

    themeMenu.$mount();

    contentMountElement.appendChild(themeMenu.$el);
            
  } else {  

    let contentMountElement = document.getElementById('content-mount');   

    let dummyContent = new Vue({
      render: h => h(Content, { props: {header: page.title} })
    });

    dummyContent.$mount();

    contentDiv = dummyContent.$el;    
    
    contentMountElement.appendChild(contentDiv);
    
  }

});

materialApi.changePage('1');

