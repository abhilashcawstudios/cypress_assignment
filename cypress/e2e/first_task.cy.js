/*
Validate whether the search suggestion is not given to the user until 3 characters are populated.
Validate results are displayed according to the search made by the user.
Validate whether the user is able to apply the large size catalog filter for the T-shirt section.
Validate whether the user is able to upload  a file on the contact us page.
Add 5 products in the cart, validate total cart amount and individual product price both with and without discount.*/

/// <reference types="cypress" />

describe("First Assignment", () => {
  })
it("Task 1", () => {
  cy.visit(Cypress.env('url2'));
  cy.get("input[type=search]").click().type("Bro");
  cy.get("h4[class=product-name]").should("be.visible");
  cy.get("input[type=search]").click().clear().type("tomoto");
  cy.get(".no-results").last().should("be.visible");
})

it("Task 2", () => {
  cy.visit(Cypress.env('url2'));
  cy.get("input[type=search]").click().type("ca");
  cy.get('.product-name').eq(2).should("be.visible");
  cy.get('.product-name').eq(3).should("be.visible");
  cy.get('.product-name').eq(4).should("be.visible");
  cy.get('.product-name').eq(5).should("be.visible");
})

it.only("Task 5", () => {
    let total = 1;
    cy.visit(Cypress.env('url2'));
    [2, 3, 4, 5, 6].forEach((num) => {
    cy.get(`button[type=button]="${num}"`)
    })
})

it("Task 5", () => {
    let total = 0;
    cy.visit("http://automationpractice.com/index.php");
    [1, 2, 3, 4, 5].forEach((num) => {
      cy.get(`[data-id-product="${num}"]`)

    })
})