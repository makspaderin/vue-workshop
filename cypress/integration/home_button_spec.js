/* eslint-disable */

describe('HomeButton', function() {
  beforeEach(function(){
    cy.visit('/')
  })

  it('Navigates to the root page', function(){
    cy.get('[data-cy=main-menu-item]').first().click()
    cy.wait(200)

    cy.get('[data-cy=main-menu-item]').should('not.be.visible')

    cy.get('[data-cy=theme-home-button]').click()
    cy.wait(200)

    cy.get('[data-cy=main-menu-title]').should('be.visible')
  })
})
