---
title: "Webpack"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/webpack.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - javascript
    - webpack
---

# Webpack

## Introduction to Webpack

Webpack is an open-source JavaScript module bundler and is the leading module bundler for React and Redux apps. It works by generating static assets from ES, CommonJS and AMD modules along with their dependencies, which allows developers to use a modular approach for developing web applications. You provide Webpack with a single entry point to an application, and it creates a dependency graph of all assets of your application through require, import statements, url values in CSS, href values in image tags, and so on. That's it. It takes modules with dependencies as well as static assets and generates a single file. During this compilation process, dependencies are resolved, which reduces the runtime size. What's more, it has a highly modular plugin system that is accommodating to specific application requirements.

Webpack can build and bundle CSS, preprocessed CSS, languages that compile to JavaScript (like TypeScript), images, etc. by using loaders. Webpack also features _plugins_ that have the ability to modify the build process.

## Terms
* __Loaders__ - Loaders allow you to write custom tasks that you want to perform when bundling files together, making Webpack highly extensible. Loaders preprocess files while compilling, e.g. TypeScript to JavaScript.
* __Plugins__ -
* __Code Splitting__ - The ability to define split points in your code base where the code is organized into self-contained chunks that can then be served on demand.
*

## plugins
1. common-chunks-webpack-plugin - generates chunks of common modules shared between entry points and splits them into separate bundles (e.g. vendor.bundle.js && app.bundle.js)
2. extract-text-webpack-plugin - extracts text (CSS) from your bundles into a separate file (app.bundle.css)
3. component-webpack-plugin - use components with Webpack
4. compression-webpack-plugin - prepare compressed versions of assets to serve them with Content-Encoding
5. i18n-webpack-plugin - Adds i18n support to your bundles
6. html-webpack-plugin - Simplifies creation of HTML files (`index.html`) to serve your bundles

## Loaders
Loaders preprocess files, allowing developers to bundle __any static resource__.

Loaders are activated by using `loadername!` prefixes in `require()` statements, or are automatically applied via regex from your Webpack configuration.

Supports a number of such loaders. [More information can be found here](https://webpack.js.org/loaders/).

***

## Great Features

### Code Splitting
Webpack will only download the needed code for each individual part of the application if necessary and Common modules are not redundantly downloaded, which is a step towards greater efficiency.

### Hot Module Replacement
The Hot Module Replacement feature watches files for changes and swaps out only the modules that have changed, updating your code in place.


## resources

[Alfoni, Christian. "Using React with Webpack Tutorial." _RisingStack._ 2015](https://blog.risingstack.com/using-react-with-webpack-tutorial/)

[Bresnehan, Jake. "Diving into Webpack." _Web Design Weekly_. 2014.](https://web-design-weekly.com/2014/09/24/diving-webpack/)

["Getting Started" _Webpack.js.com_ 2017.](https://webpack.js.org/guides/get-started/)

[GmbH, mantro](https://medium.com/@mantro_net/what-is-webpack-fd78456d8abb#.uq3z4y97e)

[Dabit, Nader. "Beginner's Guide to Webpack." _Medium._ 2015](https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.mymvq3blc)

[rajaraodv. "Webpack - The Confusing Parts." _Medium._ 2016.](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.iismozn7g)

[Webpack Repo](https://github.com/webpack/webpack)
