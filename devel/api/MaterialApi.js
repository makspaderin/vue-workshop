import material from './fakematerial.json';
import { setTimeout } from 'timers';
import { createNotesApi } from './NotesApi.js';

const notesApi = createNotesApi(material);

var currentPageId = "1";
var onPageStartsLoadingListeners = [];
var onPageChangeListeners = []
var fontSize = 1;

var materialApi = {

    onPageStartsLoading: function(callback) {
        onPageStartsLoadingListeners.push(callback);
    },

    onPageChange: function(callback) {
        onPageChangeListeners.push(callback);
    },

    changePage: function(pageId) {
        setTimeout(() => {

            currentPageId = pageId;
            let options = {};
            let data = {};

            let promises = onPageStartsLoadingListeners.map(callback => callback(material.pages[currentPageId], options));

            Promise.all(promises).then(() => {

                onPageChangeListeners.map(callback => callback(material.pages[currentPageId], options, data));

            })


        }, 20);
    },

    changeToNextPage: function() {
      const self = this;
      self.getCurrentPage(function(page){
        if(page.nextPage){
          self.changePage(page.nextPage)
        }
      })
    },

    changeToPreviousPage: function() {
      const self = this;
      self.getCurrentPage(function(page){
        if(page.prevPage){
          self.changePage(page.prevPage)
        }
      })
    },

    getCurrentPage: function(callback) {

        setTimeout(() => {

            let options = {};
            let data = {};

            callback(material.pages[currentPageId], options, data);

        }, 20);
    },

    getPage: function(pageId, callback) {
        setTimeout(() => {
            const page = material.pages[pageId];
            let options = {};
            let data = {};
            callback(page, options, data);

        }, 20);
    },

    getPageChildPages: function(pageId, options, callback) {
      setTimeout(() => {

        const page = material.pages[pageId];
        
        const childPages = page.childPages.map(id => material.pages[id]);

        callback(childPages);
      }, 20);
    },

    getPageLevelPages: function(pageId, callback) {
      setTimeout(() => {
        const page = material.pages[pageId];
        if(!page){
          return [];
        }
        else if(page.breadcrump.length > 1) {
          const parentId = page.breadcrump.slice(-2)[0];
          const parentPage = material.pages[parentId];
          callback(parentPage.childPages.map(id => material.pages[id]));
        }
        else {
          this.getPageChildPages(material.root, {}, function(pages){
            callback(pages);
          });
        }
      }, 20);
    },

    getLastPage: function(callback) {
      setTimeout(() => {
        callback(material.pages['11']);
      }, 500);      
    },

    getFontSize: function() {
      return fontSize;
    },

    setFontSize: function(size) {
      fontSize = size;
    },

    ...notesApi,

}

export default materialApi;