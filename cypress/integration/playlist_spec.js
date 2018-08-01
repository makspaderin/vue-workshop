/* eslint-disable */

describe('Playlist Editor Dropdown', function(){

  beforeEach(function() {
    cy.visit('/');
    cy.wait(2000)
    cy.get('[data-cy=open-playlist-editor-button]').click();
  });

  it('It open & closes playlist editor', function() {
    cy.get('[data-cy=playlist-editor]').should('be.visible');
    cy.get('[data-cy=open-playlist-editor-button]').click();
    cy.get('[data-cy=playlist-editor]').should('not.be.visible');
  });

  it('It opens add to playlist dialog', function() {

    cy.get('[data-cy=playlist-editor]').find('[data-cy=add-to-list-button]').click();
    cy.get('[data-cy=add-to-playlist-dialog]').should('be.visible');

    cy.get('[data-cy=add-to-playlist-dialog]').find('button').contains('Close').click();

    cy.get('[data-cy=add-to-playlist-dialog]').should('not.be.visible');

  });

  it('It opens my playlist dialog', function() {

    cy.get('[data-cy=playlist-editor]').find('[data-cy=show-my-lists-button]').click();
    cy.get('[data-cy=my-playlists-dialog]').should('be.visible');

    cy.get('[data-cy=my-playlists-dialog]').find('button').contains('Close').click();

    cy.get('[data-cy=my-playlists-dialog]').should('not.be.visible');

  });

  it('It tries to open playlist with code', function() {

    // check that button is disable with no code
    cy.get('[data-cy=playlist-editor]').find('[data-cy=open-with-code-button]').should('be.disabled');

    // enabled by typing
    cy.get('[data-cy=open-playlist-code-input]').find('input').type('fo');
    cy.get('[data-cy=playlist-editor]').find('[data-cy=open-with-code-button]').should('be.enabled');

    // disabled when cleared
    cy.get('[data-cy=open-playlist-code-input]').find('input').clear();
    cy.get('[data-cy=playlist-editor]').find('[data-cy=open-with-code-button]').should('be.disabled');

    // error with wrong code
    cy.get('[data-cy=open-playlist-code-input]').find('input').type('foo');
    cy.get('[data-cy=playlist-editor]').find('[data-cy=open-with-code-button]').click();
    cy.get('[data-cy=open-playlist-code-input-error]').should('be.visible');

    // success if with good code
    cy.get('[data-cy=open-playlist-code-input]').find('input').type('bar');
    cy.get('[data-cy=playlist-editor]').find('[data-cy=open-with-code-button]').click();
    cy.get('[data-cy=open-playlist-code-input-error]').should('not.be.visible');
  });

});

const createNewPlaylist = () => {

  cy.get('[data-cy=create-new-playlist-dialog]')
  .find('[data-cy=playlist-name]')
  .find('input')
  .clear()
  .type('Foobar')

  cy.get('[data-cy=create-new-playlist-dialog]')
  .find('[data-cy=playlist-description]')
  .find('textarea')
  .clear()
  .type('Foobar Description')

  cy.get('[data-cy=create-new-playlist-dialog]')
  .find('[data-cy=playlist-shared-toggle]')
  .find('[type=checkbox]')
  .check({force: true});

  cy.get('[data-cy=create-new-playlist-dialog]')
  .find('[data-cy="create-button"]')
  .click()
  .wait(2000);

};

describe('Add to playlist dialog', function(){

  beforeEach(function() {
    cy.visit('/');
    cy.wait(2000)
    cy.get('[data-cy=open-playlist-editor-button]').click();
    cy.get('[data-cy=playlist-editor]').find('[data-cy=add-to-list-button]').click();
  });

  it('It add & removes page to playlist', function() {

    cy.get('[data-cy=add-to-playlist-dialog]')
    .find('[data-cy=playlist-list]')
    .children()
    .first()
    .find('button')
    .contains('Remove')
    .click();

    cy.get('[data-cy=add-to-playlist-dialog]')
    .find('[data-cy=playlist-list]')
    .children()
    .first()
    .find('button')
    .contains('Add')
    .click();

  });

  it('Creates new playlist', function() {

    cy.get('[data-cy=add-to-playlist-dialog]')
    .find('[data-cy=create-new-playlist-button]')
    .click();

    createNewPlaylist();

    cy.get('[data-cy=add-to-playlist-dialog]')
    .find('[data-cy=playlist-list]')
    .children()
    .contains('Foobar');

  });

});

