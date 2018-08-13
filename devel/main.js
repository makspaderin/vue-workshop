import Vue from 'vue';

/* eslint-disable-next-line */
import VueAxe from 'vue-axe';

import CloubiProductThemeComponents, {
  MaterialApiWrapper,
  PlaylistApiWrapper,
  AccountApiWrapper,
  NotesApiWrapper,
  SearchApiWrapper,
  AdditionalContentApiWrapper,
  GamificationApiWrapper,
  translations,
  CloubiTranslations,
  PageTurners,
  FontSizeInit,
  AdditionalContentApi as additionalContentApi,
  MaterialApi as materialApi,
  AccountApi as accountApi,
  NotesApi as notesApi,
  PlaylistApi as playlistApi,
  SearchApi as searchApi,
  GamificationApi as gamificationApi
} from 'cloubi2-default-product-theme-components-vue';

import App from './App.vue';
import Content from './Content.vue';

import TranslationPlugin from '../src/plugin/TranslationPlugin';

import CloubiThemeMenu from '../src/components/CloubiThemeMenu.vue';
import ThemeTranslations from '../src/translations.json';

const combinedTranslations = { ...translations, ...ThemeTranslations };

CloubiTranslations.registerTranslations(combinedTranslations);

const materialApiWrapper = new MaterialApiWrapper(materialApi);
const playlistApiWrapper = new PlaylistApiWrapper(playlistApi, materialApi);
const accountApiWrapper = new AccountApiWrapper(accountApi);
const notesApiWrapper = new NotesApiWrapper(notesApi);
const searchApiWrapper = new SearchApiWrapper(searchApi);
const additionalContentApiWrapper = new AdditionalContentApiWrapper(
  additionalContentApi
);
const gamificationApiWrapper = new GamificationApiWrapper(gamificationApi);

Vue.use(TranslationPlugin);
Vue.use(CloubiProductThemeComponents);

/* Enable vue-axe by uncommenting the following lines */
/* Vue.use(VueAxe, {
  config: {
    rules: []
  }
}); */

// Init gamification api dummy

export function initGamificationApi(gamificationApi) {
  const MAX_AVATARS = 10;
  const MAX_BADGES = 10;
  const MAX_TROPHIES = 10;
  const MAX_DIPLOMAS = 3;

  let avatars = [];
  for (let i = 0; i < MAX_AVATARS; i++) {
    avatars[i] = require(`../assets/avatars/cloubiavatar (${i + 1}).png`);
  }

  let badgeNames = [
    'First task',
    'Tripple stars',
    'Global',
    'Collector',
    'Diamons are forever',
    'Gamer',
    'Bulls eye',
    'Finnished',
    'Topped',
    'Collaborator',
    'A good listener',
    'Multitasking',
    'Marked',
    'Book worm',
    'No brainer',
    'Quickes way out'
  ];

  let badges = [];
  for (let i = 0; i < MAX_BADGES; i++) {
    badges[i] = {
      id: 'b' + i,
      name: badgeNames[i],
      image: require(`../assets/achievements/cloubibadge (${i + 1}).png`),
      imageDisabled: require('../assets/achievements/cloubibadge_disabled.png'),
      notificationText: 'Congratulations! You got a badge!'
    };
  }

  let trophies = [];
  for (let i = 0; i < MAX_TROPHIES; i++) {
    trophies[i] = {
      id: 't' + i,
      name: `Trophy${i + 1}`,
      image: require('../assets/achievements/trophy(1).png'),
      imageDisabled: require('../assets/achievements/trophy_disabled.png'),
      notificationText: 'Congratulations! You got a trophy!'
    };
  }

  let diplomas = [];
  for (let i = 0; i < MAX_DIPLOMAS; i++) {
    diplomas[i] = {
      id: 'd' + i,
      name: 'Diploma ' + badgeNames[i],
      image: require('../assets/achievements/trophy(1).png'),
      imageDisabled: require('../assets/achievements/trophy_disabled.png'),
      notificationText: 'Congratulations! You got a diploma!'
    };
  }

  gamificationApi.init({
    avatars,
    items: {
      keys: ['badges', 'trophies', 'diplomas'],
      names: {
        badges: 'Badges',
        trophies: 'Trophies',
        diplomas: 'Diplomas'
      },
      badges,
      trophies,
      diplomas
    },
    user: {
      name: 'Bradyn Strickland',
      firstLoggedIn: '16.06.2018',
      avatar: avatars[0],
      medalImages: [require('../assets/avatars/glasses.png')],
      points: 130,
      items: [
        {
          id: 'b0',
          counter: 1
        },
        {
          id: 'b1',
          counter: 2
        },
        {
          id: 'b2'
        },
        {
          id: 't0'
        },
        {
          id: 't3'
        },
        {
          id: 'd0'
        }
      ]
    }
  });
}

initGamificationApi(gamificationApi);

const eventBus = new Vue();

FontSizeInit(materialApiWrapper, eventBus);

const app = () =>
  new Vue({
    el: '#app',
    render: h =>
      h(App, {
        props: {
          materialApi: materialApiWrapper,
          playlistApi: playlistApiWrapper,
          notesApi: notesApiWrapper,
          accountApi: accountApiWrapper,
          searchApi: searchApiWrapper,
          additionalContentApi: additionalContentApiWrapper,
          gamificationApi: gamificationApiWrapper,
          eventBus
        }
      })
  });

app();

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

  if (/* page.contentType === 'navigation/menu' */ page.navigation) {
    const contentMountElement = document.getElementById('content-frame');

    themeMenu = new Vue({
      render: h =>
        h(CloubiThemeMenu, {
          props: {
            pageId: page.id,
            pageTitle: page.title,
            materialApi: materialApiWrapper
          }
        })
    });

    themeMenu.$mount();

    contentMountElement.appendChild(themeMenu.$el);
  } else {
    const contentMountElement = document.getElementById('content-mount');

    const dummyContent = new Vue({
      render: h => h(Content, { props: { header: page.title } })
    });

    dummyContent.$mount();

    contentDiv = dummyContent.$el;
    contentDiv.setAttribute('role', 'main');
    contentMountElement.appendChild(contentDiv);

    const contentStart = document.getElementById('content-start');

    const pageTurners = new Vue({
      render: h =>
        h(PageTurners, {
          props: {
            playlistApi: playlistApiWrapper,
            materialApi: materialApiWrapper,
            sidePanelId: 'main'
          }
        })
    });

    pageTurners.$mount();

    contentStart.appendChild(pageTurners.$el);
  }
});

materialApi.changePage('1');
