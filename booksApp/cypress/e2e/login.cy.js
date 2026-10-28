it("Should open the main page", () => {
  cy.visit("http://localhost:3000");
  cy.contains("Books list").should('be.visible');
});