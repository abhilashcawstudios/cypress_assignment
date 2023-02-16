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
    cy.get("input[type=search]").click().type("ca")
    cy.get(".products-wrapper .products .product").each((product, index) => {
      cy.wrap(product).should("be.visible")
    });
    cy.get("input[type=search]").clear()
  });

it("Task 3", () => {
    let cart = []
    cy.get(".products-wrapper .product-price")
      .each((product, index) => {
        cy.wrap(product).then(function (price) {
          cart.push(Number(price.text()))
        });
        if (index === 4) {
          return false
        }
      })
      //.then(() => {cart.forEach((item) => {cy.log(item)})})
      cy.get(".product-action button[type=button]").each((product, index) => {
        cy.wrap(product).click()
        if (index === 4) {
          return false
        }
      });
    cy.get(".cart-icon").last().click();
    cy.get("div[class=action-block]").first().click();
    cy.get('tr td:nth-child(4) .amount').each((el,index) => {
      cy.wrap(el).then((price) => {expect(Number(price.text())).equal(cart[index]);})
    })
  });

it("Task 4", () => {
    cy.get(".product-action button[type=button]").first().click()
    cy.get(".cart-icon").last().click()
    cy.get(".action-block [type=button]").first().click()
    cy.xpath('//div[@class="products"]//div//button[text()="Place Order"]').click()
    cy.get("div select").select("India")
    cy.get("input[type=checkbox]").click()
    cy.get(".wrapperTwo button").click()
    
  })

it("Task 5", () => {
    let total;
    cy.get(".product-action button[type=button]").each((product, index = 0) => {
      cy.wrap(product).click()
      if (index === 4) {
        return false;
      }
    });
    // for(let i=3;i<8;i++){
    //   cy.get(".product-action button[type=button]").eq(i).click()
    // }
    cy.get(".cart-icon").last().click();
    cy.get("div[class=action-block]").first().click()
    cy.get(".totAmt").then(function (price) {
      total = price.text()
    });
    cy.get(".discountAmt").then(function (price) {
      expect(Number(price.text())).to.equal(Number(total))
    })
  })
})
