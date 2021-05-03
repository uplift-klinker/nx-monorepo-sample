describe('Login', () => {
    it('should allow user to login', () => {
        cy.visit('/');

        cy.login();

        cy.findByLabelText('welcome').should('be.visible');
    })
})
