describe("template spec", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

    it("Should not login with empty login", () => {
    cy.contains("Log in").click();
    cy.get("#pass").type("test");
    cy.contains("Submit").click();
    cy.get("#mail").then($el=> $el[0].checkValidity()).should('be.false');
  });

  it("Should not pass with empty pass", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass").then($el=> $el[0].checkValidity()).should('be.false');
  });
});