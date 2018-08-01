/* eslint-disable */

describe('Ruler', function(){
  beforeEach(function() {
    cy.visit('/')
  })

  it('Opens and closes', function(){
    cy.get('[data-cy=ruler-wrapper]').should('not.be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').should('be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').should('not.be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').find('[data-cy=close-ruler-button]').click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').should('not.be.visible')
  })
})
