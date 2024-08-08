describe("Account Manager Service", () => {
  it("should register a new user", () => {
    cy.request("POST", "/register", {
      email: "testuser@example.com",
      password: "password123",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });

  it("should log in a user", () => {
    cy.request("POST", "/login", {
      email: "testuser@example.com",
      password: "password123",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token");
    });
  });

  it("should retrieve all accounts for a user", () => {
    cy.request({
      method: "GET",
      url: "/accounts",
      headers: {
        Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
});
