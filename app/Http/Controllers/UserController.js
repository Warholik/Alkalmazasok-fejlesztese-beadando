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

  * doLogin(request, response) {
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
        .andWith({
          errors: [
            {
              message: 'Invalid credentails'
            }
          ]
        })
        .flash()
      response.redirect('/login')
    }
  }

  * doRegister(request, response) {
    const registerData = request.except('_csrf');

    const rules = {
      name: 'required|unique:users|min:4',
      email: 'required|email|unique:users',
      birthdate: 'required',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };

    const validation = yield Validator.validateAll(registerData, rules)
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('/registration')
      return
    }
    const user = new User()



    user.username = registerData.name;
    user.email = registerData.email;
    user.password = yield Hash.make(registerData.password)
    user.birthdate = registerData.birthdate;


    yield user.save()

    yield request.auth.login(user)

    response.redirect('/')
  }

  * doLogout(request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

    * ajaxLogin (request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password) 
      if (login) {
        response.ok({ success: true })
      }
    }
    catch (err) {
      response.ok({ success: false })
    }
  }

  * ajaxRegister(request, response) {
    const registerData = request.except('_csrf');

    const rules = {
      name: 'required|unique:users|min:4',
      email: 'required|email|unique:users',
      birthdate: 'required',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };
    const validation = yield Validator.validateAll(registerData, rules)
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()
        response.redirect('back')
      return
    }
    const user = new User()
    user.username = registerData.name;
    user.email = registerData.email;
    user.password = yield Hash.make(registerData.password)
    user.birthdate = registerData.birthdate;
    yield user.save()
    yield request.auth.login(user)
    response.ok({ success: true })
  }



}



module.exports = UserController
