/*
Validate whether the search suggestion is not given to the user until 3 characters are populated.
Validate results are displayed according to the search made by the user.
Add 5 products in the cart, validate each item price in home page and after adding into cart
Place the order for any one product selecting India as the country
Add 5 products in the cart, validate total amount with after discount amount
*/

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
    cy.get("input[type=search]").clear()
  });

  it("Task 3", () => {
    cy.visit(Cypress.env("url2"));
    let price3;
    let price4;
    let price5;
    let price6;
    let price7;
    cy.get(".product-price").eq(3).then(function (price) {price3 = Number(price.text());});
    cy.get(".product-price").eq(4).then(function (price) {price4 = Number(price.text());});
    cy.get(".product-price").eq(5).then(function (price) {price5 = Number(price.text());});
    cy.get(".product-price").eq(6).then(function (price) {price6 = Number(price.text());});
    cy.get(".product-price").eq(7).then(function (price) {price7 = Number(price.text());});
    for(let i=3;i<8;i++){
      cy.get(".product-action button[type=button]").eq(i).click();
    }
  cy.get(".cart-icon").last().click();
  cy.get("div[class=action-block]").first().click();
  cy.get(`tr td:nth-child(4) .amount`).eq(0).then((price) => {expect(Number(price.text())).equal(price3);});
  cy.get(`tr td:nth-child(4) .amount`).eq(1).then((price) => {expect(Number(price.text())).equal(price4);});
  cy.get(`tr td:nth-child(4) .amount`).eq(2).then((price) => {expect(Number(price.text())).equal(price5);});
  cy.get(`tr td:nth-child(4) .amount`).eq(3).then((price) => {expect(Number(price.text())).equal(price6);});
  cy.get(`tr td:nth-child(4) .amount`).eq(4).then((price) => {expect(Number(price.text())).equal(price7);});
  })

  it("Task 4", () => {
    cy.visit(Cypress.env("url2"));
    cy.get("button[type=button]").eq(1).click();
    cy.get(".cart-icon").last().click();
    cy.get("div[class=action-block]").first().click();
    //cy.get("div button").last().click(); Another method for this step
    cy.contains('Place Order').click()
    cy.get('div select').select('India')
    cy.get("input[type=checkbox]").click();
    cy.get("#root>div>div>div>div>button").click();
  });

  it("Task 5", () => {
    cy.visit(Cypress.env("url2"));
    let total;
    for(let i=3;i<8;i++){
      cy.get(".product-action button[type=button]").eq(i).click();
    }
    cy.get(".cart-icon").last().click();
    cy.get("div[class=action-block]").first().click();
    cy.get('.totAmt').then(function (price) {total = price.text();})
    cy.get('.discountAmt').then(function (price) {expect (Number(price.text())).to.equal(Number(total));})
  });
})