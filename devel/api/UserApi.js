var userApi = {

  getUser(callback) {
    setTimeout(() => {
      callback(
        { 
          name: 'Teukka Salama', 
          email: 'email@email.com' 
        }
      );
    }, 1000);
  },

  logout() {
    console.log('USER LOGOUT');
  }
}

export default userApi;