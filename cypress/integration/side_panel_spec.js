/* eslint-disable */

describe('SidePanel', function() {
  beforeEach(function() {
    cy.visit('/')

    cy.get('[data-cy=main-menu-item]').first().click()
  })

  it('Main Side Panel opens and closes', function() {
    cy.get('[data-cy=side-panel]').should('not.be.visible')

    cy.get('[data-cy=side-panel-switch-main').click()
    cy.wait(500)

    cy.get('[data-cy=side-panel-main-content]').should('be.visible')

    cy.get('[data-cy=side-panel-switch-main]').click()
    cy.wait(500)

    cy.get('[data-cy=side-panel-main-content]').should('not.be.visible')
  })

  it('Main SidePanel automatically closes on root page', function() {
    cy.get('[data-cy=side-panel]').should('not.be.visible')

    cy.get('[data-cy=side-panel-switch-main').click()
    cy.wait(500)

    cy.get('[data-cy=side-panel-notes-content]').should('not.be.visible')
    cy.get('[data-cy=side-panel-main-content]').should('be.visible')

    cy.get('[data-cy=theme-home-button]').click()
    cy.wait(500)

    cy.get('[data-cy=side-panel-notes-content]').should('not.be.visible')
    cy.get('[data-cy=side-panel-main-content]').should('not.be.visible')

  })

  it('Notes panel opens', function() {
    cy.get('[data-cy=side-panel]').should('not.be.visible')

    cy.get('[data-cy=side-panel-switch-notes]').first().click()
    cy.wait(500)

    cy.get('[data-cy=side-panel-notes-content]').should('be.visible')
    cy.get('[data-cy=side-panel-main]').should('not.be.visible')
  })

})
