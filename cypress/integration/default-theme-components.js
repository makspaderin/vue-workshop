const pageUrl = 'http://localhost:8082';

describe('Component loads in dev invironment', function() {
    before(function() {
        cy.viewport(1300, 800);
    })

    it('Goto to test page', function() {
        cy.visit(pageUrl)
    })
})


describe('Material Accordion', function(){
  beforeEach(function() {
    cy.visit(pageUrl)
  })
  
  it('Show correct initial state', function(){
    cy.get('[data-cy=nav-material-accordion]').contains('Level 1-2-1')
  })

  it('Change page', function() {
    cy.get('[data-cy=nav-material-accordion]').find('[data-cy=nav-button]').contains('Level 1-1').click()
    cy.get('[data-cy=nav-material-accordion]').find('[data-cy=nav-accordion-list-item]').contains('Level 1-1-1')
  })
})


describe('Ruler', function(){
  beforeEach(function() {
    cy.visit(pageUrl)
  })

  it('Opens and closes', function(){
    cy.get('[data-cy=ruler]').should('not.be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler]').should('be.visible')
    
    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler]').should('not.be.visible')
  })
})