# Access All Data Visualization in DFP

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Craco](https://www.npmjs.com/package/@craco/craco) to add a configuration layer for CRA. For this porject, we use [Typescript](https://www.typescriptlang.org/), a strongly typed programming language that builds on JavaScript. Typescript helps in better documentation of the code and communication between developers.

## Installation

This project uses `npm`. For installation you will need to install `node` and `npm`, if you don't already have it. `node` and `npm` can be installed from [here](https://nodejs.org/en/download/).

To install the project, sinply clone the the repo and them run `npm install` in the project folder. You can use terminal on Mac and Command Prompt on Windows.

Run the terminal or command prompt and then run the following

```
git clone https://github.com/UNDP-Data/Access-All-Data-Viz.git
cd Access-All-Data-Viz
npm install
```
### Local Development

To start the project locally, you can run `npm run start` in the project folder in terminal or command prompt.

This is run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Tooling Setup

This project uses ESLint integrated with prettier, which verifies and formats your code so you don't have to do it manually. You should have your editor set up to display lint errors and automatically fix those which it is possible to fix. See [http://eslint.org/docs/user-guide/integrations](http://eslint.org/docs/user-guide/integrations).

This project is build in Visual Studio Code, therefore the project is already set up to work with. Install it from [here](https://code.visualstudio.com/) and then install this [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go.

## Production Workflow

We use [SiteGround](https://tools.siteground.com/filemanager?siteId=TFE3MFlYOEpJUT09) for deployment. To get access to SiteGround contact Naledi Hollbruegge (naledi.hollbruegge@undp.org) or Gayan Peiris (gayan.peiris@undp.org).

__The development workflow should be roughly as follows:__
1. Make changes locally (see Local Development)
2. Commit to a non-main branch. Use git-flow branch naming like `feature/add-filters` or `fix/zooming`
3. Push it to github
4. In github, make a Pull Request for branch you created to meger the changes to main
5. Merge All the changes to main

_This help create a good documentation of all the changes, fixes done to the code and also help in version control._

__The deployment workflow should be roughly as follow:__
1. Make changes locally (see Local Development) or pull the final version you want to deploy from github (see Installation)
2. Test it locally on your system to make sure everything is working properly
3. Use `npm run build` to build the react app in the build folder
4. Rename the folder (if you like) and then upload the folder to SiteGround in the `public_html` folder
5. Change the `src` of the `script` tag in the `index.html` from `/static/js/main.js` to `/<FOLDER_NAME>/static/js/main.js`, if you don't do this `index.html` will try to look for the js file at `www.data.undp.org/static/js/main.js` (which is not the right location) instead of `www.data.undp.org/<FOLDER_NAME>/static/js/main.js`
6. You should be able to see the visualization in your browser using the URL `www.data.undp.org/<FOLDER_NAME>`

__Steps to integrating the visualization in the wordpress page is as follow:__
1. To integrate the visualization in the a wordpress page first login to [wordpress](https://data.undp.org/wp-admin). To get access to the Wordpress Admin Panel contact Naledi Hollbruegge (naledi.hollbruegge@undp.org) or Mustafa Saifee (mustafa.saifee@undp.org)
2. Edit the page you want to add the visualization to using Elementor
3. Add an HTML element where you want to add the visualization
4. In the HTML code use (here make sure that the elemnent in which the react app is rendering the visualization is present as div). In the below example and in the code, the react-app is renders in a and HTML element with parameter `data-bucket-embed`; therefore in the HTML code the `div` element has the parameter `data-bucket-embed`. _(You can also use a unique `id` to render the element and  use that to render the visualization)_ 
    ```
    <script defer src="https://data.undp.org/<VIZ_FOLDER_NAME>/static/js/main.js"></script>
    <div id="root" data-bucket-embed></div>
    ```
5. You should then see the visualization in previews. _(If there is some problem do check the data file is linked correctly as WP might re-route it)_
6. Once you are happy with the changes just publish the page and you should see it online


## Available Scripts

Craco is used to add a cofiguration layer for CRA. The primary function is to stop the `build` to have optimized chunks of the built script. _This make the using the script in the Wordpress easier._ The configuration file for Craco is placed in the root folder and called `craco.config.js`
* `npm run build`: Executes `craco build` and builds the app without chunking the main js script file.
* `npm run start`: Executes `craco start` and start the local server for local deployment.
* `npm install`: Installs all the dependencies.

## Packages/Library Used

* __React__: React is used as MVC framework.
* __CRACO__: Craco is used to configure different scripts (See Available Scripts for more details)
* __styled-components__: Utilises tagged template literals  and the power of CSS, allows to write actual CSS code to style the components in JS/TS.
* __Various D3 Libraries__: Various D3 libraries are used for visualizations, adding interaction and reading the csv data file.
* __ant design__: For UI elements like dropdown, buttons, checkbox, and slider.
* __dom-to-image__: This is used to allow users to download images of various visualization views they create.
* __lodash__: This is used for manipulating and iterating arrays and objects.

## Data and Meta Data Used

* __Indicator Meta Data__: https://github.com/UNDP-Data/Indicators-MetaData
* __Country Taxonomy__: https://github.com/UNDP-Data/Country-Taxonomy