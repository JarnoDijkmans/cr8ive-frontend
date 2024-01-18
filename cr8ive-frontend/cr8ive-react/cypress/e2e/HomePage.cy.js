describe('HomePage', () => {
    it('should load and scroll to the bottom of the page', () => {
      cy.login('jarnodijkmans@gmail.com', 'test123')
      cy.url().should('include', '/');
  
      cy.get('#preference-section-homepage').should('be.visible');
  
      cy.scrollTo('bottom', { duration: 4000 });

      cy.scrollTo('bottom', { duration: 4000 });
      cy.scrollTo('bottom', { duration: 4000 });
    });
  });   