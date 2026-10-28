describe("Books Favorites Functionality", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should add a new book directly to favorites", () => {
    const bookTitle = `Favorite Book ${Date.now()}`;
    cy.addBook(bookTitle, "Author Name", true);
    cy.goToFavorites();
    cy.contains(".card", bookTitle).should("be.visible");
  });

  it("Should add an existing book to favorites from the main page", () => {
    const bookTitle = `Regular Book ${Date.now()}`;
    cy.addBook(bookTitle, "Author Name", false);

    cy.contains(".card", bookTitle)
      .find("button")
      .contains(/favorite/i)
      .click();

    cy.contains(".card", bookTitle).should("contain", "Delete from favorite");

    cy.goToFavorites();
    cy.contains(".card", bookTitle).should("be.visible");
  });

  it("Should remove a book from favorites", () => {
    const bookTitle = `Book to Delete ${Date.now()}`;
    cy.addBook(bookTitle, "Author", true);
    cy.goToFavorites();
    cy.contains(".card", bookTitle).should("be.visible");

    cy.contains(".card", bookTitle)
      .find("button")
      .contains(/delete/i)
      .click();

    cy.contains(".card", bookTitle).should("not.exist");
  });

});