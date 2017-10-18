# Project Title

This simple example of express app with mongodb was made to briefly show my skills.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Download or clone porject. Then add the config folder in the root. Inside the config add the db.js file with the next code:

```
module.exports = {
	url: 'mongodb://<here is your mongodb url>'
};
```

It needs to connect to a mongoDB. You can use https://mlab.com/ to create a database.

Then run the next code from console in the root folder:

```
npm install
```

To see the results open in browser 'localhost:3000/'

To test PUT request you can use the next command in console:

```
curl -d "title=value1&text=value2&author=value3" -X PUT localhost:3000/notes/<_id>
```
