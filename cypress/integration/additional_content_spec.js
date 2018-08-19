const $getFirstAcLevel = function(){
  return cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=ac-level]').first();
};

/**
 * These tests are slightly less comprehensive than other, as Cypress does not support tests
 * for file transfers that well.
 */

describe('Additional Content', function(){
  beforeEach(function(){
    cy.visit('/')
    cy.get('[data-cy=side-panel-switch-additional-content]').first().click()
    cy.wait(1000)
  });

  it('Open and close levels', function() {
    $getFirstAcLevel().find('[data-cy=ac-item]').should('have.length', 2);
    $getFirstAcLevel().find('[data-cy=ac-level-heading-button]').click();
    $getFirstAcLevel().find('[data-cy=ac-item]').should('have.length', 0);
    $getFirstAcLevel().find('[data-cy=ac-level-heading-button]').click();
    $getFirstAcLevel().find('[data-cy=ac-item]').should('have.length', 2);
  })

  it('Changes filters', function() {
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=ac-level]').should('have.length', 2);
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=filter-dropdown]').trigger('mouseenter').click();
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=filter-dropdown]').contains('Image').click();
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=ac-level]').should('have.length', 1);

    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=filter-dropdown]').trigger('mouseenter').click();
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=filter-dropdown]').contains('All media').click();
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=ac-level]').should('have.length', 2);
  });

  it('Adds file to playlist', function() {
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=add-to-playlist-button]').first().click();
    cy.get('[data-cy=add-to-playlist]').find('[data-cy=add-to-playlist-button]').first().click();
    cy.get('[data-cy=add-to-playlist]').find('[data-cy=remove-from-playlist-button]').first().click();
  })

  it('Adds own content', function() {
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=type-tabs]').contains('My content').click();
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=add-own-content-button]').click();
    cy.wait(500);
    cy.get('[data-cy=save-ac-button]').click();
    cy.wait(1000);
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=ac-item]').should('have.length', 1);
  });

  it('Opens preview', function() {
    cy.get('[data-cy=side-panel-additional-content]').find('[data-cy=preview-button]').first().click();
    cy.wait(10000);
    cy.get('[data-cy=ac-preview]').should('not.be.empty');
  });
});
