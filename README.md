# {{Project Name}} in DFP

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Craco](https://www.npmjs.com/package/@craco/craco) to add a configuration layer for CRA. For this porject, we use [Typescript](https://www.typescriptlang.org/), a strongly typed programming language that builds on JavaScript. Typescript helps in better documentation of the code and communication between developers.

## Installation

This project uses `npm`. For installation you will need to install `node` and `npm`, if you don't already have it. `node` and `npm` can be installed from [here](https://nodejs.org/en/download/).

To install the project, sinply clone the the repo and them run `npm install` in the project folder. You can use terminal on Mac and Command Prompt on Windows.

Run the terminal or command prompt and then run the following

```
git clone {{git repo link}}
cd {{folder-name}}
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

We use [SiteGround](https://tools.siteground.com/filemanager?siteId=TFE3MFlYOEpJUT09) for deployment. To get access to SiteGround contact Gayan Peiris (gayan.peiris@undp.org).

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
* __ant design__: For UI elements like dropdown, buttons, checkbox, and slider.

## Classes to use for styling AntD components

### For Buttons
__Required Classs__: `undp-button`
__Additonal Variations Classes__: `button-primary` `button-secondary` `button-tertiary` `button-arrow` `disabled`

### For Stat Cards
__Required Classs__: `stat-card`

### For Selection Dropdown
__Required Classs For `Select` tag__: `undp-select`
__Required Classs For `Option` tag__: `undp-select-option`

### For Tabs
__Required Classs For `Tabs` tag__: `undp-tabs`
__Required Classs For `TabPane` tag__: `undp-tab-content`

### For Checkbox
__Required Classs For `Checkbox` tag__: `undp-checkbox`

### For Radio
__Required Classs For `Radio` tag__: `undp-radio`

### For Text Input
__Required Classs For `Input` tag__: `undp-input`

### For Modal
__Required Classs For `Modal` tag__: `undp-modal`

### For Custom Scrollbar
__Required Classs For parent element__: `undp-scrollbar`

### Color Variables for CSS
__--blue-100__: `#B5D5F5`
__--blue-200__: `#94C4F5`
__--blue-300__: `#6BABEB`
__--blue-400__: `#4F95DD`
__--blue-500__: `#3288CE`
__--blue-600__: `#006EB5`
__--blue-700__: `#1F5A95`
__--white__: `#FFF`
__--gray-100__: `#FAFAFA`
__--gray-200__: `#F7F7F7`
__--gray-300__: `#EDEFF0`
__--gray-400__: `#D4D6D8`
__--gray-500__: `#A9B1B7`
__--gray-600__: `#55606E`
__--gray-700__: `#232E3D`
__--black__: `#000`
__--light-yellow__: `#FFE17E`
__--yellow__: `#FFEB00`
__--dark-yellow__: `#FBC412`
__--light-red__: `#FFBCB7`
__--red__: `#EE402D`
__--dark-red__: `#D12800`
__--light-green__: `#B8ECB6`
__--green__: `#6DE354`
__--dark-green__: `#59BA47`
__--light-azure__: `#A2DAF3`
__--azure__: `#60D4F2`
__--dark-azure__: `#00C1FF`