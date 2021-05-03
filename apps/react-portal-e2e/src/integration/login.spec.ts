describe('react-portal', () => {
  it('should display welcome message', () => {
    cy.visit('/');

    cy.login();

    cy.findByLabelText('welcome').should('be.visible');
  });
});
