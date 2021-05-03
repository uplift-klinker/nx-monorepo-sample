import './commands';

beforeEach(() => {
    cy.clearLocalStorage();
    // @ts-ignore
    cy.clearCookies({domain: null});
})
