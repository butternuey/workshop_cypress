Cypress.Commands.add('checkDefaultPage', () => {
    cy.get('.router-link-active').should('have.text', 'menu');
    cy.get(':nth-child(2) > a').should('have.text', 'cart (0)');
    cy.get(':nth-child(3) > a').should('have.text', 'github');
    cy.get('[data-test="coffee-list"] > li').should('have.length', 9);
    cy.get('[data-test="checkout"]').should('be.visible');
    cy.get('[data-test="checkout"]').should('have.text', 'Total: $0.00');
})

Cypress.Commands.add('addProductToCart', (productname, productprice) => {
    cy.get(`[data-cy="${productname}"]`).click()
    cy.get(':nth-child(2) > a').should('have.text', 'cart (1)')
    cy.get('[data-test="checkout"]').should('have.text', 'Total: $'+ productprice)
})