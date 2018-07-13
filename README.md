# Cloubi default Vue product theme

Default Vue.js product theme

## Usage

### Install

`npm install`

### Build

`npm run build`

### Deploy to local Cloubi 2 instance

Copy user.properties.template as user.properties and change local.server.deploy.dir property so it points to your local Cloubi 2 deploy directory.

`npm run deploy` will build and deploy product theme to your local Cloubi 2.

### Customizing theme

`config/sasVars.js`
Can be used to change theme colors fonts and certain dimensions.

For further customisation you can implement your own versions of components used by the theme.
