/* eslint-disable */


const pageUrl = 'http://localhost:8080';

describe('Component loads in dev invironment', function() {
    before(function() {
        cy.viewport(1300, 800);
    })

    it('Goto to test page', function() {
        cy.visit(pageUrl)
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

describe('HomeButton', function() {
  beforeEach(function(){
    cy.visit(pageUrl)
  })

  it('Navigates to the root page', function(){
    cy.get('[data-cy=main-menu-item]').first().click()
    cy.wait(200)

    cy.get('[data-cy=main-menu-item]').should('not.be.visible')

    cy.get('[data-cy=theme-home-button]').click()
    cy.wait(200)

    cy.get('[data-cy=main-menu-title]').should('be.visible')
  })
})

describe('SidePanel', function() {
  beforeEach(function() {
    cy.visit(pageUrl)

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


describe('PageTurner', function(){
  beforeEach(function() {
    cy.visit(pageUrl)
  })

  it('Does not show on the root page', function() {
    cy.get('[data-cy=page-turner-prev]').should('not.be.visible')
    cy.get('[data-cy=page-turner-next]').should('not.be.visible')
  })

  it('Changes pages', function() {
    cy.get('[data-cy=main-menu-item]').first().click()

    cy.get('[data-cy=cb-content-pos]').find('[data-cy=page-turner-prev]').should('not.be.visible')
    cy.get('[data-cy=cb-content-pos]').find('[data-cy=page-turner-next]').click()

    cy.get('[data-cy=cb-content-pos]').find('[data-cy=page-turner-prev]').click()

    cy.get('[data-cy=cb-content-pos]').find('[data-cy=page-turner-prev]').should('not.be.visible')
  })
});

describe('Notes', function(){
  beforeEach(function() {
    cy.visit(pageUrl);
    cy.get('[data-cy=side-panel-switch-notes]').first().click();
    cy.wait(1000)
  });

  it('Shows page and all notes', function() {
    cy.get('[data-cy=notes-list-page]').should('be.visible');
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 1);

    cy.get('[data-cy=note-type-selector-all').click();
    cy.get('[data-cy=notes-list-all]').should('be.visible');
    cy.get('[data-cy=notes-list-all]').children().should('have.length', 2);

    cy.get('[data-cy=note-type-selector-page').click();
    cy.get('[data-cy=notes-list-page]').should('be.visible');
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 1);
  })

  it('Creates a new note', function() {
    cy.get('[data-cy=add-note-text-field]').find('textarea').type('Nyy nööt')
    cy.get('[data-cy=add-note-button').click()

    cy.wait(1000)

    cy.get('[data-cy=notes-container').find('[data-cy=note-item]').contains('Nyy nööt')
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 2);

    cy.get('[data-cy=note-type-selector-all').click();
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

    cy.get('[data-cy=note-type-selector-all]').click();
    cy.get('[data-cy=notes-list-all]').children().should('have.length', 2);
    cy.get('[data-cy=note-type-selector-page]').click();

    /* Delete properly */

    cy.get('[data-cy=notes-list-page]').children().first().trigger('mouseover');
    cy.get('[data-cy=notes-list-page]').children().first().find('[data-cy=delete-note-button]').click();

    cy.get('[data-cy=note-dialog-delete]').find('[data-cy=delete-button]').click();
    cy.wait(1200)
    cy.get('[data-cy=note-dialog-delete]').should('not.be.visible');
    cy.get('[data-cy=notes-list-page]').children().should('have.length', 0);

    cy.get('[data-cy=note-type-selector-all').click();
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

    cy.get('[data-cy=note-type-selector-all').click();
    cy.get('[data-cy=notes-list-all]').children().first().find('[data-cy=note-text]').contains('Note 12');
  });

});

describe('Playlist Editor Dropdown', function(){

  beforeEach(function() {
    cy.visit(pageUrl);
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
    cy.visit(pageUrl);
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
    cy.visit(pageUrl);
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