describe('Show my playlists dialog', function(){

  beforeEach(function() {
    cy.visit('/');
    cy.wait(2000)
    cy.get('[data-cy=open-playlist-editor-button]').click();
    cy.get('[data-cy=playlist-editor]').find('[data-cy=show-my-lists-button]').click();
  });

  it('Delete playlist', function() {

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Playlist 1');

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .find('[data-cy=delete-button]')
    .click();

    cy.get('[data-cy=delete-playlist-dialog]')
    .find('button')
    .contains('Delete')
    .click();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .contains('Playlist 1')
    .should('not.exist');


  });

  it('Edit playlist name', function() {

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .find('[data-cy=playlist-name]')
    .trigger('mouseenter')
    .click();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .find('[data-cy=playlist-name]')
    .find('input')
    .first()
    .clear()
    .type('Foobar');

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .find('[data-cy=playlist-name]')
    .find('[data-cy=submit-button]')
    .first()
    .click();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Foobar')
    .should('exist');

  });

  it('Edit playlist description', function() {

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .find('[data-cy=playlist-description]')
    .trigger('mouseenter')
    .click();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .find('[data-cy=playlist-description]')
    .find('input')
    .first()
    .clear()
    .type('Foobar Description');

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .find('[data-cy=playlist-description]')
    .find('[data-cy=submit-button]')
    .first()
    .click();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Foobar Description')
    .should('exist');

  });

  it('Create new playlist', function() {

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=create-new-playlist-button]')
    .click();

    createNewPlaylist();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .contains('Foobar');

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .contains('Foobar Description');

  });

  it('Changes shared property of a playlist', function() {

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Not shared');

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .click();

    cy.get('[data-cy=playlist-edit-dialog]')
    .find('[data-cy=sharing-toggle]')
    .find('[type=checkbox]')
    .check({force: true})

    cy.get('[data-cy=playlist-edit-dialog]')
    .find('button')
    .contains('Close')
    .click();

    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Shared');

  });

  it('Removes page from playlist', function() {

    // open first playlist
    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .click();

    // remove first page
    cy.get('[data-cy=playlist-edit-dialog]')
    .find('[data-cy=remove-page-button]')
    .first()
    .click();

    // close edit dialg
    cy.get('[data-cy=playlist-edit-dialog]')
    .find('button')
    .contains('Close')
    .click();

  });

  it('Deletes playlist through edit playlist dialog', function() {

    // Check that first playlist exists
    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Playlist 1');

    // open first playlist
    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .click();

    // close edit dialg
    cy.get('[data-cy=playlist-edit-dialog]')
    .find('[data-cy=delete-button]')
    .click();

    // delete dialog is shown
    cy.get('[data-cy=delete-playlist-dialog]')
    .find('button')
    .contains('Delete')
    .click();

    // edit dialog closes after deletion
    cy.get('[data-cy=playlist-edit-dialog]')
    .should('not.be.visible');

    // check that playlist got deleted
    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Playlist 1')
    .should('not.exist');

  });

  it('Shares playlist through sharing dialog', function() {

    // check that first playlist is not shared
    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .contains('Not shared');

    // open first playlist
    cy.get('[data-cy=my-playlists-dialog]')
    .find('[data-cy=my-playlists-list]')
    .children()
    .first()
    .click();

    // open share dialog
    cy.get('[data-cy=playlist-edit-dialog]')
    .find('[data-cy=share-button]')
    .click()
    .wait(2000);

    // share
    cy.get('[data-cy=share-playlist-dialog]')
    .find('[data-cy=sharing-toggle]')
    .find('[type=checkbox]')
    .check({force: true})
    .wait(2000);

    cy.get('[data-cy=share-playlist-dialog]')
    .find('button')
    .contains('Save')
    .click()
    .wait(2000);

    // check that status is now shared
    cy.get('[data-cy=playlist-edit-dialog]')
    .find('[data-cy=sharing-toggle]')
    .find('[type=checkbox]')
    .should('be.checked', {force: true});

  });


});


