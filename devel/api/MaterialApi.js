import material from './fakematerial.json';
import { setTimeout } from 'timers';

var currentPageId = "1";
var onPageStartsLoadingListeners = [];
var onPageChangeListeners = []

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
        this.changePage('1')
    },

    changeToPreviousPage: function() {
        this.changePage('11')
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
      }, 20);      
    }
}

export default materialApi;