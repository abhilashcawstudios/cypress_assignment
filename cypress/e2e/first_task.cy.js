/// <reference types="cypress" />

describe("First Assignment", () => {
    beforeEach(() => {
      cy.visit(Cypress.env('url2'))
    })

    it.only("task_1", () => {
      cy.get("input[type=search]").type("Bro")
      [1, 2, 3, 4, 5].forEach((num) => {
        cy.get(`[data-id-product="${num}"]`)
        
          
      })
    })
})