# Cloubi Default Vue Product Theme

## Introduction

The Cloubi Vue Product theme consists of two parts: the theme definition (this repository) and the theme UI component library (found in the *cloubi2-default-product-theme-components-vue*-repository).
The purpose of the theme is to define a layout for the product and to define theme-specific behaviours. The theme itself can be built using the components found in the UI component library. It provides ready-to-use UI elements that utilise to the Cloubi APIs. It is recommended to familiarise oneself also with the UI component library, when building a theme. It should be a good basis for developing custom themes and components.

These instructions cover the basic development use-cases for the theme project and a FAQ.

## Usage

### Install

The theme has external dependencies such as the *cloubi2-default-product-theme-components-vue*-module. In order to load these dependencies to the local machine, run the
`npm install`
command.

### Build

`npm run build`

### Deploy to local Cloubi 2 instance

The theme can be deployed to the a local Cloubi server to test it with a real server backend. A version of the Cloubi server can be found in the *cloubi-2-vagrant*-repository. That repository also includes the setup instructions for it.

To deploy the theme to a server, first set the deployment target directory. It is done by copying *user.properties.template* as *user.properties* and changing *local.server.deploy.dir* property, so it points to your local Cloubi 2 deploy directory.

After the server directory has been set, build and deploy product theme to your local Cloubi 2 by running
`npm run deploy`.

Note any changes made to the theme requires a re-deployment to take effect on the server.

### Run a Node.js development server

To run the theme in a more rudimentary Node.js development server, run
`npm run dev`.
This server includes a hot-reload-mechanism, which automatically updates the browser with the edits made to the theme. Thus, it can be used to quickly iterate changes to it. However, it is strongly advised to test the theme against a real Cloubi server and its APIs (as described in *Deploy to local Cloubi 2 instance*), as the Node.js development server does **not** fully represent the real server behaviour. It uses dummy implementations of the Cloubi APIs instead.

### Customizing the theme

There are 3 main ways of customizing the theme: overwriting sass-variables for the UI component library, redefining the layout, and rewriting the UI components in the component library.

#### Overwriting sass-variables

The UI component library uses SASS to define global CSS values, such as colours, fonts, and font sizes. These can be overriden by altering
`config/sassVars.js`-file in the theme-project.

The alterable SASS-values are defined in the *cloubi2-default-product-theme-components-vue/src/_variables.scss*-file.

#### Redefining the layout

The theme layout is defined in the `src/components`-Vue-files. These can be altered to change the layout and behaviour of the theme.

#### Rewriting UI components

If the UI components do not fit the theme after changing the sass variables, it is possible to clone the *cloubi2-default-product-theme-components-vue*-repository and edit the components directly. In this case, remember to update the `cloubi2-default-product-theme-components-vue` dependency in `package.json` to point to the new UI component library implementation. After editing the dependencies, run `npm install` once to install them.

## FAQ

### How do I edit the responses given by the Cloubi APIs in the Node.js development server?

The *cloubi2-default-product-theme-components-vue*-module provides dummy versions of Cloubi APIs i.e. APIs that mimic the behaviour of the real Cloubi APIs to an extent. They are used when running the Node.js development server (`npm run dev`) for the theme. The theme uses the real Cloubi APIs when deployed version to a server (`npm run deploy`).

Making changes to the dummy APIs is possible by copying and editing the dummy implementations from the UI components library. Provide the edited dummy APIs to the theme in the `devel/main.js`-file.
