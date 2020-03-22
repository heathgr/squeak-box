
it('loads examples', () => {
  cy.clearDatabase()
  cy.addMessage('junkId1', 'Kitchen Sink', new Date())
  cy.visit('./public/index.html')
  cy.contains('Kitchen Sink')
})
