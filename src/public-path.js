export default new Promise((resolve,reject) => {
  
  Cloubi.load(['fi.cloubi.frontend/settings'], function(settings) {
    
    __webpack_public_path__ = settings.productThemeDir+'/';
    resolve();

  });
});


