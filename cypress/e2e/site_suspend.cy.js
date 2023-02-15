/// <reference types="cypress" />

describe("First Assignment", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url1"));
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
    cy.visit(Cypress.env("url1"));
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