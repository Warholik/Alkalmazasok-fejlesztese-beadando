'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
  * registration(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }
    yield response.sendView('registration')
  }

  * login(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }
    yield response.sendView('login')
  }

  * doLogin (request, response) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const login = yield request.auth.attempt(email, password) 
      if (login) {
        response.redirect('/')
        return
      }
    } 
    catch (err) {
      yield request
        .withAll()
        .andWith({errors: [
          {
            message: 'Invalid credentails'
          }
        ]})
        .flash()
      response.redirect('/login')
    }
  }

  * doRegister (request, response) {
    const registerData = request.except('_csrf');
    
    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };
/*
   // const validation = yield Validator.validateAll(registerData, rules)


    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }
    */

    const user = new User()

console.log("username"+registerData.name)
console.log("email"+registerData.email)
console.log("jelszo"+registerData.password)
console.log("telefonszam"+registerData.phnonenumber)
console.log("szuldatum"+ registerData.birthdate)
console.log("egyetem"+registerData.university)
console.log("motivacio"+registerData.motivation)
console.log("varos"+registerData.country)

    user.username = registerData.name;
    user.email = registerData.email;
    user.password = yield Hash.make(registerData.password) 
    user.phonenumber = registerData.phonenumber;
    user.birthdate = registerData.birthdate;
    user.university = registerData.university;
    user.motivation = registerData.motivation;
    user.country = registerData.country;


    yield user.save()
    
    yield request.auth.login(user)

    response.redirect('/')
  }

  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }
}

module.exports = UserController
