/// <reference types="Cypress" />

it('works', () => {
  cy.visit('./public/index.html')
  cy.wrap('foo').should('equal', 'foo')
})
