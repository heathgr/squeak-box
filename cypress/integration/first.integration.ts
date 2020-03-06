it('works', () => {
  cy.callFirestore('set', '/messages/test-id-1', {
    createdAt: new Date().toISOString(),
    message: 'Just a test!!',
  })
  cy.visit('http://localhost:8080/')
  cy.wrap('foo').should('equal', 'foo')
})
