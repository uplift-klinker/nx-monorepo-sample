import '@testing-library/cypress/add-commands'

Cypress.Commands.add("login", (email = Cypress.env('USER_EMAIL'), password = Cypress.env('USER_PASSWORD')) => {

});
