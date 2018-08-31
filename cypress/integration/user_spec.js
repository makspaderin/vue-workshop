/* eslint-disable */

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
  cy.get('[data-cy=user-dropdown-button]').first().click()
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    openUserPanel();
    /* User details should now be visible instead of login form. */
    getUserDetails().should('be.visible')
    getLoginForm().should('not.be.visible')
  })

  it('Navigates to login from other views', function() {
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
    cy.visit('/', {
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
