/* eslint-disable */

describe('Notes', function(){
  beforeEach(function() {
    cy.visit('/');
    cy.get('[data-cy=side-panel-switch-notes]').first().click();
    cy.wait(1000)
  });

  it('Shows page and all notes', function() {
    cy.get('[data-cy=notes-list-page]').should('be.visible');
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 1);

    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('All Notes').click();
    cy.get('[data-cy=notes-list-all]').should('be.visible');
    cy.get('[data-cy=notes-list-all]').children().should('have.length', 2);

    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('Page Notes').click();
    cy.get('[data-cy=notes-list-page]').should('be.visible');
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 1);
  })

  it('Creates a new note', function() {
    cy.get('[data-cy=add-note-text-field]').find('textarea').type('Nyy nööt')
    cy.get('[data-cy=add-note-button]').click();

    cy.wait(2000)

    cy.get('[data-cy=notes-container]').find('[data-cy=note-item]').contains('Nyy nööt')
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 2);

    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('All Notes').click();
    cy.get('[data-cy=notes-list-all]').children().should('have.length', 3);
  });

  it('Deletes a note', function() {
    /* Cancel delete */

    cy.get('[data-cy=notes-list-page]').children().first().trigger('mouseover');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=delete-note-button]').click();

    cy.get('[data-cy=note-dialog-delete]').find('[data-cy=cancel-button]').click();
    cy.get('[data-cy=note-dialog-delete]').should('not.be.visible');

    /* Check nothing has been deleted */

    cy.get('[data-cy=notes-list-page]').children().should('have.length', 1);

    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('All Notes').click();
    cy.get('[data-cy=notes-list-all]').children().should('have.length', 2);
    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('Page Notes').click();

    /* Delete properly */

    cy.get('[data-cy=notes-list-page]').children().first().trigger('mouseover');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=delete-note-button]').click();

    cy.get('[data-cy=note-dialog-delete]').find('[data-cy=delete-button]').click();
    cy.wait(1200)
    cy.get('[data-cy=note-dialog-delete]').should('not.be.visible');
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 0);

    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('All Notes').click();
    cy.get('[data-cy=notes-list-all]').children().should('have.length', 1);
  });

  it('Edit a note', function(){

    /* Cancel edit */

    cy.get('[data-cy=notes-list-page]').children().first().trigger('mouseover');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=edit-note-button]').click();

    cy.get('[data-cy=note-dialog-edit').find('[data-cy=note-text-input]').find('textarea').clear();

    cy.get('[data-cy=note-dialog-edit]').find('[data-cy=cancel-button]').click();
    cy.get('[data-cy=note-dialog-edit]').should('not.be.visible');

    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=note-text]').contains('Note 1');

    /* Edit properly */

    cy.get('[data-cy=notes-list-page]').children().first().trigger('mouseover');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=edit-note-button]').click();

    cy.get('[data-cy=note-dialog-edit').find('[data-cy=note-text-input]').find('textarea').type('2');

    cy.get('[data-cy=note-dialog-edit]').find('[data-cy=save-button]').click();

    cy.wait(1200);

    cy.get('[data-cy=note-dialog-edit]').should('not.be.visible');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=note-text]').contains('Note 12');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=note-time]').contains('just-now');

    /* Check all notes too */

    cy.get('[data-cy=notes-container').find('[data-cy=tab-button]').contains('All Notes').click();
    cy.get('[data-cy=notes-list-all]').children().first().find('[data-cy=note-text]').contains('Note 12');
  });

});
