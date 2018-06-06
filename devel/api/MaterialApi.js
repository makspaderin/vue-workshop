//import material from './fakematerial.json';
import { setTimeout } from 'timers';
import { createNotesApi } from './NotesApi.js';
import { genMaterial, findNode } from './MaterialGen';


import materialNotes from './fakenotes.json';
const notesApi = createNotesApi(materialNotes);

var onPageStartsLoadingListeners = [];
var onPageChangeListeners = []
var fontSize = 1;
var previousPageNode = null;
var _root = genMaterial();
console.log(_root);
var currentPageNode = findNode(_root, '1');

// makes Material.js API page from node
const makePage = (node) => {

  const makeBreadcrump = (node) => {
    let b = [];
    let n = node;
    while(1) {
      b.push(n.id);
      n = n.parent;
      if (!n) break;
    }
    return b.reverse();
  }
  
  return {
    id: node.id,
    title: node.title,
    breadcrump: makeBreadcrump(node),
    childPages: node.children.map(c => c.id),
    navigation: node.navigation,
    contentType: node.type
  };
} 

var materialApi = {

    onPageStartsLoading: function(callback) {
        onPageStartsLoadingListeners.push(callback);
    },

    onPageChange: function(callback) {
        onPageChangeListeners.push(callback);
    },

    changePage: function(pageId) {
        setTimeout(() => {

          let pageNode = findNode(_root, pageId);
          if (pageNode.type === 'navigation/menu' && !pageNode.navigation) {
            pageNode = pageNode.children[0];
          }

          previousPageNode = currentPageNode;
          currentPageNode = pageNode;

          let options = {};
          let data = {};

          let promises = onPageStartsLoadingListeners.map(callback => callback(makePage(pageNode), options));

          Promise.all(promises).then(() => {

              onPageChangeListeners.map(callback => callback(makePage(pageNode), options, data));

          })


        }, 20);
    },

    changeToNextPage: function() {
      const self = this;
      const index = currentPageNode.parent.children.findIndex(c => c.id === currentPageNode.id);
      console.log('next page');
      console.log(currentPageNode);
      console.log(index);
      self.changePage(currentPageNode.parent.children[index+1].id);
    },

    changeToPreviousPage: function() {
      const self = this;
      const index = currentPageNode.parent.children.findIndex(c => c.id === currentPageNode.id);
      console.log('prev page');
      console.log(currentPageNode);
      console.log(index);
      self.changePage(currentPageNode.parent.children[index-1].id);
    },

    getCurrentPage: function(callback) {

        setTimeout(() => {

          let options = {};
          let data = {};

          callback(makePage(currentPageNode), options, data);

        }, 20);
    },

    getPage: function(pageId, callback) {
      setTimeout(() => {

        const pageNode = findNode(_root, pageId);

        let options = {};
        let data = {};
        callback(makePage(pageNode), options, data);
          
      }, 20);
    },

    getPageChildPages: function(pageId, options, callback) {
      setTimeout(() => {

        const pageNode = findNode(_root, pageId);
        
        const childPages = pageNode.children.map(c => makePage(c));

        callback(childPages);
      }, 20);
    },

    getPageLevelPages: function(pageId, callback) {
      setTimeout(() => {
        const pageNode = findNode(_root, pageId);
        if(!pageNode){
          callback(null);
        }
        else {
          const levelPages = pageNode.parent.children.map(c => makePage(c));
          callback(levelPages);
        }
      }, 20);
    },

    getLastPage: function(callback) {
      setTimeout(() => {
        callback(makePage(previousPageNode));
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