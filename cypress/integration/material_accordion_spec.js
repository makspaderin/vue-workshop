/* eslint-disable */

describe('MaterialAccordion', function() {
  beforeEach(function() {
    cy.visit('/')

    cy.get('[data-cy=main-menu-item]').first().click()
    cy.wait(500)

    cy.get('[data-cy=side-panel-switch-main]').click()
    cy.wait(500)
  })

  it('Navigates to a chapter', function() {
    cy.get('[data-cy=nav-material-accordion]').find('[data-cy=material-accordion-chapter-button]').contains('Ihmisen solut').click()
    cy.wait(500)
    cy.get('[data-cy=main-content-header]').contains('Ihmisen solut')
  })

  it('Navigates to a page', function() {
    cy.get('[data-cy=nav-material-accordion]').find('[data-cy=material-accordion-page-button]').contains('Page 3').click()
    cy.wait(500)
    cy.get('[data-cy=main-content-header]').contains('Page 3')
  })

  it('Opens and closes accordion', function() {
    cy.get('[data-cy=nav-material-accordion]')
    .find('[data-cy=material-accordion-page-list]')
    .first()
    .find('[data-cy=material-accordion-page-button]')
    .should('have.length', 10)

    cy.get('[data-cy=nav-material-accordion]').find('[data-cy=expand-nav-button]').first().click()

    cy.get('[data-cy=nav-material-accordion]')
    .find('[data-cy=material-accordion-page-list]').should('not.exist')

    cy.get('[data-cy=nav-material-accordion]').find('[data-cy=expand-nav-button]').first().click()

    cy.get('[data-cy=nav-material-accordion]')
    .find('[data-cy=material-accordion-page-list]')
    .first()
    .find('[data-cy=material-accordion-page-button]')
    .should('have.length', 10)
  })
})
