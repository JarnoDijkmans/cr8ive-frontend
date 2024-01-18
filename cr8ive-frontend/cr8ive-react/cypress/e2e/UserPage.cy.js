
describe('userPage', () => {
    it('should load and click on a user\'s post', () => {
      cy.login('jarnodijkmans@gmail.com', 'test123');
      cy.url().should('include', '/');
  
      cy.wait(2000);
  
      cy.get('#your-page-id').click();

      cy.wait(2000);
  
      cy.get('#gallery-post-12').eq(0).click();

      cy.wait(2000);
    });
  });


  describe('userPage', () => {
    it('should load and click on a user\'s post and after that changes the description', () => {
      cy.login('jarnodijkmans@gmail.com', 'test123');
      cy.url().should('include', '/');
  
      cy.wait(2000);
  
      cy.get('#your-page-id').click();

      cy.wait(2000);
  
      cy.get('#gallery-post-12').eq(0).click();

      cy.wait(2000);
      cy.get('#options-button-id').should('be.visible').click();

      cy.wait(2000);

      cy.get('#editPost-button-id').click();

      cy.get('#edit-description-box-id').clear().type('this is a test for Cypress!');

      cy.get('#savePost-button-id').should('be.visible').click();

      cy.wait(3000);

      cy.get('#close-button-detail-id').should('be.visible').click();
    });
  });
