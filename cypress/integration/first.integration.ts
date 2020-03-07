/// <reference types="Cypress" />

it('works', () => {
  cy.visit('http://localhost:8080/')
  cy.wrap('foo').should('equal', 'foo')
})
