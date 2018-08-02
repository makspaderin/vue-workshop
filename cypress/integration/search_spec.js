/* eslint-disable */

describe('Search', () => {
  beforeEach(function() {
    cy.visit('/')
    cy.get('[data-cy=search-panel-button]').first().click();
  })

  it('Does a simple search', function() {
    cy.get('[data-cy=search-element]').find('[data-cy=search-results]').should('not.be.visible');
    cy.get('[data-cy=search-element]').find('[data-cy=search-field]').find('input').type('ja');
    cy.get('[data-cy=search-element]').find('[data-cy=search-results]').children().should('have.length', 4);
  });

  it('Changes filters', function() {
    cy.get('[data-cy=search-element]').find('[data-cy=search-settings-button]').click();
    cy.get('[data-cy=search-element]').find('[data-cy=filter-checkbox]').should('have.length', 2);

    cy.get('[data-cy=search-element]').find('[data-cy=filter-checkbox]').first().click();
    cy.get('[data-cy=search-element]').find('[data-cy=filter-thumbnail]').should('have.length', 1);

    cy.get('[data-cy=search-element]').find('[data-cy=filter-thumbnail]').first().find('[data-cy=remove-filter-button]').click();
    cy.get('[data-cy=search-element]').find('[data-cy=filter-thumbnail]').should('have.length', 0);

    cy.get('[data-cy=search-element]').find('[data-cy=filter-checkbox]').first().click();
    cy.get('[data-cy=search-element]').find('[data-cy=filter-thumbnail]').should('have.length', 1);
  });

  it('Updates search index', function() {
    cy.get('[data-cy=search-element]').find('[data-cy=search-settings-button]').click();

    cy.get('[data-cy=search-element]').find('[data-cy=update-index-button]').click();
  });
});
