/// <reference types="Cypress" />

it('displays a list of messages.', () => {
  // cy.callFirestore('set', '/wtf/some-test-doc', {
  //   message: 'Just a test!!',
  // })
  // const test = cy.callFirestore('get', '/messages/')

  // cy.log('test: ', test)
  cy.visit('http://localhost:8080/')
})
