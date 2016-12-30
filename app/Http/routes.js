'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'DormitoryController.list')
//Route.on('/registration').render('registration');

Route.get('/registration', 'UserController.registration')
Route.post('/registration', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')

Route.get('/dormitory', 'DormitoryController.registration')
Route.post('/dormitory', 'DormitoryController.doRegister')


Route.get('/leader', 'LeaderController.registration')
Route.post('/leader', 'LeaderController.doRegister')

Route.post('/dormitory/:id/apply', 'ApplicationController.apply').middleware('auth')
Route.post('/dormitory/:id/cancel', 'ApplicationController.cancel').middleware('auth')

Route.group('ajax', function () {
    Route.post('/dormitory/:id/apply', 'ApplicationController.ajaxApply').middleware('auth')
    Route.post('/dormitory/:id/cancel', 'ApplicationController.ajaxCancel').middleware('auth')
}).prefix('/ajax')


Route.get('/applications', 'ApplicationController.list')
