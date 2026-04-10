const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://quasar:9000",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: false
  }
});
