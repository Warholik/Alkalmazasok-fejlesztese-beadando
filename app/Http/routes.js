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

Route.get('/dormitory', 'DormitoryController.registration').middleware('auth')
Route.post('/dormitory', 'DormitoryController.doRegister').middleware('auth')
Route.post('/dormitory/:id/delete', 'DormitoryController.doDelete').middleware('auth')
Route.post('/dormedit/:id/edit', 'DormitoryController.doEdit').middleware('auth')
Route.get('/dormedit/:id/edit', 'DormitoryController.edit').middleware('auth')

Route.get('/leader', 'LeaderController.registration').middleware('auth')
Route.post('/leader', 'LeaderController.doRegister').middleware('auth')
Route.post('/leader/:id/delete', 'LeaderController.doDelete').middleware('auth')

Route.post('/dormitory/:id/apply', 'ApplicationController.apply').middleware('auth')
Route.post('/dormitory/:id/cancel', 'ApplicationController.cancel').middleware('auth')

Route.group('ajax', function () {
    Route.post('/login', 'UserController.ajaxLogin')
    Route.post('/dormitory/:id/apply', 'ApplicationController.ajaxApply').middleware('auth')
    Route.post('/dormitory/:id/cancel', 'ApplicationController.ajaxCancel').middleware('auth')
    Route.delete('/dormitory/:id/delete', 'DormitoryController.ajaxDelete').middleware('auth')
    Route.delete('/leader/:id/delete', 'LeaderController.ajaxDelete').middleware('auth')
    
}).prefix('/ajax')


Route.get('/applications', 'ApplicationController.list')
