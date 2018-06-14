export default new Promise(resolve => {
  /* eslint-disable no-undef */
  Cloubi.load(['fi.cloubi.frontend/settings'], settings => {
    /* eslint-disable camelcase */
    __webpack_public_path__ = `${settings.productThemeDir}/`;
    resolve();
  });
});
