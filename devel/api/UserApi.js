var userApi = {

  getUser: function(callback) {
    setTimeout(() => {
      callback(
        { 
          username: 'Teukka Salama', 
          email: 'email@email.com' 
        }
      );
    }, 1000);
  }
}