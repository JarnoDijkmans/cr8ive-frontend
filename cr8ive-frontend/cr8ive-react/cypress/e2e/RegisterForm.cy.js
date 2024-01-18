describe('Register Form', () => {
    beforeEach(() => {
      cy.navigate();
    });

    it('should successfully register a new user with valid information', () => {

      cy.get('#signUpBtn-register').click();       
      cy.get('#firstname-input').type('Cypress');
      cy.get('#lastname-input').type('Test');
      cy.get('#email-input').type('cypress.test@example.com');
      cy.get('#birthdate-input').type('1990-01-01');
      cy.get('#password-input').type('password123');
      cy.get('#confirm-password-input').type('password123');
      cy.get('#form-register').submit();
  
      cy.url().should('include', '/');
    });
    
  
    it('should display error message with invalid information', () => {
      cy.get('#signUpBtn-register').click();     
      cy.get('#firstname-input').type('Cypress');
      cy.get('#lastname-input').type('Test');
      cy.get('#email-input').type('cypress.test@example.com');
      cy.get('#birthdate-input').type('1990-01-01');
      cy.get('#password-input').type('password123');
      cy.get('#confirm-password-input').type('password456');
  
  
      cy.get('#form-register').submit();
  
      cy.get('#message-register').should('exist').and('contain', 'Passwords do not match.');
    });

  });