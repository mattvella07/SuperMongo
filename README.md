# SuperMongo
A MongoDB management console that provides a UI for interacting with your localhost MongoDB instance.  SuperMongo uses NodeJS and Express on the back end, and React on the front end.

### Setting Up Local Dev Environment
You should have MongoDB and Node installed on your machine, and then you can follow these steps:

First Time 
- Fork/Clone the repo into a local directory 
- Using the terminal/command line, navigate to that directory 
- Install dependencies `npm install` -- First time running it only! 

Every Time
- Start up a local MongoDB instance (if not already running) `mongod` 
- Build using Gulp `gulp`
- Start the server `npm start` or `node server`
