// https://on.cypress.io/api

describe('Home Page', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Bienvenue sur GameHub')
  })
})
