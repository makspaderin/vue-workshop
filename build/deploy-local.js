const fs = require('fs');
const path = require('path');
const PropertiesReader = require('properties-reader');
const themeProperties = PropertiesReader('src/theme.properties');

const zipFileName = themeProperties.get('name')+'.zip';
const zipFile = path.resolve(__dirname, '../dist', zipFileName) 

const target = path.resolve(__dirname, '../../deploy', zipFileName);

fs.copyFile( zipFile, target, err => {
  if(!err) {
    console.log('Deployed '+zipFile+' to '+target );
  } else {
    console.error(err.message);
  }
})
