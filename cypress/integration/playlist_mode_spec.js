describe('Playlist mode', function(){
  beforeEach(function(){
    cy.visit('/');
    cy.wait(2000);
    cy.get('[data-cy=open-playlist-editor-button]').click();
    cy.wait(100);
    cy.get('[data-cy=open-playlist-code-input]').find('input').type('fo');
    cy.get('[data-cy=playlist-editor]').find('[data-cy=open-with-code-button]').first().click();
  });

  it('Shows playlist status', function() {
    cy.get('[data-cy=playlist-info]').should('be.visible');
    cy.get('[data-cy=playlist-info]').find('[data-cy=playlist-progress]').should('contain', '1/2');
  });

  it('Changes page and shows additional content automatically', function() {
    cy.scrollTo('bottom');
    cy.get('[data-cy=page-turner-prev]').should('not.be.visible');
    cy.get('[data-cy=page-turner-next]').last().click();

    cy.wait(10000);
    cy.get('[data-cy=ac-preview]').should('not.be.empty');
    cy.get('[data-cy=dialog-close-button]').click();

    cy.get('[data-cy=playlist-info]').find('[data-cy=playlist-progress]').should('contain', '2/2');

    cy.scrollTo('bottom');

    cy.get('[data-cy=page-turner-next]').should('not.be.visible');
    cy.get('[data-cy=page-turner-prev]').last().click();

    cy.wait(1000);
    cy.get('[data-cy=page-turner-prev]').should('not.be.visible');
  })

  it('Closes the playlist', function() {
    cy.scrollTo('topLeft');

    cy.get('[data-cy=close-playlist-button]').click({force: true});
    cy.wait(2000);
    cy.get('[data-cy=playlist-info]').should('not.be.visible');
  })
});
