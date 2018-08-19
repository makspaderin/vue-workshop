describe('Additional Content', function(){
  beforeEach(function(){
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      }
    });

    cy.get('[data-cy=font-size-dropdown-switch]').first().click();
    cy.wait(1000);
  });

  it('Changes font size', function() {
    cy.get('html').should('not.have.class', 'size-2');
    cy.get('[data-cy=font-size-editor]').find('[data-cy=font-size-toggle]').click();
    cy.get('html').should('have.class', 'size-2');
    cy.get('[data-cy=font-size-editor]').find('[data-cy=font-size-toggle]').click();
    cy.get('html').should('not.have.class', 'size-2');
  });

  it('Retains font size after page refresh', function() {
    cy.get('[data-cy=font-size-editor]').find('[data-cy=font-size-toggle]').click();
    cy.get('html').should('have.class', 'size-2');
    cy.visit('/');
    cy.wait(1000);
    cy.get('html').should('have.class', 'size-2');
  });
});
