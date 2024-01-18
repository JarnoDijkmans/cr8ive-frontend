describe('Login Form', () => {
    it('should successfully log in with valid credentials', () => {
      cy.login('jarnodijkmans@gmail.com', 'test123');
      cy.url().should('include', '/');
    });
  
    it('should display error message with invalid credentials', () => {
      cy.login('jarnodijkmans@gmail.com', 'invalid-password');
      cy.get('#message-login').should('exist').and('contain', 'Something went wrong, Try again!');
    });
});
