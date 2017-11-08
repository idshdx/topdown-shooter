# Top down shooter made with Phaser + ES6 + Webpack
#### Motivation: Troll my friends and have a boilerplate for future games
Preview [Heroku](https://shootertest.herokuapp.com/)

## Features
- ESLINT with JavaScript Standard Style configuration
- Next generation of Javascript
- Browsers are automatically updated as you change project files
- Webpack ready
- WebFont Loader
- Cordova for crossplatform
- Express to serve the compiled build


## Setup

Make sure you have node.js and npm installed

Navigate to the cloned repo's directory.

Run:

```npm install```


Then run:

```npm run dev```

This will run a server so you can run the game in a browser. It will also start a watch process, so you can change the source and the process will recompile and refresh the browser automatically.

To run the game, open your browser and enter http://localhost:3000 into the address bar.


## Build for deployment:

Run:

```npm run deploy```

This will optimize and minimize the compiled bundle.

## Serve the compiled Build

Run:
```node app.js```

## Deploy for cordova:
Make sure to uncomment the cordova.js file in the src/index.html and to update config.xml with your informations. (name/description...)

There is 3 platforms supported :
- browser
- ios
- android

First run (ios example):

```
npm run cordova
cordova platform add ios
cordova run ios
```

Update (ios example):

```
npm run cordova
cordova platform update ios
cordova run ios
```

This will optimize and minimize the compiled bundle.
