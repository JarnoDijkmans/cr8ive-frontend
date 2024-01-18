Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:5173');
  
    // Type email and password
    cy.get('#email-address-login').type(email);
    cy.get('#password-login').type(password);
  
    // Submit the form
    cy.get('#form-login').submit();
  });

  Cypress.Commands.add('navigate', () => {
    cy.visit('http://localhost:5173');
  });