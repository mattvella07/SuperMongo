# SuperMongo
A desktop MongoDB management console that provides a UI for interacting with your localhost MongoDB instance.  The MongoDB insatnce must be running on a localhost server at the default (27017) port.  SuperMongo uses NodeJS and Express on the back end, and React on the front end, along with Electron to make this into a desktop app.

### Setting Up Local Dev Environment
You should have MongoDB and Node installed on your machine, and then you can follow these steps:

First Time 
- Fork/Clone the repo into a local directory 
- Using the terminal/command line, navigate to that directory 
- Install dependencies `npm install` or `yarn install` -- First time running it only! 

Every Time
- Build using Gulp `gulp` -- This will start a local MongoDB instance, start the node server, perform build tasks and start up Electron 
