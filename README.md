# Cloubi Default Vue Product Theme Quickstart Guide

## Table of contents
1. [Introduction](#introduction)
2. [Running the server theme on a server](#run-server)
3. [Customising the theme](#customising-theme)
4. [FAQ](#faq)

# Terms
| Term | Definition |
| ---- | ---------- |
| Cloubi 2 server | A server that has the real Cloubi 2 backend. |
| Node.js server | A development server that is run using the `npm run dev` command and utilises Node.js. |
| Dummy API | An API implementation that only somewhat mimics the functionalities of the API, yet enables developing components that utilise it. |
| Content or Page Content | The main content on the page that is defined in the product and is provided by the server. |
| Frame or Theme Frame | The theme's user interface overlay. |

## <a name="introduction"></a> Introduction

The Cloubi Vue Product Theme consists of two parts: the theme definition and the theme UI component library ([cloubi2-default-product-theme-components-vue](https://github.com/ubiikkiltd/cloubi2-default-product-theme-components-vue)).

![alt text](https://github.com/ubiikkiltd/cloubi2-default-product-theme-vue/blob/dev/doc/Theme%20Project%20Modules.png?raw=trueg "Product Theme Modules")

The purpose of the theme is to define a layout for the product and to define theme-specific behaviours. It can be built using the components found in the UI component library, which provides ready-to-use UI elements that utilise to the Cloubi APIs. It is recommended to familiarise oneself also with the UI component library, when building a theme. It should be a good basis for developing custom themes and components.

These instructions cover the basic development use-cases for the theme project and a [FAQ](#faq).

## <a name="run-server"></a> Running the theme on a server

A TL;DR version of this section's instructions:

Running the theme on a Cloubi 2 server:
1. run `npm install` (needs to be done only once or if dependencies change)
2. copy *user.properties.template* as *user.properties*
3. change *local.server.deploy.dir* to the cloubi 2 server deployment directory
4. make sure the Cloubi 2 server is running and fully booted up
5. run `npm run deploy`.

Running a Node.js development server:
1. run `npm install` (if not done already)
2. run `npm run dev`.

> Make sure to boot the Cloubi 2 server first, if you are intending to run both the Cloubi 2 server and the Node.js development server simultaneously. Otherwise the default port for the Cloubi server will be blocked by the development server.

The rest of the section describes these processes in more detail.

### Install

The theme has external dependencies such as the cloubi2-default-product-theme-components-vue-module. In order to load these dependencies to the local machine, run the
`npm install`
command.

### Build

`npm run build`

### <a name="deploy-local"></a>Deploy to local Cloubi 2 instance

The theme can be deployed to the a local Cloubi server to test it with a real server backend. A version of the Cloubi server can be found in the [cloubi-2-vagrant](https://github.com/ubiikkiltd/cloubi-2-vagrant)-repository. That repository also includes the setup instructions for it.

To deploy the theme to a server, first set the deployment target directory. It is done by copying *user.properties.template* as *user.properties* and changing *local.server.deploy.dir* property, so it points to your local Cloubi 2 deploy directory.

After the server directory has been set and the server has booted up, build and deploy product theme to your local Cloubi 2 by running
`npm run deploy`.

Note that any changes made to the theme requires a re-deployment to take effect on the server.

> This method compiles the theme script files using the `src/script.js`-file as its entry point script. Changes made to that file **only apply** to the **deployed** theme.

### Run a Node.js development server

To run the theme in a more rudimentary Node.js development server, run
`npm run dev`.
This server includes a hot-reload-mechanism, which automatically updates the browser with the edits made to the theme. Thus, it can be used to quickly iterate changes to it. However, it is strongly advised to test the theme against a real Cloubi server and its APIs (as described in [Deploy to local Cloubi 2 instance](#deploy-local)), as the Node.js development server does **not** fully represent the real server behaviour. It uses dummy implementations of the Cloubi APIs instead.

> This method uses the `devel/main.js`-file as its entry point script. Changes made to that file **only apply** to the **development** version of the theme.

## <a name="customising-theme"></a> Customising the theme

There are 4 main ways of customising the theme: [overwriting sass-variables for the UI component library](#overwrite-sass), [overwrite component styles](#overwrite-component-styles), [redefining the layout](#redefine-layout), and [rewriting the UI components](#rewrite-ui-components) in the component library. Their usage is covered in the following chapters.

### <a name="overwrite-sass"></a> Overwriting sass-variables

The UI component library uses SASS to define global CSS values, such as colours, fonts, and font sizes. These can be overriden by altering
`config/sassVars.js`-file in the theme-project.

All of the alterable SASS-values are defined in the [cloubi2-default-product-theme-components-vue/src/_variables.scss](https://github.com/ubiikkiltd/cloubi2-default-product-theme-components-vue/blob/master/src/_variables.scss)-file.

For example, editing the heading font of the theme could be done by adding the following property somewhere in the `module.exports`-object, defined in the `config/sassVars.js`-file.
```
module.exports = {
  ...
  'cloubi-font-stack-heading': 'arial, sans-serif'
  ...
};
```

Note that the name of the value does not have the leading $-symbol.

> Changing the font for the icons might not work directly through these values, because the names of the icons might not correspond to the component library's icon font's naming convention.

### <a name="overwrite-component-styles"></a> Overwriting component styles

All components in cloubi-default-theme-components-vue use non scoped, and hierarchically named styles.
You can redefine these styles to alter the looks of the components in your theme.

You can do this in *.vue files <styles> section:
```
...
  <styles>
  .cb-main-menu-item {
    background: yellow;

    .cb-main-menu-item-image {
      display: none;
    }

  }
...
```
Or in separate *.scss file, for example in `style.scss`:
```
...
  .cb-main-menu-item {
    background: yellow;

    .cb-main-menu-item-image {
      display: none;
    }

  }
...
```

The example would give you main menu with no images.

### <a name="redefine-layout"></a> Redefining the layout

The theme layout is defined in the `src/components`-Vue-files. These can be altered to change the layout and behaviour of the theme.

The Vue component files are divided into three different sections: template, script and style. The template defines the DOM-structure of the component, the script its behaviour and the style its CSS.

The theme Vue files support either SASS or pure CSS style definitions. To enable SASS compilation, add the `lang="scss"` attribute to the style tag as follows:
```
<style lang="scss">
```

If left as default
```
<style>
```
the the style compiler will use only pure CSS.

The Vue component styles can also be `scoped`. This means that the CSS only applies to the component defined in that specific Vue-file and do not "leak" to other components.

Scoped styles can be defined by adding the `scoped` field in the tag:
```
<style scoped>
```
or
```
<style lang="scss" scoped>
```

> Theme-specific content styling is defined in `src/_content.scss`. If the page content itself requires styles, implement them there.

### <a name="rewrite-ui-components"></a> Rewriting UI components

If the UI components do not fit the theme after changing the sass variables, it is possible to clone the *cloubi2-default-product-theme-components-vue*-repository and edit the components directly. In this case, remember to update the `cloubi2-default-product-theme-components-vue` dependency in `package.json` to point to the new UI component library implementation. After editing the dependencies, run `npm install` once to install them.

Your `package.json` for development could look for example like this, where `my-modified-product-theme-components-vue` is your modified version of `cloubi2-default-product-theme-components-vue`:
```
...
  "dependencies": {
    "cloubi2-default-product-theme-components-vue": "file://../my-modified-product-theme-components-vue",
    "vue": "^2.5.16",
...
```

## <a name="faq"></a>FAQ

### <a name="how-to-edit-dev-apis"></a> How do I edit the responses given by the Cloubi APIs in the Node.js development server?

The *cloubi2-default-product-theme-components-vue*-module provides dummy versions of Cloubi APIs i.e. APIs that mimic the behaviour of the real Cloubi APIs to an extent. They are used when running the Node.js development server (`npm run dev`) for the theme. The theme uses the real Cloubi APIs when deployed version to a server (`npm run deploy`).

Making changes to the dummy APIs is possible by either using the development-functions provided them or by copying and editing them. The dev-functions allow redefining the state within the dummy APIs. They are not available in the real Cloubi API and are denoted by the leading $-sign. Changing the state can be done in the `devel/main.js`-file, before the API is injected into the Vue components. If there is a need to change the behaviour of the dummy APIs, create an edited copy of them. Provide them to the theme in the `devel/main.js`-file.

### How come some things behave differently on the `npm run dev` development server and when the theme is actually deployed?

This answer ties in with the [previous question](#how-to-edit-dev-apis). Because the Node.js server, that is run with the `npm run dev`-command only uses a dummy API, it can sometimes behave drastically differently from the actual Cloubi APis. It is heavily encouraged that the theme is deployed for API integration and testing.

Another reason why the theme might behave differently in the two environments is that there are two different entry point scripts. These are the scripts that the server first loads to initiate the theme. Changes made to these files only apply either in the deployment or development environment correspondingly. The deployment script is defined in `src/script.js` and the development is in the `devel/main.js`-file. Remember to apply changes to both of these files.

### The navigation menu is not like the other components in the theme frame. Why?

Navigation menu pages are implemented as a separate component that is rendered direcly into the content response by the server. Therefore it does not need to be explicitly injected by the frame or the theme, when the page is changed. In this theme the component that replaces the default content is the `CloubiThemeMenu`-component. It is set as the renderer for the navigation content type in `src/script.js`.

> It is possible to add a custom renderer for other types of content, too. More information about renderers can be found in the material API documentation.

Altering the navigation page can be done by editing the `CloubiThemeMenu`-component or setting a custom renderer in the `src/script.js`.

### What is the EventBus object?

The event bus is a mechanism that allows components to send events to one another without necessarily sharing a common ancestor that handles events and props. In this theme it is used for simple tasks such as emitting globally an event of opening or closing a view.

> The event bus pattern can cause issues because it introduces implicit dependencies between multiple components. Handling concurrency also can become difficult, when it is used for complex tasks. **Use it sparingly** and prefer other methods such as plugins or state libraries e.g. Vuex.
