/* eslint-disable */


const pageUrl = 'http://localhost:8081';

describe('Component loads in dev invironment', function() {
    before(function() {
        cy.viewport(1300, 800);
    })

    it('Goto to test page', function() {
        cy.visit(pageUrl)
    })
})

describe('MaterialAccordion', function() {
  beforeEach(function() {
    cy.visit(pageUrl)

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


describe('Search', function() {
  beforeEach(function() {
    cy.visit(pageUrl)
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
})

/* User panel */
const getUserPanel = () => {
  return cy.get('[data-cy=user-panel]');
}

const getLoginForm = () => {
  return cy.get('[data-cy=user-panel]').find('[data-cy=login-form]');
}

const getUserDetails = () => {
  return cy.get('[data-cy=user-panel]').find('[data-cy=user-details]');
}

const login = (mode) => {
  cy.get('[data-cy=user-panel]').should('not.be.visible')

  openUserPanel()

  getLoginForm().should('be.visible')
  getUserDetails().should('not.be.visible')
  if (mode === 'email') {
    getLoginForm().find('[data-cy=username-input]').should('not.be.visible')
  }
  else {
    getLoginForm().find('[data-cy=email-input]').should('not.be.visible')
  }

  getLoginForm().find('[data-cy=error-info]').should('not.be.visible')

  if(mode === 'email') {
    getLoginForm().find('[data-cy=email-input]').find('input').type('User')
  } else {
    getLoginForm().find('[data-cy=username-input]').find('input').type('User')
  }

  getLoginForm().find('[data-cy=password-input]').find('input').type('Password')
  getLoginForm().find('[data-cy=login-button]').click()

  cy.wait(2000)
}

const getSignUpForm = () => {
  return cy.get('[data-cy=sign-up-form]')
}

const openUserPanel = () => {
  cy.get('[data-cy=user-dropdown-button]').click()
}

const SIGN_UP_FIELDS_EMAIL = [
  'firstName-field',
  'lastName-field',
  'email-field',
  'password-field',
  'passwordVerification-field'
]

const SIGN_UP_FIELDS_USERNAME = [
  ...SIGN_UP_FIELDS_EMAIL,
  'username-field'
]

const EDIT_USER_FIELDS_EMAIL = [
  ...SIGN_UP_FIELDS_EMAIL,
  'newPassword-field'
]

const EDIT_USER_FIELDS_USERNAME = [
  ...EDIT_USER_FIELDS_EMAIL,
  'username-field'
]

const register = (mode) => {

  openUserPanel()
  /* Test the register panel closes */
  getUserPanel().find('[data-cy=to-sign-up-button]').click()

  cy.get('[data-cy=sign-up-dialog]').find('[data-cy=dialog-close-button]').click()
  getSignUpForm().should('not.be.visible')

  /* Test registering a user */
  getUserPanel().find('[data-cy=to-sign-up-button]').click()

  let fields = SIGN_UP_FIELDS_EMAIL;

  if(mode === 'username'){
    let fields = SIGN_UP_FIELDS_USERNAME;
  } else {
    /* Check that username field does not exist if email login is in use */
    getSignUpForm().find('[data-cy=username-field]').should('not.exist')
  }

  /* Check that errors do not exist */
  fields.forEach(field => {
    getSignUpForm().find(`[data-cy=${field}]`).find('[data-cy=error-label]').should('not.exist')
  })

  /* Set each field to invoke an error */
  fields.forEach(field => {
    getSignUpForm().find(`[data-cy=${field}]`).find('input').type('e')
  })

  getSignUpForm().find('[data-cy=sign-up-button]').click()

  cy.wait(2000)

  /* Check that errors exist */
  fields.forEach(field => {
    getSignUpForm().find(`[data-cy=${field}]`).find('[data-cy=error-label]').should('exist')
  })

  /* Fill in proper details */
  getSignUpForm().find('[data-cy=firstName-field]').find('input').clear().type('Nakki')
  getSignUpForm().find('[data-cy=lastName-field]').find('input').clear().type('Makkara')
  getSignUpForm().find('[data-cy=email-field]').find('input').clear().type('nakki-makkara@email.com')
  getSignUpForm().find('[data-cy=password-field]').find('input').clear().type('password')
  /* There should be an error for password verification */
  getSignUpForm().find('[data-cy=passwordVerification-field]').find('[data-cy=error-label]').should('exist')
  getSignUpForm().find('[data-cy=passwordVerification-field]').find('input').clear().type('password')

  if(mode === 'username') {
    getSignUpForm().find('[data-cy=username-field]').find('input').clear().type('nakki-makkara')
  }

  getSignUpForm().find('[data-cy=sign-up-button]').click()

}

const getUserSettings = () => {
  return getUserDetails().find('[data-cy=user-settings]')
}

const checkRegisteredUserDetails = (mode) => {
  openUserPanel()
  /* Check that the user is logged in and they have the right name */
  getUserDetails().find('[data-cy=user-name]').contains('Nakki Makkara')
  getUserDetails().find('[data-cy=user-email]').contains('nakki-makkara@email.com')

  getUserSettings().find('[data-cy=open-settings-button]').click()

  getUserSettings().find('[data-cy=firstName-field]').find('input').should('have.value', 'Nakki')
  getUserSettings().find('[data-cy=lastName-field]').find('input').should('have.value', 'Makkara')
  getUserSettings().find('[data-cy=email-field]').find('input').should('have.value', 'nakki-makkara@email.com')

  if(mode === 'username'){
    getUserSettings().find('[data-cy=username-field]').find('input').should('have.value', 'nakki-makkara')
  }
}

const editDetails = (mode) => {

  openUserPanel()

  getUserSettings().find('[data-cy=open-settings-button]').click()

  getUserSettings().find('[data-cy=firstName-field]').find('input').should('have.value', 'Johan Ludvig')
  getUserSettings().find('[data-cy=lastName-field]').find('input').should('have.value', 'Runeberg')
  getUserSettings().find('[data-cy=email-field]').find('input').should('have.value', 'email@email.com')
  if(mode === 'username') {
    getUserSettings().find('[data-cy=username-field]').find('input').should('have.value', 'ludde1804')
  } else {
    getUserSettings().find('[data-cy=username-field]').should('not.exist')
  }
  getUserSettings().find('[data-cy=password-field]').find('input').should('have.value', '')
  getUserSettings().find('[data-cy=passwordVerification-field]').find('input').should('have.value', '')

  let fields = EDIT_USER_FIELDS_EMAIL;

  if(mode === 'username') {
    fields = EDIT_USER_FIELDS_USERNAME;
  }

  /* Set each field to invoke an error */
  fields.forEach(field => {
    getUserSettings().find(`[data-cy=${field}]`).find('input').clear().type('e')
  })

  getUserSettings().find('[data-cy=save-button]').click()
  getUserSettings().find('[data-cy=loading-spinner]').should('be.visible')

  cy.wait(1000)

  /* Check errors and that details didn't change */
  fields.forEach(field => {
    getUserSettings().find(`[data-cy=${field}]`).find('[data-cy=error-label]').should('exist')
  })

  getUserDetails().find('[data-cy=user-name]').contains('Johan Ludvig Runeberg')
  getUserDetails().find('[data-cy=user-email]').contains('email@email.com')

  /* Fill in proper details */
  getUserSettings().find('[data-cy=firstName-field]').find('input').clear().type('Nakki')
  getUserSettings().find('[data-cy=lastName-field]').find('input').clear().type('Makkara')
  getUserSettings().find('[data-cy=email-field]').find('input').clear().type('nakki-makkara@email.com')

  if(mode === 'username') {
    getUserSettings().find('[data-cy=username-field]').find('input').clear().type('nakki-makkara')
  }

  getUserSettings().find('[data-cy=password-field]').find('input').clear().type('password')
  getUserSettings().find('[data-cy=newPassword-field]').find('input').clear().type('password')
  /* There should be an error for password verification */
  getUserSettings().find('[data-cy=passwordVerification-field]').find('[data-cy=error-label]').should('exist')
  getUserSettings().find('[data-cy=passwordVerification-field]').find('input').clear().type('password')

  getUserSettings().find('[data-cy=save-button]').click()

  cy.wait(1000)

  fields.forEach(field => {
    getUserSettings().find(`[data-cy=${field}]`).find('[data-cy=error-label]').should('not.exist')
  })

  getUserDetails().find('[data-cy=user-name]').contains('Nakki Makkara')
  getUserDetails().find('[data-cy=user-email]').contains('nakki-makkara@email.com')
}

describe('User', function(){
  it('Edits user account with email login', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: true
        }))

        win.sessionStorage.setItem('loggedIn', true)
      }
    });

    editDetails('email')
  })

  it('Edits user account with username login', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: false
        }))

        win.sessionStorage.setItem('loggedIn', true)
      }
    });

    editDetails('username')
  })

  it('Does not allow editing user account if configured so', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: false,
          emailLogin: false
        }))

        win.sessionStorage.setItem('loggedIn', true)
      }
    });

    openUserPanel()

    getUserSettings().find('[data-cy=open-settings-button]').click()
    getUserSettings().find('[data-cy=save-button]').should('not.exist')
  })

  it('Logs in using email', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set email login in server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: true
        }))
      }
    });

    login('email');

    /* Page should reload */

    cy.wait(2000)

    cy.get('[data-cy=user-panel]').should('not.be.visible')

    openUserPanel()

    /* User details should now be visible instead of login form. */
    getUserDetails().should('be.visible')
    getLoginForm().should('not.be.visible')
  })

  it('Shows login error', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: true
        }))
      }
    });

    openUserPanel()

    getLoginForm().find('[data-cy=email-input]').find('input').type('e')
    getLoginForm().find('[data-cy=password-input]').find('input').type('e')

    getLoginForm().find('[data-cy=login-button]').click()

    cy.wait(2000)
    getLoginForm().find('[data-cy=error-info]').should('be.visible')
  })

  it('Logs in using username', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: false
        }))
      }
    });

    login('username');

    cy.get('[data-cy=user-panel]').should('not.be.visible')
    cy.get('[data-cy=user-dropdown-button]').click()
    /* User details should now be visible instead of login form. */
    getUserDetails().should('be.visible')
    getLoginForm().should('not.be.visible')
  })

  it('Navigates to login from other views', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: false
        }))
      }
    });

    openUserPanel()

    getUserPanel().find('[data-cy=to-sign-up-button]').click()
    cy.get('[data-cy=sign-up-dialog]').find('[data-cy=to-sign-in-button]').click()
    getLoginForm().should('be.visible')

    getUserPanel().find('[data-cy=forgot-password-button]').click()
    getUserPanel().find('[data-cy=to-sign-in-button]').click()
    getLoginForm().should('be.visible')
  })

  it('Registers a new user using username login', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: false
        }))
      }
    });

    register('username');
    /* Page reloads */
    cy.wait(2000)
    getUserPanel().should('not.be.visible')

    checkRegisteredUserDetails('username')
  })

  it('Registers a new user using email login', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: true
        }))
      }
    });

    register('email');

    /* Page reloads */
    cy.wait(2000)
    getUserPanel().should('not.be.visible')

    checkRegisteredUserDetails('email')
  })

  it('Does not allow sign up when configured so', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: false,
          editAccounts: true,
          emailLogin: true
        }))
      }
    });

    openUserPanel()

    getUserPanel().find('[data-cy=to-sign-up-button]').should('not.exist')
  })

  it('Sends a password reset link', function() {
    cy.visit(pageUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        /* Set server configuration */
        win.sessionStorage.setItem('accountTestConfig', JSON.stringify({
          signup: true,
          editAccounts: true,
          emailLogin: true
        }))
      }
    });

    openUserPanel()

    getUserPanel().find('[data-cy=forgot-password-button]').click()

    getUserPanel().find('[data-cy=forgot-password-view]').find('[data-cy=success-info]').should('not.be.visible')

    getUserPanel().find('[data-cy=forgot-password-view]').find('[data-cy=email-field]').find('input').type('email@email.com')
    getUserPanel().find('[data-cy=forgot-password-view]').find('[data-cy=request-reset-button]').click()
    getUserPanel().find('[data-cy=forgot-password-view]').find('[data-cy=loading-spinner]').should('exist')

    cy.wait(1500)

    getUserPanel().find('[data-cy=forgot-password-view]').find('[data-cy=success-info]').should('be.visible')
    getUserPanel().find('[data-cy=to-sign-in-button]').click()

    getUserPanel().find('[data-cy=forgot-password-button]').click()
    getUserPanel().find('[data-cy=forgot-password-view]').find('[data-cy=success-info]').should('not.be.visible')
  })


})


describe('Ruler', function(){
  beforeEach(function() {
    cy.visit(pageUrl)
  })

  it('Opens and closes', function(){
    cy.get('[data-cy=ruler-wrapper]').should('not.be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').should('be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').should('not.be.visible')

    cy.get('[data-cy=ruler-button]').first().click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').find('[data-cy=close-ruler-button]').click()

    cy.wait(400)

    cy.get('[data-cy=ruler-wrapper]').should('not.be.visible')
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
    cy.get('[data-cy=add-note-button]').click();

    cy.wait(2000)

    cy.get('[data-cy=notes-container]').find('[data-cy=note-item]').contains('Nyy nööt')
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


