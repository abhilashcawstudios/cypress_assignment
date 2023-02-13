/// <reference types="cypress" />

describe("First Assignment", () => {
  beforeEach(() => {
    cy.visit(Cypress.env('url1'));
  });

  it.only("Task 1", () => {
    cy.get("#search_query_top")
      .click()
      .type("Dre")
      .get(".ac_results")
      .should("be.visible")
      .get("#search_query_top")
      .clear()
      .type("Dr")
      .get(".ac_results")
      .should("not.be.visible");
  });

  it("Task 2", () => {
    cy.get("#search_query_top")
      .click()
      .type("T-shirts")
      .get(".ac_results")
      .get(".ac_results li")
      .should("contain", "T-shirts");
  });

  it("Task 3", () => {
    cy.get('[title="T-shirts"]').first().click({ force: true });
    cy.get('[name="layered_id_attribute_group_3"]').click();
    cy.contains("Size: L").should("exist");
  });

  it("Task 4", () => {
    cy.fixture("cypress.jpeg").as("file");
    cy.get("#contact-link")
      .click()
      .get('select[id="id_contact"]')
      .select("Customer service")
      .get("#fileUpload")
      .selectFile("@file")
      .get('[class="filename"]')
      .should("contain", "cypress.jpeg");
  });

  it("Task 5", () => {
    let total = 0;
    cy.visit("http://automationpractice.com/index.php");
    [1, 2, 3, 4, 5].forEach((num) => {
      cy.get(`[data-id-product="${num}"]`)
        .first()
        .should("be.visible")
        .click()
        .get('[class="icon-chevron-left left"]')
        .click();
    });
    cy.get('[class="icon-chevron-right right"]').last().click();

    cy.get('[data-title="Total"] span').each((getprice) => {
      const getproductprice = parseFloat(getprice.text().trim().slice(1));
      total += +getproductprice;
    });
    cy.get("#total_product").then((getTotalPrice) => {
      const totalPrice = parseFloat(getTotalPrice.text().trim().slice(1));
      console.log(totalPrice);
      expect(total).to.equal(totalPrice);
    });
  });
});

/*
1. Validate whether the search suggestion is not given to the user until 3 characters are populated.
2. Validate results are displayed according to the search made by the user.
3. Validate whether the user is able to apply the large size catalog filter for the T-shirt section.
4. Validate whether the user is able to upload  a file on the contact us page.
5. Add 5 products in the cart, validate total cart amount and individual product price both with and without discount.*/
