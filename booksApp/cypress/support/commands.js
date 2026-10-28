/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

// -- This is a parent command --
Cypress.Commands.add('login', (login, password) => {
    cy.contains("Log in").click();
    cy.get("#mail").type(login);
    cy.get("#pass").should('be.enabled').type(password);
    cy.contains("Submit").click();
});

// Команда для добавления книги
Cypress.Commands.add('addBook', (title, author, addToFavorites = false) => {
  cy.contains("Add new").click();
  cy.contains("Book description").should("be.visible");
  cy.get('input[placeholder="Enter book title"]').type(title);
  cy.get('input[placeholder="Enter book authors"]').type(author);
  if (addToFavorites) {
    cy.get('#favorite').check({ force: true });
  }
  cy.get("button").contains("Submit").click();
});

// Команда для перехода в избранное
Cypress.Commands.add('goToFavorites', () => {
  cy.contains("Favorites").click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }