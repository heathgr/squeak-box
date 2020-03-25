
it('Displays messages.', () => {
  cy.clearDatabase()
  cy.addMessage('testId1', 'Hello there!', new Date(2020, 1, 1, 3))
  cy.addMessage('testId2', 'I like turtles!', new Date(2020, 1, 1, 2))
  cy.addMessage('testId3', ':)', new Date(2020, 1, 1, 1))
  cy.visit('./public/index.html')

  cy.get('[data-test-id="message"]').should('have.length', 3)
  cy.get('[data-test-id="message"]').eq(0).should('have.text', 'Hello there!')
  cy.get('[data-test-id="message"]').eq(1).should('have.text', 'I like turtles!')
  cy.get('[data-test-id="message"]').eq(2).should('have.text', ':)')
})
