describe('TrendingPage', () => {
    it('should load and scroll to the bottom of the trending page', () => {
      cy.login('jarnodijkmans@gmail.com', 'test123');
      cy.url().should('include', '/');

      cy.wait(2000);

      cy.get('#trending-section-homepage').click().should('be.visible');
  
      cy.scrollTo('bottom', { duration: 4000 });
      cy.scrollTo('bottom', { duration: 4000 });
      cy.scrollTo('bottom', { duration: 4000 });
    });
  });