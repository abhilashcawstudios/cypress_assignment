/*Validate firstname, last name and email fields returned by fetch user is same as provided while adding a user
Validate that no field has value as undefined or empty value.
Validate user is not able to fetch user details with invalid token
Validate the contact is added successfully using add contact api. Also, validate the response values for each field is correct.
Validate the contact is deleted successfully using delete contact api. Also, validate get contact api returns error while fetching the deleted contact*/

///<reference types="Cypress"/>

describe("Second Assignment", () => {
    let generatedtoken = undefined
    let accountId = undefined
    it("Token generation", () => {
      cy.request({
        method: "POST",
        url: Cypress.env('url')+"users",
        body: {
          firstName: Cypress.env('firstName'),
          lastName: Cypress.env('lastName'),
          email: Cypress.env('email'),
          password: Cypress.env('password'),
        },
      }).then((response) => {
        expect(response.status).to.equal(201)
        JSON.stringify(response)
        generatedtoken = response.body.token
        console.log(generatedtoken)
      });
    });
    it("Empty Validation", () => {
      cy.request({
        method: "POST",
        url: Cypress.env('url')+"users",
        body: {
          firstName: "",
          lastName: Cypress.env('lastName'),
          email: Cypress.env('email'),
          password: Cypress.env('password'),
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(400)
        JSON.stringify(response)
        expect(response.body.message).to.equal("User validation failed: firstName: Path `firstName` is required.")
      });
    });
    it("Fetch User with valid token", () => {
      cy.request({
        method: "GET",
        url: Cypress.env('url')+"users/me",
        headers: {
          Authorization: generatedtoken,
        },
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).have.property("firstName").to.equal(Cypress.env('firstName'));
        expect(response.body).have.property("lastName").to.equal(Cypress.env('lastName'));
        expect(response.body).have.property("email").to.equal(Cypress.env('email'));
      });
    });
    it("Fetch User with invalid token", () => {
      cy.request({
        method: "GET",
        url: Cypress.env('url')+"users/me",
        headers: {
          Authorization: "invalidtoken",
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(401)
      });
    });
    it("Add Contact", () => {
      cy.request({
        method: "POST",
        url: Cypress.env('url')+"contacts",
        headers: {
          Authorization: generatedtoken,
        },
        body: {
          firstName: Cypress.env('firstName'),
              lastName: Cypress.env('lastName'),
              birthdate: Cypress.env('birthdate'),
          email: Cypress.env('email'),
          phone: Cypress.env('phone'),
          street1: Cypress.env('street1'),
          street2: Cypress.env('street2'),
          city: Cypress.env('city'),
          stateProvince: Cypress.env('stateProvince'),
          postalCode: Cypress.env('postalCode'),
          country: Cypress.env('country')
        },
      }).then((response) => {
        expect(response.status).to.equal(201)
        JSON.stringify(response)
        expect(response.body.firstName).to.equals(Cypress.env('firstName'))
        expect(response.body.lastName).to.equals(Cypress.env('lastName'))
        expect(response.body.birthdate).to.equals(Cypress.env('birthdate'))
        expect(response.body.email).to.equals(Cypress.env('email'))
        expect(response.body.phone).to.equals(Cypress.env('phone'))
        expect(response.body.street1).to.equals(Cypress.env('street1'))
        expect(response.body.street2).to.equals(Cypress.env('street2'))
        expect(response.body.city).to.equals(Cypress.env('city'))
        expect(response.body.stateProvince).to.equals(Cypress.env('stateProvince'))
        expect(response.body.postalCode).to.equals(Cypress.env('postalCode'))
        expect(response.body.country).to.equals(Cypress.env('country'))
        accountId = response.body._id
      });
    })
    it("Delete Contact", () => {
      cy.request({
        method: "DELETE",
        url: Cypress.env('url')+"contacts/"+accountId,
        headers: {
          Authorization: generatedtoken,
        },
      }).then((response) => {
        expect(response.status).to.equal(200)
      });
    });
    it("Validating deleted contact", () => {
      cy.request({
        method: "GET",
        url: Cypress.env('url')+"contacts/"+accountId,
        headers: {
          Authorization: generatedtoken,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404)
      });
    });
  });