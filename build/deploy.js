const fs = require('fs');
const path = require('path');
const PropertiesReader = require('properties-reader');
const themeProperties = PropertiesReader('src/theme.properties');

const zipFileName = themeProperties.get('name')+'.zip';
const zipFile = path.resolve(__dirname, '../dist', zipFileName ) 

const userProperties = PropertiesReader('user.properties');

const target = path.resolve(userProperties.get('local.server.deploy.dir'),zipFileName);

fs.copyFile( zipFile, target, err => {
  if(!err) {
    console.log('Deployed '+zipFile+' to '+target );
  } else {
    console.error(err.message);
  }
})