/* eslint-disable */

describe('Page loads in dev invironment', function() {
    before(function() {
        cy.viewport(1300, 800);
    })

    it('Goto to test page', function() {
        cy.visit('/')
    })
})









