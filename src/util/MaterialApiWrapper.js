/**
 * Wraps Material.js in promises.
 */

export default class MaterialApiWrapper {
  constructor(materialApi){
    this.materialApi = materialApi;
  }

  getPage(pageId, options) {
    const self = this;
    return new Promise(function(resolve) {
        self.materialApi.getPage(pageId, function(page, options, data){
          resolve({page, options, data})
        });
    });
  }

  onPageChange(callback) {
    this.materialApi.onPageChange(callback);
  }

  getPageChildPages(pageId, options) {
    const self = this;
    return new Promise(function(resolve){
      self.materialApi.getPageChildPages(pageId, options, 
        function(pages) {
          resolve(pages);
      });
    });
  }

  changePage(pageId) {
    this.materialApi.changePage(pageId);
  }

  getPageLevelPages(pageId) {
    const self = this;
    return new Promise(function(resolve){
      self.materialApi.getPageLevelPages(pageId, function(pages){
        resolve(pages);
      });
    });
  }

  getCurrentPage() {
    const self = this;
    return new Promise(function(resolve){
      self.materialApi.getCurrentPage(function(page){
        resolve(page);
      });
    });
  }

  getLastPage() {
    const self = this;
    return new Promise((resolve) => {
      self.materialApi.getLastPage((page) => {
        resolve(page);
      });
    });
  }

}