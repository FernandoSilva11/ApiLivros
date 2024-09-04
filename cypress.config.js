const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');


module.exports = defineConfig({
  env: {
    mongodb: {
        uri: 'mongodb+srv://qa:cademy@cluster0.dwyxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        database: 'test',
        collection: 'books'
    }
},
e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
  },
});


