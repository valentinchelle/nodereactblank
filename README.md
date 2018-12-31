# Template for Node & React App

This project has been generated with react-create-app. Visual Studio is used as the IDE.

Need a .env file at the root of the directory, containing the  project's variables.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You first need to create a file ".env" at the root of your directory. It has to contain important variables for your project. 

```
API_URL=http://localhost:8081
SECRET_KEY=hellomyfriend
```

### Installing

A step by step series of examples that tell you how to get a development env running

First, install all the node dependencies by running

```
npm install
```
Then I recommend you to install those Visual Studio Code extensions : ESLint, Live Sass Compiler, Prettier and configure your preferences as following :

```
{
  "window.zoomLevel": 1,

  "liveSassCompile.settings.formats": [
    {
      "extensionName": ".min.css",
      "format": "compressed",
      "savePath": "/src/client/assets/dist/css"
    }
  ],
  "liveSassCompile.settings.excludeList": ["**/node_modules/**", ".vscode/**"],
  "liveSassCompile.settings.generateMap": true,
  "liveSassCompile.settings.autoprefix": ["> 1%", "last 2 versions"],
  "javascript.updateImportsOnFileMove.enabled": "always",
  "eslint.alwaysShowStatus": true,

  "eslint.autoFixOnSave": true,

  "editor.formatOnSave": true,

  "prettier.eslintIntegration": true
}

```
Finally, you need to configure the MySQL database for Node. In src/server/Models/config.json, enter your database information such as :
```
{
  "development": {
    "username": "root",
    "password": "",
    "database": "node",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

## Running the project
In order to launch both the client and the server at the same time in the same console, we use nodemon, which is already configured.

We just have to run via the command :
```
npm run dev
```

All of the available commands can be found in the package.json file :

```
  "scripts": {
    "start": "node src/server/server.js",
    "build": "webpack --mode production",
    "client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
    "server": "nodemon src/server/server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

