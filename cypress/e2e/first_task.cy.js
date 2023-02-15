/*
Validate whether the search suggestion is not given to the user until 3 characters are populated.
Validate results are displayed according to the search made by the user.
Add 5 products in the cart, validate total cart amount and individual product price
Place the order for any one product selecting India as the country*/

/// <reference types="cypress" />
describe("First Assignment", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url2"));
  });

  it("Task 1", () => {
    cy.get("input[type=search]").click().type("Bro");
    cy.get("h4[class=product-name]").should("be.visible");
    cy.get("input[type=search]").click().clear().type("tomoto");
    cy.get(".no-results").last().should("be.visible");
    cy.get("input[type=search]").click().clear();
  });

  it("Task 2", () => {
    cy.visit(Cypress.env("url2"));
    cy.get("input[type=search]").click().type("ca");
    cy.get(".product-name").eq(2).should("be.visible");
    cy.get(".product-name").eq(3).should("be.visible");
    cy.get(".product-name").eq(4).should("be.visible");
    cy.get(".product-name").eq(5).should("be.visible");
  });

  // it("Task 3", () => {
  //   cy.visit(Cypress.env("url2"));
  //   let price1;
  //   let price2;
  //   let price3;
  //   let price4;
  //   let price5;
  // cy.get(".product-price")
  //   .eq(0)
  //   .then(function (price) {
  //     this.price1 = price.text();
  //   });
  // cy.log(price1);
  // cy.get("button[type=button]").eq(1).click();
  // cy.get(".cart-icon").last().click();
  // cy.get("div[class=action-block]").first().click();
  // cy.get("tr td:nth-child(4) .amount").then((price) => {
  //   expect(price.text()).equal(this.price1);
  // });
  // cy.get('button[type=button]').eq(2).click()
  // cy.get('button[type=button]').eq(3).click()
  // cy.get('button[type=button]').eq(4).click()
  // cy.get('button[type=button]').eq(5).click()
  // cy.get('.cart-icon').last().click()
  // cy.get('div[class=action-block]').first().click()

  it("Task 4", () => {
    cy.visit(Cypress.env("url2"));
    cy.get("button[type=button]").eq(1).click();
    cy.get(".cart-icon").last().click();
    cy.get("div[class=action-block]").first().click();
    cy.get("#root>div>div>div>div>button").click();
    //cy.get('#root>div>div>div>div>div>select').click()
    //cy.get('option:nth-child(89)')
    cy.get("input[type=checkbox]").click();
    cy.get("#root>div>div>div>div>button").click();
  });
});
