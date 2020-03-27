describe("Test our inputs and submit our form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/pizza");

    });
    it("Add test to inputs and submit forms", function() {
        cy.get('input[name="name"]')
        .type("Kenzie")
        .should("have.value", "Kenzie");
        cy.get("textarea")
        .type("Please give 300 napkins")
        .should("have.value", "Please give 300 napkins");
        cy.get("textarea")
        .type("Please give 200 napkins")
        .should("have.value", "Please give 200 napkins");
        cy.get('select').select('large') ;
        cy.get('input[name="topping1"]').check()
        .should("be.checked");
        cy.get('input[name="topping2"]').check()
        .should("be.checked");
        cy.get('input[name="topping3"]').check()
        .should("be.checked");
        cy.get("button").click();
        
    });

});