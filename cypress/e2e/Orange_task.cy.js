/// <reference types="cypress" />

describe("First Assignment", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url2"));
  });
  it("Point_1", () => {
    cy.get(".oxd-text.oxd-text--p.orangehrm-login-forgot-header", {
      setTimeout: 10000,
    }).click();
    cy.url().should(
      "equal",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode"
    );
    cy.get(
      ".oxd-button.oxd-button--large.oxd-button--ghost.orangehrm-forgot-password-button.orangehrm-forgot-password-button--cancel"
    ).should("be.visible");
    cy.get(
      ".oxd-button.oxd-button--large.oxd-button--secondary.orangehrm-forgot-password-button.orangehrm-forgot-password-button--reset"
    ).should("be.visible");
  });
  it("Point_2", () => {
    cy.get("input[placeholder=Username]").type("Abhilash");
    cy.get("input[placeholder=Password]").type("Abhilash123");
    cy.get("button[type=submit]").click();
    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should("be.visible");
  });
  it("Point_3", () => {
    cy.get(".oxd-text.oxd-text--p")
      .first()
      .then(function ($elem) {
        let credential = $elem.text().split(": ");
        cy.get("input[placeholder=Username]").type(credential[1]);
      });
    cy.get(".oxd-text.oxd-text--p")
      .eq(1)
      .then(function ($elem) {
        let credential = $elem.text().split(": ");
        cy.get("input[placeholder=Password]").type(credential[1]);
      });
    cy.get("button[type=submit]").click();
    cy.url().should(
      "equal",
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });
  it("Point_4", () => {
    cy.get(".oxd-userdropdown-tab").click();
    cy.get("a[role=menuitem]").last().click();
  });
});
